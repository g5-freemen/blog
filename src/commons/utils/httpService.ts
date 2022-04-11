import { ISignIn } from '../modules/SignIn/SignIn';
import { ISignUp } from '../modules/SignUp/SignUp';
import { ArticleType } from '../components/Article/Article';
import { apiUrl } from './constants';

type ArticlesType = Promise<ArticleType[] | string>;

export async function fetchArticles(
  limit: number,
  token: string,
): ArticlesType {
  try {
    let requestOptions: any = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      requestOptions = {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: `Token ${token}`,
        },
      };
    }
    const response = await fetch(
      `${apiUrl}/api/articles?limit=${limit}`,
      requestOptions,
    );
    const data = await response.json();
    return data ? data.articles : [];
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
  }
}

export async function fetchTags(): Promise<string[] | string> {
  try {
    const response = await fetch(`${apiUrl}/api/tags`);
    const data = await response.json();
    return data ? data.tags : [];
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
  }
}

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
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { ...formData } }),
    };
    const response = await fetch(`${apiUrl}/api/users/login`, requestOptions);
    const data = await response.json();
    return { response, data };
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
  }
}

export async function favorite(
  slug: string,
  token: string,
  favorited: boolean,
) {
  try {
    const requestOptions = {
      method: favorited ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const response = await fetch(
      `${apiUrl}/api/articles/${slug}/favorite`,
      requestOptions,
    );
    const data = await response.json();
    return { response, data };
  } catch (e: any) {
    return typeof e === 'string' ? e : e.message;
  }
}
