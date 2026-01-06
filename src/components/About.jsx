import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  'Digital Direct Commerce (DDC)',
  'GenAI-Driven Merchandising',
  'Consumer Journey Architecture',
  'Technical Product Ownership',
  'Conversion Rate Optimization',
  'Agentic Commerce',
]

const skills = [
  { 
    category: 'Commerce & Strategy', 
    items: ['In-Season Business Planning', 'CRO', 'Site Taxonomy', 'Search Intent Optimization', 'Omnichannel Strategy'] 
  },
  { 
    category: 'Development & UX', 
    items: ['TypeScript', 'React', 'Next.js', 'Python', 'Node.js', 'SQL', 'Figma', 'GEO', 'Agentic Frameworks'] 
  },
  { 
    category: 'Visual & Motion', 
    items: ['Adobe After Effects', 'Photoshop', 'Illustrator', 'InDesign'] 
  },
]

const experience = [
  {
    role: 'Country Digital Merchandising Leader',
    company: 'IKEA (Ingka Group)',
    location: 'Burlington, Canada',
    timeframe: 'Mar 2022 — Present',
    summary:
      'Lead the digital flagship in-season business plan by orchestrating a cross-functional offense with Brand, Marketing, and Digital Ops. Own the end-to-end consumer journey for IKEA App and Web, leveraging GA4 and search behavior insights to implement Agentic Commerce features. Deploy Generative AI frameworks to automate local market content adaptations and personalized product storytelling.',
  },
  {
    role: 'Graphic Design Specialist',
    company: 'IKEA',
    location: 'North York, Canada',
    timeframe: 'Apr 2019 — Mar 2022',
    summary:
      'Developed high-profile graphical concepts to captivate consumers, ensuring consistent brand messaging across the global digital flagship. Partnered with digital producers to deliver end-to-end visual materials for websites, mobile apps, and social commerce.',
  },
]

const education = [
  {
    school: 'Toronto Metropolitan University',
    degree: 'Bachelor of Science in Computer Science (Minor in Economics)',
    timeframe: '2023 — 2025',
    summary: 'Research on detection of synthetic content and LLM-driven ML infrastructure.',
  },
  {
    school: 'General Assembly',
    degree: 'UX Design Professional Certificate',
    timeframe: '2021',
    summary: '',
  },
  {
    school: 'George Brown College',
    degree: 'Diploma in Computer System Technician',
    timeframe: '2018 — 2020',
    summary: '',
  },
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
        {/* Header with About text on left and image on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-24">
          {/* About Summary - Left */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-8 sm:mb-12 text-black tracking-tight">
              About
            </h2>
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-normal">
                Technical E-Commerce Leader with 7+ years of experience specializing in Digital Direct Commerce (DDC) and Site Experience.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                Expert in running an "Integrated Offense" across cross-functional teams to optimize digital flagship journeys through data-driven merchandising and UX innovation. Computer Science graduate proficient in React, Python, and Agentic Commerce to drive frictionless consumer experiences and full-funnel conversion.
              </p>
            </div>
          </motion.div>

          {/* Profile Image - Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-md aspect-square">
              <img
                src="/Linkedin.png"
                alt="Profile"
                className="w-full h-full rounded-2xl object-cover border border-gray-200 shadow-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Services and Skills - Below */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-serif font-medium mb-4 sm:mb-8 text-black tracking-tight">Services</h3>
            <p className="text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl font-normal leading-relaxed">
              Leading digital flagship business planning, consumer journey architecture, and GenAI-driven merchandising to optimize conversion and drive full-funnel growth.
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

        {/* Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-serif font-medium mb-4 sm:mb-8 text-black tracking-tight">
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.role} className="p-4 sm:p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="text-base sm:text-lg font-medium text-black">{item.role}</p>
                      <p className="text-sm text-gray-600">{item.company}</p>
                      {item.location && <p className="text-xs text-gray-500">{item.location}</p>}
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">{item.timeframe}</p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-serif font-medium mb-4 sm:mb-8 text-black tracking-tight">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((item) => (
                <div key={item.school} className="p-4 sm:p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="text-base sm:text-lg font-medium text-black">{item.school}</p>
                      <p className="text-sm text-gray-600">{item.degree}</p>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">{item.timeframe}</p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
