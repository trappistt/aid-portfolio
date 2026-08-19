import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconGithub, IconLinkedin, IconMail } from './icons'

const menuSpring = { type: 'spring', stiffness: 520, damping: 34, mass: 0.7 }

function MenuGlyph({ open }) {
  return (
    <span className="relative flex h-[15px] w-[15px] items-center justify-center" aria-hidden>
      <motion.span
        className="absolute h-px w-[13px] bg-current"
        animate={open ? { y: 0, rotate: 45 } : { y: -4, rotate: 0 }}
        transition={menuSpring}
      />
      <motion.span
        className="absolute h-px w-[13px] bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.16 }}
      />
      <motion.span
        className="absolute h-px w-[13px] bg-current"
        animate={open ? { y: 0, rotate: -45 } : { y: 4, rotate: 0 }}
        transition={menuSpring}
      />
    </span>
  )
}

export function NavMenu({ links, label = 'Sections' }) {
  const [active, setActive] = useState(links[0]?.id ?? '')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    setActive(links[0]?.id ?? '')

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [links])

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const hoverCapable =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => {
          if (hoverCapable) return
          setOpen((v) => !v)
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 backdrop-blur-md text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-soft transition-colors"
      >
        <MenuGlyph open={open} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-full right-0 origin-bottom-right pb-2"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuSpring}
          >
            <nav
              id={menuId}
              aria-label={label}
              className="min-w-[8.5rem] rounded-2xl border border-line bg-surface/90 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md"
            >
              {links.map((link, i) => {
                const isActive = active === link.id
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.22 }}
                    className={`block px-3.5 py-1.5 text-[13px] tracking-[-0.01em] ${
                      isActive ? 'text-ink opacity-100' : 'text-ink opacity-35 hover:opacity-70'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      <motion.a
        href="https://www.linkedin.com/in/alirezaiman/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        whileHover={{ y: -2, opacity: 0.55 }}
        className="text-ink"
      >
        <IconLinkedin size={17} />
      </motion.a>
      <motion.a
        href="https://github.com/trappistt"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        whileHover={{ y: -2, opacity: 0.55 }}
        className="text-ink"
      >
        <IconGithub size={17} />
      </motion.a>
      <motion.a
        href="mailto:alirezaiman@yahoo.com"
        aria-label="Email"
        whileHover={{ y: -2, opacity: 0.55 }}
        className="text-ink"
      >
        <IconMail size={17} />
      </motion.a>
    </div>
  )
}
