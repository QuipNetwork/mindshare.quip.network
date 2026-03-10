import { Button } from './Button';
import { JoinDiscordButton } from './JoinDiscordButton';
import { JoinTelegramButton } from './JoinTelegramButton';
import { FollowXButton } from './FollowXButton';
import { WebsiteButton } from './WebsiteButton';
import quipLogo from '../icons/quip-logo.svg';

export function PrimarySiteHeader() {
  return (
    <header className="border-b border-(--brand-purple-medium)/30 pl-4 pr-2 sm:pr-4 py-4 sticky top-0 bg-(--color-scheme-1--background)/70 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.75)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
        <Quip />
        <Buttons />
      </div>
    </header>
  );
}

function Quip() {
  return (
    <div className="flex items-center gap-3">
      <img src={quipLogo} alt="Quip Network" className="h-6" />
      <span className="text-sm font-semibold tracking-wide text-white/80">
        QUIP NETWORK
      </span>
    </div>
  );
}

function Buttons() {
  return (
    <div className="flex items-center gap-2">
      <FollowXButton />
      <JoinDiscordButton />
      <JoinTelegramButton />
      <WebsiteButton className="hidden xs:inline-flex" />
      <Button
        href="https://quest.quip.network"
        target="_blank"
        rel="noopener noreferrer"
        className="text-nowrap"
      >
        Earn XP
      </Button>
    </div>
  );
}
