import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/Loading'
import tatu1Webp from '../assets/tatu-1.webp'
import tatu2Webp from '../assets/tatu-2.webp'
import tatu3Webp from '../assets/tatu-3.webp'
import tatu4Webp from '../assets/tatu-4.webp'

type TattooCategory = 'realismo' | 'asiatico' | 'color'

interface Tattoo {
  id: string
  imageUrl: string
  category: TattooCategory
  title: string
}

const initialTattoos: Tattoo[] = [
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

const Admin = () => {
  const { user, loading: authLoading, logout } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TattooCategory>('realismo')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [tattoos, setTattoos] = useState<Tattoo[]>(initialTattoos)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null)
      return
    }

    const file = event.target.files[0]
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen válido')
      return
    }

    setSelectedFile(file)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setError('Por favor, selecciona una imagen')
      return
    }

    setSaving(true)
    setError('')

    try {
      // En producción, aquí subirías la imagen a un servicio como ImgBB
      const newId = (Math.max(...tattoos.map(t => parseInt(t.id))) + 1).toString()
      const newTattoo: Tattoo = {
        id: newId,
        imageUrl: preview, // En producción, aquí iría la URL de la imagen subida
        category,
        title
      }

      setTattoos(prev => [...prev, newTattoo])

      // Limpiar el formulario
      setTitle('')
      setCategory('realismo')
      setSelectedFile(null)
      setPreview('')
    } catch (err) {
      setError('Error al guardar el tatuaje. Por favor, intenta de nuevo.')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = (id: string) => {
    setTattoos(prev => prev.filter(tattoo => tattoo.id !== id))
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  if (authLoading) return <Loading />

  return (
    <div className="min-h-screen bg-black/95 py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-birthstone text-[#C4A962]">
            Panel de Administración
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-black border border-[#C4A962] text-[#C4A962] rounded hover:bg-[#C4A962] hover:text-black transition-colors font-birthstone text-xl"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Formulario de subida */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-16">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label htmlFor="title" className="block text-[#C4A962] font-birthstone text-xl mb-2">
                Título del Tatuaje
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-[#C4A962]/20 text-white rounded focus:border-[#C4A962] focus:outline-none"
                required
              />
            </div>

            {/* Categoría */}
            <div>
              <label htmlFor="category" className="block text-[#C4A962] font-birthstone text-xl mb-2">
                Categoría
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TattooCategory)}
                className="w-full px-4 py-2 bg-black/50 border border-[#C4A962]/20 text-white rounded focus:border-[#C4A962] focus:outline-none"
              >
                <option value="realismo">Realismo</option>
                <option value="asiatico">Asiático</option>
                <option value="color">Color</option>
              </select>
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-[#C4A962] font-birthstone text-xl mb-2">
                Imagen
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2 bg-[#C4A962] text-black rounded hover:bg-[#C4A962]/80 transition-colors font-birthstone text-xl"
                >
                  Seleccionar Imagen
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              {preview && (
                <div className="mt-4">
                  <img src={preview} alt="Preview" className="max-w-xs rounded" />
                </div>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-[#C4A962] text-black rounded hover:bg-[#C4A962]/80 transition-colors font-birthstone text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando...' : 'Guardar Tatuaje'}
            </button>
          </div>
        </form>

        {/* Lista de tatuajes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tattoos.map((tattoo) => (
            <div key={tattoo.id} className="relative group">
              <img
                src={tattoo.imageUrl}
                alt={tattoo.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-4">
                <span className="text-[#C4A962] font-birthstone text-2xl text-center mb-2">
                  {tattoo.title}
                </span>
                <span className="text-white/80 text-sm mb-4">
                  {tattoo.category}
                </span>
                <button
                  onClick={() => handleDelete(tattoo.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
