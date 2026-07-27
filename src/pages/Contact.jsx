import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis."
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide."
    }
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis."
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères."
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-layout">
        <div className="contact-info">
          <h1>Contactez-nous</h1>

          <div className="info-item">
            <span className="info-icon">✉️</span>
            <span>contact@elinewear.com</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span>+216 51 845 666</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>Sousse, Tunisie</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {success && <p className="contact-success">Merci ! Votre message a bien été envoyé.</p>}

          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange} />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" className="contact-submit">Envoyer</button>
        </form>
      </div>
    </div>
  )
}

export default Contact