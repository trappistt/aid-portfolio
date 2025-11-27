import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

// Sample blog data - should match Blogs.jsx
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
  },
]

export default function BlogPreview() {
  // Show only the first 3 blogs
  const featuredBlogs = blogs.slice(0, 3)

  return (
    <section id="blog-preview" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 flex items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 text-black tracking-tight">
              Latest thoughts
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              Insights on web development, design, and the creative process.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link to="/blog">View All</Link>
          </Button>
        </motion.div>

        {/* Blog Grid - 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {featuredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {blog.externalLink ? (
                <a
                  href={blog.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-gray-300 transition-colors"
                >
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider mb-4">
                      <span>{blog.category}</span>
                      <span>{blog.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-medium mb-3 text-black group-hover:opacity-70 transition-opacity leading-tight">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">{blog.readTime}</span>
                      <span className="text-sm text-black group-hover:opacity-70 transition-opacity">
                        Read on Medium →
                      </span>
                    </div>
                  </div>
                </a>
              ) : (
                <Link
                  to={`/blog/${blog.slug}`}
                  className="block h-full bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-gray-300 transition-colors"
                >
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider mb-4">
                      <span>{blog.category}</span>
                      <span>{blog.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-medium mb-3 text-black group-hover:opacity-70 transition-opacity leading-tight">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">{blog.readTime}</span>
                      <span className="text-sm text-black group-hover:opacity-70 transition-opacity">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </motion.article>
          ))}
        </div>

        {/* View More Button - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center sm:hidden"
        >
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">View All Posts</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

