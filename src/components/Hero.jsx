import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { getLenisInstance } from '../hooks/useSmoothScroll'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Blog', href: '/blog', isRoute: true },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      const lenis = getLenisInstance()
      if (lenis) {
        // Use Lenis for smooth scrolling
        const targetPosition = element.offsetTop
        lenis.scrollTo(targetPosition, { immediate: false })
      } else {
        // Fallback to native smooth scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section ref={ref} id="hero" className="relative min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-20">
        {/* Name Header */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 flex items-baseline justify-between gap-4"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-black tracking-tight leading-none">
            Alireza Iman
          </h1>
          <div className="hidden md:flex flex-col items-end gap-1 text-sm text-gray-600">
            {navItems.map((item) => {
              if (item.isRoute) {
                return (
                  <Link key={item.name} to={item.href} className="hover:opacity-70 transition-opacity">
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
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.name}
                </a>
              )
            })}
          </div>
        </motion.div>

        <div className="border-t border-gray-200 mb-8 sm:mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-3">
            <p className="text-sm font-normal text-gray-500">Full Stack</p>
            <p className="text-sm font-normal text-gray-500">Creative Engineer</p>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-normal">Availability</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-normal text-black">Open to freelance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">→</span>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#contact')
                  }}
                  className="text-sm font-normal text-black hover:opacity-70 transition-opacity"
                >
                  Reach out
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-normal">Location</p>
            <div className="space-y-1">
              <p className="text-sm font-normal text-black">Toronto, ON</p>
              <p className="text-xs text-gray-500 font-mono">43.6532° N, 79.3832° W</p>
            </div>
          </div>

          <div className="md:col-span-2 md:hidden flex gap-4 text-sm text-gray-600">
            {navItems.map((item) => {
              if (item.isRoute) {
                return (
                  <Link key={item.name} to={item.href} className="hover:opacity-70 transition-opacity">
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
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.name}
                </a>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-5xl mt-16 sm:mt-20"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-black mb-8">
            I'm Alireza, a creative AI engineer based in Toronto, Ontario. Currently working as a Front-end developer at IKEA.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#work')
              }}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contact')
              }}
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
