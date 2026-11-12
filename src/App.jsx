import { useCallback, useEffect, useState } from 'react';
import { Search, Heart, Orbit, RotateCcw, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { getCharacters } from './services/api';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import useFavorites from './hooks/useFavorites';
export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [view, setView] = useState('explore');
  const [data, setData] = useState({ info: { pages: 0, count: 0 }, results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [selected, setSelected] = useState(null);
  const { favorites, toggle, isFavorite } = useFavorites();
  const closeModal = useCallback(() => setSelected(null), []);
  useEffect(() => { const timer = setTimeout(() => setDebouncedSearch(search), 350); return () => clearTimeout(timer); }, [search]);
  useEffect(() => {
    if (view !== 'explore') return;
    const controller = new AbortController();
    setLoading(true); setError('');
    getCharacters({ name: debouncedSearch, status, page, signal: controller.signal })
      .then(setData).catch(e => { if (e.name !== 'AbortError') setError(e.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [debouncedSearch, status, page, view, retry]);
  const visible = view === 'favorites' ? favorites.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) && (!status || c.status.toLowerCase() === status)) : data.results;
  function reset() { setSearch(''); setDebouncedSearch(''); setStatus(''); setPage(1); }
  return <div className="app-shell">
    <header className="site-header"><div className="header-inner"><a href="#inicio" className="brand" onClick={() => { setView('explore'); reset(); }}><span className="brand-symbol"><Orbit size={24}/></span><span>DIMENSION<span className="brand-accent">.</span><small>EXPLORER</small></span></a><nav aria-label="Navegación principal"><button className={view === 'explore' ? 'active' : ''} onClick={() => setView('explore')}>Explorar</button><button className={view === 'favorites' ? 'active' : ''} onClick={() => setView('favorites')}><Heart size={16}/> Favoritos <span className="nav-count">{favorites.length}</span></button></nav></div></header>
    <main id="inicio"><section className="hero"><div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/><div className="hero-content"><div className="hero-tag"><span className="live-dot"/> ARCHIVO INTERDIMENSIONAL · 001</div><h1>Infinitos universos.<br/><em>Un solo explorador.</em></h1><p>Descubre los personajes de Rick and Morty. Busca, explora sus historias y guarda tus favoritos de cualquier dimensión.</p><a href="#catalogo" className="hero-link">Explorar personajes <ArrowUpRight size={18}/></a></div><div className="hero-art" aria-hidden="true"><div className="portal-ring ring-outer"/><div className="portal-ring ring-middle"/><div className="portal-ring ring-inner"/><div className="portal-core"><Orbit size={76} strokeWidth={1}/></div></div></section>
    <section className="catalog" id="catalogo"><div className="section-heading"><div><span className="eyebrow">BASE DE DATOS MULTIVERSAL</span><h2>{view === 'favorites' ? 'Tus favoritos' : 'Explora el multiverso'}<span className="heading-dot">.</span></h2><p>{view === 'favorites' ? 'Los personajes que has guardado para volver a visitar.' : 'Personajes de todas las dimensiones, en un solo lugar.'}</p></div><div className="result-count">{view === 'favorites' ? favorites.length : data.info.count} <span>personajes</span></div></div>
    <div className="toolbar"><label className="search-box"><Search size={19}/><input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar por nombre…" aria-label="Buscar personajes"/></label><label className="select-box"><span>Estado</span><select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} aria-label="Filtrar por estado"><option value="">Todos</option><option value="alive">Vivos</option><option value="dead">Muertos</option><option value="unknown">Desconocidos</option></select></label><button className="reset-button" onClick={reset} title="Limpiar filtros" aria-label="Limpiar filtros"><RotateCcw size={18}/></button></div>
    {view === 'explore' && loading ? <div className="state-message"><div className="spinner"/><p>Cargando personajes de otras dimensiones…</p></div> : view === 'explore' && error ? <div className="state-message" role="alert"><h3>Ha ocurrido un problema</h3><p>{error}</p><button className="outline-button" onClick={() => setRetry(n => n + 1)}>Reintentar</button></div> : visible.length === 0 ? <div className="state-message"><Search size={32}/><h3>No encontramos personajes</h3><p>Prueba con otro nombre o cambia los filtros.</p><button className="outline-button" onClick={reset}>Limpiar búsqueda</button></div> : <div className="character-grid">{visible.map(character => <CharacterCard key={character.id} character={character} favorite={isFavorite(character.id)} onFavorite={toggle} onOpen={setSelected}/>)}</div>}
    {view === 'explore' && !loading && !error && data.info.pages > 1 && <div className="pagination"><button disabled={page <= 1} onClick={() => { setPage(p => p-1); document.getElementById('catalogo')?.scrollIntoView(); }}><ChevronLeft size={18}/> Anterior</button><span>Página <strong>{page}</strong> de {data.info.pages}</span><button disabled={page >= data.info.pages} onClick={() => { setPage(p => p+1); document.getElementById('catalogo')?.scrollIntoView(); }}>Siguiente <ChevronRight size={18}/></button></div>}
    </section></main><footer className="footer"><span>DIMENSION<span className="brand-accent">.</span> EXPLORER</span><p>Proyecto educativo ReactJS · Datos de <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">Rick and Morty API</a></p><span>© {new Date().getFullYear()}</span></footer>
    {selected && <CharacterModal character={selected} onClose={closeModal} favorite={isFavorite(selected.id)} onFavorite={toggle}/>}
  </div>;
}
