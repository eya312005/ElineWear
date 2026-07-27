import { Link } from 'react-router-dom'
import './Home.css'
import products from '../data/products.js'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

function Home() {
  const featuredProducts = products.slice(10, 17)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [selectedSizes, setSelectedSizes] = useState({})

  function toggleFavorite(e, product) {
    e.stopPropagation()
    e.preventDefault()
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  function handleAddToCart(e, product) {
    e.stopPropagation()
    e.preventDefault()
    const size = product.sizes ? (selectedSizes[product.id] || product.sizes[0]) : null
    addToCart(product, size)
  }

  return (
    <div className="home">
      <section className="hero">
        <img src="/images/hero.jpg" alt="Hero" />
        <div className="hero-text">
          <h1>Élégance intemporelle</h1>
          <p>Découvrez notre nouvelle collection</p>
          <Link to="/catalogue">Catalogue</Link>
        </div>
      </section>

      <section className="featured">
        <h2>Nos produits phares</h2>
        <div className="featured-items">
          {featuredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="card-image-wrap">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <button
                  className={`heart-float ${isFavorite(product.id) ? 'active' : ''}`}
                  aria-label={isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  onClick={(e) => toggleFavorite(e, product)}>
                  {isFavorite(product.id) ? '♥' : '♡'}
                </button>
              </div>

              <div className="card-body">
                <Link to={`/product/${product.id}`} className="card-title-link">
                  <h3>{product.name}</h3>
                </Link>
                <span className="price-badge">{product.price} dt</span>

                {product.sizes && (
                  <select
                    className="size-select"
                    value={selectedSizes[product.id] || product.sizes[0]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                )}

                <button className="btn-add-cart" onClick={(e) => handleAddToCart(e, product)}>
                  🛒 Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home