import type { FilmRecipe, SonyPictureProfile } from '../types'

/** Sony A7 III Picture Profile value limits */
export const A7III_LIMITS = {
  blackLevel: { min: -15, max: 15 },
  blackGammaLevel: { min: -7, max: 7 },
  kneeSlope: { min: -5, max: 5 },
  kneePoint: { min: 0, max: 100, step: 2.5 },
  saturation: { min: -32, max: 32 },
  colorPhase: { min: -7, max: 7 },
  colorDepth: { min: -7, max: 7 },
  detail: { min: -7, max: 7 },
  crispening: { min: -7, max: 7 },
  limit: { min: 0, max: 7 },
  highlightDetail: { min: -7, max: 7 },
} as const

export type ValidationIssue = {
  filmId: string
  field: string
  value: unknown
  message: string
  severity: 'error' | 'warn'
}

function inRange(
  v: number,
  min: number,
  max: number,
  field: string,
  filmId: string,
): ValidationIssue | null {
  if (v < min || v > max) {
    return {
      filmId,
      field,
      value: v,
      message: `${field}=${v} în afara intervalului A7 III [${min}, ${max}]`,
      severity: 'error',
    }
  }
  return null
}

export function validatePictureProfile(
  filmId: string,
  pp: SonyPictureProfile,
  type: FilmRecipe['type'],
): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  const checks: [number | undefined, keyof typeof A7III_LIMITS][] = [
    [pp.blackLevel, 'blackLevel'],
    [pp.blackGammaLevel, 'blackGammaLevel'],
    [pp.kneeSlope, 'kneeSlope'],
    [pp.saturation, 'saturation'],
    [pp.colorPhase, 'colorPhase'],
    [pp.detail, 'detail'],
    [pp.crispening, 'crispening'],
    [pp.limit, 'limit'],
    [pp.highlightDetail, 'highlightDetail'],
  ]

  for (const [v, key] of checks) {
    if (v == null) continue
    const lim = A7III_LIMITS[key]
    const err = inRange(v, lim.min, lim.max, key, filmId)
    if (err) issues.push(err)
  }

  if (pp.kneePoint != null) {
    const err = inRange(pp.kneePoint, 0, 100, 'kneePoint', filmId)
    if (err) issues.push(err)
    else if (pp.kneePoint % 2.5 !== 0) {
      issues.push({
        filmId,
        field: 'kneePoint',
        value: pp.kneePoint,
        message: `Knee Point trebuie multiplu de 2.5% pe A7 III`,
        severity: 'warn',
      })
    }
  }

  if (pp.colorDepth) {
    for (const ch of ['r', 'g', 'b', 'c', 'm', 'y'] as const) {
      const v = pp.colorDepth[ch]
      const err = inRange(v, -7, 7, `colorDepth.${ch}`, filmId)
      if (err) issues.push(err)
    }
  }

  if (type === 'bw') {
    if (pp.colorMode !== 'Black & White') {
      issues.push({
        filmId,
        field: 'colorMode',
        value: pp.colorMode,
        message: 'Filme B&W necesită Color Mode: Black & White',
        severity: 'error',
      })
    }
    if (pp.saturation !== -32) {
      issues.push({
        filmId,
        field: 'saturation',
        value: pp.saturation,
        message: 'Pe A7 III, B&W funcționează corect cu Saturation -32',
        severity: 'warn',
      })
    }
  }

  if (type === 'color' && pp.colorMode === 'Black & White') {
    issues.push({
      filmId,
      field: 'colorMode',
      value: pp.colorMode,
      message: 'Film color nu trebuie Color Mode B&W',
      severity: 'error',
    })
  }

  return issues
}

export function validateAllFilms(films: FilmRecipe[]): ValidationIssue[] {
  return films.flatMap((f) => validatePictureProfile(f.id, f.pictureProfile, f.type))
}

/** Notes shown in UI — PP emulates tone/grain/contrast, not chemical emulsion */
export const A7III_EMULATION_NOTE =
  'Picture Profile pe A7 III controlează ton, contrast, saturație și claritate în JPEG/EVF. Granulația și halation-ul chimic al filmului real se apropie cel mai mult la ISO recomandat + post-procesare ușoară.'
