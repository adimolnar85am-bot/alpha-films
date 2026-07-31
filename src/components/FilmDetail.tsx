import { contrastLabels, grainLabels } from '../data/films'
import { getCaptureSettings } from '../data/film-settings'
import { formatSigned } from '../lib/generate'
import { A7III_EMULATION_NOTE, validatePictureProfile } from '../lib/a7iiiValidate'
import type { FilmRecipe, SonyPictureProfile } from '../types'
import { FilmCanister } from './FilmCanister'
import { FavoriteButton } from './FavoriteButton'
import { ReferenceLook } from './ReferenceLook'
import { useState } from 'react'

function ppLines(pp: SonyPictureProfile): string[] {
  const lines = [
    `Slot: ${pp.slot} (sau orice PP liber)`,
    `Black Level: ${formatSigned(pp.blackLevel)}`,
    `Gamma: ${pp.gamma}`,
    `Black Gamma · Range: ${pp.blackGammaRange}`,
    `Black Gamma · Level: ${formatSigned(pp.blackGammaLevel)}`,
    `Knee · Mode: ${pp.kneeMode}`,
  ]
  if (pp.kneeMode === 'Manual') {
    lines.push(`Knee · Point: ${pp.kneePoint}%`)
    lines.push(`Knee · Slope: ${formatSigned(pp.kneeSlope ?? 0)}`)
  }
  lines.push(
    `Color Mode: ${pp.colorMode}`,
    `Saturation: ${formatSigned(pp.saturation)}`,
    `Color Phase: ${formatSigned(pp.colorPhase)}`,
  )
  if (pp.colorDepth) {
    const d = pp.colorDepth
    lines.push(
      `Color Depth · R: ${formatSigned(d.r)}`,
      `Color Depth · G: ${formatSigned(d.g)}`,
      `Color Depth · B: ${formatSigned(d.b)}`,
      `Color Depth · C: ${formatSigned(d.c)}`,
      `Color Depth · M: ${formatSigned(d.m)}`,
      `Color Depth · Y: ${formatSigned(d.y)}`,
    )
  }
  lines.push(`Detail · Level: ${formatSigned(pp.detail)}`)
  if (pp.detailMode) {
    lines.push(`Detail · Mode: ${pp.detailMode}`)
    if (pp.crispening != null)
      lines.push(`Detail · Crispening: ${formatSigned(pp.crispening)}`)
    if (pp.limit != null) lines.push(`Detail · Limit: ${pp.limit}`)
    if (pp.highlightDetail != null)
      lines.push(
        `Detail · Hi-Light Detail: ${formatSigned(pp.highlightDetail)}`,
      )
  }
  return lines
}

function recipeText(film: FilmRecipe): string {
  const cl = film.creativeLook
  const cs = film.creativeStyle
  const lines = [
    `${film.brand} ${film.name} — Alpha Films`,
    `${film.type === 'color' ? 'Color' : 'B&W'} · Sony A7 III Picture Profile`,
    film.discontinued ? '(Film discontinuat — emulație)' : '',
    '© Alpha Films — All rights reserved',
    '',
    '—— Picture Profile ——',
    ...ppLines(film.pictureProfile),
    '',
    '—— Creative Style ——',
    `Style: ${cs.style}`,
    `Contrast: ${formatSigned(cs.contrast)}`,
    `Saturation: ${formatSigned(cs.saturation)}`,
    `Sharpness: ${formatSigned(cs.sharpness)}`,
    '',
    '—— Creative Look (A7 IV+) ——',
    `Look: ${cl.look}`,
    `Contrast: ${formatSigned(cl.contrast)}`,
    `Highlights: ${formatSigned(cl.highlights)}`,
    `Shadows: ${formatSigned(cl.shadows)}`,
    `Blacks: ${formatSigned(cl.blacks)}`,
    `Saturation: ${formatSigned(cl.saturation)}`,
    `Clarity: ${formatSigned(cl.clarity)}`,
    `Sharpness: ${formatSigned(cl.sharpness)}`,
  ].filter((l) => l !== '')
  if (film.filterHint) lines.push('', `Filtru: ${film.filterHint}`)
  const cap = getCaptureSettings(film.id)
  if (cap) {
    lines.push('', '—— Setări cameră A7 III ——')
    lines.push(`White Balance: ${cap.whiteBalance} (${cap.whiteBalanceKelvin}K)`)
    lines.push(`ISO recomandat: ${cap.recommendedIso}`)
    if (cap.isoRange) lines.push(`Interval ISO: ${cap.isoRange}`)
    if (cap.bwBalance) lines.push(`B/W Balance: ${cap.bwBalance}`)
    if (cap.notes) lines.push(`Notă: ${cap.notes}`)
  }
  return lines.join('\n')
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="setting">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function FilmDetail({
  film,
  onBack,
}: {
  film: FilmRecipe
  onBack: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [showAlt, setShowAlt] = useState(false)
  const pp = film.pictureProfile
  const cap = getCaptureSettings(film.id)
  const validation = validatePictureProfile(film.id, pp, film.type)
  const isValid = validation.every((v) => v.severity !== 'error')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(recipeText(film))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <article className="detail">
      <button type="button" className="back" onClick={onBack}>
        ← Bibliotecă
      </button>

      <div className="detail-hero">
        <div className="detail-can-wrap">
          <FavoriteButton filmId={film.id} className="detail-fav" />
          <FilmCanister film={film} size={110} />
        </div>
        <div>
          <h1>{film.name}</h1>
          <p className="brand-line">
            {film.brand} · ISO {film.iso} · A7 III PP
          </p>
          <div className="tags">
            <span className="tag">{film.type === 'color' ? 'Color' : 'B&W'}</span>
            {film.discontinued && <span className="tag">Discontinued</span>}
            <span className="tag">{grainLabels[film.grain]}</span>
            <span className="tag">{contrastLabels[film.contrast]}</span>
            <span className="tag">{pp.slot}</span>
            <span className="tag">{pp.gamma}</span>
          </div>
        </div>
      </div>

      <ReferenceLook film={film} />

      {cap && (
        <section className="section capture-section">
          <h3>Setări cameră · A7 III</h3>
          <div className="settings">
            <Setting
              label="White Balance"
              value={`${cap.whiteBalance} · ${cap.whiteBalanceKelvin}K`}
            />
            <Setting label="ISO recomandat" value={String(cap.recommendedIso)} />
            {cap.isoRange && (
              <Setting label="Interval ISO" value={cap.isoRange} />
            )}
            {cap.bwBalance && film.type === 'bw' && (
              <Setting label="B/W Balance (PP)" value={cap.bwBalance} />
            )}
          </div>
          {cap.notes && <p className="section-note">{cap.notes}</p>}
        </section>
      )}

      <div className={`valid-badge ${isValid ? 'valid-ok' : 'valid-warn'}`}>
        {isValid ? '✓ Verificat pentru Sony A7 III' : '⚠ Verifică setările PP'}
      </div>
      <p className="section-note emulation-note">{A7III_EMULATION_NOTE}</p>

      <p className="prose">{film.character}</p>

      <section className="section">
        <h3>Picture Profile · Sony A7 III</h3>
        <p className="section-note">
          Menu → Camera Settings 1 → Picture Profile → slot liber → copiază
          valorile.
        </p>
        <div className="settings">
          <Setting label="Slot sugerat" value={pp.slot} />
          <Setting label="Black Level" value={formatSigned(pp.blackLevel)} />
          <Setting label="Gamma" value={pp.gamma} />
          <Setting label="Black Gamma · Range" value={pp.blackGammaRange} />
          <Setting
            label="Black Gamma · Level"
            value={formatSigned(pp.blackGammaLevel)}
          />
          <Setting label="Knee · Mode" value={pp.kneeMode} />
          {pp.kneeMode === 'Manual' && (
            <>
              <Setting label="Knee · Point" value={`${pp.kneePoint}%`} />
              <Setting
                label="Knee · Slope"
                value={formatSigned(pp.kneeSlope ?? 0)}
              />
            </>
          )}
          <Setting label="Color Mode" value={pp.colorMode} />
          <Setting label="Saturation" value={formatSigned(pp.saturation)} />
          <Setting label="Color Phase" value={formatSigned(pp.colorPhase)} />
          {pp.colorDepth && (
            <>
              <Setting label="Color Depth · R" value={formatSigned(pp.colorDepth.r)} />
              <Setting label="Color Depth · G" value={formatSigned(pp.colorDepth.g)} />
              <Setting label="Color Depth · B" value={formatSigned(pp.colorDepth.b)} />
              <Setting label="Color Depth · C" value={formatSigned(pp.colorDepth.c)} />
              <Setting label="Color Depth · M" value={formatSigned(pp.colorDepth.m)} />
              <Setting label="Color Depth · Y" value={formatSigned(pp.colorDepth.y)} />
            </>
          )}
          <Setting label="Detail · Level" value={formatSigned(pp.detail)} />
          {pp.detailMode && (
            <>
              <Setting label="Detail · Mode" value={pp.detailMode} />
              {pp.crispening != null && (
                <Setting
                  label="Detail · Crispening"
                  value={formatSigned(pp.crispening)}
                />
              )}
              {pp.limit != null && (
                <Setting label="Detail · Limit" value={String(pp.limit)} />
              )}
              {pp.highlightDetail != null && (
                <Setting
                  label="Detail · Hi-Light"
                  value={formatSigned(pp.highlightDetail)}
                />
              )}
            </>
          )}
          {cap?.bwBalance && film.type === 'bw' && (
            <Setting label="B/W Balance" value={cap.bwBalance} />
          )}
        </div>
      </section>

      <button type="button" className="copy-btn" onClick={copy}>
        {copied ? 'Copiat ✓' : 'Copiază Picture Profile'}
      </button>

      {(film.tips.length > 0 || film.filterHint) && (
        <section className="section">
          <h3>Sfaturi A7 III</h3>
          <ul className="tips">
            {film.filterHint && <li>Filtru: {film.filterHint}</li>}
            {film.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <button
          type="button"
          className="alt-toggle"
          aria-expanded={showAlt}
          onClick={() => setShowAlt((v) => !v)}
        >
          {showAlt ? '−' : '+'} Creative Style / Creative Look
        </button>
        {showAlt && (
          <>
            <h3>Creative Style</h3>
            <div className="settings">
              <Setting label="Style" value={film.creativeStyle.style} />
              <Setting
                label="Contrast"
                value={formatSigned(film.creativeStyle.contrast)}
              />
              <Setting
                label="Saturation"
                value={formatSigned(film.creativeStyle.saturation)}
              />
              <Setting
                label="Sharpness"
                value={formatSigned(film.creativeStyle.sharpness)}
              />
            </div>
            <h3>Creative Look (A7 IV+)</h3>
            <div className="settings">
              <Setting label="Look" value={film.creativeLook.look} />
              <Setting
                label="Contrast"
                value={formatSigned(film.creativeLook.contrast)}
              />
              <Setting
                label="Highlights"
                value={formatSigned(film.creativeLook.highlights)}
              />
              <Setting
                label="Shadows"
                value={formatSigned(film.creativeLook.shadows)}
              />
              <Setting
                label="Blacks"
                value={formatSigned(film.creativeLook.blacks)}
              />
              <Setting
                label="Saturation"
                value={formatSigned(film.creativeLook.saturation)}
              />
              <Setting
                label="Clarity"
                value={formatSigned(film.creativeLook.clarity)}
              />
              <Setting
                label="Sharpness"
                value={formatSigned(film.creativeLook.sharpness)}
              />
            </div>
          </>
        )}
      </section>
    </article>
  )
}
