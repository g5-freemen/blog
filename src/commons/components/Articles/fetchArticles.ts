import { apiUrl } from '../../utils/constants';
import { ArticleType } from '../Article/Article';

type ArticlesType = Promise<ArticleType[] | null>;

export async function fetchArticles(limit: number): ArticlesType {
  try {
    const response = await fetch(`${apiUrl}/api/articles?limit=${limit}`);
    const data = await response.json();
    return data ? data.articles : [];
  } catch (e) {
    return null; // fix in future (throw Error)
  }
}
