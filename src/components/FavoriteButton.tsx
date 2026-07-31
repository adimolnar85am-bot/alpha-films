import { useFavorites } from '../FavoritesProvider'

export function FavoriteButton({
  filmId,
  className = '',
}: {
  filmId: string
  className?: string
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(filmId)

  return (
    <button
      type="button"
      className={`fav-btn ${active ? 'fav-btn--on' : ''} ${className}`.trim()}
      aria-pressed={active}
      aria-label={active ? 'Scoate din favorite' : 'Adaugă la favorite'}
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(filmId)
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden width="18" height="18">
        <path
          d="M12 20.5s-7.2-4.35-9.4-8.55C1.1 9.2 2.2 6.2 5.1 5.35c1.7-.5 3.5.05 4.7 1.3L12 8.9l2.2-2.25c1.2-1.25 3-1.8 4.7-1.3 2.9.85 4 3.85 2.5 6.6C19.2 16.15 12 20.5 12 20.5z"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
