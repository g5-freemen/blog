import { errorMessage, MIN_PASSWORD_LENGTH } from './constants';

const emailRegEx = /^[\w+.-]+@[\da-z-]+.[\d.a-z-]+$/i;
const imageRegEx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg))/i;

export function required(val: string) {
  const valid = val.length > 0;
  return { valid, msg: valid ? '' : errorMessage.fieldRequired };
}

export function isValidEmail(email: string) {
  const valid = emailRegEx.test(email);
  return { valid, msg: valid ? '' : errorMessage.email };
}

export function isValidImage(url: string) {
  const valid = imageRegEx.test(url);
  return { valid, msg: valid ? '' : errorMessage.url };
}

export function isValidPassword(password: string) {
  const valid = password.length >= MIN_PASSWORD_LENGTH;
  return { valid, msg: valid ? '' : errorMessage.password };
}

export function validate(...args: [string, string, string[]?]) {
  const [name, value, requiredFields = []] = args;
  let msg: string = '';
  if (name === 'username' || (requiredFields.length > 0 && requiredFields.includes(name))) {
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
  if (arr.length === 0) return false;
  return arr.filter(Boolean).length === arr.length;
};

export const isAnyError = (arr: string[]) => arr.some(Boolean);
