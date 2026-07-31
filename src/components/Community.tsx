import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { films } from '../data/films'
import { isSupabaseConfigured } from '../lib/supabase'
import {
  fetchCommunityPosts,
  uploadCommunityPost,
  type CommunityPost,
} from '../lib/community'
import { FilmCanister } from './FilmCanister'
import { Sheet, useBodyScrollLock } from './Sheet'

export function Community({
  onOpenFilm,
  onUploadOpenChange,
}: {
  onOpenFilm: (filmId: string) => void
  onUploadOpenChange?: (open: boolean) => void
}) {
  const configured = isSupabaseConfigured
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)

  const reload = async () => {
    setLoadingPosts(true)
    setLoadError(null)
    try {
      setPosts(await fetchCommunityPosts())
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Eroare la încărcare')
    } finally {
      setLoadingPosts(false)
    }
  }

  useEffect(() => {
    if (!configured) {
      setLoadingPosts(false)
      return
    }
    void reload()
  }, [configured])

  const openUpload = () => {
    setShowUpload(true)
    onUploadOpenChange?.(true)
  }

  const closeUpload = () => {
    setShowUpload(false)
    onUploadOpenChange?.(false)
  }

  useEffect(() => {
    return () => onUploadOpenChange?.(false)
  }, [onUploadOpenChange])

  if (!configured) {
    return (
      <div className="community">
        <section className="hero hero--compact">
          <p className="hero-kicker">Community</p>
          <h1>Comunitate</h1>
          <p className="hero-lead">
            Galerie cu poze făcute pe rețetele Alpha Films.
          </p>
        </section>
        <div className="setup-card">
          <h2>Configurare necesară</h2>
          <ol>
            <li>Creează un proiect Supabase.</li>
            <li>Rulează SQL din `supabase/schema.sql`.</li>
            <li>
              Copiază `.env.example` → `.env.local` și completează URL + anon
              key.
            </li>
            <li>Redeploy / restart `npm run dev`.</li>
          </ol>
        </div>
      </div>
    )
  }

  if (showUpload) {
    return (
      <UploadPage
        onClose={closeUpload}
        onUploaded={async () => {
          closeUpload()
          await reload()
        }}
      />
    )
  }

  return (
    <div className="community">
      <section className="hero hero--compact">
        <p className="hero-kicker">Community</p>
        <h1>Comunitate</h1>
        <p className="hero-lead">
          Încarcă o poză făcută cu o rețetă A7 III — fără cont.
        </p>
        <div className="community-actions">
          <button
            type="button"
            className="copy-btn community-cta"
            onClick={openUpload}
          >
            Urcă o poză
          </button>
        </div>
      </section>

      {loadingPosts ? (
        <p className="empty">Se încarcă…</p>
      ) : loadError ? (
        <p className="empty">{loadError}</p>
      ) : posts.length === 0 ? (
        <p className="empty empty--fav">
          Încă nu sunt poze. Fii primul care încarcă.
        </p>
      ) : (
        <div className="community-grid">
          {posts.map((post, i) => (
            <CommunityCard
              key={post.id}
              post={post}
              index={i}
              onOpen={() => setSelectedPost(post)}
              onOpenFilm={onOpenFilm}
            />
          ))}
        </div>
      )}

      {selectedPost && (
        <PostLightbox
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onOpenFilm={onOpenFilm}
        />
      )}
    </div>
  )
}

function filmById(id: string) {
  return films.find((f) => f.id === id) ?? null
}

function CommunityCard({
  post,
  index,
  onOpen,
  onOpenFilm,
}: {
  post: CommunityPost
  index: number
  onOpen: () => void
  onOpenFilm: (id: string) => void
}) {
  const film = filmById(post.filmId)

  return (
    <article
      className="community-card"
      style={{ animationDelay: `${Math.min(index, 12) * 0.03}s` }}
    >
      <button type="button" className="community-thumb" onClick={onOpen}>
        <img src={post.imageUrl} alt="" loading="lazy" />
      </button>
      <div className="community-meta">
        {film ? (
          <button
            type="button"
            className="community-recipe"
            onClick={() => onOpenFilm(film.id)}
          >
            <FilmCanister film={film} size={36} />
            <span>
              <strong>
                {film.brand} {film.name}
              </strong>
              <small>Vezi rețeta</small>
            </span>
          </button>
        ) : (
          <p className="meta">{post.filmId}</p>
        )}
      </div>
    </article>
  )
}

function PostLightbox({
  post,
  onClose,
  onOpenFilm,
}: {
  post: CommunityPost
  onClose: () => void
  onOpenFilm: (id: string) => void
}) {
  const film = filmById(post.filmId)

  return (
    <Sheet
      open
      onClose={onClose}
      title={film ? `${film.brand} ${film.name}` : undefined}
    >
      <img className="sheet-photo" src={post.imageUrl} alt="" />
      {film && (
        <button
          type="button"
          className="community-recipe community-recipe--lg"
          onClick={() => {
            onClose()
            onOpenFilm(film.id)
          }}
        >
          <FilmCanister film={film} size={48} />
          <span>
            <strong>
              {film.brand} {film.name}
            </strong>
            <small>
              {film.pictureProfile.slot} · {film.pictureProfile.gamma}
            </small>
          </span>
        </button>
      )}
      {post.caption && <p className="prose">{post.caption}</p>}
      <p className="meta sheet-meta">
        {new Date(post.createdAt).toLocaleDateString('ro-RO')}
      </p>
      <button type="button" className="chip sheet-close-btn" onClick={onClose}>
        Închide
      </button>
    </Sheet>
  )
}

function UploadPage({
  onUploaded,
  onClose,
}: {
  onUploaded: () => void
  onClose: () => void
}) {
  const formId = 'community-upload-form'
  const [filmId, setFilmId] = useState(films[0]?.id ?? '')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filmQuery, setFilmQuery] = useState('')

  const options = useMemo(() => {
    const q = filmQuery.trim().toLowerCase()
    if (!q) return films
    return films.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.brand.toLowerCase().includes(q) ||
        f.id.includes(q),
    )
  }, [filmQuery])

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setError('Trebuie să confirmi că ai dreptul să publici imaginea.')
      return
    }
    if (!file || !filmId) return
    setBusy(true)
    setError(null)
    try {
      await uploadCommunityPost({ filmId, file, caption })
      onUploaded()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Eroare la publicare'
      if (msg.includes('permission denied') || msg.includes('42501')) {
        setError('Permisiuni DB lipsă — verifică schema Supabase.')
      } else if (msg.includes('too large'))
        setError('Imaginea e prea mare (max 5 MB).')
      else if (msg.includes('Invalid image'))
        setError('Tip de fișier invalid.')
      else setError(msg)
    } finally {
      setBusy(false)
    }
  }

  const canSubmit = Boolean(file && filmId && consent && !busy)

  useBodyScrollLock(true, 'upload-open')

  return createPortal(
    <div className="upload-page" role="dialog" aria-modal="true">
      <header className="upload-page-head">
        <button type="button" className="upload-back" onClick={onClose}>
          ← Înapoi
        </button>
        <h1>Publică în comunitate</h1>
      </header>

      <div className="upload-page-body">
        <form id={formId} className="upload-form" onSubmit={submit}>
          <p className="section-note">
            Alege rețeta folosită și o imagine JPEG/PNG/WebP (max 5 MB).
          </p>

          <label className="field-block">
            <span>Rețetă</span>
            <input
              type="search"
              value={filmQuery}
              onChange={(e) => setFilmQuery(e.target.value)}
              placeholder="Caută film…"
            />
          </label>

          <div className="recipe-pick" role="listbox" aria-label="Rețetă">
            {options.slice(0, 8).map((film) => (
              <button
                key={film.id}
                type="button"
                role="option"
                aria-selected={filmId === film.id}
                className="recipe-pick-item"
                onClick={() => setFilmId(film.id)}
              >
                <FilmCanister film={film} size={36} />
                <span>
                  {film.brand} {film.name}
                </span>
              </button>
            ))}
          </div>

          <label className="field-block">
            <span>Imagine</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              required
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {preview && <img className="upload-preview" src={preview} alt="" />}

          <label className="field-block">
            <span>Caption (opțional)</span>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={160}
              placeholder="Unde / ce cameră…"
            />
          </label>

          <label className="check-row check-row--required">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>
              Confirm că am dreptul să public această imagine și accept
              afișarea publică.
            </span>
          </label>

          {error && <p className="form-error">{error}</p>}
        </form>
      </div>

      <footer className="upload-page-foot">
        <div className="upload-actions">
          <button type="button" className="chip" onClick={onClose}>
            Anulează
          </button>
          <button
            type="submit"
            form={formId}
            className="copy-btn upload-submit"
            disabled={!canSubmit}
          >
            {busy ? 'Se publică…' : 'Publică'}
          </button>
        </div>
      </footer>
    </div>,
    document.body,
  )
}
