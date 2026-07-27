import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import './Navbar.css'

function Navbar() {
  const { cart } = useCart()
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="site-navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>ElineWear</Link>
      </div>

      <button
        className="menu-toggle"
        aria-label="Ouvrir le menu"
        onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Accueil</Link>
        <Link to="/a-propos" onClick={closeMenu}>À propos</Link>
        <Link to="/catalogue" onClick={closeMenu}>Catalogue</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/favoris" onClick={closeMenu}>Favoris ({favorites.length})</Link>
        <Link to="/panier" onClick={closeMenu}>Panier ({cart.length})</Link>
        <Link to="/connexion" onClick={closeMenu}>Connexion</Link>
      </div>
    </nav>
  )
}

export default Navbar