import { useMemo, useState } from 'react'
import { moods, subjects } from '../data/films'
import { generateRecipes } from '../lib/generate'
import type { FilmType, Mood, Subject } from '../types'

export function Generator({
  onSelect,
}: {
  onSelect: (id: string) => void
}) {
  const [subject, setSubject] = useState<Subject>('street')
  const [mood, setMood] = useState<Mood>('documentary')
  const [isoPref, setIsoPref] = useState<'any' | 'slow' | 'fast'>('any')
  const [filmType, setFilmType] = useState<'all' | FilmType>('all')

  const results = useMemo(
    () => generateRecipes(subject, mood, isoPref, 3, filmType),
    [subject, mood, isoPref, filmType],
  )

  return (
    <div className="generator">
      <h1>Generator</h1>
      <p>
        Alege tipul, subiectul și atmosfera — generăm rețete Picture Profile
        pentru Sony A7 III.
      </p>

      <div className="field">
        <label>Tip</label>
        <div className="choice-grid">
          {(
            [
              ['all', 'Toate'],
              ['color', 'Color'],
              ['bw', 'B&W'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="chip"
              aria-pressed={filmType === id}
              onClick={() => setFilmType(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Subiect</label>
        <div className="choice-grid">
          {subjects.map((s) => (
            <button
              key={s.id}
              type="button"
              className="chip"
              aria-pressed={subject === s.id}
              onClick={() => setSubject(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Atmosferă</label>
        <div className="choice-grid">
          {moods.map((m) => (
            <button
              key={m.id}
              type="button"
              className="chip"
              aria-pressed={mood === m.id}
              onClick={() => setMood(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>ISO preferat</label>
        <div className="choice-grid">
          {(
            [
              ['any', 'Oricare'],
              ['slow', 'Lent ≤125'],
              ['fast', 'Rapid ≥400'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="chip"
              aria-pressed={isoPref === id}
              onClick={() => setIsoPref(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="gen-results">
        {results.map((film, i) => (
          <button
            key={film.id}
            type="button"
            className="gen-card"
            onClick={() => onSelect(film.id)}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h2>
              {i + 1}. {film.brand} {film.name}
            </h2>
            <p>
              {film.type === 'color' ? 'Color' : 'B&W'} ·{' '}
              {film.pictureProfile.slot} · {film.pictureProfile.gamma} ·{' '}
              {film.summary}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
