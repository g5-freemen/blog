import { apiUrl } from '../../utils/constants';

export async function fetchTags(): Promise<string[] | null> {
  try {
    const response = await fetch(`${apiUrl}/api/tags`);
    const data = await response.json();
    return data ? data.tags : [];
  } catch (e) {
    console.log(e);
    return null; // fix in future (throw Error)
  }
}
