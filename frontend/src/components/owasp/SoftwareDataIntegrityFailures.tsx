import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Verified Integrity",
  vulnerableHeading: "Integrity Failure",
  summary:
    "Software or data integrity failures happen when applications trust updates, plugins, serialized data, or CI/CD artifacts without verification.",
  explanation:
    "If the application accepts modified data as trusted, attackers can alter behavior or privileges.",
  demoTitle: "Update manifest preview",
  securePreview: {
    updateChannel: "signed",
    signatureVerified: true,
    artifactHash: "sha256:verified",
    roleChange: "server-side only",
  },
  vulnerablePreview: {
    updateChannel: "unsigned",
    signatureVerified: false,
    artifactHash: "not checked",
    clientPayload: {
      user: "bob",
      role: "admin",
      trusted: true,
    },
  },
  sideTitle: "What is the risk?",
  risk:
    "Unsigned updates or trusted client data can let attackers inject malicious code or tamper with authorization decisions.",
  secureNote: "Artifacts and state are verified",
  vulnerableNote: "Client data is trusted",
  secureFix:
    "Verify signatures and hashes, protect CI/CD, avoid unsafe deserialization, and validate authorization server-side.",
  link: "https://owasp.org/Top10/2025/A08_2025-Software_or_Data_Integrity_Failures/",
  challengeTitle: "Integrity Challenge",
  challengeDescription:
    "Find the tampered role value in the vulnerable client payload.",
  challengePrompt: "Tampered role",
  expectedAnswers: ["admin"],
  success: {
    message: "Challenge completed",
    issue: "Client-controlled role was trusted",
  },
  failure: {
    error: "Wrong value. Inspect the client payload role.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "Role changes are verified server-side.",
  },
};

function SoftwareDataIntegrityFailures({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default SoftwareDataIntegrityFailures;
