import { useEffect, useState } from 'react';
const KEY = 'dimension-explorer-favorites';
export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(saved) ? saved : []; }
    catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(favorites)); } catch { /* Storage unavailable */ } }, [favorites]);
  function toggle(character) {
    setFavorites(previous => previous.some(item => item.id === character.id)
      ? previous.filter(item => item.id !== character.id)
      : [...previous, character]);
  }
  return { favorites, toggle, isFavorite: id => favorites.some(item => item.id === id) };
}
