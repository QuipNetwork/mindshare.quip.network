import quipLogo from '../icons/quipnetwork-full-A.svg';
import { DiscordIcon, TelegramIcon, XIcon } from './icons';
import { Page } from './Page';

export function PrimarySiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-150 bg-zinc-50">
      <Page className="flex items-center justify-between gap-4 py-5">
        <div className="flex min-w-0 items-center gap-3.5">
          <a href="https://quip.network" aria-label="Quip Network" className="ml-2">
            <img src={quipLogo} alt="Quip Network" className="block h-[22px] w-auto" />
          </a>
          <span
            aria-hidden="true"
            className="hidden h-[18px] w-px shrink-0 bg-zinc-200 sm:inline-block"
          />
          <span className="hidden items-center gap-2 whitespace-nowrap font-mono text-[13px] font-medium uppercase tracking-[0.4px] text-zinc-800 sm:inline-flex">
            <span className="inline-block h-[14px] w-1 bg-zinc-800" />
            Mindshare
          </span>
        </div>

        <div className="flex flex-nowrap items-center gap-2">
          <IconLink href="https://x.com/quipnetwork" label="X / Twitter">
            <XIcon className="h-[15px] w-[15px]" />
          </IconLink>
          <IconLink href="https://discord.com/invite/quipnetwork" label="Discord">
            <DiscordIcon className="h-[15px] w-[15px]" />
          </IconLink>
          <IconLink href="https://t.me/+Pbld47s3BO44YmUx" label="Telegram">
            <TelegramIcon className="h-[15px] w-[15px]" />
          </IconLink>
          <a
            href="https://quest.quip.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap bg-zinc-900 px-3.5 pt-2.5 pb-2 text-sm leading-tight text-zinc-50 transition-colors duration-150 hover:bg-zinc-750"
          >
            Earn XP
          </a>
        </div>
      </Page>
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center border border-zinc-200 text-zinc-800 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-100"
    >
      {children}
    </a>
  );
}
