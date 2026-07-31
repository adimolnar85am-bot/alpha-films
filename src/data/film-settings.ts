import type { SonyPictureProfile } from '../types'

export interface FilmCaptureSettings {
  whiteBalance: string
  whiteBalanceKelvin: number
  recommendedIso: number
  isoRange?: string
  bwBalance?: SonyPictureProfile['bwBalance']
  notes?: string
}

export const captureSettings: Record<string, FilmCaptureSettings> = {
  'tri-x-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'hp5-plus-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–3200', bwBalance: 'Type2' },
  'tmax-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'tmax-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1' },
  'delta-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'delta-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1' },
  'fp4-plus-125': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 125, isoRange: '125–800', bwBalance: 'Type1' },
  'pan-f-50': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 50, isoRange: '50–800', bwBalance: 'Type1' },
  'acros-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'neopan-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'apx-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'apx-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1' },
  'rpx-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'rpx-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1' },
  'fomapan-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'fomapan-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'plus-x-125': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 125, isoRange: '125–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'double-x-5222': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 250, isoRange: '250–1600', bwBalance: 'Type1', notes: 'Cinema B&W; ISO 800+ pentru grit.' },
  'ortho-plus': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 80, isoRange: '80–200', bwBalance: 'Type1', notes: 'Fără filtru roșu; piele mai închisă.' },
  'sfx-200': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 200, bwBalance: 'Type4', notes: 'Filtru roșu + B/W Balance Type4 pe A7 III.' },
  'bergger-pancro-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'adox-chs-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'kentmere-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800', bwBalance: 'Type1' },
  'kentmere-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1' },
  'shanghai-gp3': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type2', notes: 'B/W Balance Type2 ≈ filtru galben.' },
  'rollei-infrared': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, bwBalance: 'Type4', notes: 'Filtru roșu + B/W Balance Type4 pe A7 III.' },
  'ilford-pan-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–3200', bwBalance: 'Type2' },
  'adoz-silvermax': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1' },
  'cinema-xx': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600', bwBalance: 'Type1', notes: 'Cinema B&W; ISO 800+ pentru grit.' },
  'orwo-n74': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 74, isoRange: '74–1600', bwBalance: 'Type1', notes: 'Cinema B&W; ISO 800+ pentru grit.' },
  'cinestill-50d': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 50, isoRange: '50–200' },
  'cinestill-400d': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600' },
  'cinestill-800t': { whiteBalance: 'Tungsten', whiteBalanceKelvin: 3200, recommendedIso: 800, isoRange: '800–3200', notes: 'WB Tungsten obligatoriu pentru look autentic.' },
  'cinestill-bwxx': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 250, isoRange: '250–1600', bwBalance: 'Type1', notes: 'Cinema B&W; ISO 800+ pentru grit.' },
  'fuji-velvia-50': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 50, notes: 'Lumină zilei pentru saturație maximă.' },
  'fuji-velvia-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, notes: 'Lumină zilei pentru saturație maximă.' },
  'fuji-provia-100f': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, isoRange: '100–800' },
  'fuji-astia-100f': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5400, recommendedIso: 100, isoRange: '100–400', notes: 'Lumină difuză; tonuri soft.' },
  'fuji-pro400h': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 400, isoRange: '400–1600', notes: '5200K — verde-cyan tipic Fuji portret.' },
  'fuji-pro160ns': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 160, isoRange: '160–1600', notes: '5200K — verde-cyan tipic Fuji portret.' },
  'fuji-superia-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–800' },
  'fuji-natura-1600': { whiteBalance: 'Auto', whiteBalanceKelvin: 4500, recommendedIso: 1600, isoRange: '1600–3200', notes: 'Lumină slabă; grain acceptat.' },
  'fuji-reala-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5400, recommendedIso: 100, isoRange: '100–400', notes: 'Lumină difuză; tonuri soft.' },
  'fuji-c200': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 200, isoRange: '200–800' },
  'kodak-portra-160': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 160, isoRange: '160–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-portra-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 400, isoRange: '400–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-portra-800': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 800, isoRange: '800–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-ektar-100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, notes: 'Expunere precisă; slide/negativ saturat.' },
  'kodak-gold-200': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5600, recommendedIso: 200, isoRange: '200–800', notes: '5600K accentuează tonurile calde Gold.' },
  'kodak-ultramax-400': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, isoRange: '400–1600' },
  'kodak-ektachrome-e100': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, notes: 'Expunere precisă; slide/negativ saturat.' },
  'kodak-portra-160nc': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 160, isoRange: '160–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-portra-160vc': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 160, isoRange: '160–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-portra-400nc': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 400, isoRange: '400–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-portra-400vc': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 400, isoRange: '400–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-portra-400uc': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 400, isoRange: '400–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-kodachrome-64': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 64, notes: 'Expunere precisă; slide/negativ saturat.' },
  'kodak-kodachrome-25': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 25, notes: 'Expunere precisă; slide/negativ saturat.' },
  'kodak-e100vs': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 100, notes: 'Lumină zilei pentru saturație maximă.' },
  'kodak-vericolor-iii': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5200, recommendedIso: 400, isoRange: '400–1600', notes: '5200K pentru tonuri de piele naturale.' },
  'kodak-aerochrome': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 400, bwBalance: 'Type4', notes: 'Filtru roșu + B/W Balance Type4 pe A7 III.' },
  'kodak-vision3-250d': { whiteBalance: 'Daylight', whiteBalanceKelvin: 5500, recommendedIso: 250, isoRange: '250–800' },
  'kodak-vision3-500t': { whiteBalance: 'Tungsten', whiteBalanceKelvin: 3200, recommendedIso: 800, isoRange: '800–3200', notes: 'WB Tungsten obligatoriu pentru look autentic.' },
}

export function getCaptureSettings(filmId: string): FilmCaptureSettings | undefined {
  return captureSettings[filmId]
}
