import { ISignIn } from '../../modules/SignIn/SignIn';
import { ISignUp } from '../../modules/SignUp/SignUp';
import { apiUrl, headerContent } from '../constants';
import { RequestType } from './types';

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
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
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
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
  }
}

export async function fetchCurrentUser(token: string) {
  try {
    const requestOptions: RequestType = {
      headers: { ...headerContent, Authorization: `Token ${token}` },
    };
    const response = await fetch(`${apiUrl}/api/user`, requestOptions);
    const data = await response.json();
    return data.user;
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
  }
}
