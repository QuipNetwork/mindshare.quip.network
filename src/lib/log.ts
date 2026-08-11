export type LogSink = (line: string) => void;

export const consoleErrorSink: LogSink = (line) => console.error(line);

const MAX_VALUE_LENGTH = 1000;
const MAX_CAUSE_DEPTH = 3;
const LINE_BREAKS = /[\r\n]+\s*/g;
const SECRET_KEY =
  /^authorization$|^auth$|api[-_]?key|bearer|token|secret|password/i;
const SECRET_VALUES: [RegExp, string][] = [
  [/(bearer)(\s+)\S+/gi, '$1$2[redacted]'],
  [
    /(authorization|token|api[-_]?key|secret|password)(["'\s:=]+)\S+/gi,
    '$1$2[redacted]',
  ],
];
const DESCRIBED_SEPARATELY = ['name', 'message', 'stack', 'cause'];

function stringify(value: unknown): string {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    try {
      return String(value);
    } catch {
      return '[unstringifiable]';
    }
  }
}

function flatten(value: unknown): string {
  const text = SECRET_VALUES.reduce(
    (redacted, [pattern, replacement]) =>
      redacted.replace(pattern, replacement),
    stringify(value).replace(LINE_BREAKS, ' \\n ')
  );
  return text.length > MAX_VALUE_LENGTH
    ? `${text.slice(0, MAX_VALUE_LENGTH)}...[truncated ${text.length - MAX_VALUE_LENGTH} chars]`
    : text;
}

function describeField([key, value]: [string, unknown]): string {
  return `${key}=${SECRET_KEY.test(key) ? '[redacted]' : flatten(value)}`;
}

function describeFields(fields: Record<string, unknown>): string {
  return Object.entries(fields).map(describeField).join(' ');
}

function describeCause(cause: unknown, depth: number): string {
  if (cause === undefined) return '';
  if (depth >= MAX_CAUSE_DEPTH) return 'cause: [depth limit reached]';
  return `cause: ${describeError(cause, depth + 1)}`;
}

export function describeError(err: unknown, depth = 0): string {
  if (!(err instanceof Error)) return `unknown error: ${flatten(err)}`;

  const fields = Object.fromEntries(
    Object.entries({ ...err }).filter(
      ([key]) => !DESCRIBED_SEPARATELY.includes(key)
    )
  );

  const describedCause = describeCause(err.cause, depth);

  return [
    `${err.name}: ${err.message}`,
    err.stack ? `stack: ${flatten(err.stack)}` : '',
    describeFields(fields),
    describedCause,
  ]
    .filter(Boolean)
    .join(' | ');
}

export function logEvent(
  event: string,
  context: Record<string, unknown> = {},
  sink: LogSink = consoleErrorSink
): void {
  sink([event, describeFields(context)].filter(Boolean).join(' | '));
}

export function logFailure(
  event: string,
  err: unknown,
  context: Record<string, unknown> = {},
  sink: LogSink = consoleErrorSink
): void {
  sink(
    [event, describeFields(context), describeError(err)]
      .filter(Boolean)
      .join(' | ')
  );
}
