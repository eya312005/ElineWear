import './About.css'
import { Link } from 'react-router-dom'
function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>Notre histoire</h1>
          <p>Une mode pensée pour durer, portée avec élégance</p>
        </div>
        <div className="about-hero-image">
          <img src="/images/hero.jpg" alt="À propos" />
        </div>
      </section>

      <section className="about-story">
        <h2>Qui sommes-nous ?</h2>
        <p>
          Née d'une passion pour la mode intemporelle, notre marque façonne des pièces
          pensées pour durer, bien au-delà des tendances passagères. Chaque vêtement est
          choisi avec soin pour sa qualité, sa coupe et sa capacité à s'intégrer naturellement
          dans une garde-robe élégante et polyvalente.
        </p>
        <p>
          Nous croyons en une mode accessible sans compromis sur le style : des matières
          agréables, des couleurs douces, et des silhouettes qui traversent les saisons.
        </p>
      </section>

      <section className="about-values">
        <h2>Nos valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">✦</span>
            <h3>Qualité</h3>
            <p>Des matières sélectionnées avec exigence pour une élégance durable.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">✦</span>
            <h3>Simplicité</h3>
            <p>Des pièces intemporelles, faciles à associer, sans effort.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">✦</span>
            <h3>Authenticité</h3>
            <p>Une identité fidèle à elle-même, loin des tendances éphémères.</p>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <h2>Restons en contact</h2>
        <p>Suivez-nous et découvrez nos dernières collections.</p>
        <Link to="/contact" className="about-contact-link">Nous contacter</Link>
      </section>
    </div>
  )
}

export default About