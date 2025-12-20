import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import BlogPost from './components/BlogPost.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import PasswordProtection from './components/PasswordProtection.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if already authenticated on mount
    return sessionStorage.getItem('portfolio_authenticated') === 'true'
  })

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuthenticated} />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <ScrollToTop />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
