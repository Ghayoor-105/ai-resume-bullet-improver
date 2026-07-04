import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
}

function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in some browsers/contexts (e.g. insecure
      // origins, permissions denied). We fail silently here rather than
      // showing an intrusive error for a low-stakes convenience feature.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy improved bullet point to clipboard"
      className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-md
                 bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default CopyButton;