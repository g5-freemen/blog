import { MIN_PASSWORD_LENGTH } from './constants';

const emailRegEx = /^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z0-9-.]+$/i;
const imageRegEx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

export function required(val: string) {
  const valid = !!val.length;
  const errMsg = 'This field is required';
  return { valid, msg: valid ? '' : errMsg };
}

export function isValidEmail(email: string) {
  const valid = email.match(emailRegEx);
  const errMsg = 'Invalid Email';
  return { valid, msg: valid ? '' : errMsg };
}

export function isValidImage(url: string) {
  const valid = url.match(imageRegEx);
  const errMsg = 'Invalid URL';
  return { valid, msg: valid ? '' : errMsg };
}

export function isValidPassword(password: string) {
  const valid = password.length >= MIN_PASSWORD_LENGTH;
  const errMsg = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  return { valid, msg: valid ? '' : errMsg };
}

export function validate(...args: [string, string, string[]?]) {
  const [name, value, requiredFields = []] = args;
  let msg: string = '';
  if (
    name === 'username' ||
    (Array.isArray(requiredFields) && requiredFields.find((el: string) => el === name))
  ) {
    msg = required(value).msg;
  } else if (name === 'email') {
    msg = isValidEmail(value).msg;
  } else if (name === 'password') {
    msg = isValidPassword(value).msg;
  } else if (name === 'image' || name === 'img') {
    msg = isValidImage(value).msg;
  }

  return msg;
}

export const isAllFilled = (obj: Object) => {
  const arr = Object.values(obj);
  return arr.filter((el) => el).length === arr.length;
};

export const isAnyError = (arr: string[]) => !!arr.filter(Boolean).length;
