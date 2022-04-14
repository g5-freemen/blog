/* eslint-disable operator-linebreak */
export function errorHandler(e: unknown): string {
  if (
    e instanceof TypeError ||
    e instanceof RangeError ||
    e instanceof EvalError ||
    e instanceof Error
  ) {
    return e.message;
  }

  if (typeof e === 'string') return e;

  return JSON.stringify(e);
}
