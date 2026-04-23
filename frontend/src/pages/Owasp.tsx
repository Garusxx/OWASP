import "../style/Owasp.css";
import OwaspSection from "../components/OwaspSection";
import useSectionScroll from "../hooks/useSectionScroll";
import OwaspNav from "../components/OwaspNav";
import type { OwaspItem } from "../types/owasp";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    document.body.classList.remove("theme-secure", "theme-vulnerable");
    document.body.classList.add(isSecure ? "theme-secure" : "theme-vulnerable");
  }, [isSecure]);

  return (
    <>
      <div className="owasp-header">
        <h1>OWASP // SECURITY ANALYSIS</h1>
      </div>

      <OwaspNav items={owaspItems} activeId={activeId} />

      <div className="owasp-mode">
        <button
          onClick={() => setIsSecure(true)}
          className={isSecure ? "active" : ""}
        >
          🔒 Secure
        </button>

        <button
          onClick={() => setIsSecure(false)}
          className={!isSecure ? "active" : ""}
        >
          🔓 Vulnerable
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
    </>
  );
}

export default Owasp;
