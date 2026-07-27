import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  function addToFavorites(product) {
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product])
    }
  }

  function removeFromFavorites(id) {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  function isFavorite(id) {
    return favorites.some(fav => fav.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}