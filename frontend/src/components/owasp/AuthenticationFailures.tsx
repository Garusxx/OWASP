import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Hardened Authentication",
  vulnerableHeading: "Authentication Failure",
  summary:
    "Authentication failures happen when login, sessions, passwords, or recovery flows do not reliably prove user identity.",
  explanation:
    "Weak credentials and missing brute-force controls make accounts easier to take over.",
  demoTitle: "Login policy preview",
  securePreview: {
    passwordPolicy: "strong passwords",
    mfa: true,
    bruteForceProtection: "rate limited",
    sessionCookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
  },
  vulnerablePreview: {
    passwordPolicy: "minimum 4 characters",
    mfa: false,
    bruteForceProtection: "none",
    testAccount: {
      username: "admin",
      password: "admin123",
    },
  },
  sideTitle: "What is the risk?",
  risk:
    "Attackers can guess, reuse, or brute-force credentials and then act as legitimate users.",
  secureNote: "MFA and rate limits enabled",
  vulnerableNote: "Weak admin credentials exposed",
  secureFix:
    "Use MFA, strong password storage, rate limiting, secure cookies, session rotation, and safe account recovery.",
  link: "https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/",
  challengeTitle: "Authentication Challenge",
  challengeDescription:
    "Find the weak admin password in the vulnerable login configuration.",
  challengePrompt: "Admin password",
  expectedAnswers: ["admin123"],
  success: {
    message: "Challenge completed",
    account: "admin",
    issue: "Weak reusable password",
  },
  failure: {
    error: "Wrong password. Inspect the test account credentials.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "MFA and rate limiting stop the simple takeover path.",
  },
};

function AuthenticationFailures({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default AuthenticationFailures;
