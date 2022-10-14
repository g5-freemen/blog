import { headerContent } from '../constants';
import { MethodType, RequestType } from './types';

export function options(...args: [string | undefined, MethodType?, string?]) {
  const [token, method = 'GET', body] = args;

  const requestOptions: RequestType = {
    method,
    headers: { ...headerContent, Authorization: `Token ${token}` },
    body,
  };

  if (!token) delete requestOptions.headers.Authorization;

  return requestOptions;
}
