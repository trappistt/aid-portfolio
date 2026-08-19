import { motion } from 'motion/react'
import { experiences } from '../data/projects'
import { fadeUp, stagger, viewportOnce } from '../motion'

export default function Experience() {
  return (
    <section id="experience" className="pt-20">
      <motion.h2
        className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-8"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        Experience
      </motion.h2>

      <motion.ul
        className="space-y-5"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger}
      >
        {experiences.map((exp) => (
          <motion.li
            key={`${exp.company}-${exp.period}`}
            variants={fadeUp}
            className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_1fr] gap-3 items-start"
          >
            <span className="text-[14px] text-mute tabular-nums pt-0.5">{exp.period}</span>
            <div>
              <p className="text-[15px] text-ink leading-snug">
                {exp.role} at{' '}
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
                  >
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </p>
              {exp.summary && (
                <p className="mt-1 text-[13px] text-mute">{exp.summary}</p>
              )}
              {exp.location && (
                <p className="mt-0.5 text-[13px] text-mute">{exp.location}</p>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
