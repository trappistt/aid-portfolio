import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { IconArrowLeft, IconArrowUp, IconMoon, IconSun } from './icons'
import { NavMenu } from './SiteNav'
import { useTheme } from './ThemeProvider'
import { springSoft } from '../motion'

const circle =
  'flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 backdrop-blur-md text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-soft'

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className={`${circle} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -80, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 80, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export function FloatingControls({ showIndex = false, showTop = false, links }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {showIndex && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={springSoft}>
          <Link
            to="/#work"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 backdrop-blur-md px-3.5 py-2 text-[13px] text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-soft transition-colors"
          >
            <IconArrowLeft size={14} />
            Index
          </Link>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={springSoft}
            className={circle}
          >
            <IconArrowUp size={15} />
          </motion.button>
        )}
      </AnimatePresence>
      <ThemeToggle />
      {links?.length ? <NavMenu links={links} /> : null}
    </div>
  )
}
