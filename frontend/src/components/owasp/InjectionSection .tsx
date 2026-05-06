import { useState } from "react";
import "../../style/owasp/injectionSection.css";

type Props = {
  isSecure: boolean;
};

function InjectionSection({ isSecure }: Props) {
  const [showChallenge, setShowChallenge] = useState(false);

  if (showChallenge) {
    return (
      <div className="injection-challenge">
        <div className="injection-challenge-header">
          <h3>SQL Injection Challenge</h3>

          <button
            type="button"
            className="injection-back-button"
            onClick={() => setShowChallenge(false)}
          >
            ← Back
          </button>
        </div>

        <p>
          Try searching for users and see how unsafe queries can expose data.
        </p>

        {/* później dodamy input + request */}
      </div>
    );
  }

  return (
    <div className="injection-layout">
      <div className="injection-main">
        <h3>
          {isSecure
            ? "Secure Queries ✅"
            : "Injection Vulnerability ❌"}
        </h3>

        <p>
          Injection happens when user input is interpreted as part of a query or
          command.
        </p>

        <p>
          SQL Injection allows attackers to manipulate database queries and
          access unintended data.
        </p>
      </div>

      <aside className="injection-side">
        <h4>What is the risk?</h4>

        <p>
          Unsafe queries can expose entire databases, bypass authentication or
          leak sensitive information.
        </p>

        <div className="injection-side-note">
          {isSecure
            ? "✔ Parameterized queries"
            : "❌ Unsafe SQL queries"}
        </div>

        <p className="injection-attack-info">
          Try your own SQL query →
        </p>

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