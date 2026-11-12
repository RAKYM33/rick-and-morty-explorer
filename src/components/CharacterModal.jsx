import { useEffect, useState } from 'react';
import { X, Heart, MapPin, Globe2, Tv } from 'lucide-react';
import { getEpisodeNames } from '../services/api';
export default function CharacterModal({ character, onClose, favorite, onFavorite }) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    getEpisodeNames(character.episode, controller.signal).then(setEpisodes).catch(e => { if (e.name !== 'AbortError') setError(e.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [character]);
  useEffect(() => {
    function keydown(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', keydown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = previous; };
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="modal" role="dialog" aria-modal="true" aria-label={`Detalles de ${character.name}`}>
      <button className="modal-close" onClick={onClose} aria-label="Cerrar"><X size={22}/></button>
      <div className="modal-top"><img src={character.image} alt={character.name}/><div className="modal-heading"><span className="eyebrow">FICHA DE PERSONAJE · #{character.id}</span><h2>{character.name}</h2><p>{character.status} · {character.species} {character.type ? `· ${character.type}` : ''} · {character.gender}</p><button className="outline-button" onClick={() => onFavorite(character)}><Heart size={17} fill={favorite ? 'currentColor' : 'none'}/>{favorite ? 'Quitar de favoritos' : 'Guardar favorito'}</button></div></div>
      <div className="detail-grid"><div><Globe2 size={18}/><span>Origen</span><strong>{character.origin.name}</strong></div><div><MapPin size={18}/><span>Última ubicación</span><strong>{character.location.name}</strong></div></div>
      <div className="episodes"><h3><Tv size={18}/> Episodios ({character.episode.length})</h3>{loading ? <p>Cargando episodios…</p> : error ? <p role="alert">{error}</p> : <div className="episode-list">{episodes.map(ep => <div key={ep.id}><span>{ep.episode}</span><strong>{ep.name}</strong></div>)}</div>}</div>
    </section>
  </div>;
}
