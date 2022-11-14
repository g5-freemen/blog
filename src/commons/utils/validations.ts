import { errorMessage, MIN_PASSWORD_LENGTH } from './constants';

const emailRegEx = /^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z0-9-.]+$/i;
const imageRegEx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;

export function required(val: string) {
  const valid = !!val.length;
  return { valid, msg: valid ? '' : errorMessage.fieldRequired };
}

export function isValidEmail(email: string) {
  const valid = !!email.match(emailRegEx);
  return { valid, msg: valid ? '' : errorMessage.email };
}

export function isValidImage(url: string) {
  const valid = !!url.match(imageRegEx);
  return { valid, msg: valid ? '' : errorMessage.url };
}

export function isValidPassword(password: string) {
  const valid = password.length >= MIN_PASSWORD_LENGTH;
  return { valid, msg: valid ? '' : errorMessage.password };
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
