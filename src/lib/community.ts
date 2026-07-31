import {
  communityImageUrl,
  getSupabase,
  validateCommunityImage,
  type CommunityPostRow,
} from './supabase'

export type CommunityPost = {
  id: string
  filmId: string
  imageUrl: string
  caption: string | null
  createdAt: string
}

function mapPost(row: CommunityPostRow): CommunityPost {
  return {
    id: row.id,
    filmId: row.film_id,
    imageUrl: communityImageUrl(row.image_path),
    caption: row.caption,
    createdAt: row.created_at,
  }
}

export async function fetchCommunityPosts(): Promise<CommunityPost[]> {
  const sb = getSupabase()
  if (!sb) return []

  const { data, error } = await sb
    .from('community_posts')
    .select('id, film_id, image_path, caption, created_at')
    .order('created_at', { ascending: false })
    .limit(60)

  if (error) throw error
  return ((data ?? []) as CommunityPostRow[]).map(mapPost)
}

export async function uploadCommunityPost(input: {
  filmId: string
  file: File
  caption?: string
}): Promise<CommunityPost> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase not configured')

  const validation = validateCommunityImage(input.file)
  if (validation === 'invalid_type') throw new Error('Invalid image type')
  if (validation === 'too_large') throw new Error('Image too large (max 5 MB)')

  const ext = input.file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(ext)
    ? ext
    : 'jpg'
  const path = `uploads/${crypto.randomUUID()}.${safeExt}`

  const { error: uploadError } = await sb.storage
    .from('community')
    .upload(path, input.file, {
      cacheControl: '3600',
      upsert: false,
      contentType: input.file.type || `image/${safeExt}`,
    })

  if (uploadError) throw uploadError

  const { data, error } = await sb
    .from('community_posts')
    .insert({
      film_id: input.filmId,
      image_path: path,
      caption: input.caption?.trim() || null,
    })
    .select('id, film_id, image_path, caption, created_at')
    .single()

  if (error) {
    await sb.storage.from('community').remove([path])
    throw error
  }

  return mapPost(data as CommunityPostRow)
}
