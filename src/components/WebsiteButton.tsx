export function WebsiteButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://quip.network"
      target="_blank"
      rel="noopener noreferrer"
      className={`items-center gap-2 rounded-full border border-(--brand-purple-medium)/50 px-1.5 py-1.5 text-sm font-medium text-white/80 transition hover:border-(--brand-cyan)/60 hover:text-(--brand-cyan) sm:px-4 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="hidden md:inline text-nowrap">Quip Website</span>
    </a>
  );
}
