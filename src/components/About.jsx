import { motion } from 'motion/react'
import { EMAIL, RESUME_URL } from '../data/projects'
import { fadeUp, stagger } from '../motion'

export default function About() {
  return (
    <motion.section
      id="about"
      className="min-h-[70vh] flex flex-col justify-center"
      initial="hidden"
      animate="show"
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="flex items-start gap-4 sm:gap-5">
        <motion.img
          src="/avatar.png"
          alt="Alireza Iman"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover select-none grayscale shrink-0"
          width={64}
          height={64}
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        />
        <div className="min-w-0 pt-0.5">
          <h1 className="text-[1.35rem] sm:text-[1.5rem] font-normal tracking-[-0.02em] text-ink leading-tight">
            Alireza Iman
          </h1>
          <p className="mt-1 text-[14px] sm:text-[15px] text-mute">Product & Digital Experience</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6 space-y-3 text-[15px] leading-[1.6] text-mute max-w-md">
        <p>
          Based in Toronto. Currently leading digital product for business banking at{' '}
          <a
            href="https://www.scotiabank.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-[3px] decoration-ink/30 hover:decoration-ink"
          >
            Scotiabank
          </a>
          .
        </p>
        <p>
          Previously at{' '}
          <a
            href="https://www.ikea.com/ca/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-[3px] decoration-ink/30 hover:decoration-ink"
          >
            IKEA
          </a>{' '}
          for 7 years, owning commerce products across web and app, from discovery and
          merchandising through conversion.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
        <motion.a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-ink hover:bg-soft"
        >
          Resume
        </motion.a>
        <motion.a
          href={`mailto:${EMAIL}`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-ink px-4 py-2 text-[13px] text-page hover:opacity-85"
        >
          Let’s talk
        </motion.a>
      </motion.div>
    </motion.section>
  )
}
