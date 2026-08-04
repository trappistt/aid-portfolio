import { Link } from 'react-router-dom'
import { IconArrowLeft, IconArrowUp, IconMoon, IconSun } from './icons'
import { useTheme } from './ThemeProvider'

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 backdrop-blur-md text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-soft transition-colors ${className}`}
    >
      {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
    </button>
  )
}

export function FloatingControls({ showIndex = false, showTop = false }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {showIndex && (
        <Link
          to="/#work"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 backdrop-blur-md px-3.5 py-2 text-[13px] text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-soft transition-colors"
        >
          <IconArrowLeft size={14} />
          Index
        </Link>
      )}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 backdrop-blur-md text-ink shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-opacity ${
          showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <IconArrowUp size={15} />
      </button>
      <ThemeToggle />
    </div>
  )
}
