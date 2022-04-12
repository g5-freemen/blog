/* eslint-disable operator-linebreak */
export function errorHandler(e: unknown) {
  if (
    e instanceof TypeError ||
    e instanceof RangeError ||
    e instanceof EvalError
  ) {
    return e.message;
  }

  if (typeof e === 'string') return e;

  return JSON.stringify(e);
}
