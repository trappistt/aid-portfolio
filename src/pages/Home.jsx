import { motion } from 'framer-motion'
import Navigation from '../components/Navigation.jsx'
import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'
import BlogPreview from '../components/BlogPreview.jsx'
import About from '../components/About.jsx'
import Footer from '../components/Footer.jsx'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function Home() {
  useSmoothScroll()

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <Hero />
        <Projects />
        <BlogPreview />
        <About />
        <Footer />
      </motion.main>
    </div>
  )
}

