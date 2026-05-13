import "../style/owasp/layout.css";
import "../style/owasp/header.css";
import "../style/owasp/toggle.css";
import "../style/owasp/responsive.css";
import "../style/owasp/animations.css";
import "../style/owasp/OwaspRiskSections.css";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { Link } from "react-router-dom";

import OwaspSection from "../components/OwaspSection";
import OwaspNav from "../components/OwaspNav";

import useSectionScroll from "../hooks/useSectionScroll";

import type { OwaspItem } from "../types/owasp";

import BrokenAccessControlSection from "../components/owasp/BrokenAccessControlSection ";
import CryptographicFailuresSection from "../components/owasp/CryptographicFailuresSection ";
import InjectionSection from "../components/owasp/InjectionSection ";
import AuthenticationFailures from "../components/owasp/AuthenticationFailures";
import ExceptionalConditions from "../components/owasp/ExceptionalConditions";
import InsecureDesign from "../components/owasp/InsecureDesign";
import SecurityMisconfiguration from "../components/owasp/SecurityMisconfiguration";
import SecurityLoggingAlertingFailures from "../components/owasp/SecurityLoggingAlertingFailures";
import SoftwareDataIntegrityFailures from "../components/owasp/SoftwareDataIntegrityFailures";
import SoftwareSupplyChainFailures from "../components/owasp/SoftwareSupplyChainFailures";

const owaspItems: OwaspItem[] = [
  {
    id: "broken-access-control",
    title: "A01: Broken Access Control",
  },
  {
    id: "security-misconfiguration",
    title: "A02: Security Misconfiguration",
  },
  {
    id: "software-supply-chain-failures",
    title: "A03: Software Supply Chain Failures",
  },
  {
    id: "cryptographic-failures",
    title: "A04: Cryptographic Failures",
  },
  {
    id: "injection",
    title: "A05: Injection",
  },
  {
    id: "insecure-design",
    title: "A06: Insecure Design",
  },
  {
    id: "authentication-failures",
    title: "A07: Authentication Failures",
  },
  {
    id: "software-data-integrity-failures",
    title: "A08: Software or Data Integrity Failures",
  },
  {
    id: "security-logging-alerting-failures",
    title: "A09: Security Logging and Alerting Failures",
  },
  {
    id: "exceptional-conditions",
    title: "A10: Mishandling of Exceptional Conditions",
  },
];

type SectionProps = {
  isSecure: boolean;
};

const sectionComponents: Record<
  OwaspItem["id"],
  ComponentType<SectionProps>
> = {
  "broken-access-control": BrokenAccessControlSection,
  "security-misconfiguration": SecurityMisconfiguration,
  "software-supply-chain-failures": SoftwareSupplyChainFailures,
  "cryptographic-failures": CryptographicFailuresSection,
  injection: InjectionSection,
  "insecure-design": InsecureDesign,
  "authentication-failures": AuthenticationFailures,
  "software-data-integrity-failures": SoftwareDataIntegrityFailures,
  "security-logging-alerting-failures": SecurityLoggingAlertingFailures,
  "exceptional-conditions": ExceptionalConditions,
};

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
        "theme-animating",
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

      <Link to="/" className="owasp-home-link" aria-label="Back to home page">
        Home
      </Link>

      <OwaspNav items={owaspItems} activeId={activeId} />

      <div
        className="owasp-mode"
        role="group"
        aria-label="Security mode switch"
      >
        <button
          type="button"
          onClick={handleModeToggle}
          className={`owasp-lock-toggle ${
            isSecure ? "is-secure" : "is-exposed"
          } ${isThemeAnimating ? "is-theme-animating" : ""}`}
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

            <span className="lock-status">
              {isSecure ? "Protected" : "Exposed"}
            </span>
          </span>
        </button>
      </div>

      <div ref={containerRef} className="owasp">
        {owaspItems.map((item) => {
          const Component = sectionComponents[item.id];

          return (
            <OwaspSection key={item.id} id={item.id} title={item.title}>
              <Component isSecure={isSecure} />
            </OwaspSection>
          );
        })}
      </div>
    </div>
  );
}

export default Owasp;
