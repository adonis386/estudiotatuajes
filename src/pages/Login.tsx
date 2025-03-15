import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { login, error, user } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Si el usuario ya está autenticado, redirigir al panel de admin
  if (user) {
    navigate('/admin')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(formData.email, formData.password)
    if (success) {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl text-center mb-12 font-birthstone text-[#C4A962]">
          Iniciar Sesión
        </h1>

        <div className="max-w-md mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="bg-black/50 p-8 rounded-lg backdrop-blur-md border border-[#C4A962]/20"
          >
            {error && (
              <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 source-sans-3-regular text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label 
                htmlFor="email"
                className="block source-sans-3-medium text-[#C4A962] mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors"
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="password"
                className="block source-sans-3-medium text-[#C4A962] mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded source-sans-3-medium text-white bg-[#C4A962] hover:bg-[#9F874E] transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
