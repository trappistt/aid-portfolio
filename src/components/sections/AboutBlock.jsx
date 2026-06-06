import { motion } from 'framer-motion'
import Block from '../layout/Block'

const stats = [
  { number: '7+', label: 'Years of Experience' },
  { number: '10+', label: 'Retail Touchpoints' },
  { number: '50M+', label: 'Users Impacted' },
]

export default function AboutBlock() {
  return (
    <Block id="about" size="lg" bg="cream" noPadding className="!w-[calc((100vw-2rem)*0.55)]">
      <div className="h-full flex flex-col p-8 lg:p-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-widest uppercase text-stone-400 font-semibold mb-6"
        >
          About Me
        </motion.span>

        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] tracking-[-0.02em] text-ink max-w-2xl"
          >
            I bridge user needs with business goals—
            <span className="text-stone-400">10 years of designing scalable, high-impact products.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 space-y-4 text-[15px] text-stone-400 leading-relaxed max-w-xl"
          >
            <p>
              At <strong className="text-ink font-semibold">IKEA Canada</strong>, I lead digital merchandising and consumer journey architecture—driving in-season planning, Agentic Commerce, and conversion across web and app.
            </p>
            <p>
              I contribute to <strong className="text-ink font-semibold">Skapa</strong>, IKEA's global design system, working with engineering on React and Contentful.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-800"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="font-serif text-[clamp(2rem,3vw,3rem)] text-ink leading-none">
                {stat.number}
              </div>
              <div className="text-sm text-stone-500 mt-1 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Block>
  )
}
