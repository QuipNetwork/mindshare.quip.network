import { describe, expect, it } from 'vitest';
import { selectSourceToRefresh } from './refresh-schedule';

const NOW = 1_800_000_000_000;
const TTL_MS = 60 * 60 * 1000;
const COOLDOWN_MS = 20 * 60 * 1000;

function select(
  candidates: { key: 'a' | 'b'; timestamp?: number }[],
  lastAttemptTs?: number
) {
  return selectSourceToRefresh({
    candidates,
    lastAttemptTs,
    now: NOW,
    ttlMs: TTL_MS,
    cooldownMs: COOLDOWN_MS,
  });
}

describe('selectSourceToRefresh', () => {
  it('selects nothing while every candidate is fresh', () => {
    expect(
      select([
        { key: 'a', timestamp: NOW - TTL_MS + 1 },
        { key: 'b', timestamp: NOW - TTL_MS + 1 },
      ])
    ).toBeUndefined();
  });

  it('treats a candidate as stale exactly at the ttl boundary', () => {
    expect(select([{ key: 'a', timestamp: NOW - TTL_MS }])).toBe('a');
  });

  it('selects the oldest stale candidate', () => {
    expect(
      select([
        { key: 'a', timestamp: NOW - TTL_MS - 1 },
        { key: 'b', timestamp: NOW - TTL_MS - 2 },
      ])
    ).toBe('b');
  });

  it('prefers a never-cached candidate over a stale one', () => {
    expect(
      select([{ key: 'a', timestamp: NOW - 10 * TTL_MS }, { key: 'b' }])
    ).toBe('b');
  });

  it('keeps the first candidate when timestamps tie', () => {
    expect(select([{ key: 'a' }, { key: 'b' }])).toBe('a');
  });

  it('selects nothing during the cooldown', () => {
    expect(select([{ key: 'a' }], NOW - COOLDOWN_MS + 1)).toBeUndefined();
  });

  it('selects again once the cooldown has elapsed', () => {
    expect(select([{ key: 'a' }], NOW - COOLDOWN_MS)).toBe('a');
  });
});
