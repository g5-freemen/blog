import { ArticleType } from '../../components/Article/Article';
import { NewArticleType } from '../../modules/NewArticle/NewArticle';
import { apiUrl, headerContent } from '../constants';
import { errorHandler } from './errorHandler';
import { RequestType } from './types';

export async function fetchArticles(
  limit: number,
  token: string,
  str?: string,
): Promise<ArticleType[] | string> {
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

    const request = `${apiUrl}/api/articles?limit=${limit}${str || ''}`;
    const response = await fetch(request, requestOptions);
    const data = await response.json();
    return data ? data.articles : [];
  } catch (e) {
    return errorHandler(e);
  }
}

export async function fetchTags(token: string): Promise<string[] | string> {
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

    const response = await fetch(`${apiUrl}/api/tags`, requestOptions);
    const data = await response.json();
    return data ? data.tags : [];
  } catch (e) {
    return errorHandler(e);
  }
}

export async function createArticle(
  formData: NewArticleType,
  cookieToken: string,
): Promise<ArticleType | string> {
  try {
    const requestOptions: RequestType = {
      method: 'POST',
      headers: { ...headerContent, Authorization: `Token ${cookieToken}` },
      body: JSON.stringify({
        article: {
          title: formData.title,
          description: formData.about,
          body: formData.content,
          tagList: formData.tags.split(' '),
        },
      }),
    };

    const request = `${apiUrl}/api/articles`;
    const response = await fetch(request, requestOptions);
    const data = await response.json();
    return data;
  } catch (e) {
    return errorHandler(e);
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
  } catch (e) {
    return errorHandler(e);
  }
}
