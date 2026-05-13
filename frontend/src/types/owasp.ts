export type OwaspItem = {
  id: string;
  title: string;
};

export type OwaspId =
  | "broken-access-control"
  | "security-misconfiguration"
  | "software-supply-chain-failures"
  | "cryptographic-failures"
  | "injection"
  | "insecure-design"
  | "authentication-failures"
  | "software-data-integrity-failures"
  | "security-logging-alerting-failures"
  | "exceptional-conditions";
