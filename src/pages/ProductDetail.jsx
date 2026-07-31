import { useParams } from 'react-router-dom'
import { useState } from 'react'
import products from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)

  if (!product) {
    return <p>Produit introuvable</p>
  }

  function toggleFavorite() {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      showToast(`${product.name} retiré des favoris`)
    } else {
      addToFavorites(product)
      showToast(`${product.name} ajouté aux favoris`)
    }
  }

  function handleAddToCart() {
    if (product.sizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addToCart(product, selectedSize)
    showToast(`${product.name} ajouté au panier`)
  }

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">{product.price} dt</p>
        <p className="product-detail-description">{product.description}</p>

        {product.sizes && (
          <div className="size-picker">
            <p className="size-picker-label">Taille :</p>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}>
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="size-error">Merci de choisir une taille.</p>}
          </div>
        )}

        <div className="product-detail-actions">
          <button className="btn-cart" onClick={handleAddToCart}>
            🛒 Ajouter au panier
          </button>
          <button
            className={`btn-icon btn-favorite ${isFavorite(product.id) ? 'active' : ''}`}
            aria-label={isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            onClick={toggleFavorite}>
            {isFavorite(product.id) ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductDetail