import { ArticleType } from '../../components/Article/Article';
import { NewArticleType } from '../../modules/NewArticle/NewArticle';
import { apiUrl } from '../constants';
import { errorHandler } from './errorHandler';
import { options } from './requestOptions';
import { IArticles } from './types';

export async function fetchArticles(
  limit: number,
  token: string,
  str?: string,
): Promise<IArticles | string> {
  try {
    const url = `${apiUrl}/api/articles?limit=${limit}${str || ''}`;
    const response = await fetch(url, options(token));
    const data: IArticles = await response.json();
    return data;
  } catch (e) {
    return errorHandler(e);
  }
}

export async function fetchTags(token: string): Promise<string[] | string> {
  try {
    const response = await fetch(`${apiUrl}/api/tags`, options(token));
    const data = await response.json();
    return data ? data.tags : [];
  } catch (e) {
    return errorHandler(e);
  }
}

export async function createArticle(
  formData: NewArticleType,
  token: string,
): Promise<ArticleType | string> {
  try {
    const { title, about, content, tags } = formData;
    const body = JSON.stringify({
      article: {
        title,
        description: about,
        body: content,
        tagList: tags.split(' '),
      },
    });

    const request = `${apiUrl}/api/articles`;
    const response = await fetch(request, options(token, 'POST', body));
    const data = await response.json();
    if (!response.ok) {
      const { errors } = data;
      let result = '';
      Object.keys(errors).forEach((key) => {
        result += `${key}: ${errors[key].join(',')}`;
      });
      throw Error(result);
    }
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
    const method = favorited ? 'DELETE' : 'POST';
    const url = `${apiUrl}/api/articles/${slug}/favorite`;
    const response = await fetch(url, options(token, method));
    const data = await response.json();
    return { response, data };
  } catch (e) {
    return errorHandler(e);
  }
}
