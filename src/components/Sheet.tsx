import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function useBodyScrollLock(locked: boolean, className = 'sheet-open') {
  useEffect(() => {
    if (!locked) return
    const scrollY = window.scrollY
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevWidth = document.body.style.width
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.classList.add(className)
    document.documentElement.classList.add(className)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.width = prevWidth
      document.body.classList.remove(className)
      document.documentElement.classList.remove(className)
      window.scrollTo(0, scrollY)
    }
  }, [locked, className])
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  variant = 'default',
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  variant?: 'default' | 'form'
}) {
  useBodyScrollLock(open)
  if (!open) return null

  const panelClass =
    variant === 'form' ? 'sheet-panel sheet-panel--form' : 'sheet-panel'

  return createPortal(
    <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="sheet-backdrop"
        onClick={onClose}
        aria-label="Închide"
      />
      <div className={panelClass}>
        <div className="sheet-handle" aria-hidden="true" />
        {title ? <h2 className="sheet-title">{title}</h2> : null}
        <div className="sheet-body">{children}</div>
        {footer ? <div className="sheet-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
