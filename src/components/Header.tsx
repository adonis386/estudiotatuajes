import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useScroll } from '../hooks'
import logoJpg from '../assets/logo.jpg'
import logoWebp from '../assets/logo.webp'

const Header = () => {
  const { isAtHero } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isAtHero && !isMenuOpen ? 'bg-transparent' : 'bg-black shadow-lg'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-4 hover:opacity-90 transition-opacity"
          >
            <picture>
              <source srcSet={logoWebp} type="image/webp" />
              <img src={logoJpg} alt="Denis Tatuajes Logo" className="h-16 w-auto rounded-full" />
            </picture>
            <h1 className="text-3xl md:text-4xl font-birthstone text-[#C4A962]">Denis Tatuajes</h1>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-2 text-[#C4A962] hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex flex-wrap gap-6 source-sans-3-regular text-lg">
              <li>
                <button 
                  onClick={() => handleNavigation('inicio')}
                  className="text-[#C4A962] hover:text-white transition-colors duration-200"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('galeria')}
                  className="text-[#C4A962] hover:text-white transition-colors duration-200"
                >
                  Galería
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('cotizacion')}
                  className="text-[#C4A962] hover:text-white transition-colors duration-200"
                >
                  Cotización
                </button>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-[#C4A962] hover:text-white transition-colors duration-200"
                >
                  Ingresar
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <nav 
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="flex flex-col gap-4 source-sans-3-regular text-lg py-4">
              <li>
                <button 
                  onClick={() => handleNavigation('inicio')}
                  className="text-[#C4A962] hover:text-white transition-colors duration-200 block w-full text-left"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('galeria')}
                  className="text-[#C4A962] hover:text-white transition-colors duration-200 block w-full text-left"
                >
                  Galería
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('cotizacion')}
                  className="text-[#C4A962] hover:text-white transition-colors duration-200 block w-full text-left"
                >
                  Cotización
                </button>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-[#C4A962] hover:text-white transition-colors duration-200 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ingresar
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
