import type { FilmRecipe } from '../types'

export type RefContext = 'street' | 'portrait' | 'studio'

export const refContexts: { id: RefContext; label: string; src: string }[] = [
  { id: 'street', label: 'Stradă', src: '/references/ref-street-base.png' },
  { id: 'portrait', label: 'Portret', src: '/references/ref-portrait-base.png' },
  { id: 'studio', label: 'Studio', src: '/references/ref-studio-base.png' },
]

/** CSS filter stack approximating A7 III Picture Profile + film character */
export function filmGradeFilter(film: FilmRecipe): string {
  const pp = film.pictureProfile
  const isColor = film.type === 'color'

  const contrast =
    film.contrast === 'hard' || film.contrast === 'punchy'
      ? 1.22
      : film.contrast === 'soft' || film.contrast === 'flat'
        ? 0.88
        : 1.05

  const brightness = 1 + pp.blackLevel / 35 + pp.blackGammaLevel / 50

  const sat = isColor
    ? Math.max(0.25, Math.min(1.75, 1 + pp.saturation / 32))
    : 0

  const parts: string[] = []

  if (!isColor) {
    parts.push('grayscale(1)')
  }

  if (isColor && pp.colorPhase) {
    parts.push(`hue-rotate(${pp.colorPhase * 5}deg)`)
    if (pp.colorPhase > 0) parts.push(`sepia(${Math.min(0.25, pp.colorPhase / 25)})`)
  } else if (isColor) {
    parts.push('sepia(0.06)')
  }

  if (pp.colorDepth) {
    const d = pp.colorDepth
    const warm = (d.r + d.y) - (d.b + d.c)
    if (warm > 2) parts.push(`sepia(${Math.min(0.2, warm / 30)})`)
    if (warm < -2) parts.push(`hue-rotate(${warm * 2}deg)`)
  }

  parts.push(`contrast(${contrast})`)
  parts.push(`saturate(${sat})`)
  parts.push(`brightness(${brightness})`)

  if (film.tone === 'low-key') parts.push('brightness(0.92)')
  if (film.tone === 'high-key') parts.push('brightness(1.08)')

  if (pp.gamma === 'Cine1' || pp.gamma === 'Cine2') {
    parts.push('contrast(0.95)')
  }
  if (pp.gamma === 'Cine4') {
    parts.push('contrast(1.05)')
  }

  return parts.join(' ')
}

export function grainOpacity(film: FilmRecipe): number {
  switch (film.grain) {
    case 'fine':
      return 0.12
    case 'medium':
      return 0.2
    case 'pronounced':
      return 0.32
    case 'heavy':
      return 0.45
    default:
      return 0.18
  }
}
