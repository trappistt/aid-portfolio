import { motion } from 'framer-motion'
import Block from '../layout/Block'

const experiences = [
  {
    period: '2026 — Present',
    role: 'Digital Experience Manager',
    company: 'Scotiabank',
    description:
      'Leading digital experience strategy and design across key customer touchpoints.',
  },
  {
    period: '2022 — 2025',
    role: 'Digital Commerce and Merchandising Lead',
    company: 'IKEA',
    description:
      'Owned commerce journeys, merchandising strategy, and conversion across web and app.',
  },
  {
    period: '2019 — 2021',
    role: 'Digital Designer',
    company: 'IKEA',
    description:
      'Designed digital interfaces and campaigns for in-store and online retail experiences.',
  },
]

export default function ExperienceBlock() {
  return (
    <Block id="experience" size="md" bg="warm" noPadding>
      <div className="h-full flex flex-col">
        <div className="p-8 lg:p-12 pb-0">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase text-stone-400 mb-2 block font-semibold"
          >
            Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-ink"
          >
            Where I've been
          </motion.h2>
        </div>

        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 pt-10">
          <div className="space-y-9">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-medium text-ink text-[1.05rem] leading-snug mb-1.5">
                  {exp.role}
                </h3>
                <p className="text-sm text-stone-400">
                  {exp.company} · {exp.period}
                </p>
                <p className="text-sm text-stone-500 leading-relaxed mt-2 max-w-md">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Block>
  )
}
