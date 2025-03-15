import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import bannerJpg from '../assets/banner-1.jpg'
import bannerWebp from '../assets/banner-1.webp'
import qrImage from '../assets/social-qr.png'

interface TattooQuote {
  size: string
  type: 'blackAndWhite' | 'color'
  basePrice: number
}

const QuoteCalculator = () => {
  const [size, setSize] = useState<string>('')
  const [type, setType] = useState<'blackAndWhite' | 'color'>('blackAndWhite')

  const sizeOptions: TattooQuote[] = [
    { size: 'Pequeño (5-8cm)', type: 'blackAndWhite', basePrice: 80 },
    { size: 'Mediano (9-15cm)', type: 'blackAndWhite', basePrice: 150 },
    { size: 'Grande (16-25cm)', type: 'blackAndWhite', basePrice: 250 },
    { size: 'Extra Grande (>25cm)', type: 'blackAndWhite', basePrice: 400 }
  ]

  const calculatePrice = () => {
    const baseQuote = sizeOptions.find(option => option.size === size)
    if (!baseQuote) return 0
    return type === 'color' ? baseQuote.basePrice * 1.5 : baseQuote.basePrice
  }

  const handleWhatsAppClick = () => {
    const price = calculatePrice()
    const message = `Hola! Estoy interesado en un tatuaje con las siguientes características:\n
- Tamaño: ${size}\n
- Tipo: ${type === 'blackAndWhite' ? 'Blanco y Negro' : 'Color'}\n
- Precio aproximado: $${price}\n
¿Podemos coordinar una cita?`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.link/535p53?text=${encodedMessage}`, '_blank')
  }

  return (
    <section id="cotizacion" className="min-h-screen relative py-20">
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
        <h1 className="text-5xl md:text-6xl text-center mb-12 font-birthstone text-[#C4A962]">
          Cotizaciones
        </h1>
        
        <div className="max-w-2xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-md border border-[#C4A962]/20">
          <div className="mb-6">
            <label className="block source-sans-3-medium text-[#C4A962] mb-2">
              Tamaño del Tatuaje
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors"
            >
              <option value="">Selecciona un tamaño</option>
              {sizeOptions.map((option) => (
                <option key={option.size} value={option.size}>
                  {option.size}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block source-sans-3-medium text-[#C4A962] mb-2">
              Tipo de Tatuaje
            </label>
            <div className="flex gap-4">
              <label className="flex items-center source-sans-3-regular text-[#C4A962] hover:text-white transition-colors">
                <input
                  type="radio"
                  value="blackAndWhite"
                  checked={type === 'blackAndWhite'}
                  onChange={(e) => setType(e.target.value as 'blackAndWhite' | 'color')}
                  className="mr-2"
                />
                Blanco y Negro
              </label>
              <label className="flex items-center source-sans-3-regular text-[#C4A962] hover:text-white transition-colors">
                <input
                  type="radio"
                  value="color"
                  checked={type === 'color'}
                  onChange={(e) => setType(e.target.value as 'blackAndWhite' | 'color')}
                  className="mr-2"
                />
                Color
              </label>
            </div>
          </div>

          <div className="mb-8 p-4 bg-black/50 rounded border border-[#C4A962]/20">
            <p className="source-sans-3-medium text-[#C4A962] text-xl text-center">
              Precio Aproximado: ${calculatePrice()}
            </p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            disabled={!size}
            className={`w-full py-4 px-6 rounded flex items-center justify-center gap-2 source-sans-3-medium text-white transition-all ${
              size ? 'bg-[#C4A962] hover:bg-[#9F874E]' : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <FaWhatsapp className="text-2xl" />
            Consultar por WhatsApp
          </button>

          <div className="mt-8 text-center">
            <p className="source-sans-3-regular text-[#C4A962] mb-4">O también escanea el QR</p>
            <img 
              src={qrImage} 
              alt="WhatsApp QR Code" 
              className="mx-auto w-48 h-48 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuoteCalculator
