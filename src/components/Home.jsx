import { useEffect, useState } from 'react'
import About from './About'
import Work from './Work'
import Experience from './Experience'
import Tools from './Tools'
import Shipped from './Shipped'
import { FloatingControls } from './FloatingControls'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'tools', label: 'Tools' },
  { id: 'shipped', label: 'Shipped' },
]

export default function Home() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <main className="min-h-screen bg-page text-ink overflow-x-clip">
        <div className="mx-auto w-full max-w-content px-6 sm:px-8 pt-16">
          <About />
          <Work />
          <Experience />
          <Tools />
          <Shipped />
        </div>
      </main>
      <FloatingControls showTop={showTop} links={navLinks} />
    </>
  )
}
