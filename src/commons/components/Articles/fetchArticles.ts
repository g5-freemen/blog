import { apiUrl } from '../../utils/constants';
import { ArticleType } from '../Article/Article';

export async function fetchArticles(): Promise<ArticleType[] | null> {
  try {
    const response = await fetch(`${apiUrl}/api/articles`);
    const data = await response.json();
    return data ? data.articles : [];
  } catch (e) {
    console.log(e);
    return null; // fix in future (throw Error)
  }
}
