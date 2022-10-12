import { ISignIn } from '../../modules/SignIn/SignIn';
import { ISignUp } from '../../modules/SignUp/SignUp';
import { apiUrl } from '../constants';
import { errorHandler } from './errorHandler';
import { options } from './requestOptions';
import { ProfileResponse, UpdateUserType } from './types';

export async function registerUser(formData: ISignUp) {
  try {
    const body = JSON.stringify({ user: { ...formData } });
    const response = await fetch(`${apiUrl}/api/users`, options(undefined, 'POST', body));
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function loginUser(formData: ISignIn) {
  try {
    const body = JSON.stringify({ user: { ...formData } });
    const url = `${apiUrl}/api/users/login`;
    const response = await fetch(url, options(undefined, 'POST', body));
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}

export async function updateUser(formData: UpdateUserType, token: string) {
  try {
    const body = JSON.stringify({ user: { ...formData } });
    const url = `${apiUrl}/api/user`;
    const response = await fetch(url, options(token, 'PUT', body));
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
    const url = `${apiUrl}/api/profiles/${user.username}`;
    const responseProfile = await fetch(url, options(cookieToken));
    const { profile }: ProfileResponse = await responseProfile.json();
    user.bio = profile.bio;
    user.image = profile.image;
    return user;
  } catch (e) {
    return errorHandler(e);
  }
}
