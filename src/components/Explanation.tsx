import { Em } from '@/components/Em';
import { SidebarCard } from '@/components/SidebarCard';
import { SidebarHeading } from '@/components/SidebarHeading';

export function Explanation() {
  return (
    <SidebarCard tint="yellow">
      <SidebarHeading>
        How it <Em>works</Em>
      </SidebarHeading>
      <ol className="mt-3.5 flex list-none flex-col gap-3 p-0">
        <Step num="01">
          Connect your X account on{' '}
          <a
            href="https://quest.quip.network"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-zinc-300 text-zinc-950 hover:border-zinc-950"
          >
            quest.quip.network
          </a>
        </Step>
        <Step num="02">
          Post quality content tagging{' '}
          <strong className="font-medium text-zinc-950">@QuipNetwork</strong>{' '}
          and engage with Quip on X. Creating quality content and receiving
          quality engagement contributes the most to your score.
        </Step>
        <Step num="03">
          Your mindshare score updates daily at{' '}
          <strong className="font-medium text-zinc-950">12pm UTC</strong>. Quip
          Point rewards are distributed every{' '}
          <strong className="font-medium text-zinc-950">
            Monday at 1pm UTC
          </strong>
          .
        </Step>
      </ol>
      <div className="mt-4 border-t border-zinc-150 pt-3.5 text-xs leading-[1.45] text-zinc-500">
        $QUIP rewards are for Season 1. Season 1 ends when the token generation
        event takes place.
      </div>
    </SidebarCard>
  );
}

function Step({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[13px] leading-[1.5] text-zinc-700">
      <span className="min-w-5 shrink-0 font-mono text-[11px] uppercase leading-[1.45] tracking-[0.4px] text-zinc-500">
        {num}
      </span>
      <div>{children}</div>
    </li>
  );
}
