import { ISignIn } from '../../modules/SignIn/SignIn';
import { ISignUp } from '../../modules/SignUp/SignUp';
import { apiUrl } from '../constants';
import { errorHandler } from './errorHandler';
import { options } from './requestOptions';
import { UpdateUserType } from './types';

export async function registerUser(formData: ISignUp) {
  try {
    const body = JSON.stringify({ user: { ...formData } });
    const response = await fetch(
      `${apiUrl}/api/users`,
      options(undefined, 'POST', body),
    );
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function loginUser(formData: ISignIn) {
  try {
    const body = JSON.stringify({ user: { ...formData } });
    const response = await fetch(
      `${apiUrl}/api/users/login`,
      options(undefined, 'POST', body),
    );
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function updateUser(formData: UpdateUserType, token: string) {
  try {
    const body = JSON.stringify({ user: { ...formData } });
    const response = await fetch(
      `${apiUrl}/api/user`,
      options(token, 'PUT', body),
    );
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function fetchCurrentUser(cookieToken: string) {
  try {
    const response = await fetch(`${apiUrl}/api/user`, options(cookieToken));
    const data = await response.json();
    const { token, ...user } = data.user;
    return user;
  } catch (e) {
    return errorHandler(e);
  }
}
