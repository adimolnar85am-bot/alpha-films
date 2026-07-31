import { useState } from 'react'
import { PrivacyPolicy } from './PrivacyPolicy'

export function CopyrightFooter() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="copyright">
        <p>© {year} Alpha Films · All rights reserved</p>
        <p className="copyright-sub">
          Redistribuirea fără permisiune este interzisă.
        </p>
        <button
          type="button"
          className="copyright-link"
          onClick={() => setPrivacyOpen(true)}
        >
          Confidențialitate
        </button>
      </footer>
      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  )
}
