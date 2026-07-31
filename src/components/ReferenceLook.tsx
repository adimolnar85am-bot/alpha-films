import { useState } from 'react'
import type { FilmRecipe } from '../types'
import {
  filmGradeFilter,
  grainOpacity,
  refContexts,
  type RefContext,
} from '../lib/filmGrade'

export function ReferenceLook({ film }: { film: FilmRecipe }) {
  const [ctx, setCtx] = useState<RefContext>('street')
  const active = refContexts.find((c) => c.id === ctx) ?? refContexts[0]
  const filter = filmGradeFilter(film)
  const grain = grainOpacity(film)

  return (
    <figure className="ref-look">
      <div className="ref-tabs" role="tablist" aria-label="Context referință">
        {refContexts.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={ctx === c.id}
            className="ref-tab"
            onClick={() => setCtx(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="ref-frame">
        <img
          src={active.src}
          alt={`Referință ${active.label} — ${film.brand} ${film.name}`}
          className="ref-photo"
          style={{ filter }}
          loading="lazy"
          draggable={false}
        />
        <div className="ref-grain" style={{ opacity: grain }} />
        <div className="ref-watermark">© Alpha Films</div>
      </div>

      <figcaption>
        <span>
          Look simulat · {film.brand} {film.name} · {active.label}
        </span>
        <span className="ref-note">
          Poze AI de referință, grade cu setările PP
        </span>
      </figcaption>
    </figure>
  )
}
