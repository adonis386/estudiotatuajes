import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigationGuard } from '../hooks/useNavigationGuard'
import Loading from '../components/Loading'

const Login = () => {
  const navigate = useNavigate()
  const guardedNavigate = useNavigationGuard(navigate)
  const { login, error, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user) {
      guardedNavigate('/admin')
    }
  }, [user, guardedNavigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        guardedNavigate('/admin')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Si el usuario está autenticado o se está cargando, mostrar pantalla de carga
  if (user || isLoading) {
    return <Loading />
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
                disabled={isLoading}
                className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors disabled:opacity-50"
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
                disabled={isLoading}
                className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded source-sans-3-medium text-white bg-[#C4A962] hover:bg-[#9F874E] transition-colors disabled:opacity-50 relative"
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
