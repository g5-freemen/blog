import { errorMessage } from './constants';
import {
  isAllFilled,
  isAnyError,
  isValidEmail,
  isValidImage,
  isValidPassword,
  required,
  validate,
} from './validations';

describe('validations', () => {
  const imgSrc =
    'https://e7.pngegg.com/pngimages/219/1015/png-clipart-fallout-4-fallout-3-the-vault-video-game-others-hand-video-game-thumbnail.png';

  test('required function', () => {
    expect(required('This field is required')).toEqual({ valid: true, msg: '' });
    expect(required('')).toEqual({ valid: false, msg: errorMessage.fieldRequired });
  });

  test('isValidEmail function', () => {
    expect(isValidEmail('test.test123@test.com')).toEqual({ valid: true, msg: '' });
    expect(isValidEmail('test1.test2_test3@test.com')).toEqual({ valid: true, msg: '' });
    expect(isValidEmail('test@test.com')).toEqual({ valid: true, msg: '' });
    expect(isValidEmail('test.com')).toEqual({ valid: false, msg: errorMessage.email });
    expect(isValidEmail('111')).toEqual({ valid: false, msg: errorMessage.email });
  });

  test('isValidImage function', () => {
    expect(isValidImage(imgSrc)).toEqual({ valid: true, msg: '' });
    expect(isValidImage('')).toEqual({ valid: false, msg: errorMessage.url });
  });

  test('isValidPassword function', () => {
    expect(isValidPassword('Test123#')).toEqual({ valid: true, msg: '' });
    expect(isValidPassword('Test1')).toEqual({ valid: false, msg: errorMessage.password });
    expect(isValidPassword('')).toEqual({ valid: false, msg: errorMessage.password });
  });

  test('validate function', () => {
    expect(validate('required', '', ['required1', 'required'])).toEqual(errorMessage.fieldRequired);
    expect(validate('not_required', '', ['required1', 'required'])).toEqual('');
    expect(validate('username', 'John')).toEqual('');
    expect(validate('username', '')).toEqual('This field is required');
    expect(validate('email', 'test@test.com')).toEqual('');
    expect(validate('email', 'testmailcom')).toEqual(errorMessage.email);
    expect(validate('email', '')).toEqual(errorMessage.email);
    expect(validate('image', imgSrc)).toEqual('');
    expect(validate('image', '')).toEqual(errorMessage.url);
    expect(validate('img', imgSrc)).toEqual('');
    expect(validate('img', '')).toEqual(errorMessage.url);
    expect(validate('password', 'Test123#')).toEqual('');
    expect(validate('password', '')).toEqual(errorMessage.password);
  });

  test('isAllFilled function', () => {
    expect(isAllFilled({ test: 'test', test2: 'test2' })).toBeTruthy();
    expect(isAllFilled({ test: 'test', test2: '' })).toBeFalsy();
    expect(isAllFilled({})).toBeFalsy();
  });

  test('isAnyError function', () => {
    expect(isAnyError(['', '', ''])).toBeFalsy();
    expect(isAnyError([errorMessage.email, '', ''])).toBeTruthy();
    expect(isAnyError([errorMessage.email, errorMessage.url, errorMessage.password])).toBeTruthy();
  });
});
