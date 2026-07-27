import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'
import '../pages/Cart.css'

function Cart() {
  const { cart, addToCart, removeFromCart, removeItemCompletely } = useCart()
  const total = cart.reduce((somme, product) => somme + product.price * (product.quantity || 0), 0)

  return (
    <div className="cart-page">
      <h1>Panier</h1>

      {cart.length === 0 ? (
        <p className="empty-message">Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map(product => (
              <div className="product-card" key={`${product.id}-${product.size || 'nosize'}`}>
                <Link to={`/product/${product.id}`}>
                  <div className="image-wrapper">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h2>{product.name}</h2>
                  {product.size && <p className="cart-item-size">Taille : {product.size}</p>}
                  <p>{product.price} dt</p>
                </Link>

                <div className="quantity-control">
                  <button onClick={() => removeFromCart(product.id, product.size)}>−</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => addToCart(product, product.size)}>+</button>
                </div>

                <p className="line-total">Sous-total : {product.price * product.quantity} dt</p>

                <button className="btn-remove" onClick={() => removeItemCompletely(product.id, product.size)}>
                  Retirer du panier
                </button>
              </div>
            ))}
          </div>
            <p className="cart-total">
              <span>Total</span>
              <span className="cart-total-amount">{total} dt</span>
            </p>
            <Link to="/paiement" className="btn-go-payment">Passer au paiement</Link>
        </>
      )}
    </div>
  )
}
export default Cart