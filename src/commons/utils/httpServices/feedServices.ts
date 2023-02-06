/* eslint-disable indent */
import { NewArticleType } from '../../modules/NewArticle/NewArticle';
import { apiUrl } from '../constants';
import { errorHandler } from './errorHandler';
import { options } from './requestOptions';
import { ArticleType, IArticles } from './types';

export async function fetchArticle(
  slug: string | undefined,
  token: string,
): Promise<ArticleType | string> {
  try {
    if (!slug) throw new Error('No slug');
    const url = `${apiUrl}/api/articles/${slug}`;
    const response = await fetch(url, options(token));
    const data = await response.json();
    return data.article;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function fetchComments(slug: string | undefined, token: string): Promise<any> {
  try {
    if (!slug) throw new Error('No slug');
    const url = `${apiUrl}/api/articles/${slug}/comments`;
    const response = await fetch(url, options(token));
    const data = await response.json();
    return data?.comments;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function postComment(
  slug: string | undefined,
  token: string,
  body: string,
): Promise<any> {
  try {
    if (!slug) throw new Error('No slug');
    const obj = JSON.stringify({ comment: { body } });
    const url = `${apiUrl}/api/articles/${slug}/comments`;
    const response = await fetch(url, options(token, 'POST', obj));
    const data = await response.json();
    return data?.comment;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function deleteComment(slug: string, id: number, token: string): Promise<any> {
  try {
    if (!slug || !id) throw new Error('No Slug or ID');
    const url = `${apiUrl}/api/articles/${slug}/comments/${id}`;
    const response = await fetch(url, options(token, 'DELETE'));
    const data = await response.json();
    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function deleteArticle(slug: string, token: string): Promise<any> {
  try {
    if (!slug) throw new Error('No slug!');
    const url = `${apiUrl}/api/articles/${slug}`;
    const response = await fetch(url, options(token, 'DELETE'));
    const data = await response.json();
    return { response, data };
  } catch (error) {
    return errorHandler(error);
  }
}

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
  } catch (error) {
    return errorHandler(error);
  }
}

export async function fetchTags(token: string): Promise<string[] | string> {
  try {
    const response = await fetch(`${apiUrl}/api/tags`, options(token));
    const data = await response.json();
    return data ? data.tags : [];
  } catch (error) {
    return errorHandler(error);
  }
}

export async function createOrUpdateArticle(
  formData: NewArticleType,
  token: string,
  article?: ArticleType,
): Promise<ArticleType | string> {
  try {
    const { title, about, content, tags } = formData;
    const bodyContent = {
      title,
      description: about,
      body: content,
      tagList: tags
        .split(/\s/g)
        .filter(Boolean)
        .map((el) => el.trim()),
    };
    const body = article
      ? {
          article: {
            ...article,
            ...bodyContent,
            updatedAt: new Date().toISOString(),
            slug: article.slug.replace(article.title, title),
          },
        }
      : { article: { ...bodyContent } };

    const url = `${apiUrl}/api/articles/${article?.slug || ''}`;
    const method = article ? 'PUT' : 'POST';
    const response = await fetch(url, options(token, method, JSON.stringify(body)));
    const data = await response.json();
    if (!response.ok) {
      const { errors } = data;
      let result = '';
      Object.keys(errors).forEach((key) => {
        result += `${key}: ${errors[key].join(',')}`;
      });
      throw new Error(result);
    }
    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function favorite(slug: string, token: string, favorited: boolean) {
  try {
    const method = favorited ? 'DELETE' : 'POST';
    const url = `${apiUrl}/api/articles/${slug}/favorite`;
    const response = await fetch(url, options(token, method));
    const data = await response.json();
    return { response, data };
  } catch (error) {
    return errorHandler(error);
  }
}

export async function follow(name: string, token: string, followed: boolean) {
  try {
    const method = followed ? 'DELETE' : 'POST';
    const url = `${apiUrl}/api/profiles/${name}/follow`;
    const response = await fetch(url, options(token, method));
    const data = await response.json();
    return { response, data };
  } catch (error) {
    return errorHandler(error);
  }
}
