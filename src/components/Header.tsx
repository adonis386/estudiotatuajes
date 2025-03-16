import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScroll } from '../hooks'
import logoWebp from '../assets/logo.webp'
import { SITE_TITLE } from '../config/constants'

const Header: React.FC = () => {
  const { isAtHero } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isAtHero ? 'bg-black/85 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
          >
            <img 
              src={logoWebp} 
              alt={SITE_TITLE} 
              className="w-12 h-12 rounded-full border-2 border-[#C4A962]"
            />
            <span className="text-3xl font-birthstone text-[#C4A962]">
              {SITE_TITLE}
            </span>
          </Link>

          {/* Botón de menú móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[#C4A962] hover:text-white transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menú de navegación */}
          <div className={`lg:block ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col lg:flex-row items-center gap-1 lg:gap-8">
              {location.pathname === '/' ? (
                <>
                  <li>
                    <button
                      onClick={() => handleNavClick('galeria')}
                      className="block px-4 py-2 text-[#C4A962] hover:text-white transition-colors font-birthstone text-xl"
                    >
                      Galería
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('sobre-mi')}
                      className="block px-4 py-2 text-[#C4A962] hover:text-white transition-colors font-birthstone text-xl"
                    >
                      Sobre Mí
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('cotizacion')}
                      className="block px-4 py-2 text-[#C4A962] hover:text-white transition-colors font-birthstone text-xl"
                    >
                      Cotización
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/" 
                    className="block px-4 py-2 text-[#C4A962] hover:text-white transition-colors font-birthstone text-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <nav 
          className="fixed inset-0 bg-black/95 backdrop-blur-md lg:hidden pt-24"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-8 text-xl">
              {location.pathname === '/' ? (
                <>
                  <button 
                    onClick={() => handleNavClick('galeria')} 
                    className="text-white hover:text-[#C4A962] transition-colors font-birthstone text-xl"
                  >
                    Galería
                  </button>
                  <button 
                    onClick={() => handleNavClick('sobre-mi')} 
                    className="text-white hover:text-[#C4A962] transition-colors font-birthstone text-xl"
                  >
                    Sobre Mí
                  </button>
                  <button 
                    onClick={() => handleNavClick('cotizacion')} 
                    className="text-white hover:text-[#C4A962] transition-colors font-birthstone text-xl"
                  >
                    Cotización
                  </button>
                </>
              ) : (
                <Link 
                  to="/" 
                  className="text-white hover:text-[#C4A962] transition-colors font-birthstone text-xl"
                >
                  Inicio
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
