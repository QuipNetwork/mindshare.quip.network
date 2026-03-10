export function Explanation() {
  return (
    <div className="gradient-diagonal mx-auto max-w-md rounded-xl border border-(--brand-purple-medium)/40 p-4 text-left text-sm">
      <h3 className="mb-3 font-semibold text-white">How It Works</h3>
      <ol className="list-decimal space-y-2 pl-4 text-(--color-scheme-1--text)">
        <li>
          Connect your X account on{' '}
          <a
            href="https://quest.quip.network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--brand-cyan) underline"
          >
            quest.quip.network
          </a>
        </li>
        <li>
          Post quality content tagging{' '}
          <a
            href="https://x.com/quipnetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--brand-cyan) underline"
          >
            @QuipNetwork
          </a>{' '}
          and engage with QUIP on X. Creating quality content and receiving
          quality engagement contributes the most to your score.
        </li>
        <li>
          Your mindshare score updates daily at{' '}
          <span className="text-white">12pm UTC</span>. Quip Point rewards are
          distributed every{' '}
          <span className="text-white">Monday at 1pm UTC</span>.
        </li>
      </ol>

      <hr className="my-3 border-(--brand-purple-medium)/30" />

      <p className="text-xs text-(--color-scheme-1--text)">
        $QUIP rewards are for Season 1. Season 1 ends when the token generation
        event takes place.
      </p>
    </div>
  );
}
