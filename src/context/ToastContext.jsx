import { createContext, useContext, useState, useCallback } from 'react'
import './Toast.css'
const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <div className="toast-notification">{toast}</div>}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}