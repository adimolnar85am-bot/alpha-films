import { bwFilms } from './films-bw'
import { colorFilms } from './films-color'
import type { FilmRecipe } from '../types'

export const films: FilmRecipe[] = [...bwFilms, ...colorFilms]

export const subjects = [
  { id: 'portrait' as const, label: 'Portret' },
  { id: 'street' as const, label: 'Street' },
  { id: 'landscape' as const, label: 'Peisaj' },
  { id: 'architecture' as const, label: 'Arhitectură' },
  { id: 'documentary' as const, label: 'Documentar' },
  { id: 'studio' as const, label: 'Studio' },
]

export const moods = [
  { id: 'soft' as const, label: 'Soft' },
  { id: 'documentary' as const, label: 'Documentar' },
  { id: 'dramatic' as const, label: 'Dramatic' },
  { id: 'cinematic' as const, label: 'Cinema' },
  { id: 'vintage' as const, label: 'Vintage' },
]

export const grainLabels: Record<string, string> = {
  fine: 'Fin',
  medium: 'Mediu',
  pronounced: 'Pronunțat',
  heavy: 'Greu',
}

export const contrastLabels: Record<string, string> = {
  flat: 'Plat',
  soft: 'Moale',
  balanced: 'Echilibrat',
  punchy: 'Punchy',
  hard: 'Dur',
}
