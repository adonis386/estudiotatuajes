import { useState, useEffect } from 'react'
import { SITE_TITLE } from '../config/constants'
import hero1Webp from '../assets/hero-1.webp'
import hero2Webp from '../assets/hero-2.webp'
import hero3Webp from '../assets/hero-3.webp'

const slides = [
  { webp: hero1Webp },
  { webp: hero2Webp },
  { webp: hero3Webp }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="inicio" className="relative h-[85vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
          <img 
            src={slide.webp} 
            alt={`Hero image ${index + 1}`} 
            className="w-full h-full object-cover object-[center_80%]" 
            loading={index === 0 ? 'eager' : 'lazy'} 
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-birthstone text-[#C4A962] mb-6">
          {SITE_TITLE}
        </h1>
        <p className="text-xl md:text-2xl source-sans-3-medium text-[#C4A962]">
          Arte y profesionalismo en cada diseño
        </p>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-[#C4A962]' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
