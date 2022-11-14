import { errorMessage } from './constants';
import { isValidEmail, required } from './validations';

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
