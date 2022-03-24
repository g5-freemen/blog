export const apiUrl = 'https://api.realworld.io';

export async function fetchArticles(): Promise<string[] | null> {
  try {
    const response = await fetch(`${apiUrl}/api/articles`);
    const data = await response.json();
    console.log(data);
    return data ? data.articles : [];
  } catch (e) {
    console.log(e);
    return null; // fix in future (throw Error)
  }
}
