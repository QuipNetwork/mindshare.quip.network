import { SearchIcon } from './icons';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-full sm:w-80">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-zinc-300 bg-transparent pt-2.5 pb-2 pl-6 text-sm text-zinc-950 outline-none transition-colors duration-200 placeholder:text-zinc-500 focus:border-zinc-950"
      />
    </div>
  );
}
