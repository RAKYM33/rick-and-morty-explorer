import { Heart, ArrowUpRight } from 'lucide-react';
export default function CharacterCard({ character, favorite, onFavorite, onOpen }) {
  return <article className="character-card">
    <button className="image-button" onClick={() => onOpen(character)} aria-label={`Ver detalles de ${character.name}`}>
      <img src={character.image} alt={character.name} loading="lazy" />
      <span className={`status-pill ${character.status.toLowerCase()}`}><span className="status-dot" />{character.status}</span>
    </button>
    <button className={`favorite-button ${favorite ? 'selected' : ''}`} onClick={() => onFavorite(character)} aria-label={`${favorite ? 'Quitar' : 'Añadir'} ${character.name} ${favorite ? 'de' : 'a'} favoritos`} aria-pressed={favorite}><Heart size={19} fill={favorite ? 'currentColor' : 'none'}/></button>
    <div className="card-info"><div><h3>{character.name}</h3><p>{character.species} · {character.gender}</p></div><button className="details-button" onClick={() => onOpen(character)} aria-label={`Abrir ${character.name}`}><ArrowUpRight size={20}/></button></div>
  </article>;
}
