import { useState } from "react";
import "../../style/owasp/cryptographicFailuresSection.css";

type Props = {
  isSecure: boolean;
};

function CryptographicFailuresSection({ isSecure }: Props) {
  const [showChallenge, setShowChallenge] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState<string | null>(null);

  function handleSavePassword() {
    if (isSecure) {
      setSavedPassword("$2b$10$K9s0xDemoHashExample9QpL3a8fSecure");

      return;
    }

    setSavedPassword(password);
  }

  if (showChallenge) {
    return (
      <div className="crypto-challenge">
        <div className="crypto-challenge-header">
          <h3>Password Storage Challenge</h3>

          <button
            type="button"
            className="crypto-back-button"
            onClick={() => setShowChallenge(false)}
          >
            ← Back
          </button>
        </div>

        <div className="crypto-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </label>

          <button
            type="button"
            className="crypto-save-button"
            onClick={handleSavePassword}
          >
            Save password
          </button>
        </div>

        <div className="crypto-storage-preview">
          <h4>{isSecure ? "Secure storage ✅" : "Vulnerable storage ❌"}</h4>

          <pre>
            <code>
              {savedPassword
                ? JSON.stringify(
                    {
                      username,
                      password: savedPassword,
                    },
                    null,
                    2,
                  )
                : "// saved password will appear here"}
            </code>
          </pre>
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
          Secure applications hash passwords before saving them to the database.
        </p>
      </div>

      <aside className="crypto-side">
        <h4>What is the risk?</h4>

        <p>
          If a database leaks and passwords are not hashed, attackers can read
          every password instantly.
        </p>

        <div className="crypto-side-note">
          {isSecure ? "✔ Passwords are hashed" : "❌ Passwords are exposed"}
        </div>

        <p className="crypto-attack-info">Try storing your own password →</p>

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
