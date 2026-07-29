import { useMemo, useState } from 'react'
import { films, grainLabels } from './data/films'
import { FilmDetail } from './components/FilmDetail'
import { FilmCanister } from './components/FilmCanister'
import { Generator } from './components/Generator'
import type { FilmType } from './types'

type Tab = 'library' | 'generator'
type TypeFilter = 'all' | FilmType | 'discontinued'
type BrandFilter = 'all' | 'Fujifilm' | 'Kodak' | 'CineStill' | 'other'

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: 'all', label: 'Toate' },
  { id: 'color', label: 'Color' },
  { id: 'bw', label: 'B&W' },
  { id: 'discontinued', label: 'Discontinued' },
]

const brandFilters: { id: BrandFilter; label: string }[] = [
  { id: 'all', label: 'Brand' },
  { id: 'Fujifilm', label: 'Fuji' },
  { id: 'Kodak', label: 'Kodak' },
  { id: 'CineStill', label: 'CineStill' },
  { id: 'other', label: 'Altele' },
]

const mainBrands = new Set(['Fujifilm', 'Kodak', 'CineStill'])

export default function App() {
  const [tab, setTab] = useState<Tab>('library')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [brandFilter, setBrandFilter] = useState<BrandFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = films.find((f) => f.id === selectedId) ?? null

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

  const openFilm = (id: string) => {
    setSelectedId(id)
    setTab('library')
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <strong>Alpha Films</strong>
          <span>A7 III · Picture Profile</span>
        </div>
        {tab === 'library' && !selected && (
          <input
            className="search"
            type="search"
            placeholder="Caută film…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            enterKeyHint="search"
          />
        )}
      </header>

      {selected ? (
        <FilmDetail film={selected} onBack={() => setSelectedId(null)} />
      ) : tab === 'generator' ? (
        <Generator onSelect={openFilm} />
      ) : (
        <>
          <section className="hero">
            <h1>Alpha Films</h1>
            <p>
              Rețete Picture Profile pentru Sony A7 III — color și B&W, Fuji,
              Kodak (inclusiv discontinue) și CineStill.
            </p>
          </section>

          <div className="filters" role="toolbar" aria-label="Tip film">
            {typeFilters.map((e) => (
              <button
                key={e.id}
                type="button"
                className="chip"
                aria-pressed={typeFilter === e.id}
                onClick={() => setTypeFilter(e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>

          <div className="filters filters-secondary" role="toolbar" aria-label="Brand">
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

          <div className="film-list">
            {filtered.length === 0 && (
              <p className="empty">Niciun film găsit.</p>
            )}
            {filtered.map((film, i) => (
              <button
                key={film.id}
                type="button"
                className="film-row"
                style={{ animationDelay: `${Math.min(i, 12) * 0.03}s` }}
                onClick={() => setSelectedId(film.id)}
              >
                <FilmCanister film={film} size={58} />
                <div>
                  <h2>
                    {film.brand} {film.name}
                  </h2>
                  <p className="meta">
                    {film.type === 'color' ? 'Color' : 'B&W'}
                    {film.discontinued ? ' · Disc.' : ''} ·{' '}
                    {film.pictureProfile.slot} · {grainLabels[film.grain]}
                  </p>
                </div>
                <span className="iso">{film.iso}</span>
              </button>
            ))}
          </div>

          <footer className="site-footer">
            <p>© 2026 Alpha Films. All rights reserved.</p>
            <p>
              Emulații independente — neafiliate cu Sony, Kodak, Fujifilm,
              Ilford sau CineStill.
            </p>
          </footer>
        </>
      )}

      {!selected && (
        <nav className="nav" aria-label="Navigare">
          <button
            type="button"
            aria-current={tab === 'library' ? 'page' : undefined}
            onClick={() => setTab('library')}
          >
            Bibliotecă
          </button>
          <button
            type="button"
            aria-current={tab === 'generator' ? 'page' : undefined}
            onClick={() => setTab('generator')}
          >
            Generator
          </button>
        </nav>
      )}
    </div>
  )
}
