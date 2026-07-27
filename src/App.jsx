import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Payment from './pages/Payment'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import {CartProvider} from './context/CartContext.jsx'
import {FavoritesProvider} from './context/FavoritesContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <BrowserRouter>
         <ScrollToTop />
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogue" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/favoris" element={<Favorites />} />
              <Route path="/paiement" element={<Payment />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<About />} />
            </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </FavoritesProvider>
  )
}

export default App