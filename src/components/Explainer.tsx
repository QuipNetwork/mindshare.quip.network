import { Em } from './Em';
import { EyebrowLabel } from './EyebrowLabel';
import { Page } from './Page';

export function Explainer() {
  return (
    <section>
      <Page>
        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] border-t border-zinc-200 py-[clamp(48px,5vw,72px)] min-[720px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <EyebrowLabel>How it works</EyebrowLabel>
            <h2 className="max-w-[14ch] font-display text-[clamp(28px,calc(1.8vw+20px),44px)] font-medium leading-[1.05] tracking-[-0.02em] text-zinc-950">
              Drive the <Em>conversation</Em>. Earn <Em>QUIP</Em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 border-t border-zinc-200 min-[720px]:grid-cols-3 min-[720px]:border-t-0 min-[720px]:border-l min-[720px]:divide-x min-[720px]:divide-zinc-200">
            <Step num="Step 01" title="Post on X">
              Mention{' '}
              <strong className="font-medium text-zinc-950">
                @quipnetwork
              </strong>{' '}
              with original, signal-dense content.
            </Step>
            <Step num="Step 02" title="Accrue mindshare">
              Our engine scores engagement, reach, and signal. Weekly point
              waves drop every Monday at 1pm UTC.
            </Step>
            <Step num="Step 03" title="Climb & earn">
              Top 315 share the $100,000 pool in $QUIP Token Rewards, paid at
              TGE.
            </Step>
          </div>
        </div>
      </Page>
    </section>
  );
}

function Step({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-4">
      <div className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.4px] text-zinc-500">
        <span>{num}</span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>
      <h3 className="mb-2 font-display text-xl font-medium leading-[1.15] tracking-[-0.015em] text-zinc-950">
        {title}
      </h3>
      <div className="text-sm leading-[1.45] text-zinc-600">{children}</div>
    </div>
  );
}
