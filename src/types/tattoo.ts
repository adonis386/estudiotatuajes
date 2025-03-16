export type TattooCategory = 'realismo' | 'asiatico' | 'color'

export interface Tattoo {
  id: string
  imageUrl: string
  category: TattooCategory
  title: string
  description?: string
  createdAt: number
}
