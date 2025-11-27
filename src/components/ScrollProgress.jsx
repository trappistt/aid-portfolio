import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId = null
    let ticking = false

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollableHeight = documentHeight - windowHeight
      
      const progress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0
      
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    const handleResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      updateScrollProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    // Calculate initial progress
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-100 z-50 pointer-events-none">
      <div
        className="h-full bg-black"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

