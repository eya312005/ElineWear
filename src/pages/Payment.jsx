import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Payment.css'

function Payment() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((somme, item) => somme + item.price * item.quantity, 0)

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function validate() {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom est requis."
    }
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise."
    }
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Numéro de carte invalide (16 chiffres)."
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Format attendu : MM/AA."
    }
    if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = "CVC invalide (3 chiffres)."
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true)
      clearCart()
      // Ici viendra l'appel réel au backend PHP/MySQL une fois branché
    }
  }

  if (cart.length === 0 && !success) {
    return (
      <div className="payment-page">
        <p className="empty-message">Votre panier est vide, rien à payer pour le moment.</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="payment-page">
        <div className="payment-confirmation">
          <span className="confirmation-icon">✓</span>
          <h1>Merci pour votre commande !</h1>
          <p>Votre paiement a été confirmé. Un récapitulatif vous a été envoyé par email.</p>
          <button className="btn-back-home" onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-page">
      <div className="payment-layout">
        <form className="payment-form" onSubmit={handleSubmit} noValidate>
          <h1>Paiement</h1>

          <div className="form-group">
            <label htmlFor="fullName">Nom complet</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange} />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse de livraison</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange} />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Numéro de carte</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange} />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiration</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/AA"
                value={formData.expiry}
                onChange={handleChange} />
              {errors.expiry && <span className="error-message">{errors.expiry}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                placeholder="123"
                value={formData.cvc}
                onChange={handleChange} />
              {errors.cvc && <span className="error-message">{errors.cvc}</span>}
            </div>
          </div>

          <button type="submit" className="auth-submit">Payer {total} dt</button>
          <p className="payment-disclaimer">Paiement simulé à des fins de démonstration.</p>
        </form>

        <div className="order-summary">
          <h2>Récapitulatif</h2>
          {cart.map(item => (
            <div className="summary-line" key={`${item.id}-${item.size || 'nosize'}`}>
              <span>{item.name}{item.size ? ` (${item.size})` : ''} × {item.quantity}</span>
              <span>{item.price * item.quantity} dt</span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total</span>
            <span>{total} dt</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment