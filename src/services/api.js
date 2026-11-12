const BASE = 'https://rickandmortyapi.com/api';
export async function getCharacters({ name = '', status = '', page = 1, signal } = {}) {
  const params = new URLSearchParams({ page: String(page) });
  if (name.trim()) params.set('name', name.trim());
  if (status) params.set('status', status);
  const response = await fetch(`${BASE}/character/?${params}`, { signal });
  if (response.status === 404) return { info: { pages: 0, count: 0 }, results: [] };
  if (!response.ok) throw new Error('No se pudieron cargar los personajes.');
  return response.json();
}
export async function getEpisodeNames(urls, signal) {
  if (!urls.length) return [];
  const ids = urls.map(url => url.split('/').pop());
  const response = await fetch(`${BASE}/episode/${ids.join(',')}`, { signal });
  if (!response.ok) throw new Error('No se pudieron cargar los episodios.');
  const data = await response.json();
  return (Array.isArray(data) ? data : [data]).map(item => ({ id: item.id, name: item.name, episode: item.episode }));
}
