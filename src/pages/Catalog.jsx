import { Link } from 'react-router-dom'
import './Catalog.css'
import products from '../data/products.js'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

function Catalog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tout')
  const { showToast } = useToast()
  const [selectedSizes, setSelectedSizes] = useState({})
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const categories = ['Tout', ...new Set(products.map(product => product.category))]

  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    .filter(product => category === 'Tout' || product.category === category)

  function toggleFavorite(e, product) {
    e.stopPropagation()
    e.preventDefault()
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      showToast(`${product.name} retiré des favoris`)
    } else {
      addToFavorites(product)
      showToast(`${product.name} ajouté aux favoris`)
    }
  }

  function handleAddToCart(e, product) {
    e.stopPropagation()
    e.preventDefault()
    const size = product.sizes ? (selectedSizes[product.id] || product.sizes[0]) : null
    addToCart(product, size)
    showToast(`${product.name} ajouté au panier`)
  }

  return (
    <div className="catalog-page">
      <h1>Catalogue</h1>

      <div className="catalog-toolbar">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="catalog-body">
        <aside className="filter-panel">
          <h3>Catégories</h3>
          {categories.map(cat => (
            <button
              key={cat}
              className={cat === category ? 'active' : ''}
              onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </aside>

        <div className="catalog-grid">
          {filteredProducts.map(product => (
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
                  <h2>{product.name}</h2>
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
      </div>
    </div>
  )
}

export default Catalog