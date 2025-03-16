import React, { useState } from 'react'
import tatu1Webp from '../assets/tatu-1.webp'
import tatu2Webp from '../assets/tatu-2.webp'
import tatu3Webp from '../assets/tatu-3.webp'
import tatu4Webp from '../assets/tatu-4.webp'

type TattooCategory = 'all' | 'realismo' | 'asiatico' | 'color'

interface Tattoo {
  id: string
  imageUrl: string
  category: Exclude<TattooCategory, 'all'>
  title: string
}

const tattoos: Tattoo[] = [
  {
    id: '1',
    imageUrl: tatu1Webp,
    category: 'realismo',
    title: 'Realismo en Blanco y Negro'
  },
  {
    id: '2',
    imageUrl: tatu2Webp,
    category: 'realismo',
    title: 'Retrato Realista'
  },
  {
    id: '3',
    imageUrl: tatu3Webp,
    category: 'color',
    title: 'Diseño a Color'
  },
  {
    id: '4',
    imageUrl: tatu4Webp,
    category: 'asiatico',
    title: 'Arte Asiático Tradicional'
  }
]

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TattooCategory>('all')
  const [startIndex, setStartIndex] = useState(0)

  const filteredTattoos = tattoos.filter(tattoo => 
    activeCategory === 'all' ? true : tattoo.category === activeCategory
  )

  const visibleTattoos = filteredTattoos.slice(startIndex, startIndex + 3)
  const canScrollLeft = startIndex > 0
  const canScrollRight = startIndex + 3 < filteredTattoos.length

  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex(prev => Math.max(0, prev - 1))
    }
  }

  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex(prev => Math.min(filteredTattoos.length - 3, prev + 1))
    }
  }

  return (
    <section id="galeria" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-birthstone text-[#C4A962] text-center mb-12">
          Galería de Trabajos
        </h2>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => {
              setActiveCategory('all')
              setStartIndex(0)
            }}
            className={`px-6 py-2 font-birthstone text-xl rounded transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#C4A962] text-black'
                : 'text-[#C4A962] border border-[#C4A962]/20 hover:border-[#C4A962]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setActiveCategory('realismo')
              setStartIndex(0)
            }}
            className={`px-6 py-2 font-birthstone text-xl rounded transition-colors ${
              activeCategory === 'realismo'
                ? 'bg-[#C4A962] text-black'
                : 'text-[#C4A962] border border-[#C4A962]/20 hover:border-[#C4A962]'
            }`}
          >
            Realismo
          </button>
          <button
            onClick={() => {
              setActiveCategory('asiatico')
              setStartIndex(0)
            }}
            className={`px-6 py-2 font-birthstone text-xl rounded transition-colors ${
              activeCategory === 'asiatico'
                ? 'bg-[#C4A962] text-black'
                : 'text-[#C4A962] border border-[#C4A962]/20 hover:border-[#C4A962]'
            }`}
          >
            Asiático
          </button>
          <button
            onClick={() => {
              setActiveCategory('color')
              setStartIndex(0)
            }}
            className={`px-6 py-2 font-birthstone text-xl rounded transition-colors ${
              activeCategory === 'color'
                ? 'bg-[#C4A962] text-black'
                : 'text-[#C4A962] border border-[#C4A962]/20 hover:border-[#C4A962]'
            }`}
          >
            Color
          </button>
        </div>

        {/* Carrusel de imágenes */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTattoos.map((tattoo) => (
              <div key={tattoo.id} className="group relative aspect-square">
                <img
                  src={tattoo.imageUrl}
                  alt={tattoo.title}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-[#C4A962] font-birthstone text-2xl text-center px-4">
                    {tattoo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas de navegación */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-black/80 text-[#C4A962] hover:text-white p-2 rounded-full transition-colors"
              aria-label="Ver imágenes anteriores"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-black/80 text-[#C4A962] hover:text-white p-2 rounded-full transition-colors"
              aria-label="Ver más imágenes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Indicador de posición */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(filteredTattoos.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index * 3)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(startIndex / 3) === index
                  ? 'bg-[#C4A962]'
                  : 'bg-[#C4A962]/20 hover:bg-[#C4A962]/40'
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
