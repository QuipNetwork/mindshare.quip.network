import { renderToString } from 'react-dom/server';
import { afterEach, expect, it, vi } from 'vitest';
import { SiteFooter } from './SiteFooter';

afterEach(() => vi.useRealTimers());

it('keeps the initial footer HTML stable across a year boundary', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-12-31T23:59:00Z'));
  const builtHtml = renderToString(<SiteFooter />);

  vi.setSystemTime(new Date('2027-01-02T00:00:00Z'));
  expect(renderToString(<SiteFooter />)).toBe(builtHtml);
});
