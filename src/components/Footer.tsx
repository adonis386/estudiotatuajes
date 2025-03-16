import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { SITE_TITLE } from '../config/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/85 backdrop-blur-md border-t border-[#C4A962]/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="font-birthstone text-4xl text-[#C4A962]">{SITE_TITLE}</h2>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/denis_tatuajes/?hl=es-la"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4A962] hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-3xl" />
            </a>
            <a 
              href="https://wa.link/535p53"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4A962] hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-3xl" />
            </a>
          </div>

          <p className="source-sans-3-regular text-[#C4A962]/80 text-sm">
            {currentYear} {SITE_TITLE}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
