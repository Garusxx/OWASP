import { useState } from "react";
import "../../style/owasp/injectionSection.css";

type Props = {
  isSecure: boolean;
};

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

function InjectionSection({ isSecure }: Props) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<User[] | null>(null);
  const [sqlPreview, setSqlPreview] = useState(
    isSecure
      ? "SELECT id, username, email, role FROM users WHERE username = ?"
      : "SELECT id, username, email, role FROM users WHERE username = ''",
  );
  const [error, setError] = useState("");

  const [showChallenge, setShowChallenge] = useState(false);
  const [challengePayload, setChallengePayload] = useState("");
  const [challengeResult, setChallengeResult] = useState<User[] | null>(null);
  const [challengeSql, setChallengeSql] = useState(
    "SELECT id, username, email, role FROM users WHERE username = ''",
  );
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [challengeError, setChallengeError] = useState("");

  async function runSearch(value: string, secure: boolean) {
    const endpoint = secure
      ? "http://localhost:3001/api/profile/search-secure"
      : "http://localhost:3001/api/profile/search-vulnerable";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: value }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Request failed");
    }

    return data;
  }

  async function handleSearch() {
    if (!search.trim()) {
      setResult([]);
      setSqlPreview(
        isSecure
          ? "SELECT id, username, email, role FROM users WHERE username = ?"
          : "SELECT id, username, email, role FROM users WHERE username = ''",
      );
      setError("");
      return;
    }

    try {
      setError("");

      const data = await runSearch(search, isSecure);

      setResult(data.users ?? []);

      setSqlPreview(
        data.sql ??
          (isSecure
            ? "SELECT id, username, email, role FROM users WHERE username = ?"
            : `SELECT id, username, email, role FROM users WHERE username = '${search}'`),
      );
    } catch (err) {
      setResult([]);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  async function handleRunChallenge() {
    if (!challengePayload.trim()) {
      setChallengeResult([]);
      setChallengeCompleted(false);
      setChallengeError("Payload required.");
      return;
    }

    try {
      setChallengeError("");

      const data = await runSearch(challengePayload, false);
      const users = data.users ?? [];

      setChallengeResult(users);

      setChallengeSql(
        data.sql ??
          `SELECT id, username, email, role FROM users WHERE username = '${challengePayload}'`,
      );

      const adminFound = users.some(
        (user: User) =>
          user.role === "admin" ||
          user.role === "administrator" ||
          user.username === "admin",
      );

      if (adminFound) {
        setChallengeCompleted(true);
        setChallengeError("");
        return;
      }

      setChallengeCompleted(false);
      setChallengeError("Administrator account not retrieved.");
    } catch (err) {
      setChallengeResult([]);
      setChallengeCompleted(false);
      setChallengeError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  }

  if (showChallenge) {
    return (
      <div className="injection-challenge-full">
        <div className="injection-challenge-header">
          <h3>SQL Injection Challenge</h3>

          <button
            type="button"
            className="injection-back-button"
            onClick={() => {
              setShowChallenge(false);
              setChallengePayload("");
              setChallengeResult(null);
              setChallengeSql(
                "SELECT id, username, email, role FROM users WHERE username = ''",
              );
              setChallengeCompleted(false);
              setChallengeError("");
            }}
          >
            ← Back
          </button>
        </div>

        <p className="injection-challenge-description">
          Your goal is to retrieve the administrator account by manipulating the
          vulnerable SQL query.
        </p>

        <div className="injection-challenge-grid">
          <div className="injection-challenge-main-card">
            <h4>Target</h4>

            <pre>
              <code>
                {JSON.stringify(
                  {
                    goal: "Retrieve administrator account",
                    endpoint: "/api/profile/search-vulnerable",
                    status: "Payload required",
                  },
                  null,
                  2,
                )}
              </code>
            </pre>

            <div className="injection-challenge-form">
              <input
                type="text"
                value={challengePayload}
                onChange={(e) => setChallengePayload(e.target.value)}
                placeholder="Enter payload"
              />

              <button type="button" onClick={handleRunChallenge}>
                Run payload →
              </button>
            </div>

            <div className="injection-query-preview">
              <h4>Generated SQL</h4>

              <pre>
                <code>{challengeSql}</code>
              </pre>
            </div>
          </div>

          <div className="injection-challenge-side">
            <div className="injection-result">
              <h4>Database response</h4>

              <pre>
                <code>
                  {challengeResult
                    ? JSON.stringify(
                        {
                          users: challengeResult,
                          count: challengeResult.length,
                        },
                        null,
                        2,
                      )
                    : "// run payload"}
                </code>
              </pre>
            </div>

            <div className="injection-result">
              <h4>Result</h4>

              <pre>
                <code>
                  {challengeCompleted
                    ? JSON.stringify(
                        {
                          message: "Challenge completed ✅",
                          access: "Administrator account retrieved",
                        },
                        null,
                        2,
                      )
                    : challengeError
                      ? JSON.stringify(
                          {
                            error: challengeError,
                          },
                          null,
                          2,
                        )
                      : "// retrieve administrator account"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="injection-layout">
      <div className="injection-main">
        <h3>{isSecure ? "Secure Queries ✅" : "Injection Vulnerability ❌"}</h3>

        <p>
          <strong>Injection</strong> happens when user input is treated as part
          of a command or database query.
        </p>

        <p>
          In SQL Injection, an attacker can modify the query logic and access
          data they should not be able to see.
        </p>

        <div className="injection-demo-card">
          <h4>Try it yourself</h4>

          <p>
            Search for a username. In vulnerable mode, try typing:
            <code>' OR '1'='1</code>
          </p>

          <div className="injection-search-row">
            <input value={search} onChange={(e) => setSearch(e.target.value)} />

            <button type="button" onClick={handleSearch}>
              Run query →
            </button>
          </div>

          <div className="injection-query-preview">
            <h4>SQL preview</h4>

            <pre>
              <code>{sqlPreview}</code>
            </pre>
          </div>

          <div className="injection-result">
            <h4>Response</h4>

            <pre>
              <code>
                {error
                  ? JSON.stringify({ error }, null, 2)
                  : result
                    ? JSON.stringify(
                        {
                          users: result,
                          count: result.length,
                        },
                        null,
                        2,
                      )
                    : "// run query"}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <aside className="injection-side">
        <h4>What is the risk?</h4>

        <p>
          Unsafe queries can expose entire databases, bypass authentication, or
          leak sensitive information.
        </p>

        <div className="injection-side-note">
          {isSecure ? "✔ Parameterized queries" : "❌ Unsafe SQL queries"}
        </div>

        <h4>Secure fix</h4>

        <p>
          Secure applications use parameterized queries. User input is passed as
          data, not as executable SQL.
        </p>

        <a
          href="https://owasp.org/Top10/A03_2021-Injection/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official OWASP definition
        </a>

        <div className="injection-attack-info">
          Try the challenge and retrieve the administrator account by modifying
          the SQL query logic.
        </div>

        <button
          type="button"
          className="injection-start-button"
          onClick={() => setShowChallenge(true)}
        >
          Start challenge →
        </button>
      </aside>
    </div>
  );
}

export default InjectionSection;
