import "../style/owasp/layout.css";
import "../style/owasp/header.css";
import "../style/owasp/sections.css";
import "../style/owasp/toggle.css";
import "../style/owasp/responsive.css";
import "../style/owasp/animations.css";
import OwaspSection from "../components/OwaspSection";
import useSectionScroll from "../hooks/useSectionScroll";
import OwaspNav from "../components/OwaspNav";
import type { OwaspItem } from "../types/owasp";
import { useEffect, useRef, useState } from "react";

const owaspItems: OwaspItem[] = [
  {
    id: "broken-access-control",
    title: "A1: Broken Access Control",
    description: "Access control enforces what users are allowed to do.",
  },
  {
    id: "cryptographic-failures",
    title: "A2: Cryptographic Failures",
    description: "Weak or missing cryptography can expose sensitive data.",
  },
  {
    id: "injection",
    title: "A3: Injection",
    description:
      "Injection happens when untrusted data is sent to an interpreter.",
  },
];

function Owasp() {
  const { containerRef, activeId } = useSectionScroll({
    sectionSelector: ".owasp-section",
  });

  const [isSecure, setIsSecure] = useState(true);
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const animationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.classList.remove("theme-secure", "theme-vulnerable");
    document.body.classList.add(isSecure ? "theme-secure" : "theme-vulnerable");
  }, [isSecure]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }

      document.body.classList.remove(
        "theme-secure",
        "theme-vulnerable",
        "theme-animating"
      );
    };
  }, []);

  function handleModeToggle() {
    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    document.body.classList.add("theme-animating");
    setIsThemeAnimating(true);
    setIsSecure((current) => !current);

    animationTimeoutRef.current = window.setTimeout(() => {
      document.body.classList.remove("theme-animating");
      setIsThemeAnimating(false);
      animationTimeoutRef.current = null;
    }, 820);
  }

  return (
    <div
      className={`owasp-page ${isSecure ? "is-secure" : "is-exposed"} ${
        isThemeAnimating ? "is-theme-animating" : ""
      }`}
    >
      <div className="owasp-header">
        <h1>OWASP // SECURITY ANALYSIS</h1>
      </div>

      <OwaspNav items={owaspItems} activeId={activeId} />

      <div className="owasp-mode" role="group" aria-label="Security mode switch">
        <button
          type="button"
          onClick={handleModeToggle}
          className={`owasp-lock-toggle ${isSecure ? "is-secure" : "is-exposed"} ${
            isThemeAnimating ? "is-theme-animating" : ""
          }`}
          aria-pressed={isSecure}
          aria-label={`Switch security mode. Current mode: ${
            isSecure ? "Protected" : "Exposed"
          }`}
        >
          <span className="lock-visual" aria-hidden="true">
            <span className="lock-shackle" />
            <span className="lock-body">
              <span className="lock-core" />
            </span>
            <span className="lock-pulse" />
          </span>

          <span className="lock-copy">
            <span className="lock-eyebrow">Security Mode</span>
            <span className="lock-status">{isSecure ? "Protected" : "Exposed"}</span>
          </span>
        </button>
      </div>

      <div ref={containerRef} className="owasp">
        {owaspItems.map((item) => (
          <OwaspSection
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Owasp;
