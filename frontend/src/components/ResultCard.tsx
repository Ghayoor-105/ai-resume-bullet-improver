import type { BulletPointResponse } from "../types/bulletPoint";
import SuggestedVerbs from "./SuggestedVerbs";
import CopyButton from "./CopyButton";

interface ResultCardProps {
  result: BulletPointResponse;
}

function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="w-full max-w-2xl mt-6 rounded-lg bg-slate-800 border border-slate-600 p-5">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-1">
            Improved bullet point
          </h2>
          <p className="text-lg text-white font-medium leading-snug">
            {result.improved_text}
          </p>
        </div>
        <CopyButton textToCopy={result.improved_text} />
      </div>

      <p className="text-sm text-slate-300 mt-4 leading-relaxed">
        {result.explanation}
      </p>

      <div className="mt-5">
        <SuggestedVerbs verbs={result.suggested_verbs} />
      </div>
    </div>
  );
}

export default ResultCard;