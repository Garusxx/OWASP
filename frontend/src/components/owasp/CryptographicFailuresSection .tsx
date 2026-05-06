import { useMemo, useState } from "react";
import bcrypt from "bcryptjs";
import "../../style/owasp/cryptographicFailuresSection.css";

type Props = {
  isSecure: boolean;
};

type LeakedUser = {
  id: number;
  email: string;
  role: string;
  password: string;
};

const ADMIN_PASSWORD = "admin123";

const users: LeakedUser[] = [
  {
    id: 1,
    email: "alice@app.com",
    role: "user",
    password: "alice2024",
  },
  {
    id: 2,
    email: "bob@app.com",
    role: "user",
    password: "football2024",
  },
  {
    id: 3,
    email: "admin@app.com",
    role: "administrator",
    password: ADMIN_PASSWORD,
  },
  {
    id: 4,
    email: "charlie@app.com",
    role: "user",
    password: "charlieSecret",
  },
];

function CryptographicFailuresSection({ isSecure }: Props) {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState<string | null>(null);

  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [challengeError, setChallengeError] = useState("");

  const leakedData = useMemo(() => {
    if (!isSecure) {
      return users;
    }

    return users.map((user) => {
      const salt = bcrypt.genSaltSync(10);

      return {
        ...user,
        password: bcrypt.hashSync(user.password, salt),
      };
    });
  }, [isSecure]);

  function handleSavePassword() {
    if (!password.trim()) {
      setSavedPassword(null);
      return;
    }

    if (isSecure) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      setSavedPassword(hash);
      return;
    }

    setSavedPassword(password);
  }

  function handleCheckChallenge() {
    if (challengeAnswer.trim() === ADMIN_PASSWORD) {
      setChallengeCompleted(true);
      setChallengeError("");
      return;
    }

    setChallengeCompleted(false);
    setChallengeError("Wrong password. Check the leaked data again.");
  }

  if (showChallenge) {
    return (
      <div className="crypto-challenge-full">
        <div className="crypto-challenge-header">
          <h3>Password Leak Challenge</h3>

          <button
            type="button"
            className="crypto-back-button"
            onClick={() => {
              setShowChallenge(false);
              setChallengeAnswer("");
              setChallengeCompleted(false);
              setChallengeError("");
            }}
          >
            ← Back
          </button>
        </div>

        <p className="crypto-challenge-description">
          A database leak happened. In vulnerable mode, passwords are visible in
          plain text. In secure mode, passwords are protected with bcrypt hashes.
          Find the administrator password and submit it.
        </p>

        <div className="crypto-challenge-grid">
          <div className="crypto-leak-box">
            <pre>
              <code>{JSON.stringify(leakedData, null, 2)}</code>
            </pre>
          </div>

          <div className="crypto-challenge-side">
            <div className="crypto-challenge-card">
              <h4>Submit answer</h4>

              <div className="crypto-challenge-form">
                <input
                  type="text"
                  value={challengeAnswer}
                  onChange={(e) => setChallengeAnswer(e.target.value)}
                  placeholder="Administrator password"
                />

                <button type="button" onClick={handleCheckChallenge}>
                  Check password →
                </button>
              </div>
            </div>

            <div className="crypto-challenge-result">
              <h4>Result</h4>

              <pre>
                <code>
                  {challengeCompleted
                    ? JSON.stringify(
                        {
                          message: "Challenge completed ✅",
                          access: "Administrator password found",
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
                      : "// enter administrator password"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="crypto-layout">
      <div className="crypto-main">
        <h3>
          {isSecure ? "Secure Cryptography ✅" : "Cryptographic Failure ❌"}
        </h3>

        <p>
          Sensitive data such as passwords should never be stored in plain text.
        </p>

        <p>
          Type a password and save it to see how it would look inside a
          database.
        </p>

        <div className="crypto-form-card">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>

          <button
            type="button"
            className="crypto-save-button"
            onClick={handleSavePassword}
          >
            Save password →
          </button>
        </div>

        <div className="crypto-storage-preview">
          <h4>Database preview</h4>

          <pre>
            <code>
              {savedPassword
                ? JSON.stringify(
                    {
                      password: savedPassword,
                    },
                    null,
                    2,
                  )
                : "// password will appear here"}
            </code>
          </pre>
        </div>
      </div>

      <aside className="crypto-side">
        <h4>What is Cryptographic Failure?</h4>

        <p>
          <strong>Cryptographic Failure</strong> happens when sensitive data is
          not protected correctly, for example when passwords are stored in plain
          text.
        </p>

        <div className="crypto-side-note">
          {isSecure ? "✔ Password is hashed" : "❌ Password is visible"}
        </div>

        <a
          href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official OWASP definition
        </a>

        <div className="crypto-attack-info">
          Try the challenge and inspect leaked database data to find an
          administrator password.
        </div>

        <button
          type="button"
          className="crypto-start-button"
          onClick={() => setShowChallenge(true)}
        >
          Start challenge →
        </button>
      </aside>
    </div>
  );
}

export default CryptographicFailuresSection;