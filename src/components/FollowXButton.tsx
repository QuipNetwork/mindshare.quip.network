export function FollowXButton() {
  return (
    <a
      href="https://x.com/quipnetwork"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-1.5 py-1.5 text-sm font-medium text-white/80 transition hover:border-white/60 hover:text-white sm:px-4"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      <span className="hidden md:inline">Follow</span>
    </a>
  );
}
