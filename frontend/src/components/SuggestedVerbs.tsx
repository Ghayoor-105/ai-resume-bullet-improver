interface SuggestedVerbsProps {
  verbs: string[];
}

function SuggestedVerbs({ verbs }: SuggestedVerbsProps) {
  if (verbs.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-300 mb-2">
        Other strong verbs to consider
      </h3>
      <ul className="flex flex-wrap gap-2">
        {verbs.map((verb) => (
          <li
            key={verb}
            className="px-3 py-1 rounded-full bg-slate-700 text-slate-200 text-sm"
          >
            {verb}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestedVerbs;