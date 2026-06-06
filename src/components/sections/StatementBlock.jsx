import { motion } from 'framer-motion'
import Block from '../layout/Block'

export default function StatementBlock() {
  return (
    <Block id="statement" size="sm" bg="warm" noPadding>
      <div className="h-full flex flex-col justify-center items-center p-8 lg:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-16 mx-auto mb-8 rounded-full border border-stone-700 flex items-center justify-center"
          >
            <span className="text-2xl text-stone-400">✦</span>
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-[-0.01em] text-ink mb-6"
          >
            Products earn trust
            <br />
            through hundreds
            <br />
            of small details.
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-1 text-sm text-stone-500"
          >
            <span>Clear interactions.</span>
            <span>Predictable behavior.</span>
            <span>Thoughtful defaults.</span>
          </motion.div>
        </motion.div>
      </div>
    </Block>
  )
}
