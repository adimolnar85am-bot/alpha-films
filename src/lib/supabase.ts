import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

export const isSupabaseConfigured = Boolean(url && anonKey)

export type CommunityPostRow = {
  id: string
  film_id: string
  image_path: string
  caption: string | null
  created_at: string
}

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient(url, anonKey)
  }
  return client
}

export function communityImageUrl(path: string): string {
  const sb = getSupabase()
  if (!sb) return ''
  const { data } = sb.storage.from('community').getPublicUrl(path)
  return data.publicUrl
}

const MAX_BYTES = 5 * 1024 * 1024

export function validateCommunityImage(file: File): string | null {
  if (!file.type.startsWith('image/')) return 'invalid_type'
  if (file.size > MAX_BYTES) return 'too_large'
  return null
}

export { MAX_BYTES as COMMUNITY_MAX_IMAGE_BYTES }
