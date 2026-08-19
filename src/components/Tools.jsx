import { motion } from 'motion/react'
import { tools } from '../data/projects'
import { ToolLogo } from './toolLogos'
import { fadeUp, stagger, viewportOnce } from '../motion'

export default function Tools() {
  return (
    <section id="tools" className="pt-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-2"
        >
          Tools
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[14px] text-mute mb-8">
          What I use to research, decide, and ship.
        </motion.p>
      </motion.div>

      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger}
      >
        {tools.map((tool) => (
          <motion.li key={tool.id} variants={fadeUp}>
            <motion.a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3, opacity: 0.55 }}
              className="group inline-flex items-center gap-2.5 text-[15px] leading-none text-ink"
            >
              <ToolLogo id={tool.id} />
              <span>{tool.name}</span>
            </motion.a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
