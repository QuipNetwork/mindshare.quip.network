import { Countdown } from './Countdown';
import { Em } from './Em';
import { EyebrowLabel } from './EyebrowLabel';
import { Page } from './Page';

export function Hero() {
  return (
    <section className="pt-[clamp(48px,7vw,88px)] pb-[clamp(32px,4vw,56px)]">
      <Page>
        <div className="grid grid-cols-1 items-end gap-10 min-[880px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] min-[880px]:gap-[clamp(32px,6vw,80px)]">
          <div>
            <EyebrowLabel>Post. Rank. Earn $QUIP.</EyebrowLabel>
            <h1 className="max-w-[14ch] font-display text-[clamp(40px,calc(4.5vw+15.1px),80px)] font-medium leading-[1.02] tracking-[-0.025em] text-zinc-950">
              Mindshare <Em>leaderboard</Em>
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-[1.5] text-zinc-600">
              Who&apos;s driving the conversation about{' '}
              <a
                href="https://x.com/quipnetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-zinc-300 pb-px text-zinc-950 hover:border-zinc-950"
              >
                @quipnetwork
              </a>
              . Finish in the top 315 to earn $QUIP points, paid at TGE.
            </p>
          </div>
          <Countdown />
        </div>
      </Page>
    </section>
  );
}
