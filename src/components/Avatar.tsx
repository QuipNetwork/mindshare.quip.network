import { useState } from 'react';

type Size = 'sm' | 'md';
type Tone = 'light' | 'dark';

interface AvatarProps {
  src: string | null;
  name: string;
  size?: Size;
  tone?: Tone;
}

const SIZE_CLASS: Record<Size, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-base',
};

const BG_CLASS: Record<Tone, string> = {
  light: 'bg-zinc-200',
  dark: 'bg-zinc-800',
};

const FG_CLASS: Record<Tone, string> = {
  light: 'text-zinc-950',
  dark: 'text-zinc-50',
};

export function Avatar({
  src,
  name,
  size = 'sm',
  tone = 'light',
}: AvatarProps) {
  const [unreachableSrc, setUnreachableSrc] = useState<string | null>(null);

  if (src && src !== unreachableSrc) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setUnreachableSrc(src)}
        className={`shrink-0 object-cover ${SIZE_CLASS[size]} ${BG_CLASS[tone]}`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center font-medium ${SIZE_CLASS[size]} ${BG_CLASS[tone]} ${FG_CLASS[tone]}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
