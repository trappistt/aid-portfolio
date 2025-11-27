import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

export default function Navigation() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true)
      return
    }

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

    window.addEventListener('scroll', handleScroll)
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                onClick={() => {
                  if (isHomePage) {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
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
              
              <div className="flex items-center gap-8">
                {isHomePage ? (
                  navItems.map((item) => {
                    if (item.isRoute) {
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-sm font-normal text-gray-600 hover:text-black transition-colors"
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
                        className={`text-sm font-normal transition-colors ${
                          activeSection === item.id
                            ? 'text-black'
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        {item.name}
                      </a>
                    )
                  })
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
                      className="text-sm font-normal text-gray-600 hover:text-black transition-colors"
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
      )}
    </AnimatePresence>
  )
}

