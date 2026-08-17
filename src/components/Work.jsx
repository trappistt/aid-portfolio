import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowUpRight } from './icons'
import { projects } from '../data/projects'

export default function Work() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const total = projects.length

  const syncScroll = () => {
    const el = trackRef.current
    if (!el) return
    const width = el.clientWidth || 1
    const next = Math.round(el.scrollLeft / width)
    setIndex(Math.min(Math.max(next, 0), total - 1))
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    syncScroll()
    el.addEventListener('scroll', syncScroll, { passive: true })
    window.addEventListener('resize', syncScroll)
    return () => {
      el.removeEventListener('scroll', syncScroll)
      window.removeEventListener('resize', syncScroll)
    }
  }, [total])

  const scrollByCard = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section id="work" className="pt-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink">Work</h2>
        {total > 1 && (
          <div className="flex items-center gap-3">
            <p className="text-[13px] tabular-nums text-mute" aria-live="polite">
              <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-1.5 text-ink/25">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                disabled={index === 0}
                onClick={() => scrollByCard(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:opacity-25 hover:bg-soft"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next project"
                disabled={index >= total - 1}
                onClick={() => scrollByCard(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:opacity-25 hover:bg-soft"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <ul
        ref={trackRef}
        className="flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1"
      >
        {projects.map((project) => (
          <li
            key={project.id}
            data-work-card
            className="snap-start shrink-0 w-full"
          >
            <Link to={`/work/${project.slug}`} className="group block h-full">
              {project.logo && (
                <img
                  src={project.logo}
                  alt=""
                  className={`${project.logoClass || 'h-6'} w-auto object-contain object-left mb-4 opacity-90`}
                  loading="lazy"
                  draggable={false}
                />
              )}

              <h3 className="text-[15px] text-ink tracking-[-0.01em]">{project.title}</h3>
              {project.summary && (
                <p className="mt-2 text-[14px] leading-[1.55] text-mute max-w-md">
                  {project.summary}
                </p>
              )}

              <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-ink">
                Read case study
                <IconArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
