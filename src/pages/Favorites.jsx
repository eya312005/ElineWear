import { useFavorites } from '../context/FavoritesContext.jsx'
import { Link } from 'react-router-dom'
import '../pages/Favorites.css'

function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites()

  return (
    <div className="favorites-page">
      <h1>Favoris</h1>
      {favorites.length === 0 ? (
        <p className="empty-message">Aucun produit en favoris pour le moment.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>
                <h2>{product.name}</h2>
                <p>{product.price} dt</p>
              </Link>
              <button
                className="btn-icon btn-favorite active"
                aria-label="Retirer des favoris"
                onClick={() => removeFromFavorites(product.id)}>
                ♥
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites