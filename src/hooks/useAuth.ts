import { useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from '../config/firebase'

export const useAuth = (): {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
} => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      return true
    } catch (err) {
      setError('Credenciales inválidas. Por favor, verifica tu correo y contraseña.')
      return false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      return true
    } catch (err) {
      setError('Error al cerrar sesión')
      return false
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout
  }
}
