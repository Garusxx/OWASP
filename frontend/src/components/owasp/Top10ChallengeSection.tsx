import { useState } from "react";

type ChallengeSectionData = {
  secureHeading: string;
  vulnerableHeading: string;
  summary: string;
  explanation: string;
  demoTitle: string;
  securePreview: unknown;
  vulnerablePreview: unknown;
  sideTitle: string;
  risk: string;
  secureNote: string;
  vulnerableNote: string;
  secureFix: string;
  link: string;
  challengeTitle: string;
  challengeDescription: string;
  challengePrompt: string;
  expectedAnswers: string[];
  success: unknown;
  failure: unknown;
  secureBlocked: unknown;
};

type Props = {
  isSecure: boolean;
  data: ChallengeSectionData;
};

function normalizeAnswer(answer: string) {
  return answer.trim().toLowerCase();
}

function Top10ChallengeSection({ isSecure, data }: Props) {
  const [showChallenge, setShowChallenge] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<unknown | null>(null);

  function handleChallenge() {
    if (isSecure) {
      setResult(data.secureBlocked);
      return;
    }

    const normalizedAnswer = normalizeAnswer(answer);
    const isCorrect = data.expectedAnswers.some(
      (expectedAnswer) => normalizeAnswer(expectedAnswer) === normalizedAnswer,
    );

    setResult(isCorrect ? data.success : data.failure);
  }

  if (showChallenge) {
    return (
      <div className="top10-challenge-full">
        <div className="top10-challenge-header">
          <h3>{data.challengeTitle}</h3>

          <button
            type="button"
            className="top10-back-button"
            onClick={() => {
              setShowChallenge(false);
              setAnswer("");
              setResult(null);
            }}
          >
            Back
          </button>
        </div>

        <p className="top10-challenge-description">
          {data.challengeDescription}
        </p>

        <div className="top10-challenge-grid">
          <div className="top10-challenge-card">
            <h4>Target</h4>

            <pre>
              <code>{JSON.stringify(data.vulnerablePreview, null, 2)}</code>
            </pre>

            <label>
              {data.challengePrompt}
              <input
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Enter answer"
              />
            </label>

            <button type="button" onClick={handleChallenge}>
              Run challenge
            </button>
          </div>

          <div className="top10-result-card">
            <h4>Result</h4>

            <pre>
              <code>
                {result
                  ? JSON.stringify(result, null, 2)
                  : "// run challenge"}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="top10-layout">
      <div className="top10-main">
        <h3>{isSecure ? data.secureHeading : data.vulnerableHeading}</h3>

        <p>{data.summary}</p>

        <p>{data.explanation}</p>

        <div className="top10-demo-card">
          <h4>{data.demoTitle}</h4>

          <pre>
            <code>
              {JSON.stringify(
                isSecure ? data.securePreview : data.vulnerablePreview,
                null,
                2,
              )}
            </code>
          </pre>
        </div>
      </div>

      <aside className="top10-side">
        <h4>{data.sideTitle}</h4>

        <p>{data.risk}</p>

        <div className="top10-side-note">
          {isSecure ? data.secureNote : data.vulnerableNote}
        </div>

        <h4>Secure fix</h4>

        <p>{data.secureFix}</p>

        <a href={data.link} target="_blank" rel="noopener noreferrer">
          Official OWASP definition
        </a>

        <div className="top10-attack-info">
          Open a short challenge and identify the unsafe value in the vulnerable
          response.
        </div>

        <button
          type="button"
          className="top10-start-button"
          onClick={() => setShowChallenge(true)}
        >
          Start challenge
        </button>
      </aside>
    </div>
  );
}

export default Top10ChallengeSection;
export type { ChallengeSectionData };
