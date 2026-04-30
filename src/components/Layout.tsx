import type { ReactNode } from 'react';
import { PrimarySiteHeader } from './PrimarySiteHeader';
import { SiteFooter } from './SiteFooter';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrimarySiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
