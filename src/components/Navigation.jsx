import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { getLenisInstance } from '../hooks/useSmoothScroll'

export default function Navigation() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    // Always show nav on non-home pages
    if (!isHomePage) {
      setIsScrolled(true)
      return
    }

    // On home page, show nav after scrolling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['work', 'about', 'contact']
      const scrollPosition = window.scrollY + 200
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
      
      // If at top, clear active section
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const navItems = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Blog', href: '/blog', id: 'blog', isRoute: true },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      const lenis = getLenisInstance()
      if (lenis) {
        const targetPosition = element.offsetTop
        lenis.scrollTo(targetPosition, { immediate: false })
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <motion.nav
      initial={isHomePage ? { y: -100, opacity: 0 } : { opacity: 1 }}
      animate={isHomePage && !isScrolled ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 ${
        !isHomePage || isScrolled ? 'block' : 'hidden'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={() => {
              if (isHomePage) {
                const lenis = getLenisInstance()
                if (lenis) {
                  lenis.scrollTo(0, { immediate: false })
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }
            }}
            className="hover:opacity-70 transition-opacity"
          >
            <img 
              src="/Alireza_Iman_Logo.png" 
              alt="Alireza Iman" 
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-6 sm:gap-8">
            {isHomePage ? (
              <>
                {navItems.map((item) => {
                  if (item.isRoute) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-sm font-normal text-gray-600 hover:text-black transition-colors hidden sm:block"
                      >
                        {item.name}
                      </Link>
                    )
                  }
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      className={`text-sm font-normal transition-colors hidden sm:block ${
                        activeSection === item.id
                          ? 'text-black'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </>
            ) : (
              <>
                <Link
                  to="/#work"
                  className="text-sm font-normal text-gray-600 hover:text-black transition-colors"
                >
                  Work
                </Link>
                <Link
                  to="/blog"
                  className={`text-sm font-normal transition-colors ${
                    location.pathname === '/blog' 
                      ? 'text-black' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Blog
                </Link>
              </>
            )}
            <Button
              size="sm"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault()
                  scrollToSection('#contact')
                }
              }}
              asChild
            >
              {isHomePage ? (
                <a href="#contact">Get in touch</a>
              ) : (
                <Link to="/#contact">Get in touch</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

