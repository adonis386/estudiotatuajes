export type TattooCategory = 'realismo' | 'asiatico' | 'color'

export interface TattooImage {
  id: string
  url: string
  category: TattooCategory
  createdAt: Date
}

// Temporary storage until Firebase implementation
let images: TattooImage[] = []

export const addImage = (url: string, category: TattooCategory): TattooImage => {
  const newImage: TattooImage = {
    id: Math.random().toString(36).substr(2, 9),
    url,
    category,
    createdAt: new Date()
  }
  images = [newImage, ...images]
  return newImage
}

export const getImages = (): TattooImage[] => {
  return [...images]
}

export const deleteImage = (id: string): void => {
  images = images.filter(img => img.id !== id)
}

export const updateImage = (id: string, category: TattooCategory): TattooImage | null => {
  const index = images.findIndex(img => img.id === id)
  if (index === -1) return null

  const updatedImage = {
    ...images[index],
    category
  }
  images[index] = updatedImage
  return updatedImage
}
