import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenisInstance } from '../hooks/useSmoothScroll'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(0, { immediate: false })
    } else {
      // Fallback if Lenis isn't initialized yet
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

