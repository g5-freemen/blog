export const apiUrl = 'https://api.realworld.io';

interface IFetchTags {
  tags: string[];
}

export async function fetchTags(): Promise<IFetchTags | undefined> {
  try {
    const response = await fetch(`${apiUrl}/api/tags`);
    const data = await response.json();
    return data || [];
  } catch (e) {
    console.log(e);
  }
}
