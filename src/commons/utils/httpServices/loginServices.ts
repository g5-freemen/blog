import { ISignIn } from '../../modules/SignIn/SignIn';
import { ISignUp } from '../../modules/SignUp/SignUp';
import { apiUrl, headerContent } from '../constants';
import { errorHandler } from './errorHandler';
import { RequestType, UpdateUserType } from './types';

export async function registerUser(formData: ISignUp) {
  try {
    const requestOptions: RequestType = {
      method: 'POST',
      headers: headerContent,
      body: JSON.stringify({ user: { ...formData } }),
    };
    const response = await fetch(`${apiUrl}/api/users`, requestOptions);
    const data = await response.json();

    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function loginUser(formData: ISignIn) {
  try {
    const requestOptions: RequestType = {
      method: 'POST',
      headers: headerContent,
      body: JSON.stringify({ user: { ...formData } }),
    };
    const response = await fetch(`${apiUrl}/api/users/login`, requestOptions);
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function updateUser(
  formData: UpdateUserType,
  cookieToken: string,
) {
  try {
    const requestOptions: RequestType = {
      method: 'PUT',
      headers: { ...headerContent, Authorization: `Token ${cookieToken}` },
      body: JSON.stringify({ user: { ...formData } }),
    };
    const response = await fetch(`${apiUrl}/api/user`, requestOptions);
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function fetchCurrentUser(cookieToken: string) {
  try {
    const requestOptions: RequestType = {
      headers: { ...headerContent, Authorization: `Token ${cookieToken}` },
    };
    const response = await fetch(`${apiUrl}/api/user`, requestOptions);
    const data = await response.json();
    const { token, ...user } = data.user;
    return user;
  } catch (e) {
    return errorHandler(e);
  }
}
