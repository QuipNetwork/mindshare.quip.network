export interface Respondable {
  response(): Response;
}

export class GenericRespondable extends Error implements Respondable {
  readonly #response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.#response = response;
  }

  response() {
    return this.#response;
  }
}

export const isRespondable = (x: unknown): x is Respondable =>
  !!x &&
  typeof x === 'object' &&
  'response' in x &&
  typeof x.response === 'function';

export class MethodNotAllowedError extends Error implements Respondable {
  constructor(allowed: string) {
    super(`Method not allowed, expected ${allowed}`);
    this.name = 'MethodNotAllowedError';
  }

  response() {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';

export function requireMethod(request: Request, method: HttpMethod): void {
  if (request.method !== method) {
    throw new MethodNotAllowedError(method);
  }
}
