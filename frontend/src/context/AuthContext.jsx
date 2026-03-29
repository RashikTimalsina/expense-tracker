
import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

// Provider — wraps the whole app
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook which we will import to pages
export function useAuth() {
  return useContext(AuthContext)
}
