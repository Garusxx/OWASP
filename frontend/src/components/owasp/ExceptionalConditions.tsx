import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Handled Exceptions",
  vulnerableHeading: "Exceptional Condition Mishandled",
  summary:
    "Mishandling exceptional conditions happens when errors, timeouts, partial failures, or unusual states are handled unsafely.",
  explanation:
    "Attackers can trigger edge cases to bypass checks, reveal internals, or leave transactions in an unsafe state.",
  demoTitle: "Payment failure preview",
  securePreview: {
    paymentStatus: "failed",
    orderStatus: "not fulfilled",
    rollbackCompleted: true,
    userMessage: "Payment could not be completed",
  },
  vulnerablePreview: {
    paymentStatus: "timeout",
    orderStatus: "fulfilled",
    rollbackCompleted: false,
    stackTrace: "PaymentGatewayTimeout: card processor did not respond",
    unsafeState: "ship_without_capture",
  },
  sideTitle: "What is the risk?",
  risk:
    "Unhandled edge cases can leak implementation details or create inconsistent states that attackers can exploit.",
  secureNote: "Failures roll back safely",
  vulnerableNote: "Timeout creates unsafe state",
  secureFix:
    "Fail closed, handle timeouts explicitly, use transactions, avoid verbose errors, and test exceptional paths.",
  link: "https://owasp.org/Top10/2025/A10_2025-Mishandling_of_Exceptional_Conditions/",
  challengeTitle: "Exception Handling Challenge",
  challengeDescription:
    "Find the unsafe state created after the payment timeout.",
  challengePrompt: "Unsafe state",
  expectedAnswers: ["ship_without_capture"],
  success: {
    message: "Challenge completed",
    issue: "Order fulfillment continued after payment timeout",
  },
  failure: {
    error: "Wrong value. Inspect the unsafeState field.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "Failed payments roll back before fulfillment.",
  },
};

function ExceptionalConditions({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default ExceptionalConditions;
