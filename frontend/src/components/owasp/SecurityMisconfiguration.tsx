import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Secure Configuration",
  vulnerableHeading: "Security Misconfiguration",
  summary:
    "Security Misconfiguration happens when applications expose unsafe defaults, debug information, unnecessary services, or internal system details.",
  explanation:
    "Attackers often use misconfigured environments to gather sensitive information and turn a small issue into a larger compromise.",
  demoTitle: "Server response preview",
  securePreview: {
    environment: "production",
    debug: false,
    error: "Internal server error",
    exposedHeaders: ["content-security-policy", "x-content-type-options"],
  },
  vulnerablePreview: {
    environment: "development",
    debug: true,
    database: {
      host: "localhost",
      user: "root",
      password: "root123",
    },
    stackTrace: "Error: SQL syntax error near line 1...",
  },
  sideTitle: "What is the risk?",
  risk:
    "Exposed debug data, default credentials, and verbose errors can reveal how the application works internally.",
  secureNote: "Secure production setup",
  vulnerableNote: "Sensitive configuration exposed",
  secureFix:
    "Disable debug mode, remove default accounts, rotate secrets, hide stack traces, and expose only required services.",
  link: "https://owasp.org/Top10/2025/A02_2025-Security_Misconfiguration/",
  challengeTitle: "Misconfiguration Challenge",
  challengeDescription:
    "Find the leaked database password in the vulnerable server response.",
  challengePrompt: "Leaked database password",
  expectedAnswers: ["root123"],
  success: {
    message: "Challenge completed",
    leakedSecret: "root123",
  },
  failure: {
    error: "Wrong value. Inspect the database configuration again.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "Production responses do not expose database secrets.",
  },
};

function SecurityMisconfiguration({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default SecurityMisconfiguration;
