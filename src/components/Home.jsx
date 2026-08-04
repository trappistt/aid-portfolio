import { useEffect, useState } from 'react'
import About from './About'
import Work from './Work'
import Experience from './Experience'
import Tools from './Tools'
import SideNav from './SideNav'
import { FloatingControls } from './FloatingControls'

export default function Home() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <main className="min-h-screen bg-page text-ink">
        <div className="mx-auto w-full max-w-content px-6 sm:px-8 pt-16 md:pt-16 md:pl-28 lg:pl-32">
          <About />
          <Work />
          <Experience />
          <Tools />
        </div>
      </main>
      <SideNav />
      <FloatingControls showTop={showTop} />
    </>
  )
}
