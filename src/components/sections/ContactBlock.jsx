import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Block from '../layout/Block'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alirezaiman/' },
  { label: 'Email', href: 'mailto:alirezaiman@yahoo.com' },
  { label: 'GitHub', href: 'https://github.com/trappistt' },
]

export default function ContactBlock() {
  return (
    <Block id="contact" size="md" bg="ink" noPadding>
      <div className="h-full flex flex-col justify-between p-8 lg:p-12">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase text-white/40 font-semibold block"
          >
            Get in Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-white mt-6"
          >
            Let's create
            <br />
            something amazing.
          </motion.h2>
        </div>

        <nav className="flex flex-col gap-7">
          {links.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              className="group inline-flex items-center gap-2 text-white text-xl font-medium hover:opacity-80 transition-opacity w-fit"
            >
              {link.label}
              <ArrowUpRight
                className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </motion.a>
          ))}
        </nav>
      </div>
    </Block>
  )
}
