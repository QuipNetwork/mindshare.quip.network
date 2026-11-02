import { describe, expect, it } from 'vitest';
import {
  campaignWindows,
  describeWindow,
  describeWindows,
  SECONDS_PER_DAY,
  trailingWindow,
} from './leaderboard-window';

describe('campaignWindows', () => {
  it('pins the weekly and yearly windows to end at the campaign end', () => {
    expect(campaignWindows(new Date(1793624400000))).toEqual({
      weekly: { startTs: 1793019600, endTs: 1793624400 },
      yearly: { startTs: 1762088400, endTs: 1793624400 },
    });
  });
});

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
        weekly: trailingWindow(7, new Date('2026-09-14T13:00:00.000Z')),
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
