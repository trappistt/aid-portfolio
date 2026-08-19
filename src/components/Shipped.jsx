import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SocialIcons } from './SiteNav'
import { GalleryFrame, ImagePreview, NavArrow } from './ImagePreview'
import { shipped, EMAIL } from '../data/projects'
import { fadeUp, viewportOnce } from '../motion'

const shotAspect = 'aspect-[16/10]'

export default function Shipped() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState(null)
  const total = shipped.length

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

  const scrollTo = (i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <motion.section
      id="shipped"
      className="pt-20 pb-28"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink">
          Features I shipped
        </h2>
        {total > 1 && (
          <div className="flex items-center gap-3">
            <p className="text-[13px] tabular-nums text-mute" aria-live="polite">
              <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-1.5 text-ink/25">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </p>
            <div className="flex items-center gap-2">
              <NavArrow
                label="Previous feature"
                disabled={index === 0}
                onClick={() => scrollTo(index - 1)}
                direction="prev"
              />
              <NavArrow
                label="Next feature"
                disabled={index >= total - 1}
                onClick={() => scrollTo(index + 1)}
                direction="next"
              />
            </div>
          </div>
        )}
      </div>

      <ul
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {shipped.map((item, i) => (
          <li key={item.id} className="snap-start shrink-0 w-full">
            <button
              type="button"
              onClick={() => setPreviewIndex(i)}
              className="w-full text-left"
              aria-label={`Open ${item.title} preview`}
            >
              <GalleryFrame
                src={item.src}
                alt={item.caption || item.title}
                aspect={shotAspect}
                className="rounded-2xl"
                eager={i === 0}
              />
            </button>
            <div className="mt-4">
              <p className="text-[15px] text-ink tracking-[-0.01em]">{item.title}</p>
              {item.caption && (
                <p className="mt-1.5 max-w-md text-[14px] leading-[1.55] text-mute">
                  {item.caption}
                </p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-block text-[14px] text-ink underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
                >
                  {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <ImagePreview
        items={shipped}
        index={previewIndex}
        onClose={() => setPreviewIndex(null)}
        onIndexChange={setPreviewIndex}
        aspect={shotAspect}
      />

      <motion.div
        className="mt-16 pt-8 border-t border-line"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <a
          href={`mailto:${EMAIL}`}
          className="text-[14px] text-ink underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
        >
          {EMAIL}
        </a>
        <div className="mt-6">
          <SocialIcons />
        </div>
      </motion.div>
    </motion.section>
  )
}
