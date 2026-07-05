import { useState } from "react";
import axios from "axios";
import BulletPointForm from "./components/BulletPointForm";
import ResultCard from "./components/ResultCard";
import ErrorMessage from "./components/ErrorMessage";
import Disclaimer from "./components/Disclaimer";
import { improveBulletPoint } from "./api/bulletPointApi";
import type { BulletPointResponse } from "./types/bulletPoint";

function App() {
  const [result, setResult] = useState<BulletPointResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmittedText, setLastSubmittedText] = useState<string | null>(null);

  async function handleSubmit(text: string) {
    setIsLoading(true);
    setError(null);
    setLastSubmittedText(text);

    try {
      const response = await improveBulletPoint(text);
      setResult(response);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const detail = err.response.data?.detail;

        if (status === 429) {
          setError(detail ?? "Daily AI request limit reached. Please try again tomorrow.");
        } else if (status === 503) {
          setError(detail ?? "The AI service is temporarily overloaded. Please try again shortly.");
        } else {
          setError("Something went wrong while improving your bullet point. Please try again.");
        }
      } else {
        setError("Something went wrong while improving your bullet point. Please try again.");
      }
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRegenerate() {
    if (lastSubmittedText) {
      handleSubmit(lastSubmittedText);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center px-4 py-12">
      <h1 className="text-2xl font-semibold text-white mb-2">
        AI Resume Bullet Point Improver
      </h1>
      <p className="text-sm text-slate-400 mb-8 text-center max-w-md">
        Turn weak resume bullet points into strong, ATS-friendly achievement
        statements.
      </p>

      <BulletPointForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && <ErrorMessage message={error} />}

      {result && !error && (
        <>
          <ResultCard result={result} />
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isLoading}
            className="mt-3 text-sm text-slate-400 hover:text-slate-200
                       underline transition-colors disabled:opacity-50"
          >
            {isLoading ? "Regenerating..." : "Regenerate response"}
          </button>
        </>
      )}

      <Disclaimer />
    </div>
  );
}

export default App;
