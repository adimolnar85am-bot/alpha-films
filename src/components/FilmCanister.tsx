import type { FilmRecipe } from '../types'

type CanTheme = {
  body: string
  lid: string
  label: string
  text: string
  accent: string
  stripe?: string
}

const themes: Record<string, CanTheme> = {
  Kodak: {
    body: '#1a1a1a',
    lid: '#f5d031',
    label: '#f5d031',
    text: '#111',
    accent: '#c41230',
    stripe: '#111',
  },
  Fujifilm: {
    body: '#0d5c38',
    lid: '#0a4a2d',
    label: '#f4f4f0',
    text: '#0d5c38',
    accent: '#e10600',
    stripe: '#0d5c38',
  },
  Ilford: {
    body: '#111',
    lid: '#222',
    label: '#f5f5f5',
    text: '#111',
    accent: '#e6b800',
    stripe: '#111',
  },
  CineStill: {
    body: '#141414',
    lid: '#1c1c1c',
    label: '#f07a28',
    text: '#111',
    accent: '#fff',
    stripe: '#111',
  },
  'Agfa / Rollei': {
    body: '#8b1e1e',
    lid: '#6e1616',
    label: '#f3e6c8',
    text: '#5a1010',
    accent: '#222',
  },
  Rollei: {
    body: '#222',
    lid: '#111',
    label: '#e8e8e8',
    text: '#111',
    accent: '#888',
  },
  Foma: {
    body: '#1e3a6e',
    lid: '#f0c419',
    label: '#f0c419',
    text: '#1e3a6e',
    accent: '#fff',
  },
  Adox: {
    body: '#1a3a6e',
    lid: '#12305a',
    label: '#eef3fa',
    text: '#1a3a6e',
    accent: '#c40',
  },
  Bergger: {
    body: '#1a1a1a',
    lid: '#2a2a2a',
    label: '#c9a45c',
    text: '#1a1a1a',
    accent: '#fff',
  },
  Orwo: {
    body: '#e85d04',
    lid: '#1a1a1a',
    label: '#1a1a1a',
    text: '#f5f5f5',
    accent: '#f5f5f5',
  },
  Kentmere: {
    body: '#222',
    lid: '#111',
    label: '#f0f0f0',
    text: '#111',
    accent: '#666',
  },
  Shanghai: {
    body: '#b01020',
    lid: '#8a0c18',
    label: '#f5f0e6',
    text: '#8a0c18',
    accent: '#222',
  },
}

const fallback: CanTheme = {
  body: '#2a2a2a',
  lid: '#1a1a1a',
  label: '#e8e4dc',
  text: '#1a1a1a',
  accent: '#888',
}

function shortName(name: string): string {
  return name.length > 14 ? `${name.slice(0, 12)}…` : name
}

export function FilmCanister({
  film,
  size = 64,
}: {
  film: FilmRecipe
  size?: number
}) {
  const t = themes[film.brand] ?? fallback
  const w = size
  const h = size * 1.15
  const label = shortName(film.name)

  return (
    <svg
      className="film-can"
      width={w}
      height={h}
      viewBox="0 0 80 92"
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id={`can-${film.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* body */}
      <rect x="14" y="18" width="52" height="68" rx="6" fill={t.body} />
      <rect
        x="14"
        y="18"
        width="52"
        height="68"
        rx="6"
        fill={`url(#can-${film.id})`}
      />
      {/* lid */}
      <rect x="12" y="10" width="56" height="14" rx="4" fill={t.lid} />
      <rect x="18" y="13" width="44" height="3" rx="1" fill="#000" opacity="0.2" />
      {/* label wrap */}
      <rect x="18" y="32" width="44" height="40" rx="2" fill={t.label} />
      {t.stripe && (
        <rect x="18" y="32" width="44" height="5" fill={t.stripe} opacity="0.85" />
      )}
      <text
        x="40"
        y={t.stripe ? 48 : 44}
        textAnchor="middle"
        fill={t.text}
        fontFamily="Instrument Sans, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="0.4"
      >
        {film.brand === 'Agfa / Rollei' ? 'AGFA' : film.brand.toUpperCase().slice(0, 10)}
      </text>
      <text
        x="40"
        y={t.stripe ? 58 : 54}
        textAnchor="middle"
        fill={t.text}
        fontFamily="Instrument Sans, sans-serif"
        fontSize="6.5"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x="40"
        y={t.stripe ? 67 : 63}
        textAnchor="middle"
        fill={t.accent}
        fontFamily="Instrument Sans, sans-serif"
        fontSize="7"
        fontWeight="700"
      >
        ISO {film.iso}
      </text>
      {/* film type dot */}
      <circle
        cx="58"
        cy="78"
        r="3"
        fill={film.type === 'bw' ? '#bbb' : t.accent}
      />
    </svg>
  )
}
