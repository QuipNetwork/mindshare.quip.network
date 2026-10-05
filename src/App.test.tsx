import { act, fireEvent, within } from '@testing-library/react';
import { StrictMode } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
import App from './App';
import { renderToString } from 'react-dom/server';
import type { LeaderboardEntryMerged } from './lib/types';

let root: Root | undefined;

afterEach(async () => {
  await act(async () => root?.unmount());
  document.body.replaceChildren();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

it('hydrates older HTML without replacing it and loads searchable rankings', async () => {
  vi.useFakeTimers({
    toFake: [
      'Date',
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
    ],
  });
  vi.setSystemTime(new Date('2026-12-31T23:59:00Z'));
  const container = document.createElement('div');
  container.innerHTML = renderToString(<App />);
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

it('renders rankings in HTML and hydrates them without refetching', async () => {
  const initial = {
    entries: [
      {
        x_username: 'serverparticipant',
        x_user_id: '2',
        x_display_name: 'Server participant',
        x_avatar_url: null,
        x_link: 'https://x.com/serverparticipant',
        mindshare_score: { weekly: 10, yearly: 100 },
        mindshare_percent: { weekly: 1, yearly: 2 },
      },
    ],
  };
  const container = document.createElement('div');
  container.innerHTML = renderToString(<App initial={initial} />);
  document.body.append(container);
  const table = container.querySelector('table');
  expect(table?.textContent).toContain('Server participant');
  // A subsequent server render must not inherit another request's entries.
  expect(renderToString(<App initial={{ entries: [] }} />)).not.toContain(
    'Server participant'
  );
  const fetch = vi.fn();
  vi.stubGlobal('fetch', fetch);
  const hydrationErrors: unknown[] = [];
  await act(async () => {
    root = hydrateRoot(container, <App initial={initial} />, {
      onRecoverableError: (error) => hydrationErrors.push(error),
    });
  });
  expect(hydrationErrors).toEqual([]);
  expect(container.querySelector('table')).toBe(table);
  expect(fetch).not.toHaveBeenCalled();
  fireEvent.change(
    within(container).getByPlaceholderText('Search by username'),
    {
      target: { value: 'no-match' },
    }
  );
  expect(table?.textContent).not.toContain('Server participant');
});

it('hydrates a failed server load and retries through the existing API', async () => {
  const initial = { error: 'Unable to load rankings. Please try again.' };
  const container = document.createElement('div');
  container.innerHTML = renderToString(<App initial={initial} />);
  document.body.append(container);
  const fetch = vi.fn(async () => new Response('[]'));
  vi.stubGlobal('fetch', fetch);
  await act(async () => {
    root = hydrateRoot(container, <App initial={initial} />);
  });
  expect(fetch).not.toHaveBeenCalled();
  await act(async () => {
    fireEvent.click(
      within(container).getByRole('button', { name: /try again/i })
    );
  });
  expect(fetch).toHaveBeenCalledWith('/api/leaderboard');
  expect(container.textContent).not.toContain(initial.error);
});
