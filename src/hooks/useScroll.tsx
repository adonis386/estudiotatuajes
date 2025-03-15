import { useState, useEffect } from 'react'

export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAtHero, setIsAtHero] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const heroHeight = window.innerHeight * 0.85 // 85vh
      setScrollPosition(position)
      setIsAtHero(position <= heroHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollPosition, isAtHero }
}
