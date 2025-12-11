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
  'Figma': 'siFigma',
  'Adobe': 'siAdobe',
  'Adobe After Effects': 'siAdobe',
  'Photoshop': 'siAdobe',
  'Illustrator': 'siAdobe',
  'InDesign': 'siAdobe',
  'Contentful': 'siContentful',
}

// Map tech stack names to custom image URLs (for icons not available in simple-icons)
const customIconUrls = {
  'Adobe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1200px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
  'Adobe After Effects': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/500px-Adobe_After_Effects_CC_icon.svg.png',
  'Photoshop': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/500px-Adobe_Photoshop_CC_icon.svg.png',
  'Illustrator': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2048px-Adobe_Illustrator_CC_icon.svg.png',
  'InDesign': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Adobe_InDesign_CC_icon.svg/1051px-Adobe_InDesign_CC_icon.svg.png',
  'Cursor': 'https://cursor.com/favicon.ico',
}

// Component to render tech logo
function TechLogo({ techName }) {
  // Check for custom image URL first
  const customUrl = customIconUrls[techName]
  if (customUrl) {
    return (
      <div
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2 hover:border-gray-300 transition-colors overflow-hidden"
        title={techName}
      >
        <img
          src={customUrl}
          alt={techName}
          className="w-6 h-6 object-contain"
        />
      </div>
    )
  }

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
    title: 'Supp',
    category: 'Product Design',
    description: 'Lead designer for an agentic reverse marketplace platform. Designing user experiences that leverage AI agents to transform how users discover and connect with services. Currently in active development.',
    tags: ['Figma', 'Cursor', 'Product Design'],
    year: 'June 2025 — Present',
    number: '01',
    link: null,
    caseStudy: '/case-study/supp',
    image: '/projects/supp/supp.png',
  },
  {
    id: 2,
    title: 'IKEA Digital Experience',
    category: 'Product & Web Design',
    description: 'Led product UX and design strategy for IKEA web and app, building interfaces across merchandising, checkout, navigation, and homepage using analytics-driven insights and GenAI prototyping.',
    tags: ['Figma', 'Adobe', 'React', 'GitHub', 'Contentful'],
    year: '2022 — Present',
    number: '02',
    link: 'https://www.ikea.com/ca/en/',
    caseStudy: '/case-study/ikea-digital-experience',
    image: '/projects/ikea-digital-experience/IKEA.png',
  },
  {
    id: 3,
    title: 'Be Here Streaming Platform',
    category: 'Web App & Mobile',
    description: 'Designed and developed a comprehensive streaming platform with real-time video/audio streaming, live chat, and clip creation. Focused on creating intuitive interfaces for content creators and viewers across web and native iOS/Android apps.',
    tags: ['Next.js', 'React', 'TypeScript', 'Figma', 'Cursor'],
    year: '2025',
    number: '03',
    link: 'https://www.thebehere.com/',
    caseStudy: '/case-study/be-here-streaming-platform',
    image: '/projects/be-here/Be-here.png',
  },
  {
    id: 4,
    title: 'Grand Lighting',
    category: 'E-commerce Website',
    description: 'E-commerce platform with automated product management system. Built with WordPress and WooCommerce, featuring LLM-powered automation for product data processing and CIN7 ERP integration.',
    tags: ['WordPress', 'WooCommerce', 'Python', 'JavaScript'],
    year: '2024',
    number: '04',
    link: 'https://www.grandlighting.ca/',
    caseStudy: '/case-study/grand-lighting',
    image: '/projects/grand-lighting/GL.png',
  },
  {
    id: 5,
    title: 'x402 React Component Library',
    category: 'Open Source Library',
    description: 'A React component library for Coinbase x402 payments. Enables seamless integration of HTTP 402 payment protocol for micropayments, API monetization, and on-chain payments with USDC.',
    tags: ['React', 'TypeScript', 'Coinbase x402', 'Web3'],
    year: '2025',
    number: '05',
    link: 'https://x402-react.vercel.app/',
    caseStudy: '/case-study/x402-react-library',
    image: '/projects/x402/x402.png',
  },
  {
    id: 6,
    title: 'IKEA Visual Design & Motion Media',
    category: 'Visual Design & Motion Graphics',
    description: 'Created visual concepts and motion media for IKEA in-store communication, marketing campaigns, and retail design. Designed graphics for offers, seasonal campaigns, and developed new content formats to reach customers effectively.',
    tags: ['Adobe After Effects', 'Adobe', 'Photoshop', 'Illustrator', 'InDesign'],
    year: '2019 — 2022',
    number: '06',
    link: 'https://www.ikea.com/ca/en/',
    caseStudy: '/case-study/ikea-visual-design',
    image: '/projects/ikea-visual-design/ikea-visual-design.png',
    disabled: true,
  },
]

export default function Projects() {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleProjects = projects.filter(project => !project.disabled)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const isMobile = window.innerWidth < 640
      const cardWidth = isMobile ? container.clientWidth : 420
      const gap = 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      setCurrentIndex(Math.min(newIndex, visibleProjects.length - 1))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [visibleProjects.length])

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
    if (currentIndex < visibleProjects.length - 1) {
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
  }, [currentIndex, visibleProjects.length])

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
              disabled={currentIndex === visibleProjects.length - 1}
              className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors pointer-events-auto ${
                currentIndex === visibleProjects.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
              setCurrentIndex(Math.min(newIndex, visibleProjects.length - 1))
            }}
          >
            {visibleProjects.map((project, index) => (
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
                      <span>{project.number} / {String(visibleProjects.length).padStart(2, '0')}</span>
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
            {visibleProjects.map((_, index) => (
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
