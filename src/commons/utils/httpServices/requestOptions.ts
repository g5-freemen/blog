import { headerContent } from '../constants';
import { MethodType, RequestType } from './types';

export function options(...args: [string | undefined, MethodType?, string?]) {
  const [token, method = 'GET', body] = args;
  if (!token) return {};

  const requestOptions: RequestType = {
    method,
    headers: { ...headerContent, Authorization: `Token ${token}` },
    body,
  };

  return requestOptions;
}
