import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import BlogPost from './components/BlogPost.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

function App() {
  return (
    <>
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
