import { Sheet } from './Sheet'

export function PrivacyPolicy({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  const sections = [
    {
      title: 'Ce colectăm',
      body: 'Favoritele se salvează local pe dispozitiv. În comunitate, pozele și caption-urile pe care le încarci sunt stocate pe Supabase.',
    },
    {
      title: 'Conturi',
      body: 'Nu există autentificare. Upload-ul comunității este anonim.',
    },
    {
      title: 'Imagini',
      body: 'Încarcă doar conținut pe care ai dreptul să-l publici. Ne rezervăm dreptul să ștergem conținut abuziv.',
    },
    {
      title: 'Date tehnice',
      body: 'Hosting-ul (ex. Vercel) poate înregistra loguri standard de acces.',
    },
    {
      title: 'Contact',
      body: 'Pentru ștergerea unei poze din comunitate, contactează autorul aplicației.',
    },
  ]

  return (
    <Sheet open={open} onClose={onClose} title="Politică de confidențialitate">
      <p className="privacy-updated">Actualizat 2026</p>
      {sections.map((s) => (
        <section key={s.title} className="privacy-block">
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </section>
      ))}
      <button type="button" className="chip sheet-close-btn" onClick={onClose}>
        Închide
      </button>
    </Sheet>
  )
}
