import { Avatar } from './Avatar';

type Size = 'sm' | 'md';
type Tone = 'light' | 'dark';

interface UserIdentityProps {
  src: string | null;
  name: string;
  handle: string;
  href?: string;
  size?: Size;
  tone?: Tone;
}

const GAP_CLASS: Record<Size, string> = {
  sm: 'gap-2.5',
  md: 'gap-3',
};

const NAME_FG: Record<Tone, string> = {
  light: 'text-zinc-950',
  dark: 'text-zinc-50',
};

const HANDLE_FG: Record<Tone, string> = {
  light: 'text-zinc-500',
  dark: 'text-zinc-400',
};

export function UserIdentity({
  src,
  name,
  handle,
  href,
  size = 'sm',
  tone = 'light',
}: UserIdentityProps) {
  const wrapperClass = `flex min-w-0 items-center ${GAP_CLASS[size]}`;
  const body = (
    <>
      <Avatar src={src} name={name} size={size} tone={tone} />
      <div className="min-w-0 flex-1">
        <div
          className={`truncate text-[15px] font-medium leading-tight ${NAME_FG[tone]}`}
        >
          {name}
        </div>
        <div
          className={`mt-0.5 truncate font-mono text-xs ${HANDLE_FG[tone]}`}
        >
          @{handle}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
      >
        {body}
      </a>
    );
  }

  return <div className={wrapperClass}>{body}</div>;
}
