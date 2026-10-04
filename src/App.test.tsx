import { act, fireEvent, within } from '@testing-library/react';
import { StrictMode } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
import App from './App';
import { render } from './entry-server';
import type { LeaderboardEntryMerged } from './lib/types';
import { useLeaderboardStore } from './store/leaderboard';

let root: Root | undefined;

afterEach(async () => {
  await act(async () => root?.unmount());
  document.body.replaceChildren();
  useLeaderboardStore.setState(useLeaderboardStore.getInitialState(), true);
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

it('hydrates older HTML without replacing it and loads searchable rankings', async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-12-31T23:59:00Z'));
  const container = document.createElement('div');
  container.innerHTML = render();
  document.body.append(container);
  const heading = container.querySelector('h1');
  expect(heading?.textContent).toBe('Mindshare leaderboard');
  expect(container.textContent).toContain('Connect your X account');
  expect(container.textContent).not.toContain('No leaderboard data available.');

  const entry: LeaderboardEntryMerged = {
    x_username: 'testparticipant',
    x_user_id: '1',
    x_display_name: 'Test participant',
    x_avatar_url: null,
    x_link: 'https://x.com/testparticipant',
    mindshare_score: { weekly: 10, yearly: 100 },
    mindshare_percent: { weekly: 1, yearly: 2 },
  };
  vi.stubGlobal('fetch', async (url: string) => {
    if (url !== '/api/leaderboard')
      throw new Error(`Unexpected request: ${url}`);
    return new Response(JSON.stringify([entry]));
  });
  vi.setSystemTime(new Date('2027-01-02T00:00:00Z'));
  const hydrationErrors: unknown[] = [];
  await act(async () => {
    root = hydrateRoot(
      container,
      <StrictMode>
        <App />
      </StrictMode>,
      { onRecoverableError: (error) => hydrationErrors.push(error) }
    );
  });

  expect(hydrationErrors).toEqual([]);
  expect(container.querySelector('h1')).toBe(heading);
  const table = container.querySelector('table');
  expect(table?.textContent).toContain('Test participant');
  fireEvent.change(
    within(container).getByPlaceholderText('Search by username'),
    {
      target: { value: 'no-match' },
    }
  );
  expect(table?.textContent).not.toContain('Test participant');
});
