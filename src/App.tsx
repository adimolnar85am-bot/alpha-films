import { useMemo, useState } from 'react'
import { films, grainLabels } from './data/films'
import { FilmDetail } from './components/FilmDetail'
import { FilmCanister } from './components/FilmCanister'
import { FavoriteButton } from './components/FavoriteButton'
import { Generator } from './components/Generator'
import { Community } from './components/Community'
import { CopyrightFooter } from './components/CopyrightFooter'
import { useFavorites } from './FavoritesProvider'
import { validateAllFilms } from './lib/a7iiiValidate'
import type { FilmRecipe, FilmType } from './types'

type Tab = 'library' | 'favorites' | 'community' | 'generator'
type TypeFilter = 'all' | FilmType | 'discontinued'
type BrandFilter = 'all' | 'Fujifilm' | 'Kodak' | 'CineStill' | 'other'

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: 'all', label: 'Toate' },
  { id: 'color', label: 'Color' },
  { id: 'bw', label: 'B&W' },
  { id: 'discontinued', label: 'Disc.' },
]

const brandFilters: { id: BrandFilter; label: string }[] = [
  { id: 'all', label: 'Toate' },
  { id: 'Fujifilm', label: 'Fuji' },
  { id: 'Kodak', label: 'Kodak' },
  { id: 'CineStill', label: 'CineStill' },
  { id: 'other', label: 'Altele' },
]

const mainBrands = new Set(['Fujifilm', 'Kodak', 'CineStill'])

export default function App() {
  const { ids: favoriteIds, count: favCount } = useFavorites()
  const [tab, setTab] = useState<Tab>('library')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [brandFilter, setBrandFilter] = useState<BrandFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [communityUploadOpen, setCommunityUploadOpen] = useState(false)

  const selected = films.find((f) => f.id === selectedId) ?? null
  const chromeHidden = Boolean(selected || communityUploadOpen)

  const validationSummary = useMemo(() => {
    const issues = validateAllFilms(films)
    const errors = issues.filter((i) => i.severity === 'error').length
    return { total: films.length, errors }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return films.filter((f) => {
      if (typeFilter === 'color' && f.type !== 'color') return false
      if (typeFilter === 'bw' && f.type !== 'bw') return false
      if (typeFilter === 'discontinued' && !f.discontinued) return false
      if (brandFilter === 'other' && mainBrands.has(f.brand)) return false
      if (
        brandFilter !== 'all' &&
        brandFilter !== 'other' &&
        f.brand !== brandFilter
      )
        return false
      if (!q) return true
      return (
        f.name.toLowerCase().includes(q) ||
        f.brand.toLowerCase().includes(q) ||
        f.summary.toLowerCase().includes(q)
      )
    })
  }, [query, typeFilter, brandFilter])

  const favorites = useMemo(() => {
    const map = new Map(films.map((f) => [f.id, f]))
    return favoriteIds
      .map((id) => map.get(id))
      .filter(Boolean) as FilmRecipe[]
  }, [favoriteIds])

  const openFilm = (id: string) => {
    setSelectedId(id)
  }

  const showSearch = (tab === 'library' || tab === 'favorites') && !selected

  return (
    <div
      className={`app${communityUploadOpen ? ' app--upload' : ''}`}
    >
      {!communityUploadOpen && (
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark" aria-hidden>
              AF
            </div>
            <div className="brand-text">
              <strong>Alpha Films</strong>
              <span>Sony A7 III</span>
            </div>
          </div>
          {showSearch && (
            <label className="search-wrap">
              <span className="sr-only">Caută</span>
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden>
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M16.5 16.5L21 21"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className="search"
                type="search"
                placeholder="Caută film…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                enterKeyHint="search"
              />
            </label>
          )}
        </header>
      )}

      {selected ? (
        <FilmDetail film={selected} onBack={() => setSelectedId(null)} />
      ) : tab === 'generator' ? (
        <Generator onSelect={openFilm} />
      ) : tab === 'community' ? (
        <Community
          onOpenFilm={openFilm}
          onUploadOpenChange={setCommunityUploadOpen}
        />
      ) : tab === 'favorites' ? (
        <FavoritesView films={favorites} query={query} onSelect={openFilm} />
      ) : (
        <>
          <section className="hero">
            <p className="hero-kicker">Picture Profile recipes</p>
            <h1>Alpha Films</h1>
            <p className="hero-lead">
              Emulații film color & B&W pentru Sony A7 III — Fuji, Kodak,
              CineStill.
            </p>
            <div className="hero-meta">
              <span className="hero-pill">{validationSummary.total} rețete</span>
              <span className="hero-pill hero-pill-ok">
                {validationSummary.errors === 0
                  ? 'Verificat A7 III'
                  : `${validationSummary.errors} erori`}
              </span>
            </div>
          </section>

          <div className="filter-panel">
            <div className="segment" role="toolbar" aria-label="Tip film">
              {typeFilters.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className="segment-btn"
                  aria-pressed={typeFilter === e.id}
                  onClick={() => setTypeFilter(e.id)}
                >
                  {e.label}
                </button>
              ))}
            </div>
            <div className="filters" role="toolbar" aria-label="Brand">
              {brandFilters.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className="chip"
                  aria-pressed={brandFilter === e.id}
                  onClick={() => setBrandFilter(e.id)}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <div className="film-grid">
            {filtered.length === 0 && (
              <p className="empty">Niciun film găsit.</p>
            )}
            {filtered.map((film, i) => (
              <FilmTile
                key={film.id}
                film={film}
                index={i}
                onSelect={() => setSelectedId(film.id)}
              />
            ))}
          </div>
        </>
      )}

      {!chromeHidden && (
        <nav className="nav" aria-label="Navigare">
          <div className="nav-dock nav-dock--4">
            <button
              type="button"
              aria-current={tab === 'library' ? 'page' : undefined}
              onClick={() => setTab('library')}
            >
              Bibliotecă
            </button>
            <button
              type="button"
              aria-current={tab === 'favorites' ? 'page' : undefined}
              onClick={() => setTab('favorites')}
            >
              Favorite
              {favCount > 0 ? (
                <span className="nav-badge">{favCount}</span>
              ) : null}
            </button>
            <button
              type="button"
              aria-current={tab === 'community' ? 'page' : undefined}
              onClick={() => setTab('community')}
            >
              Comunitate
            </button>
            <button
              type="button"
              aria-current={tab === 'generator' ? 'page' : undefined}
              onClick={() => setTab('generator')}
            >
              Generator
            </button>
          </div>
        </nav>
      )}

      {!chromeHidden && <CopyrightFooter />}
    </div>
  )
}

function FavoritesView({
  films: favFilms,
  query,
  onSelect,
}: {
  films: FilmRecipe[]
  query: string
  onSelect: (id: string) => void
}) {
  const q = query.trim().toLowerCase()
  const list = q
    ? favFilms.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.brand.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q),
      )
    : favFilms

  return (
    <div className="favorites-view">
      <section className="hero hero--compact">
        <p className="hero-kicker">Saved</p>
        <h1>Favorite</h1>
        <p className="hero-lead">
          Rețetele pe care le-ai salvat pe acest dispozitiv.
        </p>
      </section>

      {list.length === 0 ? (
        <p className="empty empty--fav">
          Nicio favorită încă. Apasă inima pe o rețetă.
        </p>
      ) : (
        <div className="film-grid">
          {list.map((film, i) => (
            <FilmTile
              key={film.id}
              film={film}
              index={i}
              onSelect={() => onSelect(film.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FilmTile({
  film,
  index,
  onSelect,
}: {
  film: FilmRecipe
  index: number
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className="film-tile"
      style={{ animationDelay: `${Math.min(index, 16) * 0.028}s` }}
      onClick={onSelect}
    >
      <FavoriteButton filmId={film.id} className="film-tile-fav" />
      <div className="film-tile-visual">
        <FilmCanister film={film} size={72} />
        {film.palette && (
          <div className="film-palette" aria-hidden>
            {film.palette.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
        )}
      </div>
      <div className="film-tile-body">
        <span className="film-tile-brand">{film.brand}</span>
        <h2>{film.name}</h2>
        <p className="meta">
          {film.type === 'color' ? 'Color' : 'B&W'}
          {film.discontinued ? ' · Disc.' : ''} · {film.pictureProfile.slot}
        </p>
        <div className="film-tile-foot">
          <span>ISO {film.iso}</span>
          <span>{grainLabels[film.grain]}</span>
        </div>
      </div>
    </button>
  )
}
