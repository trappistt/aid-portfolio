import { motion } from 'framer-motion'
import Block from '../layout/Block'

export default function PhilosophyBlock() {
  return (
    <Block id="philosophy" size="sm" bg="ink" noPadding>
      <div className="h-full flex flex-col justify-center p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -top-4 -left-2 font-serif text-[8rem] leading-none text-white/10 select-none"
          >
            "
          </motion.div>
          
          <blockquote className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.35] tracking-[-0.01em] text-white relative z-10">
            Design isn't just about shaping solutions. It's about identifying the right opportunities.
          </blockquote>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-px bg-white/30 mt-8 mb-4"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-white/50 font-medium"
          >
            My Design Philosophy
          </motion.p>
        </motion.div>
      </div>
    </Block>
  )
}
