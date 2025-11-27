import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import * as simpleIcons from 'simple-icons'

// Map tech stack names to simple-icons property names
const techIconMap = {
  'Next.js': 'siNextdotjs',
  'TypeScript': 'siTypescript',
  'Stripe': 'siStripe',
  'React': 'siReact',
  'JavaScript': 'siJavascript',
  'Node.js': 'siNodedotjs',
  'Svelte': 'siSvelte',
  'Python': 'siPython',
  'GitHub': 'siGithub',
  'Postman': 'siPostman',
  'Cypress': 'siCypress',
  'Playwright': 'siPlaywright',
  'LiveKit': 'siLivekit',
  'Prisma': 'siPrisma',
  'MySQL': 'siMysql',
  'Clerk': 'siClerk',
  'Tailwind CSS': 'siTailwindcss',
  'WordPress': 'siWordpress',
  'WooCommerce': 'siWoocommerce',
  'D3.js': 'siD3dotjs',
  'Framer Motion': 'siFramer',
  'Three.js': 'siThreedotjs',
  'WebGL': 'siWebgl',
  'WebSocket': 'siWebsocket',
  'Storybook': 'siStorybook',
}

// Component to render tech logo
function TechLogo({ techName }) {
  const iconKey = techIconMap[techName]
  
  if (!iconKey) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-500 font-medium">{techName.charAt(0)}</span>
      </div>
    )
  }
  
  try {
    const icon = simpleIcons[iconKey]
    
    if (!icon || !icon.path) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-xs text-gray-500 font-medium">{techName.charAt(0)}</span>
        </div>
      )
    }
    
    return (
      <div
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2 hover:border-gray-300 transition-colors"
        title={techName}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill={`#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      </div>
    )
  } catch (error) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-500 font-medium">{techName.charAt(0)}</span>
      </div>
    )
  }
}

const projects = [
  {
    id: 1,
    title: 'IKEA Comfort Guide',
    category: 'Web Application',
    description: 'Interactive comfort guide for the Canadian market helping customers find the perfect mattress, topper, and pillow based on their sleeping preferences and body type.',
    tags: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    year: '2024',
    number: '01',
    link: 'https://www.ikea.com/addon-app/guida/comfort-guide/web/latest/ca/en/',
    caseStudy: '/case-study/ikea-comfort-guide',
    image: '/projects/ikea-comfort-guide/IKEA-comfortguide.png',
  },
  {
    id: 2,
    title: 'Be Here Streaming Platform',
    category: 'Web App & Mobile',
    description: 'A comprehensive streaming platform with real-time video/audio streaming, live chat, and clip creation. Available as a web application and native iOS/Android apps.',
    tags: ['Next.js', 'React', 'TypeScript'],
    year: '2025',
    number: '02',
    link: 'https://www.thebehere.com/',
    caseStudy: '/case-study/be-here-streaming-platform',
    image: '/projects/be-here/Be-here.png',
  },
  {
    id: 3,
    title: 'Grand Lighting',
    category: 'E-commerce Website',
    description: 'E-commerce platform with automated product management system. Built with WordPress and WooCommerce, featuring LLM-powered automation for product data processing and CIN7 ERP integration.',
    tags: ['WordPress', 'WooCommerce', 'Python', 'JavaScript'],
    year: '2024',
    number: '03',
    link: 'https://www.grandlighting.ca/',
    caseStudy: '/case-study/grand-lighting',
    image: '/projects/grand-lighting/GL.png',
  },
  {
    id: 4,
    title: 'Modern Checkout Flow',
    category: 'Payment Experience',
    description: 'High-performance, secure checkout experience built with Stripe Elements. Features optimistic UI updates, comprehensive error handling, and mobile-first design optimized for conversion.',
    tags: ['React', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    year: '2025',
    number: '04',
    link: '#',
    caseStudy: '/case-study/modern-checkout-flow',
    image: '/projects/modern-checkout-flow/hero-image.jpg', // Add your image here
  },
  {
    id: 5,
    title: 'Design System Library',
    category: 'Component Library',
    description: 'Comprehensive React component library with Storybook documentation. Scalable design system for consistent UI across projects.',
    tags: ['React', 'TypeScript', 'Storybook'],
    year: '2024',
    number: '05',
    link: '#',
    caseStudy: '/case-study/design-system-library',
  },
  {
    id: 6,
    title: 'Real-Time Chat App',
    category: 'Web Application',
    description: 'WebSocket-based chat application with message encryption. Features include group chats, file sharing, and real-time notifications.',
    tags: ['React', 'Node.js', 'WebSocket'],
    year: '2023',
    number: '06',
    link: '#',
    caseStudy: '/case-study/real-time-chat-app',
  },
]

export default function Projects() {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const isMobile = window.innerWidth < 640
      const cardWidth = isMobile ? container.clientWidth : 420
      const gap = 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      setCurrentIndex(Math.min(newIndex, projects.length - 1))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSlide = (index) => {
    const container = containerRef.current
    if (!container) return
    const isMobile = window.innerWidth < 640
    const cardWidth = isMobile ? container.clientWidth : 420
    const gap = 24
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    })
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToSlide(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      scrollToSlide(currentIndex + 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <section id="work" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 text-black tracking-tight">
            Selected work
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-50 flex justify-between w-full pointer-events-none">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors pointer-events-auto ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === projects.length - 1}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors pointer-events-auto ${
                currentIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Navigation Dots - Right Side */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 hidden lg:flex">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-black w-2 h-2'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide gap-6 pb-8 px-4"
            style={{
              scrollSnapType: 'x mandatory',
            }}
            onScroll={(e) => {
              const scrollLeft = e.currentTarget.scrollLeft
              const isMobile = window.innerWidth < 640
              const cardWidth = isMobile ? e.currentTarget.clientWidth : 420
              const gap = 24
              const newIndex = Math.round(scrollLeft / (cardWidth + gap))
              setCurrentIndex(Math.min(newIndex, projects.length - 1))
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-[calc(100vw-4rem)] sm:w-[420px] flex-shrink-0 snap-start"
              >
                <div className="relative w-full min-h-[650px] bg-white border border-gray-200 rounded-sm overflow-hidden">
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative w-full h-48 overflow-hidden border-b border-gray-200">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* Card Content */}
                  <div className="relative h-full flex flex-col justify-between p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-gray-500 font-mono uppercase">
                      <span>{project.category}</span>
                      <span>{project.number} / {String(projects.length).padStart(2, '0')}</span>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center mt-8">
                      <div className="mb-8">
                        <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mb-6">
                          <span className="text-xs font-medium text-gray-600">{project.number}</span>
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-black mb-2 leading-[1.1]">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-mono uppercase tracking-wider mt-2">
                          {project.year}
                        </p>
                      </div>

                      <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-4">
                        {project.tags.map((tag) => (
                          <TechLogo key={tag} techName={tag} />
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] tracking-widest text-gray-500 uppercase">Project</span>
                        <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {project.link && (
                          <Button asChild size="sm" className="flex-1">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              View Live
                            </a>
                          </Button>
                        )}
                        {project.caseStudy && (
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link to={project.caseStudy}>Case Study</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8 lg:hidden">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
