import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { FloatingControls } from './FloatingControls'
import { getProject } from '../data/projects'

const sections = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'outcome', label: 'Outcome', index: '02' },
  { id: 'role', label: 'Role', index: '03' },
]

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const [active, setActive] = useState('about')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const galleryRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setGalleryIndex(0)
    setActive('about')
  }, [slug])

  useEffect(() => {
    if (!project) return

    const els = sections
      .map((s) => document.getElementById(`cs-${s.id}`))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace('cs-', ''))
          }
        })
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))

    const onScroll = () => setShowTop(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [project])

  const syncGallery = useCallback(() => {
    const el = galleryRef.current
    if (!el) return
    const slides = Array.from(el.children)
    const center = el.scrollLeft + el.clientWidth / 2
    let closest = 0
    let closestDist = Infinity
    slides.forEach((slide, i) => {
      const mid = slide.offsetLeft + slide.offsetWidth / 2
      const dist = Math.abs(center - mid)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })
    setGalleryIndex(closest)
  }, [])

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    syncGallery()
    el.addEventListener('scroll', syncGallery, { passive: true })
    return () => el.removeEventListener('scroll', syncGallery)
  }, [syncGallery, project])

  if (!project) return <Navigate to="/" replace />

  const scrollGalleryTo = (i) => {
    const el = galleryRef.current
    if (!el?.children[i]) return
    el.scrollTo({ left: el.children[i].offsetLeft, behavior: 'smooth' })
  }

  const meta = [
    { label: 'Period', value: project.period },
    { label: 'Type', value: project.type },
    { label: 'Services', value: project.services },
    ...(project.website
      ? [{ label: 'Website', value: project.website, href: project.website }]
      : []),
  ]

  return (
    <div className="min-h-screen bg-page text-ink">
      <nav
        aria-label="Case study sections"
        className="fixed z-50 left-0 right-0 top-0 flex items-center justify-center gap-5 border-b border-line/70 bg-page/90 backdrop-blur-sm px-4 py-3 md:inset-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:flex-col md:items-start md:gap-4 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none lg:left-10"
      >
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#cs-${s.id}`}
              className={`flex items-baseline gap-2 text-[12px] tracking-[0.08em] uppercase transition-opacity duration-200 ${
                isActive ? 'text-ink opacity-100' : 'text-ink opacity-35 hover:opacity-70'
              }`}
            >
              <span className="tabular-nums text-[10px] opacity-60">{s.index}</span>
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.label.slice(0, 1)}</span>
            </a>
          )
        })}
      </nav>

      <div className="mx-auto max-w-content px-6 sm:px-8 pt-16 pb-28 md:pl-28 lg:pl-32">
        <h1 className="text-[1.4rem] sm:text-[1.5rem] font-normal tracking-[-0.02em] text-ink">
          {project.title}
        </h1>

        <dl className="mt-8 space-y-2.5">
          {meta.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-3 text-[14px]"
            >
              <dt className="text-mute">{item.label}</dt>
              <dd className="text-ink min-w-0 break-words">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink break-all"
                  >
                    {item.value.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <section id="cs-about" className="pt-14 scroll-mt-20 md:scroll-mt-10">
          <h2 className="text-[1.1rem] font-normal tracking-[-0.02em] text-ink mb-4">About</h2>
          <div className="space-y-3 text-[15px] leading-[1.6] text-ink max-w-xl">
            {project.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {project.gallery?.length > 0 && (
          <div className="mt-10">
            <div
              ref={galleryRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {project.gallery.map((src, i) => (
                <div
                  key={src}
                  className="snap-start shrink-0 w-full sm:w-[92%] overflow-hidden rounded-xl bg-soft"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full aspect-[16/10] object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {project.gallery.length > 1 && (
              <div className="mt-4 flex justify-center gap-1.5">
                {project.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => scrollGalleryTo(i)}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      galleryIndex === i ? 'bg-ink' : 'bg-ink/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <section id="cs-outcome" className="pt-16 scroll-mt-20 md:scroll-mt-10">
          <h2 className="text-[1.1rem] font-normal tracking-[-0.02em] text-ink mb-4">Outcome</h2>
          <ul className="space-y-3 text-[15px] leading-[1.6] text-ink max-w-xl">
            {project.outcome.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="cs-role" className="pt-16 scroll-mt-20 md:scroll-mt-10">
          <h2 className="text-[1.1rem] font-normal tracking-[-0.02em] text-ink mb-4">Role</h2>
          <p className="text-[15px] leading-[1.6] text-ink mb-4">{project.roleIntro}</p>
          <ul className="space-y-2.5 text-[15px] leading-[1.6] text-ink">
            {project.role.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FloatingControls showIndex showTop={showTop} />
    </div>
  )
}
