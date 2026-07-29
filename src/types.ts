export type FilmType = 'bw' | 'color'
export type GrainLevel = 'fine' | 'medium' | 'pronounced' | 'heavy'
export type ContrastCharacter = 'flat' | 'soft' | 'balanced' | 'punchy' | 'hard'
export type ToneBias = 'low-key' | 'mid' | 'high-key'
export type FilmEra = 'classic' | 'modern' | 'cinema' | 'experimental'

export type PpGamma =
  | 'Movie'
  | 'Still'
  | 'Cine1'
  | 'Cine2'
  | 'Cine3'
  | 'Cine4'
  | 'ITU709'

export type PpColorMode =
  | 'Black & White'
  | 'Still'
  | 'Cinema'
  | 'Pro'
  | 'Movie'
  | 'ITU709 Matrix'

export type BlackGammaRange = 'Wide' | 'Middle' | 'Narrow'

export interface ColorDepth {
  r: number
  g: number
  b: number
  c: number
  m: number
  y: number
}

/** Picture Profile — Sony A7 III (PP1–PP10) */
export interface SonyPictureProfile {
  slot: string
  blackLevel: number
  gamma: PpGamma
  blackGammaRange: BlackGammaRange
  blackGammaLevel: number
  kneeMode: 'Auto' | 'Manual'
  kneePoint?: number
  kneeSlope?: number
  colorMode: PpColorMode
  saturation: number
  colorPhase: number
  colorDepth?: ColorDepth
  detail: number
  detailMode?: 'Manual'
  vhBalance?: number
  bwBalance?: 'Type1' | 'Type2' | 'Type3' | 'Type4' | 'Type5'
  limit?: number
  crispening?: number
  highlightDetail?: number
}

export type CreativeLookName =
  | 'BW'
  | 'ST'
  | 'NT'
  | 'VV'
  | 'VV2'
  | 'FL'
  | 'IN'
  | 'SH'

export interface SonyCreativeLook {
  look: CreativeLookName
  contrast: number
  highlights: number
  shadows: number
  blacks: number
  saturation: number
  clarity: number
  sharpness: number
}

export type CreativeStyleName =
  | 'Black & White'
  | 'Standard'
  | 'Vivid'
  | 'Neutral'
  | 'Clear'
  | 'Deep'
  | 'Light'
  | 'Portrait'
  | 'Landscape'
  | 'Sunset'
  | 'Autumn Leaves'

export interface SonyCreativeStyle {
  style: CreativeStyleName
  contrast: number
  saturation: number
  sharpness: number
}

export interface FilmRecipe {
  id: string
  name: string
  brand: string
  type: FilmType
  iso: number
  grain: GrainLevel
  contrast: ContrastCharacter
  tone: ToneBias
  era: FilmEra
  discontinued?: boolean
  summary: string
  character: string
  bestFor: string[]
  pictureProfile: SonyPictureProfile
  creativeLook: SonyCreativeLook
  creativeStyle: SonyCreativeStyle
  tips: string[]
  filterHint?: string
  /** Approximate hue accents for UI swatch (color films) */
  palette?: [string, string, string, string]
}

export type Subject =
  | 'portrait'
  | 'street'
  | 'landscape'
  | 'architecture'
  | 'documentary'
  | 'studio'

export type Mood = 'soft' | 'documentary' | 'dramatic' | 'cinematic' | 'vintage'
