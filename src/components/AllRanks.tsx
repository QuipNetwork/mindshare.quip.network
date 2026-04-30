import { Em } from './Em';
import { Explanation } from './Explanation';
import { FilterControls } from './FilterControls';
import { LeaderboardTable } from './LeaderboardTable';
import { Page } from './Page';
import { SeasonRewardsCard, WeeklyRewardsCard } from './RewardsTable';
import { SectionTitle } from './SectionTitle';

export function AllRanks() {
  return (
    <section className="pb-[clamp(48px,5vw,72px)]">
      <Page>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>
            All <Em>ranks</Em>
          </SectionTitle>
        </div>
        <div className="grid grid-cols-1 items-start gap-8 min-[960px]:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <FilterControls />
            <LeaderboardTable />
          </div>
          <aside className="flex flex-col gap-5 min-[960px]:sticky min-[960px]:top-[84px]">
            <Explanation />
            <SeasonRewardsCard />
            <WeeklyRewardsCard />
          </aside>
        </div>
      </Page>
    </section>
  );
}
