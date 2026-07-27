import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(product, size = null) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }])
    }
  }

  function removeFromCart(productId, size = null) {
    const existingItem = cart.find(item => item.id === productId && item.size === size)
    if (existingItem && (existingItem.quantity || 0) > 1) {
      setCart(cart.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    } else {
      setCart(cart.filter(item => !(item.id === productId && item.size === size)))
    }
  }

  function removeItemCompletely(productId, size = null) {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeItemCompletely, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}