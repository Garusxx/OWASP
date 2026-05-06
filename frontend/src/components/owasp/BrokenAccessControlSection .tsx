import { useState } from "react";
import "../../style/owasp/brokenAccessControlSection.css";

type Props = {
  isSecure: boolean;
};

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type VulnerableResponse = {
  loggedAs: {
    id: number;
    username: string;
  };
  requestedId: string;
  data: User | null;
};

type SecureResponse =
  | User
  | {
      error: string;
    };

type ApiResponse = VulnerableResponse | SecureResponse;

type ChallengeResponse =
  | {
      message: string;
      accessedAs?: {
        id: number;
        username: string;
        role: string;
      };
      secret: string;
    }
  | {
      error: string;
    };

const API_URL = "http://localhost:3001";

function BrokenAccessControlSection({ isSecure }: Props) {
  const [profileId, setProfileId] = useState<string>("2");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [showChallenge, setShowChallenge] = useState(false);
  const [challengePath, setChallengePath] = useState(
    "/api/admin/secret?userId=1",
  );
  const [challengeResponse, setChallengeResponse] =
    useState<ChallengeResponse | null>(null);
  const [challengeLoading, setChallengeLoading] = useState(false);

  const endpoint = isSecure
    ? `/api/profile-secure/${profileId}`
    : `/api/profile/${profileId}`;

  async function handleRequest() {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(API_URL + endpoint);
      const data = (await res.json()) as ApiResponse;
      setResponse(data);
    } catch {
      setResponse({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  }

  async function handleChallengeRequest() {
    setChallengeLoading(true);
    setChallengeResponse(null);

    try {
      const endpoint = isSecure ? "/api/admin/secret-secure" : challengePath;

      const res = await fetch(API_URL + endpoint);
      const data = (await res.json()) as ChallengeResponse;

      setChallengeResponse(data);
    } catch {
      setChallengeResponse({ error: "Request failed" });
    } finally {
      setChallengeLoading(false);
    }
  }

  if (showChallenge) {
    return (
      <div className="bac-challenge-full">
        <div className="bac-challenge-header">
          <h3>Exploit Challenge</h3>

          <button
            type="button"
            className="bac-back-button"
            onClick={() => setShowChallenge(false)}
          >
            ← Back
          </button>
        </div>

        <p className="bac-challenge-description">
          Try to send a GET request to an admin-only endpoint. The goal is to
          understand how trusting user-controlled input can expose protected
          data.
        </p>

        <div className="bac-challenge-terminal">
          <span>GET</span>

          <input
            value={challengePath}
            onChange={(e) => setChallengePath(e.target.value)}
            aria-label="GET request path"
          />

          <button
            type="button"
            onClick={handleChallengeRequest}
            disabled={challengeLoading}
          >
            {challengeLoading ? "Running..." : "Run"}
          </button>
        </div>

        <div className="bac-challenge-result">
          <pre>
            <code>
              {challengeResponse
                ? JSON.stringify(challengeResponse, null, 2)
                : "// execute request"}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="bac-layout">
      <div className="bac-main">
        <div className="bac-header">
          <h3>{isSecure ? "Secure Mode ✅" : "Vulnerable Mode ❌"}</h3>

          <p>
            Logged as: <strong>Alice (id = 1)</strong>
          </p>
        </div>

        <div className="bac-controls">
          <label>
            Select profile:
            <select
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
            >
              <option value="1">Alice (id 1)</option>
              <option value="2">Bob (id 2)</option>
              <option value="3">Admin (id 3)</option>
            </select>
          </label>

          <button type="button" onClick={handleRequest} disabled={loading}>
            {loading ? "Loading..." : "Send request"}
          </button>
        </div>

        <div className="bac-request">
          <code>GET {endpoint}</code>
        </div>

        <div className="bac-response">
          <h4>Response:</h4>

          <pre>
            <code>
              {response
                ? JSON.stringify(response, null, 2)
                : "// click 'Send request'"}
            </code>
          </pre>
        </div>

        <div className="bac-explanation">
          {isSecure ? (
            <p>
              ✔ Access is checked → <strong>403 Forbidden</strong>
            </p>
          ) : (
            <p>
              ❌ No access control → <strong>Data Leak</strong>
            </p>
          )}
        </div>
      </div>

      <aside className="bac-side">
        <h4>What is Broken Access Control?</h4>

        <p>
          <strong>Broken Access Control</strong> means a user can access data
          they shouldn't. In this demo, Alice can request other users' data
          because the backend does not verify permissions.
        </p>

        <div className="bac-side-note">
          {isSecure ? "✔ Access is validated" : "❌ Access is not validated"}
        </div>

        <a
          href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official OWASP definition
        </a>

        <div className="bac-attack-info">
          You can also try a small challenge and attempt your own controlled
          request against an admin-only endpoint.
        </div>

        <button
          type="button"
          className="bac-exploit-button"
          onClick={() => setShowChallenge(true)}
        >
          Start challenge →
        </button>
      </aside>
    </div>
  );
}

export default BrokenAccessControlSection;
