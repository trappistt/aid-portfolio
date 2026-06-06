import { motion } from 'framer-motion'
import Block from '../layout/Block'
import { VinylPortfolio } from '../vinyl-portfolio'

export default function WorksBlock() {
  return (
    <Block id="works" size="xl" bg="dark" noPadding>
      <div className="h-full flex flex-col">
        {/* Section header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-8 lg:p-12 pointer-events-none">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase text-stone-300 mb-2 block font-semibold"
          >
            Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-ink"
          >
            Dig through the crate
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mt-3"
          >
            <span className="w-2 h-2 rounded-full bg-stone-300" />
            <span className="text-sm text-stone-200 font-medium">2019—Present</span>
          </motion.div>
        </div>

        {/* 3D vinyl portfolio scene */}
        <div className="flex-1 min-h-0">
          <VinylPortfolio />
        </div>
      </div>
    </Block>
  )
}
