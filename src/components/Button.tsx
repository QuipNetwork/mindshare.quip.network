import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline';

const variantClasses: Record<Variant, string> = {
  primary:
    'rounded-full bg-(--brand-cyan)/15 border border-(--brand-cyan)/40 px-4 py-1.5 text-sm font-medium text-(--brand-cyan) transition hover:bg-(--brand-cyan)/25',
  outline:
    'rounded-full border border-(--brand-purple-medium)/50 px-4 py-1.5 text-sm font-medium text-white/80 transition hover:border-(--brand-cyan)/60 hover:text-(--brand-cyan)',
};

type AnchorProps = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = { href?: never } & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = { variant?: Variant } & (AnchorProps | ButtonProps);

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const classes = ['text-center', variantClasses[variant], className].join(' ');

  if ('href' in props && props.href) {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
