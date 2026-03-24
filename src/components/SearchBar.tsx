interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-60 rounded-[10px] border border-white/6 bg-white/3 py-[9px] pl-10 pr-4 font-inherit text-[13px] text-white outline-none transition-all duration-200 placeholder:text-text-muted focus:border-[rgba(0,212,255,0.3)] focus:bg-white/5 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.06)] max-sm:w-full"
      />
    </div>
  );
}
