import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Tattoo, TattooCategory } from '../types/tattoo'

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY

export const useTattoos = () => {
  const [tattoos, setTattoos] = useState<Tattoo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(collection(db, 'tattoos'), orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tattoosData: Tattoo[] = []
      querySnapshot.forEach((doc) => {
        tattoosData.push({ id: doc.id, ...doc.data() } as Tattoo)
      })
      setTattoos(tattoosData)
      setLoading(false)
    }, (err) => {
      console.error('Error fetching tattoos:', err)
      setError('Error al cargar los tatuajes')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const uploadTattoo = async (
    file: File,
    category: TattooCategory,
    title: string,
    description?: string
  ) => {
    try {
      setLoading(true)
      setError(null)

      // Upload image to ImgBB
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      const data = await response.json()
      const imageUrl = data.data.url

      // Add tattoo document to Firestore
      const tattooData: Omit<Tattoo, 'id'> = {
        imageUrl,
        category,
        title,
        description,
        createdAt: Date.now()
      }

      await addDoc(collection(db, 'tattoos'), tattooData)
      setLoading(false)
    } catch (err) {
      console.error('Error uploading tattoo:', err)
      setError('Error al subir el tatuaje')
      setLoading(false)
      throw err
    }
  }

  const deleteTattoo = async (tattoo: Tattoo) => {
    try {
      setLoading(true)
      setError(null)

      // Delete document from Firestore
      await deleteDoc(doc(db, 'tattoos', tattoo.id))

      setLoading(false)
    } catch (err) {
      console.error('Error deleting tattoo:', err)
      setError('Error al eliminar el tatuaje')
      setLoading(false)
      throw err
    }
  }

  return {
    tattoos,
    loading,
    error,
    uploadTattoo,
    deleteTattoo
  }
}
