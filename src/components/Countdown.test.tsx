import { act, cleanup, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Countdown } from './Countdown';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Countdown', () => {
  it('keeps the initial HTML stable between build and hydration', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-04T12:00:00Z'));
    const builtHtml = renderToString(<Countdown />);

    vi.setSystemTime(new Date('2026-10-06T15:30:00Z'));
    expect(renderToString(<Countdown />)).toBe(builtHtml);
    expect(builtHtml).toContain('Monday at 1pm UTC');
  });

  it('starts the live countdown after mounting and advances each second', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-05T12:59:58Z'));
    const { container } = render(<Countdown />);

    expect(container.textContent).toContain('00d:00h:00m:02s');
    act(() => vi.advanceTimersByTime(1000));
    expect(container.textContent).toContain('00d:00h:00m:01s');
    act(() => vi.advanceTimersByTime(1000));
    expect(container.textContent).toContain('07d:00h:00m:00s');
  });
});
