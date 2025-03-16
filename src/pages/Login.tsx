import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-birthstone text-[#C4A962]">
            Acceso Administrativo
          </h1>
          <p className="mt-2 text-white/70 source-sans-3-regular">
            Ingresa tus credenciales para acceder al panel
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-black/50 backdrop-blur-md p-8 rounded-lg border border-[#C4A962]/20"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm source-sans-3-regular">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-[#C4A962] source-sans-3-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-[#C4A962]/20 rounded focus:outline-none focus:border-[#C4A962] text-white source-sans-3-regular"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-[#C4A962] source-sans-3-medium mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-[#C4A962]/20 rounded focus:outline-none focus:border-[#C4A962] text-white source-sans-3-regular"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C4A962] text-black source-sans-3-medium rounded hover:bg-[#C4A962]/90 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
