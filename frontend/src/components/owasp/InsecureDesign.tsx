import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Secure Design",
  vulnerableHeading: "Insecure Design",
  summary:
    "Insecure Design is a missing or weak security control at the architecture and workflow level.",
  explanation:
    "Even perfectly written code can be unsafe if the product flow allows abuse by design.",
  demoTitle: "Password reset workflow",
  securePreview: {
    resetFlow: "token-based",
    tokenExpiryMinutes: 15,
    rateLimit: "5 attempts per account",
    verification: "email ownership required",
  },
  vulnerablePreview: {
    resetFlow: "security question only",
    question: "What is your city?",
    rateLimit: "none",
    accountLockout: false,
    predictableAnswer: "london",
  },
  sideTitle: "What is the risk?",
  risk:
    "Weak workflows can let attackers bypass intended protections without needing a classic code bug.",
  secureNote: "Workflow has layered controls",
  vulnerableNote: "Workflow can be guessed and abused",
  secureFix:
    "Model threats early, add abuse-case requirements, enforce rate limits, and design controls before implementation.",
  link: "https://owasp.org/Top10/2025/A06_2025-Insecure_Design/",
  challengeTitle: "Design Abuse Challenge",
  challengeDescription:
    "Find the predictable answer that makes the vulnerable password reset flow unsafe.",
  challengePrompt: "Predictable answer",
  expectedAnswers: ["london"],
  success: {
    message: "Challenge completed",
    issue: "Password reset can be bypassed with a guessable answer",
  },
  failure: {
    error: "Wrong value. Check the predictable answer in the reset workflow.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "The secure reset flow requires a short-lived token.",
  },
};

function InsecureDesign({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default InsecureDesign;
