import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { TattooCategory, TattooImage, addImage, getImages, deleteImage, updateImage } from '../utils/tempImages'

const Admin = () => {
  const { user } = useAuth()
  const [images, setImages] = useState<TattooImage[]>([])
  const [imageUpload, setImageUpload] = useState<{
    file: File | null
    preview: string
    category: TattooCategory
  }>({
    file: null,
    preview: '',
    category: 'realismo'
  })
  const [editingImage, setEditingImage] = useState<TattooImage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    // Load images on mount
    setImages(getImages())
  }, [])

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Preview image
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUpload(prev => ({
          ...prev,
          file,
          preview: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
      setError(null)
      setSuccess(null)
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImageUpload(prev => ({
      ...prev,
      category: e.target.value as TattooCategory
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUpload.file) {
      setError('Por favor, selecciona una imagen')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add image to temporary storage
      const newImage = addImage(imageUpload.preview, imageUpload.category)
      setImages(prev => [newImage, ...prev])
      setSuccess('Imagen subida exitosamente')
      
      // Reset form
      setImageUpload({
        file: null,
        preview: '',
        category: 'realismo'
      })
    } catch (err) {
      setError('Error al subir la imagen. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      deleteImage(id)
      setImages(prev => prev.filter(img => img.id !== id))
      setSuccess('Imagen eliminada exitosamente')
    } catch (err) {
      setError('Error al eliminar la imagen')
    }
  }

  const handleEdit = (image: TattooImage) => {
    setEditingImage(image)
  }

  const handleUpdate = async (id: string, category: TattooCategory) => {
    try {
      const updated = updateImage(id, category)
      if (updated) {
        setImages(prev => prev.map(img => img.id === id ? updated : img))
        setSuccess('Imagen actualizada exitosamente')
      }
      setEditingImage(null)
    } catch (err) {
      setError('Error al actualizar la imagen')
    }
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl text-center mb-12 font-birthstone text-[#C4A962]">
          Panel de Administración
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* Upload Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-black/50 p-8 rounded-lg backdrop-blur-md border border-[#C4A962]/20 mb-8"
          >
            <h2 className="text-2xl mb-6 source-sans-3-medium text-[#C4A962]">
              Subir Nueva Imagen
            </h2>

            {error && (
              <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 source-sans-3-regular text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 rounded bg-green-500/10 border border-green-500/20 text-green-400 source-sans-3-regular text-sm">
                {success}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <label 
                    htmlFor="category"
                    className="block source-sans-3-medium text-[#C4A962] mb-2"
                  >
                    Categoría
                  </label>
                  <select
                    id="category"
                    value={imageUpload.category}
                    onChange={handleCategoryChange}
                    disabled={isLoading}
                    className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors disabled:opacity-50"
                  >
                    <option value="realismo">Realismo</option>
                    <option value="asiatico">Asiático</option>
                    <option value="color">Color</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label 
                    htmlFor="image"
                    className="block source-sans-3-medium text-[#C4A962] mb-2"
                  >
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    className="w-full p-3 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none transition-colors disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#C4A962] file:text-white hover:file:bg-[#9F874E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded source-sans-3-medium text-white bg-[#C4A962] hover:bg-[#9F874E] transition-colors relative ${
                    isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="opacity-0">Subir Imagen</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    </>
                  ) : (
                    'Subir Imagen'
                  )}
                </button>
              </div>

              {imageUpload.preview && (
                <div>
                  <p className="block source-sans-3-medium text-[#C4A962] mb-2">
                    Vista Previa
                  </p>
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-[#C4A962]/20">
                    <img 
                      src={imageUpload.preview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Image Gallery */}
          <div className="bg-black/50 p-8 rounded-lg backdrop-blur-md border border-[#C4A962]/20">
            <h2 className="text-2xl mb-6 source-sans-3-medium text-[#C4A962]">
              Galería de Imágenes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map(image => (
                <div 
                  key={image.id}
                  className="relative group aspect-square overflow-hidden rounded-lg border border-[#C4A962]/20"
                >
                  <img 
                    src={image.url} 
                    alt={`Tatuaje ${image.category}`} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-4">
                    {editingImage?.id === image.id ? (
                      <>
                        <select
                          value={editingImage.category}
                          onChange={(e) => handleUpdate(image.id, e.target.value as TattooCategory)}
                          className="w-full p-2 rounded bg-black/50 text-white source-sans-3-regular border border-[#C4A962]/50 focus:border-[#C4A962] focus:outline-none"
                        >
                          <option value="realismo">Realismo</option>
                          <option value="asiatico">Asiático</option>
                          <option value="color">Color</option>
                        </select>
                        <button
                          onClick={() => setEditingImage(null)}
                          className="w-full py-2 px-4 rounded source-sans-3-medium text-white bg-gray-500 hover:bg-gray-600 transition-colors"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-[#C4A962] source-sans-3-medium capitalize">
                          {image.category}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(image)}
                            className="py-2 px-4 rounded source-sans-3-medium text-white bg-[#C4A962] hover:bg-[#9F874E] transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(image.id)}
                            className="py-2 px-4 rounded source-sans-3-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <p className="text-center text-white/60 source-sans-3-regular py-8">
                No hay imágenes en la galería
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
