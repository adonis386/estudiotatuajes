import { useState } from 'react'

export interface TattooImage {
  id: string
  title: string
  category: 'realismo' | 'asiatico' | 'colores'
  imageUrl: string
  webpUrl: string
  description?: string
}

export interface GalleryCategory {
  id: 'realismo' | 'asiatico' | 'colores'
  name: string
  description: string
}

export const useGallery = () => {
  const [images, setImages] = useState<TattooImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories: GalleryCategory[] = [
    { 
      id: 'realismo', 
      name: 'Realismo', 
      description: 'Tatuajes realistas con atención al detalle y sombreado profesional. Especializado en retratos y elementos de la naturaleza.'
    },
    { 
      id: 'asiatico', 
      name: 'Asiático', 
      description: 'Arte tradicional asiático, dragones, hannya masks y diseños orientales con un toque contemporáneo.'
    },
    { 
      id: 'colores', 
      name: 'Colores', 
      description: 'Diseños vibrantes y coloridos que combinan estilos modernos con técnicas tradicionales.'
    }
  ]

  const fetchImages = async (category: 'realismo' | 'asiatico' | 'colores') => {
    try {
      setLoading(true)
      // Cuando implementemos la base de datos, aquí filtraremos por categoría
      console.log(`Cargando imágenes de la categoría: ${category}`)
      setImages([])
      setLoading(false)
    } catch (err) {
      setError(`Error al cargar las imágenes de ${categories.find(cat => cat.id === category)?.name.toLowerCase()}`)
      setLoading(false)
    }
  }

  return {
    images,
    loading,
    error,
    categories,
    fetchImages
  }
}
