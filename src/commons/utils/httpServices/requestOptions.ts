import { headerContent } from '../constants';
import { MethodType, RequestType } from './types';

export function options(...args: [string | undefined, MethodType?, string?]) {
  const [token, method = 'GET', body] = args;

  const requestOptions: RequestType = {
    method,
    // mode: 'cors', // no-cors, *cors, same-origin
    // credentials: 'include', // include, *same-origin, omit
    // eslint-disable-next-line max-len
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    headers: {
      ...headerContent,
      Authorization: `Token ${token}`,
      // 'Cache-Control': 'no-cache, no-store, must-revalidate',
      // Pragma: 'no-cache',
      // Expires: '0',
    },
    body,
  };

  if (!token) delete requestOptions.headers.Authorization;

  return requestOptions;
}
