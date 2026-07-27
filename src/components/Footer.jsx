import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>ElineWear</h3>
          <p>Une mode pensée pour durer, portée avec élégance.</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Accueil</Link>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/favoris">Favoris</Link>
          <Link to="/panier">Panier</Link>
          <Link to="/a-propos">À propos</Link>
        </div>

        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Email">✉️</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ElineWear. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer