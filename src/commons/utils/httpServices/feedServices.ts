import { ArticleType } from '../../components/Article/Article';
import { apiUrl, headerContent } from '../constants';
import { RequestType } from './types';

type ArticlesType = Promise<ArticleType[] | string>;

export async function fetchArticles(
  limit: number,
  token: string,
): ArticlesType {
  try {
    let requestOptions: RequestType = {
      headers: headerContent,
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

export async function favorite(
  slug: string,
  token: string,
  favorited: boolean,
) {
  try {
    const requestOptions: RequestType = {
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
