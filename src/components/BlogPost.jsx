import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from './ui/button'
import Navigation from './Navigation.jsx'
import Footer from './Footer.jsx'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const blogs = [
  {
    id: 1,
    title: 'The AI–Design Connection: Design Systems as the Lingua Franca',
    excerpt: 'How design systems serve as the essential bridge between AI tools and production-ready code, accelerating development workflows by 40–90% while maintaining brand consistency and quality.',
    category: 'AI & Development',
    date: '2025-11-26',
    readTime: '12 min read',
    slug: 'ai-design-connection-design-systems',
    externalLink: 'https://alirezaiman.medium.com/91c0d8954cdc?postPublishedType=initial',
    content: `
      <p>The AI Big Bang is here, and development velocity is spiking. But generating code fast is useless if it's off-brand or breaks your architecture. Design systems are the indispensable lingua franca and productivity coefficient for the AI era.</p>
      
      <h2>The Core Thesis</h2>
      <p>Design systems serve as the essential bridge between AI tools and production-ready code. By training AI agents on your bespoke codebase, conventions, and syntax, you unlock capabilities that accelerate engineering workflows by 40–90%.</p>
      
      <h2>Key Insights</h2>
      <p><strong>The Context Crisis:</strong> While 68% of developers use AI to write code, only 32% trust the output. This trust gap exists because AI needs organizational context to produce on-brand, high-quality code that aligns with established standards.</p>
      
      <p><strong>Design Systems as Foundation:</strong> Design systems provide the structured framework—tokens, patterns, components, and rules—that AI agents need to generate consistent, reusable code. They transform AI from a generic code generator into a "component boilerplate generator on steroids."</p>
      
      <p><strong>The Technical Unlock:</strong> Model Context Protocol (MCP) servers pipe critical design context—styles, variables, Code Connect specs—from design tools like Figma directly into your IDE/AI agent. This enables AI to reuse existing components, apply design tokens automatically, and generate high-quality starting code.</p>
      
      <h2>AI Capabilities Enabled by Design Systems</h2>
      <ul>
        <li><strong>Component Code Generation:</strong> Create components 40–90% faster with proper context</li>
        <li><strong>Cross-Platform Translation:</strong> Automatically translate components across tech stacks (React to Vue, Angular to Web Components)</li>
        <li><strong>Automated Testing:</strong> Generate unit tests and accessibility reviews</li>
        <li><strong>Documentation:</strong> Personalized, always-up-to-date documentation tailored to different disciplines and skill levels</li>
      </ul>
      
      <h2>Vibe Coding: The New Paradigm</h2>
      <p>With design system context, teams can practice "Vibe Coding"—starting with pure intention rather than wireframes. Tools like v0 and shadcn/ui Registries allow rapid generation of testable interfaces by describing the vibe and function in natural language.</p>
      
      <h2>Human Oversight Remains Critical</h2>
      <p>AI should be viewed as a "smart-but-sometimes-unsophisticated junior developer." Human experts must maintain control over input and output, ensuring AI enhances rather than replaces hard-earned knowledge and architecture. The goal is to let machines handle drudgery while humans focus on craft and thoughtful design.</p>
      
      <p><a href="https://alirezaiman.medium.com/91c0d8954cdc?postPublishedType=initial" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70">Read the full article on Medium →</a></p>
    `,
  },
  {
    id: 2,
    title: 'You Just Need to Be Louder',
    excerpt: 'A personal journey navigating the challenges of entering the tech industry during the pandemic, and discovering that active participation in the design community is key to building a strong personal brand and advancing your career.',
    category: 'Career & Growth',
    date: '2023-02-19',
    readTime: '6 min read',
    slug: 'you-just-need-to-be-louder',
    externalLink: 'https://alirezaiman.medium.com/you-just-need-to-be-louder-45878ad3dad0',
    content: `
      <p>Entering the tech industry during a global pandemic was far from easy. As a junior designer, I faced countless rejections and setbacks while trying to secure internships and break into the field. But this challenging period taught me one of the most valuable lessons of my career: you just need to be louder.</p>
      
      <h2>The Challenge</h2>
      <p>After facing multiple rejections for internships, I realized that simply having a portfolio wasn't enough. I needed to understand what successful designers were doing differently. So I reached out to designers from around the world, asking them about their journey and what strategies helped them succeed.</p>
      
      <h2>The Discovery</h2>
      <p>What I learned was eye-opening. The designers who were thriving weren't just talented—they were actively participating in the design community. They were writing blog posts, attending seminars, engaging in workshops, and consistently sharing their work and insights publicly.</p>
      
      <h2>Building Your Personal Brand</h2>
      <p>Personal branding isn't about being famous—it's about making your work and expertise visible. When you share your process, your learnings, and your projects publicly, you're not just showcasing your skills—you're building a reputation and a network that opens doors.</p>
      
      <h2>The Power of Storytelling</h2>
      <p>One of the most powerful tools I discovered was storytelling. When you tell compelling stories about your work—the challenges you faced, the solutions you found, the lessons you learned—you're not just showing what you did, you're showing how you think. And that's what employers and clients really want to see.</p>
      
      <h2>Community Engagement</h2>
      <p>Active participation in the design community—whether through writing, speaking, or simply engaging in meaningful conversations—creates opportunities that wouldn't exist otherwise. It's through these connections that I found mentors, collaborators, and eventually, the opportunities that shaped my career.</p>
      
      <h2>The Takeaway</h2>
      <p>If you're starting out or feeling stuck in your career, remember: enhancing your personal branding and community involvement isn't optional—it's essential. Your work deserves to be seen, and your voice deserves to be heard. You just need to be louder.</p>
      
      <p><a href="https://alirezaiman.medium.com/you-just-need-to-be-louder-45878ad3dad0" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70">Read the full article on Medium →</a></p>
    `,
  },
]

export default function BlogPost() {
  const { slug } = useParams()
  const blog = blogs.find(b => b.slug === slug)

  // Enable smooth scroll
  useSmoothScroll()

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen px-6 pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-medium mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <main className="relative pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider mb-6">
                <span>{blog.category}</span>
                <span>•</span>
                <span>{formatDate(blog.date)}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 leading-[1.1]">
                {blog.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                {blog.excerpt}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <article className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="prose prose-lg max-w-none
                prose-headings:font-medium prose-headings:text-black prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-black prose-a:underline hover:prose-a:opacity-70
                prose-ul:text-gray-700 prose-ul:leading-relaxed
                prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {blog.externalLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={blog.externalLink} target="_blank" rel="noopener noreferrer">
                    Read Full Article on Medium →
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </article>

        {/* Navigation Footer */}
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
              <Link
                to="/blog"
                className="text-lg text-gray-600 hover:text-black transition-colors"
              >
                ← Back to Blog
              </Link>
              <Button asChild>
                <Link to="/#contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

