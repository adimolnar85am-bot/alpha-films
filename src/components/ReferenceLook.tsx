import type { FilmRecipe } from '../types'

/** Stylized reference scene graded to match the film recipe look. */
export function ReferenceLook({ film }: { film: FilmRecipe }) {
  const pp = film.pictureProfile
  const isColor = film.type === 'color'
  const palette = film.palette ?? ['#222', '#666', '#999', '#ddd']

  const contrast =
    film.contrast === 'hard' || film.contrast === 'punchy'
      ? 1.25
      : film.contrast === 'soft' || film.contrast === 'flat'
        ? 0.85
        : 1
  const sat = isColor
    ? Math.max(0.35, Math.min(1.6, 1 + pp.saturation / 40))
    : 0
  const brightness = 1 + pp.blackLevel / 40
  const warm =
    isColor && pp.colorPhase
      ? `sepia(${Math.min(0.35, Math.abs(pp.colorPhase) / 20)}) hue-rotate(${pp.colorPhase * 4}deg)`
      : isColor
        ? 'sepia(0.08)'
        : 'grayscale(1)'

  const scene = film.bestFor.includes('portrait')
    ? 'portrait'
    : film.bestFor.includes('landscape')
      ? 'landscape'
      : film.bestFor.includes('street')
        ? 'street'
        : 'general'

  const filter = `${warm} contrast(${contrast}) saturate(${sat}) brightness(${brightness})`

  return (
    <figure className="ref-look">
      <div className="ref-frame" style={{ filter }}>
        <svg viewBox="0 0 320 200" className="ref-scene" aria-hidden>
          <defs>
            <linearGradient id={`sky-${film.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isColor ? palette[2] ?? '#6a8499' : '#8a8a8a'}
              />
              <stop
                offset="100%"
                stopColor={isColor ? palette[3] ?? '#e8e0d4' : '#d0d0d0'}
              />
            </linearGradient>
            <linearGradient id={`ground-${film.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isColor ? palette[1] ?? '#6f8f72' : '#555'}
              />
              <stop
                offset="100%"
                stopColor={isColor ? palette[0] ?? '#c49a72' : '#222'}
              />
            </linearGradient>
          </defs>
          <rect width="320" height="200" fill={`url(#sky-${film.id})`} />

          {scene === 'landscape' && (
            <>
              <path
                d="M0 130 L60 80 L110 120 L170 60 L230 110 L280 70 L320 100 L320 200 L0 200 Z"
                fill={`url(#ground-${film.id})`}
              />
              <ellipse cx="250" cy="55" rx="22" ry="14" fill="#fff" opacity="0.55" />
            </>
          )}

          {scene === 'portrait' && (
            <>
              <rect y="140" width="320" height="60" fill={`url(#ground-${film.id})`} />
              <ellipse cx="160" cy="78" rx="28" ry="32" fill={isColor ? palette[0] : '#777'} />
              <path
                d="M120 200 Q160 110 200 200"
                fill={isColor ? palette[1] : '#555'}
              />
            </>
          )}

          {scene === 'street' && (
            <>
              <rect x="30" y="70" width="50" height="130" fill={isColor ? '#3a3f4a' : '#333'} />
              <rect x="100" y="50" width="60" height="150" fill={isColor ? '#2c3340' : '#2a2a2a'} />
              <rect x="180" y="80" width="45" height="120" fill={isColor ? '#4a4550' : '#444'} />
              <rect x="240" y="60" width="55" height="140" fill={isColor ? '#353a45' : '#303030'} />
              <rect y="175" width="320" height="25" fill={isColor ? palette[0] : '#666'} />
              <circle cx="70" cy="160" r="8" fill={isColor ? palette[0] : '#888'} />
              <rect x="66" y="168" width="8" height="18" fill={isColor ? palette[1] : '#777'} />
            </>
          )}

          {scene === 'general' && (
            <>
              <rect y="150" width="320" height="50" fill={`url(#ground-${film.id})`} />
              <circle cx="70" cy="150" r="40" fill={isColor ? palette[1] : '#666'} />
              <rect x="200" y="100" width="70" height="100" fill={isColor ? '#3a4048' : '#444'} />
            </>
          )}

          {/* grain overlay dots */}
          {Array.from({ length: film.grain === 'fine' ? 20 : film.grain === 'heavy' ? 80 : 45 }).map(
            (_, i) => (
              <circle
                key={i}
                cx={(i * 47) % 320}
                cy={(i * 31) % 200}
                r={film.grain === 'heavy' ? 0.9 : 0.55}
                fill="#000"
                opacity={0.18}
              />
            ),
          )}
        </svg>
        <div className="ref-grain" />
      </div>
      <figcaption>
        <span>Referință look · {film.brand} {film.name}</span>
        <span className="ref-copy">© Alpha Films</span>
      </figcaption>
    </figure>
  )
}
