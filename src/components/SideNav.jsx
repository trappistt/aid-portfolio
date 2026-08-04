import { useEffect, useState } from 'react'
import { IconLinkedin, IconGithub, IconMail } from './icons'

const links = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'work', label: 'Work', index: '02' },
  { id: 'experience', label: 'Experience', index: '03' },
  { id: 'tools', label: 'Tools', index: '04' },
]

export default function SideNav() {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sections"
      className="fixed z-50 left-0 right-0 top-0 flex items-center justify-center gap-5 border-b border-line/70 bg-page/90 backdrop-blur-sm px-4 py-3 md:inset-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:flex-col md:items-start md:gap-4 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none lg:left-10"
    >
      {links.map((link) => {
        const isActive = active === link.id
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`flex items-baseline gap-2 text-[12px] tracking-[0.08em] uppercase transition-opacity duration-200 ${
              isActive ? 'text-ink opacity-100' : 'text-ink opacity-35 hover:opacity-70'
            }`}
          >
            <span className="tabular-nums text-[10px] opacity-60">{link.index}</span>
            <span className="hidden sm:inline">{link.label}</span>
            <span className="sm:hidden">{link.label.slice(0, 1)}</span>
          </a>
        )
      })}
    </nav>
  )
}

export function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://www.linkedin.com/in/alirezaiman/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-ink hover:opacity-55 transition-opacity"
      >
        <IconLinkedin size={17} />
      </a>
      <a
        href="https://github.com/trappistt"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-ink hover:opacity-55 transition-opacity"
      >
        <IconGithub size={17} />
      </a>
      <a
        href="mailto:alirezaiman@yahoo.com"
        aria-label="Email"
        className="text-ink hover:opacity-55 transition-opacity"
      >
        <IconMail size={17} />
      </a>
    </div>
  )
}
