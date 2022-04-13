import { headerContent } from '../constants';
import { MethodType, RequestType } from './types';

export function options(...args: [string | undefined, MethodType?, string?]) {
  const [token, method = 'GET', body] = args;
  let requestOptions: RequestType = {
    method,
    headers: headerContent,
    body,
  };

  if (token) {
    requestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        Authorization: `Token ${token}`,
      },
    };
  }

  return requestOptions;
}
