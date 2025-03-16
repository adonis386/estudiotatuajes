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

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black/95 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-birthstone text-[#C4A962] text-center mb-12">
            Acceso Administrativo
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm source-sans-3-regular">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[#C4A962] font-birthstone text-xl mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-[#C4A962]/20 text-white rounded focus:border-[#C4A962] focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#C4A962] font-birthstone text-xl mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-[#C4A962]/20 text-white rounded focus:border-[#C4A962] focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#C4A962] text-black rounded hover:bg-[#C4A962]/80 transition-colors font-birthstone text-xl"
              >
                Iniciar Sesión
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full px-6 py-3 bg-black border border-[#C4A962] text-[#C4A962] rounded hover:bg-[#C4A962] hover:text-black transition-colors font-birthstone text-xl"
              >
                Volver a Inicio
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
