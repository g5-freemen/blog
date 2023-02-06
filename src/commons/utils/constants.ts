export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  // eslint-disable-next-line no-unused-vars
  encode?: (value: string) => string;
}

export const limits = [1, 5, 10, 20, 50, 100];

export const apiUrl = 'https://api.realworld.io';
// export const apiUrl = 'https://conduit.productionready.io';
export const DEFAULT_ARTICLES_LIMIT = 20;
export const DEFAULT_PERSONAL_ARTICLES_LIMIT = 5;
export const MIN_PASSWORD_LENGTH = 6;
export const TOAST_TIMEOUT = 2500;

export const headerContent = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const options = {
  staleTime: 240_000,
  cacheTime: 480_000,
};

export const cookiesOptions: CookieSetOptions = {
  secure: true,
  sameSite: 'strict',
};

export const errorMessage = {
  email: 'Invalid Email',
  url: 'Invalid URL',
  fieldRequired: 'This field is required',
  password: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
};
