import { useState } from "react";

interface BulletPointFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MIN_LENGTH = 3;
const MAX_LENGTH = 500;

function BulletPointForm({ onSubmit, isLoading }: BulletPointFormProps) {
  const [text, setText] = useState("");

  const trimmedLength = text.trim().length;
  const isValid = trimmedLength >= MIN_LENGTH && trimmedLength <= MAX_LENGTH;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isLoading) return;
    onSubmit(text.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <label
        htmlFor="bullet-point-input"
        className="block text-sm font-medium text-slate-300 mb-2"
      >
        Paste your resume bullet point
      </label>

      <textarea
        id="bullet-point-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Responsible for managing a team"
        rows={4}
        maxLength={MAX_LENGTH}
        disabled={isLoading}
        className="w-full rounded-lg bg-slate-800 border border-slate-600 text-white p-3
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed"
        aria-describedby="char-count"
      />

      <div
        id="char-count"
        className="flex justify-between items-center mt-1 text-xs text-slate-400"
      >
        <span>{trimmedLength < MIN_LENGTH ? `Minimum ${MIN_LENGTH} characters` : ""}</span>
        <span>{text.length} / {MAX_LENGTH}</span>
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="mt-4 w-full rounded-lg bg-blue-600 text-white font-semibold py-3
                   hover:bg-blue-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        {isLoading ? "Improving..." : "Improve Bullet Point"}
      </button>
    </form>
  );
}

export default BulletPointForm;