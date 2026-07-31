import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { readFavorites, writeFavorites } from './lib/favorites'

interface FavoritesContextValue {
  ids: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() =>
    typeof window !== 'undefined' ? readFavorites() : [],
  )

  useEffect(() => {
    writeFavorites(ids)
  }, [ids])

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids])

  const toggleFavorite = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev],
    )
  }, [])

  const value = useMemo(
    () => ({
      ids,
      isFavorite,
      toggleFavorite,
      count: ids.length,
    }),
    [ids, isFavorite, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
