import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  'Interface Design',
  'Creative Front-end',
  'WebGL & Three.js',
  'Design Systems',
  'Prototyping',
  'Performance Tuning',
]

const skills = [
  { category: 'Front-end', items: ['React', 'TypeScript', 'Next.js', 'Vue.js'] },
  { category: '3D & Graphics', items: ['Three.js', 'WebGL', 'GLSL', 'Blender'] },
  { category: 'Tools', items: ['Figma', 'Git', 'Vite', 'Webpack'] },
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'HTML/CSS'] },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  return (
    <section ref={ref} id="about" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-8 sm:mb-12 text-black tracking-tight">
            About
          </h2>

          <div className="max-w-3xl space-y-6">
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-normal">
              I'm a full stack creative engineer with 5+ years of experience mainly in frontend development and Visual/UI design.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-normal">
              I worked at IKEA from 2019 to 2025 in various design and development roles, with the latest one being Front-end developer. I've also worked on several freelance projects for clients, blending design, code, and emerging technology to build experiences that feel effortless on the surface and highly engineered underneath.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-serif font-medium mb-4 sm:mb-8 text-black tracking-tight">Services</h3>
            <p className="text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl font-normal leading-relaxed">
              Specializing in modern front-end development, WebGL visuals, and tightly crafted
              product interfaces.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-700 hover:text-black transition-colors font-normal"
                >
                  {service}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-serif font-medium mb-4 sm:mb-8 text-black tracking-tight">Skills & Technologies</h3>
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-700 font-normal"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
