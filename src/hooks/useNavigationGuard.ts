import { useRef, useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'

export const useNavigationGuard = (navigate: NavigateFunction) => {
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastNavigationTimeRef = useRef(0)
  const NAVIGATION_DELAY = 300 // milisegundos entre navegaciones

  const guardedNavigate = useCallback((to: string) => {
    const now = Date.now()
    const timeSinceLastNavigation = now - lastNavigationTimeRef.current

    // Limpiar cualquier navegación pendiente
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current)
    }

    // Si ha pasado suficiente tiempo desde la última navegación, navegar inmediatamente
    if (timeSinceLastNavigation > NAVIGATION_DELAY) {
      lastNavigationTimeRef.current = now
      navigate(to)
    } else {
      // Si no, programar la navegación para después
      navigationTimeoutRef.current = setTimeout(() => {
        lastNavigationTimeRef.current = Date.now()
        navigate(to)
      }, NAVIGATION_DELAY)
    }
  }, [navigate])

  return guardedNavigate
}
