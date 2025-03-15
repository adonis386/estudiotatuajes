import { useState } from 'react'
import bannerJpg from '../assets/banner-1.jpg'
import bannerWebp from '../assets/banner-1.webp'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement Firebase authentication
    console.log('Login attempt:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section id="ingresar" className="min-h-screen relative flex items-center justify-center py-20">
      <picture className="absolute inset-0 -z-10">
        <source srcSet={bannerWebp} type="image/webp" />
        <img 
          src={bannerJpg} 
          alt="Background" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/85" />
      </picture>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl md:text-6xl text-center mb-12 font-birthstone text-[#C4A962]">
            Administrador
          </h1>
          
          <form 
            onSubmit={handleSubmit}
            className="bg-black/50 p-8 rounded-lg backdrop-blur-md border border-[#C4A962]/20"
          >
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
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="mb-8">
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
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded source-sans-3-medium text-white bg-[#C4A962] hover:bg-[#9F874E] transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
