export function FollowCta() {
  return (
    <a
      href="https://x.com/quipnetwork"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pl-2.5 pr-4 no-underline transition-all duration-200 hover:border-cyan/30 hover:bg-cyan/5"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3.5 w-3.5 text-white"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </span>
      <span className="text-[13px] leading-tight text-white/60">
        For the latest updates &mdash;{' '}
        <span className="font-semibold text-white transition-colors duration-200 group-hover:text-cyan">
          Follow @QuipNetwork
        </span>
      </span>
    </a>
  );
}
