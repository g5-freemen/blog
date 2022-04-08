import { ISignIn } from '../modules/SignIn/SignIn';
import { ISignUp } from '../modules/SignUp/SignUp';
import { apiUrl } from './constants';

export async function registerUser(formData: ISignUp) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { ...formData } }),
  };
  const response = await fetch(`${apiUrl}/api/users/login`, requestOptions);
  const data = await response.json();
  return { response, data };
}
