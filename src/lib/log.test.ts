import { describe, expect, it } from 'vitest';
import { describeError, logEvent, logFailure } from './log';
import { MindshareClient, MindshareRequestError } from './mindshare-api';

const RATE_LIMIT_BODY =
  '{"detail":"Rate limit exceeded. Only one new query per keyword is allowed every 15 minutes. Retry later."}';

const UPSTREAM_URL =
  'https://uat-mindshare.nucleus.codes/v1/metrics/x/quipnetwork/1/2';

function capture() {
  const lines: string[] = [];
  return { lines, sink: (line: string) => lines.push(line) };
}

function rateLimitError() {
  return new MindshareRequestError(UPSTREAM_URL, 429, RATE_LIMIT_BODY);
}

describe('logFailure', () => {
  it('reports the event, the context and every detail of the error', () => {
    const { lines, sink } = capture();

    logFailure(
      'mindshare.upstream_request_failed',
      rateLimitError(),
      { source: 'yearly' },
      sink
    );

    expect(lines).toHaveLength(1);
    expect(lines[0]).not.toMatch(/[\r\n]/);
    expect(lines[0]).toContain('mindshare.upstream_request_failed');
    expect(lines[0]).toContain('source=yearly');
    expect(lines[0]).toContain('MindshareRequestError: Mindshare API error');
    expect(lines[0]).toContain('status=429');
    expect(lines[0]).toContain('Rate limit exceeded');
    expect(lines[0]).toContain(UPSTREAM_URL);
    expect(lines[0]).toContain('stack:');
  });

  it('omits the separator when there is no context', () => {
    const { lines, sink } = capture();

    logFailure('leaderboard.unhandled_error', new Error('boom'), {}, sink);

    expect(lines[0]).toMatch(/^leaderboard\.unhandled_error \| Error: boom \|/);
    expect(lines[0]).not.toContain('|  |');
  });

  it('keeps the stack readable when the body is huge', () => {
    const { lines, sink } = capture();
    const huge = new MindshareRequestError(
      UPSTREAM_URL,
      500,
      'x'.repeat(50000)
    );

    logFailure('mindshare.upstream_request_failed', huge, {}, sink);

    expect(lines[0]).toContain('stack:');
    expect(lines[0].length).toBeLessThan(10000);
    expect(lines[0]).toContain('truncated');
  });
});

describe('describeError', () => {
  it('describes a non-error rejection', () => {
    expect(describeError('just a string')).toContain('just a string');
  });

  it('describes the cause chain', () => {
    const err = new Error('outer', { cause: new Error('inner') });

    expect(describeError(err)).toContain('cause: Error: inner');
  });

  it('survives a circular cause chain', () => {
    const outer = new Error('outer');
    const inner = new Error('inner', { cause: outer });
    outer.cause = inner;

    expect(() => describeError(outer)).not.toThrow();
  });

  it('survives circular and non-serializable fields', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    const err = Object.assign(new Error('boom'), {
      circular,
      huge: 10n,
    });

    expect(() => describeError(err)).not.toThrow();
    expect(describeError(err)).toContain('Error: boom');
  });

  it('survives a value that cannot be stringified at all', () => {
    const hostile = {
      toJSON: () => {
        throw new Error('no json');
      },
      toString: () => {
        throw new Error('no string');
      },
    };
    const err = Object.assign(new Error('boom'), { hostile });

    expect(() => describeError(err)).not.toThrow();
    expect(describeError(err)).toContain('[unstringifiable]');
  });

  it('redacts a bearer token appearing inside a value', () => {
    const err = Object.assign(new Error('boom'), {
      body: 'echo Authorization: Bearer super-secret-key',
    });

    const described = describeError(err);

    expect(described).not.toContain('super-secret-key');
    expect(described).toContain('[redacted]');
  });

  it('keeps ordinary fields that merely look secret-adjacent', () => {
    const err = Object.assign(new Error('boom'), { author: 'satoshi' });

    expect(describeError(err)).toContain('author=satoshi');
  });

  it('reports that a cause chain was cut short', () => {
    const deepest = new Error('level5');
    const chain = [4, 3, 2, 1, 0].reduce(
      (cause, level) => new Error(`level${level}`, { cause }),
      deepest as Error
    );

    expect(describeError(chain)).toContain('[depth limit reached]');
  });

  it('redacts secret-looking fields', () => {
    const err = Object.assign(new Error('boom'), {
      authorization: 'Bearer super-secret',
      apiKey: 'super-secret',
    });

    const described = describeError(err);

    expect(described).not.toContain('super-secret');
    expect(described).toContain('[redacted]');
  });
});

describe('upstream failures', () => {
  it('never logs the api key', async () => {
    const apiKey = 'super-secret-mindshare-key';
    const { lines, sink } = capture();
    const client = new MindshareClient(apiKey, async () =>
      Response.json({ detail: 'nope' }, { status: 401 })
    );

    const err = await client
      .fetchLeaderboard({ keyword: 'quipnetwork', startTs: 1, endTs: 2 })
      .catch((caught: unknown) => caught);
    logFailure('mindshare.upstream_request_failed', err, {}, sink);

    expect(lines[0]).toContain('status=401');
    expect(lines[0]).not.toContain(apiKey);
  });
});

describe('logEvent', () => {
  it('reports the event with its context', () => {
    const { lines, sink } = capture();

    logEvent('mindshare.refresh_not_cached', { source: 'weekly' }, sink);

    expect(lines[0]).toBe('mindshare.refresh_not_cached | source=weekly');
  });

  it('reports a bare event without a trailing separator', () => {
    const { lines, sink } = capture();

    logEvent('mindshare.refresh_not_cached', {}, sink);

    expect(lines[0]).toBe('mindshare.refresh_not_cached');
  });
});
