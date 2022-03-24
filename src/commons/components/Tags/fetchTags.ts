export const apiUrl = 'https://api.realworld.io';

export async function fetchTags() {
  try {
    const response = await fetch(`${apiUrl}/api/tags`);
    const data = await response.json();
    return data || [];
  } catch (e) {
    console.log(e);
  }
}
