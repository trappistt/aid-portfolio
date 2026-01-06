import { motion } from 'framer-motion'
import { Button } from './ui/button'

export default function Footer() {
  return (
    <footer id="contact" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-8 sm:mb-12 text-black tracking-tight leading-[1.1]">
            Interested in working together?
          </h2>
          <div className="space-y-6">
            <a
              href="mailto:alirezaiman@yahoo.com"
              className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 hover:text-black transition-colors font-normal"
            >
              alirezaiman@yahoo.com
            </a>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="mailto:alirezaiman@yahoo.com?subject=Let's Work Together">Send Email</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#">Download Resume</a>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 sm:pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8"
        >
          <div>
            <p className="text-gray-600 text-sm font-normal">© {new Date().getFullYear()}</p>
            <p className="text-gray-600 text-sm font-normal">Alireza Iman</p>
          </div>
          <div className="flex gap-6 sm:gap-8 text-sm text-gray-600">
            <a href="https://github.com/trappistt" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/alirezaiman/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              LinkedIn
            </a>
            <a href="https://x.com/Allendev0" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              X
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
