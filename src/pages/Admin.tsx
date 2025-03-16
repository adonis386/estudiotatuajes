import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { motion } from 'framer-motion'
import { useTattoos } from '../hooks/useTattoos'
import type { TattooCategory } from '../types/tattoo'

const Admin: React.FC = () => {
  const { tattoos, loading, error, uploadTattoo, deleteTattoo } = useTattoos()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<TattooCategory>('realismo')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const categories = [
    { id: 'realismo' as TattooCategory, label: 'Realismo' },
    { id: 'asiatico' as TattooCategory, label: 'Asiático' },
    { id: 'color' as TattooCategory, label: 'Color' }
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !title) {
      setUploadError('Por favor selecciona una imagen y agrega un título')
      return
    }

    try {
      setUploading(true)
      setUploadError(null)
      await uploadTattoo(selectedFile, category, title, description)
      
      // Reset form
      setSelectedFile(null)
      setTitle('')
      setDescription('')
      setCategory('realismo')
      if (e.target instanceof HTMLFormElement) {
        e.target.reset()
      }
    } catch (err) {
      setUploadError('Error al subir el tatuaje. Por favor intenta de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-birthstone text-[#C4A962]">
              Panel de Administración
            </h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white source-sans-3-medium transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 border border-[#C4A962]/20 rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-birthstone text-[#C4A962] mb-8">
              Subir Nuevo Tatuaje
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#C4A962] source-sans-3-medium mb-2">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TattooCategory)}
                  className="w-full px-4 py-2 rounded bg-black border border-[#C4A962]/20 text-white source-sans-3-regular focus:outline-none focus:border-[#C4A962]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#C4A962] source-sans-3-medium mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-black border border-[#C4A962]/20 text-white source-sans-3-regular focus:outline-none focus:border-[#C4A962]"
                  placeholder="Nombre del tatuaje"
                />
              </div>

              <div>
                <label className="block text-[#C4A962] source-sans-3-medium mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-black border border-[#C4A962]/20 text-white source-sans-3-regular focus:outline-none focus:border-[#C4A962]"
                  placeholder="Describe el tatuaje"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-[#C4A962] source-sans-3-medium mb-2">
                  Imagen
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 rounded bg-black border border-[#C4A962]/20 text-white source-sans-3-regular focus:outline-none focus:border-[#C4A962]"
                />
              </div>

              {uploadError && (
                <div className="text-red-500 source-sans-3-regular">
                  {uploadError}
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className={`w-full py-3 rounded source-sans-3-medium text-black bg-[#C4A962] hover:bg-[#C4A962]/90 transition-colors ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? 'Subiendo...' : 'Subir Tatuaje'}
              </button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <h2 className="text-3xl font-birthstone text-[#C4A962]">
              Tatuajes Subidos
            </h2>

            {loading ? (
              <div className="text-center text-gray-400 source-sans-3-regular">
                Cargando tatuajes...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 source-sans-3-regular">
                {error}
              </div>
            ) : tattoos.length === 0 ? (
              <div className="text-center text-gray-400 source-sans-3-regular">
                No hay tatuajes subidos
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tattoos.map(tattoo => (
                  <motion.div
                    key={tattoo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative aspect-square overflow-hidden rounded-lg border-2 border-[#C4A962]"
                  >
                    <img
                      src={tattoo.imageUrl}
                      alt={tattoo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl text-[#C4A962] font-birthstone mb-2">
                          {tattoo.title}
                        </h3>
                        <p className="text-gray-300 source-sans-3-regular text-sm mb-2">
                          Categoría: {categories.find(cat => cat.id === tattoo.category)?.label}
                        </p>
                        {tattoo.description && (
                          <p className="text-gray-300 source-sans-3-regular text-sm">
                            {tattoo.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteTattoo(tattoo)}
                        className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white source-sans-3-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
