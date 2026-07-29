import { films } from '../data/films'
import type { FilmRecipe, FilmType, Mood, Subject } from '../types'

const moodMatch: Record<Mood, (f: FilmRecipe) => number> = {
  soft: (f) =>
    (f.contrast === 'soft' || f.contrast === 'flat' ? 3 : 0) +
    (f.grain === 'fine' ? 2 : 0) +
    (f.tone === 'high-key' ? 1 : 0),
  documentary: (f) =>
    (f.era === 'classic' ? 2 : 0) +
    (f.grain === 'pronounced' || f.grain === 'medium' ? 2 : 0) +
    (f.bestFor.includes('documentary') || f.bestFor.includes('street') ? 3 : 0),
  dramatic: (f) =>
    (f.contrast === 'punchy' || f.contrast === 'hard' ? 3 : 0) +
    (f.tone === 'low-key' ? 2 : 0) +
    (f.pictureProfile.blackLevel <= -2 ? 1 : 0),
  cinematic: (f) =>
    (f.era === 'cinema' ? 4 : 0) +
    (f.brand === 'CineStill' ? 3 : 0) +
    (f.contrast === 'punchy' || f.contrast === 'soft' ? 1 : 0),
  vintage: (f) =>
    (f.discontinued ? 3 : 0) +
    (f.era === 'classic' ? 2 : 0) +
    (f.grain === 'pronounced' || f.grain === 'heavy' ? 2 : 0),
}

export function generateRecipes(
  subject: Subject,
  mood: Mood,
  isoPref: 'any' | 'slow' | 'fast',
  limit = 3,
  filmType: 'all' | FilmType = 'all',
): FilmRecipe[] {
  return [...films]
    .filter((f) => filmType === 'all' || f.type === filmType)
    .map((film) => {
      let score = moodMatch[mood](film)
      if (film.bestFor.includes(subject)) score += 4
      if (isoPref === 'slow' && film.iso <= 125) score += 3
      if (isoPref === 'fast' && film.iso >= 400) score += 3
      if (isoPref === 'any') score += 1
      return { film, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.film)
}

export function formatSigned(n: number): string {
  if (n > 0) return `+${n}`
  return String(n)
}
