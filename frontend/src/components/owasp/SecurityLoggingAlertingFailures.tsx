import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Security Monitoring Enabled",
  vulnerableHeading: "Logging and Alerting Failure",
  summary:
    "Security logging and alerting failures happen when important events are not recorded, monitored, or escalated.",
  explanation:
    "Without useful logs and alerts, attackers can keep trying until they succeed and defenders may notice too late.",
  demoTitle: "Detection pipeline preview",
  securePreview: {
    loginFailuresLogged: true,
    suspiciousIpAlert: true,
    alertThreshold: "5 failures in 10 minutes",
    incidentDestination: "security-oncall",
  },
  vulnerablePreview: {
    loginFailuresLogged: false,
    suspiciousIpAlert: false,
    alertThreshold: null,
    recentEvent: {
      ip: "203.0.113.10",
      failures: 128,
      alertCreated: false,
    },
  },
  sideTitle: "What is the risk?",
  risk:
    "Attacks such as credential stuffing, privilege abuse, and data exfiltration can remain invisible.",
  secureNote: "Suspicious activity creates alerts",
  vulnerableNote: "Attack activity is invisible",
  secureFix:
    "Log security events, protect logs from tampering, define alert thresholds, and route incidents to responders.",
  link: "https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/",
  challengeTitle: "Logging Challenge",
  challengeDescription:
    "Find the number of failed attempts that should have triggered an alert.",
  challengePrompt: "Failure count",
  expectedAnswers: ["128"],
  success: {
    message: "Challenge completed",
    issue: "128 failed logins produced no alert",
  },
  failure: {
    error: "Wrong value. Inspect the recent event failure count.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "Alerting triggers after repeated failures.",
  },
};

function SecurityLoggingAlertingFailures({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default SecurityLoggingAlertingFailures;
