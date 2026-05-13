import { Link } from "react-router-dom";
import "../style/Home.css";

const risks = [
  "A01 Access Control",
  "A02 Misconfiguration",
  "A03 Supply Chain",
  "A04 Cryptography",
  "A05 Injection",
  "A06 Insecure Design",
  "A07 Authentication",
  "A08 Integrity",
  "A09 Logging",
  "A10 Exceptions",
];

function Home() {
  return (
    <main className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-copy">
          <div className="home-kicker">
            <span className="home-kicker-dot" />
            OWASP Top 10:2025 Training Lab
          </div>

          <h1 id="home-title">Security analysis that feels hands-on.</h1>

          <p>
            Explore vulnerable and protected flows side by side, run small
            challenges, and see how each OWASP risk changes real application
            behavior.
          </p>

          <div className="home-actions">
            <Link to="/owasp" className="home-primary-action">
              Open lab
            </Link>

            <a
              href="https://owasp.org/Top10/2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="home-secondary-action"
            >
              OWASP 2025
            </a>
          </div>

          <dl className="home-stats" aria-label="Project overview">
            <div>
              <dt>10</dt>
              <dd>risk areas</dd>
            </div>

            <div>
              <dt>2</dt>
              <dd>security modes</dd>
            </div>

            <div>
              <dt>Live</dt>
              <dd>challenge flows</dd>
            </div>
          </dl>
        </div>

        <div className="home-console" aria-label="OWASP lab preview">
          <div className="home-console-bar">
            <span />
            <span />
            <span />
            <strong>security-lab.json</strong>
          </div>

          <div className="home-console-body">
            <div className="home-status-row">
              <span>mode</span>
              <strong>protected / exposed</strong>
            </div>

            <div className="home-risk-grid">
              {risks.map((risk, index) => (
                <div className="home-risk-item" key={risk}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {risk}
                </div>
              ))}
            </div>

            <div className="home-terminal">
              <span>{">"}</span>
              <code>run challenge --category injection --compare-modes</code>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
