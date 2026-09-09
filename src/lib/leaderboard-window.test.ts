import { describe, expect, it } from 'vitest';
import {
  describeWindow,
  describeWindows,
  SECONDS_PER_DAY,
  trailingWindow,
  weeklyWindow,
} from './leaderboard-window';

const MONDAY_WAVE_HOUR_UTC = 13;

describe('trailingWindow', () => {
  it('ends now and starts the requested number of days earlier', () => {
    const now = new Date('2026-09-09T16:15:56.000Z');

    expect(trailingWindow(365, now)).toEqual({
      startTs: 1757434556,
      endTs: 1788970556,
    });
  });

  it('spans exactly the requested number of days', () => {
    const { startTs, endTs } = trailingWindow(30, new Date());

    expect(endTs - startTs).toBe(30 * SECONDS_PER_DAY);
  });
});

describe('weeklyWindow', () => {
  const isoBoundsAt = (instant: string) => {
    const { startTs, endTs } = weeklyWindow(new Date(instant));
    return [
      new Date(startTs * 1000).toISOString(),
      new Date(endTs * 1000).toISOString(),
    ];
  };

  it.each([
    [
      '2026-09-06T23:59:59.000Z',
      '2026-08-31T13:00:00.000Z',
      '2026-09-07T13:00:00.000Z',
    ],
    [
      '2026-09-07T12:59:59.000Z',
      '2026-08-31T13:00:00.000Z',
      '2026-09-07T13:00:00.000Z',
    ],
    [
      '2026-09-07T13:00:00.000Z',
      '2026-09-07T13:00:00.000Z',
      '2026-09-14T13:00:00.000Z',
    ],
    [
      '2026-09-07T13:00:01.000Z',
      '2026-09-07T13:00:00.000Z',
      '2026-09-14T13:00:00.000Z',
    ],
    [
      '2026-09-09T16:15:56.000Z',
      '2026-09-07T13:00:00.000Z',
      '2026-09-14T13:00:00.000Z',
    ],
  ])('at %s spans %s to %s', (instant, expectedStart, expectedEnd) => {
    expect(isoBoundsAt(instant)).toEqual([expectedStart, expectedEnd]);
  });

  it('always spans a full week surrounding now', () => {
    const now = new Date();
    const nowTs = Math.floor(now.getTime() / 1000);
    const { startTs, endTs } = weeklyWindow(now);

    expect(endTs - startTs).toBe(7 * SECONDS_PER_DAY);
    expect(startTs).toBeLessThanOrEqual(nowTs);
    expect(endTs).toBeGreaterThan(nowTs);
  });

  it('aligns both bounds to Monday 1PM UTC', () => {
    const { startTs, endTs } = weeklyWindow();

    for (const boundary of [new Date(startTs * 1000), new Date(endTs * 1000)]) {
      expect(boundary.getUTCDay()).toBe(1);
      expect(boundary.getUTCHours()).toBe(MONDAY_WAVE_HOUR_UTC);
      expect(boundary.getUTCMinutes()).toBe(0);
    }
  });
});

describe('describeWindow', () => {
  it('reports both bounds as epoch seconds and ISO instants', () => {
    expect(
      describeWindow('yearly', { startTs: 1757434556, endTs: 1788970556 })
    ).toBe(
      'source=yearly startTs=1757434556 endTs=1788970556 startIso=2025-09-09T16:15:56.000Z endIso=2026-09-09T16:15:56.000Z spanDays=365'
    );
  });

  it('reports a fractional span when the bounds are not day aligned', () => {
    expect(describeWindow('weekly', { startTs: 0, endTs: 1 })).toContain(
      `spanDays=${1 / SECONDS_PER_DAY}`
    );
  });
});

describe('describeWindows', () => {
  it('reports every window on its own line under a keyword header', () => {
    const report = describeWindows(
      'quipnetwork',
      {
        weekly: weeklyWindow(new Date('2026-09-09T16:15:56.000Z')),
        yearly: trailingWindow(365, new Date('2026-09-09T16:15:56.000Z')),
      },
      new Date('2026-09-09T16:15:57.000Z')
    );

    expect(report).toBe(
      [
        'keyword=quipnetwork generatedAtIso=2026-09-09T16:15:57.000Z',
        'source=weekly startTs=1788786000 endTs=1789390800 startIso=2026-09-07T13:00:00.000Z endIso=2026-09-14T13:00:00.000Z spanDays=7',
        'source=yearly startTs=1757434556 endTs=1788970556 startIso=2025-09-09T16:15:56.000Z endIso=2026-09-09T16:15:56.000Z spanDays=365',
        '',
      ].join('\n')
    );
  });
});
