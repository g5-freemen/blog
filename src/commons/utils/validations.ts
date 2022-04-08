import { MIN_PASSWORD_LENGTH } from './constants';

export function required(val: string) {
  const valid = !!val.length;
  const errMsg = 'This field is required';
  return { valid, msg: valid ? '' : errMsg };
}

const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export function isValidEmail(email: string) {
  const valid = email.match(emailRegEx);
  const errMsg = 'Invalid Email';
  return { valid, msg: valid ? '' : errMsg };
}

export function isValidPassword(password: string) {
  const valid = password.length >= MIN_PASSWORD_LENGTH;
  const errMsg = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  return { valid, msg: valid ? '' : errMsg };
}

export function validate(name: string, value: string) {
  let msg: string = '';
  if (name === 'username') {
    msg = required(value).msg;
  } else if (name === 'email') {
    msg = isValidEmail(value).msg;
  } else if (name === 'password') {
    msg = isValidPassword(value).msg;
  }

  return msg;
}

export const isAllFilled = (obj: Object) => {
  const arr = Object.values(obj);
  return arr.filter((el) => el).length === arr.length;
};

export const isAnyError = (arr: string[]) => !!arr.filter(Boolean).length;
