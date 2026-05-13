import "../../style/owasp/securityMisconfiguration.css";

type Props = {
  isSecure: boolean;
};

function SecurityMisconfiguration({ isSecure }: Props) {
  return (
    <div className="misconfiguration-layout">
      <div className="misconfiguration-main">
        <h3>
          {isSecure
            ? "Secure Configuration ✅"
            : "Security Misconfiguration ❌"}
        </h3>

        <p>
          Security Misconfiguration happens when applications expose unsafe
          default settings, debug information, unnecessary services, or internal
          system details.
        </p>

        <p>
          Attackers often use misconfigured environments to gather sensitive
          information and escalate attacks.
        </p>

        <div className="misconfiguration-demo-card">
          <h4>Server response preview</h4>

          <pre>
            <code>
              {isSecure
                ? JSON.stringify(
                    {
                      environment: "production",
                      debug: false,
                      error: "Internal server error",
                    },
                    null,
                    2,
                  )
                : JSON.stringify(
                    {
                      environment: "development",
                      debug: true,
                      database: {
                        host: "localhost",
                        user: "root",
                        password: "root123",
                      },
                      stackTrace:
                        "Error: SQL syntax error near line 1...",
                    },
                    null,
                    2,
                  )}
            </code>
          </pre>
        </div>
      </div>

      <aside className="misconfiguration-side">
        <h4>What is the risk?</h4>

        <p>
          Exposed debug information and insecure defaults can reveal internal
          application details and sensitive credentials.
        </p>

        <div className="misconfiguration-side-note">
          {isSecure
            ? "✔ Secure production setup"
            : "❌ Sensitive configuration exposed"}
        </div>

        <h4>Secure fix</h4>

        <p>
          Production applications should disable debug mode, hide stack traces,
          rotate secrets, and expose only required services.
        </p>

        <a
          href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official OWASP definition
        </a>
      </aside>
    </div>
  );
}

export default SecurityMisconfiguration;