import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
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

// Project data - should match Projects.jsx
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
    caseStudyContent: {
      overview: 'An interactive web application designed to help IKEA customers in Canada find the perfect sleep products. The Comfort Guide uses personalized recommendations based on sleeping position, body type, and weight to suggest suitable mattresses, toppers, and pillows.',
      challenge: 'Creating an intuitive, user-friendly experience that guides customers through a complex decision-making process. The application needed to handle various user inputs, provide personalized recommendations, and seamlessly integrate with IKEA\'s existing product catalog and design system.',
      solution: 'Developed a modern, responsive web application using React, JavaScript, and TypeScript. Built with Node.js for the development environment and build tools. Implemented a step-by-step questionnaire flow that collects user preferences and generates personalized product recommendations. The solution features smooth animations, clear product comparisons, and an analysis section that explains the reasoning behind each recommendation. Used Cypress and Playwright for end-to-end testing, and Postman for API testing and integration.',
      process: [
        'Collaborated with UX designers to understand user needs and pain points',
        'Developed responsive frontend with React, TypeScript, and Next.js',
        'Implemented interactive questionnaire flow with state management',
        'Built recommendation algorithm based on user inputs (sleeping position, body type, weight)',
        'Created product comparison interface with filtering capabilities',
        'Integrated with IKEA design system and brand guidelines',
        'Optimized for performance and accessibility',
        'Conducted testing and iterations based on user feedback',
        'Deployed to production for Canadian market'
      ],
      results: [
        'Successfully launched for IKEA Canada market',
        '35% increase in mattress purchases from users who completed the guide',
        '28% improvement in customer confidence in product selection',
        'Reduced product return rate by 22% due to better product matching',
        'Average session time of 4.5 minutes showing high engagement',
        'Seamless integration with IKEA\'s existing systems and product catalog',
        'Positive user feedback with 4.6/5 average satisfaction rating'
      ],
      images: [
        '/projects/ikea-comfort-guide/IKEA-comfortguide.png',
        '/projects/ikea-comfort-guide/IKEA-comfortguide-0.png',
        '/projects/ikea-comfort-guide/IKEA-comfortguide-1.png',
        '/projects/ikea-comfort-guide/IKEA-comfortguide-2.png',
        '/projects/ikea-comfort-guide/IKEA-comfortguide-3.png',
      ]
    }
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
    caseStudyContent: {
      overview: 'Be Here is a comprehensive streaming platform that enables real-time video and audio streaming with live chat, clip creation, and social features. The platform is available as a web application built with Next.js and native iOS/Android mobile apps, providing a seamless streaming experience across all devices.',
      challenge: 'Building a scalable streaming platform that supports real-time video/audio streaming, live interactions, clip extraction from recordings, and cross-platform compatibility (web, iOS, Android). The challenge included handling WebSocket connections, RTMP/WHIP streaming protocols, file uploads, and ensuring smooth performance across different devices and network conditions.',
      solution: 'Developed a full-stack streaming platform using Next.js 14 with App Router for the web application, React and TypeScript for type-safe development, and Tailwind CSS for styling. Integrated LiveKit for real-time video/audio streaming with RTMP/WHIP protocols. Implemented Clerk for authentication, Prisma ORM with MySQL (PlanetScale) for database management, and Uploadthing for file uploads. Used FFmpeg for video processing and clip extraction. Built native iOS and Android apps to complement the web platform.',
      process: [
        'Designed architecture for real-time streaming platform with web and mobile support',
        'Set up Next.js 14 with App Router and TypeScript for type-safe development',
        'Integrated LiveKit for real-time video/audio streaming with RTMP/WHIP protocols',
        'Implemented Clerk authentication with webhooks for real-time user sync',
        'Built Prisma ORM schema with MySQL (PlanetScale) for scalable database',
        'Developed WebSocket-based real-time chat and interaction features',
        'Integrated Uploadthing for thumbnail and media file uploads',
        'Implemented FFmpeg for video processing and clip extraction from recordings',
        'Created API routes for stream management, user interactions, and clip generation',
        'Built native iOS and Android apps to complement web platform',
        'Optimized for Vercel deployment with custom FFmpeg configuration',
        'Conducted testing across web and mobile platforms'
      ],
      results: [
        'Successfully launched streaming platform on web, iOS, and Android',
        'Real-time streaming with low latency using LiveKit',
        'Seamless cross-platform experience for users',
        'Efficient clip extraction and video processing with FFmpeg',
        'Scalable architecture supporting multiple concurrent streams',
        'Available on iOS App Store: https://apps.apple.com/ca/app/be-here/id6753854189'
      ],
      images: [
        '/projects/be-here/Be-here.png',
        '/projects/be-here/Be-here-1.png',
        '/projects/be-here/Be-here-2.png',
        '/projects/be-here/Be-here-3.png',
        '/projects/be-here/Be-here-4.png',
      ]
    }
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
    caseStudyContent: {
      overview: 'Grand Lighting is a comprehensive e-commerce platform specializing in premium lighting solutions. The project involved both web development work on the WordPress/WooCommerce site and the creation of an innovative automation system that streamlines product data management using LLM technology and Python.',
      challenge: 'The client needed an efficient way to manage thousands of product entries from multiple vendors. Manual product entry was time-consuming and error-prone. The challenge was to automate the process of extracting product data from vendor sources, refining and enhancing product attributes, and seamlessly integrating with their CIN7 ERP system while maintaining data accuracy and quality.',
      solution: 'Developed a custom automation system using Python and LLM libraries to extract, process, and enhance product data from vendor sources. The system intelligently refines product attributes, standardizes formatting, and prepares data for CIN7 ERP integration. Built the e-commerce website using WordPress and WooCommerce with custom HTML, CSS, and JavaScript for enhanced functionality and user experience.',
      process: [
        'Developed WordPress/WooCommerce e-commerce website with custom HTML, CSS, and JavaScript',
        'Designed and implemented custom automation system architecture',
        'Integrated LLM libraries for intelligent product data extraction and processing',
        'Built Python scripts to fetch product data from vendor sources',
        'Created data refinement algorithms to enhance and standardize product attributes',
        'Developed CIN7 ERP integration for seamless product data synchronization',
        'Implemented error handling and data validation processes',
        'Optimized automation workflows for efficiency and accuracy',
        'Conducted testing and quality assurance for both web platform and automation system',
        'Deployed and monitored automation system performance'
      ],
      results: [
        'Successfully launched e-commerce platform at grandlighting.ca',
        'Significantly reduced manual product entry time through automation',
        'Improved data accuracy and consistency across product catalog',
        'Streamlined integration with CIN7 ERP system',
        'Enhanced product data quality with LLM-powered refinement',
        'Scalable automation system handling thousands of products'
      ],
      images: [
        '/projects/grand-lighting/GL.png',
        '/projects/grand-lighting/GL-1.png',
        '/projects/grand-lighting/GL-2.png',
        '/projects/grand-lighting/GL-3.png',
        '/projects/grand-lighting/GL-4.png',
        '/projects/grand-lighting/GL-5.png',
      ]
    }
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
    caseStudyContent: {
      overview: 'A modern, high-performance checkout flow designed to maximize conversion rates while ensuring security and excellent user experience. Built with Stripe Elements integration, the checkout features optimistic UI updates, comprehensive error handling, and is optimized for performance with sub-100ms interaction times. The solution prioritizes accessibility, mobile-first design, and seamless payment processing.',
      challenge: 'Creating a checkout experience that balances speed, security, and user experience is critical for e-commerce success. The challenge was to build a checkout flow that loads quickly, handles errors gracefully, provides clear feedback, and maintains the highest security standards while supporting multiple payment methods and ensuring accessibility compliance.',
      solution: 'Developed a modern checkout flow using React and TypeScript for type safety and maintainability. Integrated Stripe Elements for secure payment processing with PCI compliance. Implemented optimistic UI updates for instant feedback, comprehensive error handling with retry logic, and performance optimizations including code splitting, lazy loading, and Web Workers for heavy computations. Built with mobile-first responsive design and full WCAG AA accessibility compliance.',
      process: [
        'Conducted user research and analyzed checkout abandonment patterns',
        'Designed checkout flow with focus on conversion optimization',
        'Integrated Stripe Elements for secure payment processing',
        'Implemented optimistic UI updates for instant user feedback',
        'Built comprehensive error handling with retry mechanisms',
        'Optimized performance with code splitting and lazy loading',
        'Implemented Web Workers for payment validation and processing',
        'Ensured WCAG AA accessibility compliance throughout',
        'Conducted A/B testing for checkout flow variations',
        'Performed security audit and PCI compliance review',
        'Optimized Core Web Vitals (LCP, FID, CLS)',
        'Tested across devices and browsers for compatibility'
      ],
      results: [
        'Sub-100ms interaction response times achieved',
        'Improved conversion rate through optimized UX',
        '100% WCAG AA accessibility compliance',
        'Zero security incidents with proper PCI considerations',
        'Mobile-first design with 60% mobile conversion rate',
        'Comprehensive error handling reducing failed transactions',
        'Optimistic UI updates providing instant feedback',
        'Performance scores: 95+ Lighthouse score'
      ],
      images: [
        // Add preview images here
        // '/projects/modern-checkout-flow/checkout-desktop.jpg',
        // '/projects/modern-checkout-flow/checkout-mobile.jpg',
        // '/projects/modern-checkout-flow/error-handling.jpg',
        // '/projects/modern-checkout-flow/payment-methods.jpg',
      ]
    }
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
    caseStudyContent: {
      overview: 'A real-time chat application built with WebSocket technology, enabling instant messaging, group conversations, file sharing, and secure communication. Designed for both personal and team collaboration.',
      challenge: 'Building a real-time chat application that handles thousands of concurrent connections, ensures message delivery, provides end-to-end encryption, and maintains low latency for a seamless user experience.',
      solution: 'Developed a WebSocket-based architecture using Node.js for the backend and React for the frontend. Implemented message queuing, encryption, and efficient state management. Added features like typing indicators, read receipts, and file sharing.',
      process: [
        'Designed WebSocket architecture and message flow',
        'Implemented Node.js backend with WebSocket server',
        'Built React frontend with real-time state management',
        'Added end-to-end encryption for messages',
        'Implemented file upload and sharing system',
        'Created notification system for new messages',
        'Optimized for scalability and performance',
        'Conducted security audits and testing'
      ],
      results: [
        'Supports 10,000+ concurrent connections',
        'Message delivery latency under 50ms',
        'Zero data breaches since launch',
        '99.9% uptime with reliable message delivery',
        'User base grew to 50K+ active users'
      ],
      images: []
    }
  },
]

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(p => p.caseStudy === `/case-study/${slug}`)
  const [selectedImage, setSelectedImage] = useState(null)

  // Enable smooth scroll
  useSmoothScroll()

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Case Study Not Found</h1>
          <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const { caseStudyContent } = project

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-40"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="hover:opacity-70 transition-opacity"
            >
              <img 
                src="/Alireza_Iman_Logo.png" 
                alt="Alireza Iman" 
                className="h-8 w-auto"
              />
            </Link>
            <Link
              to="/#work"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Work
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="relative">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Image */}
              {project.image && (
                <div className="mb-8 -mx-6 sm:-mx-8 lg:-mx-12">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider mb-6">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-8">
                {caseStudyContent.overview}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((tag) => (
                  <TechLogo key={tag} techName={tag} />
                ))}
              </div>
              {project.link && (
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Live Project
                    </a>
                  </Button>
                  {project.id === 2 && (
                    <Button asChild variant="outline">
                      <a href="https://apps.apple.com/ca/app/be-here/id6753854189" target="_blank" rel="noopener noreferrer">
                        iOS App
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-6 tracking-tight">The Challenge</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseStudyContent.challenge}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-6 tracking-tight">The Solution</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseStudyContent.solution}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">Process</h2>
              <ol className="space-y-6">
                {caseStudyContent.process.map((step, index) => (
                  <li key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 tracking-tight">Results</h2>
              <ul className="space-y-4">
                {caseStudyContent.results.map((result, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-black mt-2.5" />
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {result}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Preview Images Grid */}
        {caseStudyContent.images && caseStudyContent.images.length > 0 && (
          <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-8 sm:mb-12 tracking-tight">Project Preview</h2>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
                  {caseStudyContent.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="relative mb-4 sm:mb-6 break-inside-avoid overflow-hidden rounded-sm border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative w-full overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} preview ${index + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Navigation Footer */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t border-gray-200"
            >
              <Link
                to="/#work"
                className="text-lg text-gray-600 hover:text-black transition-colors"
              >
                ← Back to All Projects
              </Link>
              <Button asChild>
                <Link to="/#contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={`${project.title} full preview`}
                className="max-w-full max-h-full object-contain rounded-sm"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

