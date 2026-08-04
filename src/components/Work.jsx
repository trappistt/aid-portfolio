import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowLeft, IconArrowRight } from './icons'
import { projects } from '../data/projects'

export default function Work() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateState = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const slides = Array.from(el.children)
    if (!slides.length) return

    const center = el.scrollLeft + el.clientWidth / 2
    let closest = 0
    let closestDist = Infinity
    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const dist = Math.abs(center - slideCenter)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })
    setIndex(closest)
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateState()
    el.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    return () => {
      el.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [updateState])

  const scrollTo = (i) => {
    const el = trackRef.current
    if (!el) return
    const slide = el.children[i]
    if (!slide) return
    el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }

  const prev = () => scrollTo(Math.max(0, index - 1))
  const next = () => scrollTo(Math.min(projects.length - 1, index + 1))

  return (
    <section id="work" className="pt-20">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink">Work</h2>
          <p className="mt-1 text-[13px] text-mute tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:opacity-25 hover:bg-soft"
          >
            <IconArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            aria-label="Next project"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:opacity-25 hover:bg-soft"
          >
            <IconArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:-mx-8 sm:px-8 pb-2"
        style={{ scrollPaddingInline: '1.5rem' }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="snap-start shrink-0 w-[min(78vw,22rem)] sm:w-[24rem]"
          >
            <Link to={`/work/${project.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-soft">
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] text-ink tracking-[-0.01em]">{project.title}</h3>
                <span className="text-[13px] text-mute tabular-nums shrink-0">{project.year}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
