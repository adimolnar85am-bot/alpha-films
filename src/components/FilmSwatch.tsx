import type { FilmRecipe } from '../types'

/** Approximate tonal response from A7 III Picture Profile */
export function tonalStops(film: FilmRecipe): string[] {
  const { blackLevel, blackGammaLevel, kneeSlope = 0, gamma } =
    film.pictureProfile

  const gammaBias =
    gamma === 'Cine1' || gamma === 'Cine2'
      ? 12
      : gamma === 'Cine3' || gamma === 'Cine4'
        ? -4
        : 0

  const lift = (v: number) => Math.max(0, Math.min(255, Math.round(v)))

  const black = lift(10 + blackLevel * 3 - blackGammaLevel * 2)
  const shadow = lift(42 + blackLevel * 2 + blackGammaLevel * 4 + gammaBias)
  const lowMid = lift(86 + blackGammaLevel * 2 + gammaBias * 0.5)
  const mid = lift(128 + gammaBias * 0.3)
  const highMid = lift(170 - kneeSlope * 4)
  const high = lift(208 - kneeSlope * 6 + (gamma === 'Still' ? 4 : 0))
  const nearWhite = lift(236 - Math.max(0, -kneeSlope) * 3)
  const white = lift(250)

  return [black, shadow, lowMid, mid, highMid, high, nearWhite, white].map(
    (n) => `rgb(${n},${n},${n})`,
  )
}

export function FilmSwatch({
  film,
  large = false,
}: {
  film: FilmRecipe
  large?: boolean
}) {
  if (film.type === 'color' && film.palette) {
    return (
      <div className={large ? 'detail-swatch swatch' : 'swatch'} aria-hidden>
        <div className="swatch-bars swatch-bars-color">
          {film.palette.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
        {!large && <div className="swatch-meta">ISO {film.iso}</div>}
      </div>
    )
  }

  const stops = tonalStops(film)
  return (
    <div className={large ? 'detail-swatch swatch' : 'swatch'} aria-hidden>
      <div className="swatch-bars">
        {stops.map((c, i) => (
          <span key={i} style={{ background: c }} />
        ))}
      </div>
      {!large && <div className="swatch-meta">ISO {film.iso}</div>}
    </div>
  )
}
