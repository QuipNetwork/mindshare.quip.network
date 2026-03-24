import { SidebarCard } from '@/components/SidebarCard';

export function Explanation() {
  return (
    <SidebarCard>
      <h3 className="mb-4 text-[15px] font-bold text-white">How It Works</h3>
      <ol className="list-none space-y-2 pl-[18px] text-[13px] leading-[1.7] text-text [counter-reset:steps]">
        <li className="[counter-increment:steps] before:ml-[-20px] before:inline-block before:w-5 before:text-xs before:font-semibold before:text-text-muted before:content-[counter(steps)'.']">
          Connect your X account on{' '}
          <a
            href="https://quest.quip.network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan no-underline hover:underline"
          >
            quest.quip.network
          </a>
        </li>
        <li className="[counter-increment:steps] before:ml-[-20px] before:inline-block before:w-5 before:text-xs before:font-semibold before:text-text-muted before:content-[counter(steps)'.']">
          Post quality content tagging{' '}
          <a
            href="https://x.com/quipnetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan no-underline hover:underline"
          >
            @QuipNetwork
          </a>{' '}
          and engage with QUIP on X. Creating quality content and receiving
          quality engagement contributes the most to your score.
        </li>
        <li className="[counter-increment:steps] before:ml-[-20px] before:inline-block before:w-5 before:text-xs before:font-semibold before:text-text-muted before:content-[counter(steps)'.']">
          Your mindshare score updates daily at{' '}
          <span className="font-semibold text-white">12pm UTC</span>. Quip
          Point rewards are distributed every{' '}
          <span className="font-semibold text-white">Monday at 1pm UTC</span>.
        </li>
      </ol>

      <div className="mt-4 border-t border-white/6 pt-4 text-xs leading-relaxed text-text-muted">
        $QUIP rewards are for Season 1. Season 1 ends when the token generation
        event takes place.
      </div>
    </SidebarCard>
  );
}
