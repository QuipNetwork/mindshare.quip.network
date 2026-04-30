import { Page } from './Page';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 py-6 pb-8">
      <Page className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.4px] text-zinc-500">
        <div>&copy; {new Date().getFullYear()} Quip Network</div>
        <div className="flex flex-wrap gap-5">
          <a href="https://quip.network" className="hover:text-zinc-950">
            quip.network
          </a>
          <a href="https://quest.quip.network" className="hover:text-zinc-950">
            Quest
          </a>
          <a href="https://x.com/quipnetwork" className="hover:text-zinc-950">
            X
          </a>
          <a
            href="https://discord.com/invite/quipnetwork"
            className="hover:text-zinc-950"
          >
            Discord
          </a>
        </div>
      </Page>
    </footer>
  );
}
