import { useState, useEffect } from 'react'
import { useGallery, GalleryCategory } from '../hooks/useGallery'

const Gallery = () => {
  const { categories, loading, error, images, fetchImages } = useGallery()
  const [activeCategory, setActiveCategory] = useState<GalleryCategory['id']>('realismo')

  useEffect(() => {
    fetchImages(activeCategory)
  }, [activeCategory])

  return (
    <section id="galeria" className="min-h-screen relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl text-center mb-12 font-birthstone text-[#C4A962]">
          Galería
        </h1>

        {/* Navegación de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full source-sans-3-medium text-lg transition-all ${
                activeCategory === category.id
                  ? 'bg-[#C4A962] text-white'
                  : 'bg-black text-[#C4A962] border border-[#C4A962] hover:bg-[#C4A962] hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Descripción de la categoría */}
        <div className="mb-12">
          <p className="text-center source-sans-3-medium text-[#C4A962] text-xl mb-2">
            {categories.find(cat => cat.id === activeCategory)?.name}
          </p>
          <p className="text-center source-sans-3-regular text-[#C4A962]/80 max-w-2xl mx-auto">
            {categories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Esqueleto de carga
            [...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="aspect-square bg-gray-900 rounded-lg border border-[#C4A962]/20 animate-pulse"
              />
            ))
          ) : error ? (
            // Mensaje de error
            <div className="col-span-full text-center py-12">
              <p className="source-sans-3-medium text-[#C4A962] text-lg mb-2">
                Error al cargar las imágenes
              </p>
              <p className="source-sans-3-regular text-[#C4A962]/80">
                Por favor, intenta recargar la página
              </p>
            </div>
          ) : images.length > 0 ? (
            // Imágenes de la galería
            images.map((image) => (
              <div 
                key={image.id}
                className="aspect-square bg-gray-900 rounded-lg border border-[#C4A962]/20 overflow-hidden group relative"
              >
                <picture>
                  <source srcSet={image.webpUrl} type="image/webp" />
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="source-sans-3-medium text-[#C4A962] text-lg mb-1">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="source-sans-3-regular text-white/80 text-sm">
                      {image.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Mensaje cuando no hay imágenes
            <div className="col-span-full text-center py-12">
              <p className="source-sans-3-medium text-[#C4A962] text-lg mb-2">
                No hay imágenes disponibles
              </p>
              <p className="source-sans-3-regular text-[#C4A962]/80">
                Próximamente agregaremos más contenido
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Gallery
