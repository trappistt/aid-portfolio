import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { FloatingControls } from './FloatingControls'
import { GalleryFrame, ImagePreview, NavArrow } from './ImagePreview'
import { ProjectLogo } from './ProjectLogo'
import { getProject } from '../data/projects'
import { fadeUp, stagger, viewportOnce } from '../motion'

const sections = [
  { id: 'cs-about', label: 'Problem' },
  { id: 'cs-outcome', label: 'Outcome' },
  { id: 'cs-role', label: 'Role' },
]

function galleryItems(project) {
  return (project?.gallery ?? []).map((item) =>
    typeof item === 'string' ? { src: item, caption: '' } : item
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const items = galleryItems(project)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState(null)
  const [showTop, setShowTop] = useState(false)
  const galleryRef = useRef(null)
  const galleryCount = items.length

  useEffect(() => {
    window.scrollTo(0, 0)
    setGalleryIndex(0)
    setPreviewIndex(null)
  }, [slug])

  useEffect(() => {
    if (!project) return

    const onScroll = () => setShowTop(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [project])

  const syncGallery = useCallback(() => {
    const el = galleryRef.current
    if (!el) return
    const width = el.clientWidth || 1
    const next = Math.round(el.scrollLeft / width)
    setGalleryIndex(Math.min(Math.max(next, 0), Math.max(galleryCount - 1, 0)))
  }, [galleryCount])

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    syncGallery()
    el.addEventListener('scroll', syncGallery, { passive: true })
    window.addEventListener('resize', syncGallery)
    return () => {
      el.removeEventListener('scroll', syncGallery)
      window.removeEventListener('resize', syncGallery)
    }
  }, [syncGallery, slug])

  const scrollGalleryTo = (i) => {
    const el = galleryRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  const closePreview = () => setPreviewIndex(null)
  const showPreview = (i) => {
    setPreviewIndex(i)
    scrollGalleryTo(i)
  }

  if (!project) return <Navigate to="/" replace />

  const meta = [
    { label: 'Period', value: project.period },
    { label: 'Type', value: project.type },
    { label: 'Focus', value: project.services },
    ...(project.website
      ? [{ label: 'Website', value: project.website, href: project.website }]
      : []),
    ...(project.appStore
      ? [{ label: 'App', value: project.appStore, href: project.appStore }]
      : []),
  ]

  return (
    <div className="min-h-screen bg-page text-ink">
      <motion.div
        className="mx-auto max-w-content px-6 sm:px-8 pt-16"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        {project.logo && (
          <motion.div variants={fadeUp}>
            <ProjectLogo
              project={project}
              className="mb-5 opacity-90"
            />
          </motion.div>
        )}
        <motion.h1
          variants={fadeUp}
          className="text-[1.4rem] sm:text-[1.5rem] font-normal tracking-[-0.02em] text-ink"
        >
          {project.title}
        </motion.h1>

        {galleryCount > 0 && (
          <motion.div variants={fadeUp} className="mt-8">
            {galleryCount > 1 && (
              <div className="mb-4 flex items-center justify-end gap-3">
                <p className="text-[13px] tabular-nums text-mute" aria-live="polite">
                  <span className="text-ink">{String(galleryIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-1.5 text-ink/25">/</span>
                  <span>{String(galleryCount).padStart(2, '0')}</span>
                </p>
                <div className="flex items-center gap-2">
                  <NavArrow
                    label="Previous image"
                    disabled={galleryIndex === 0}
                    onClick={() => scrollGalleryTo(galleryIndex - 1)}
                    direction="prev"
                  />
                  <NavArrow
                    label="Next image"
                    disabled={galleryIndex >= galleryCount - 1}
                    onClick={() => scrollGalleryTo(galleryIndex + 1)}
                    direction="next"
                  />
                </div>
              </div>
            )}

            <div
              ref={galleryRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {items.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => showPreview(i)}
                  className="snap-start shrink-0 w-full text-left"
                  aria-label="Open image preview"
                >
                  <GalleryFrame src={item.src} alt={item.caption} eager={i === 0} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <motion.dl variants={fadeUp} className="mt-8 space-y-2.5">
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
        </motion.dl>
      </motion.div>

      <div className="mx-auto max-w-content px-6 sm:px-8 pb-28">
        <motion.section
          id="cs-about"
          className="pt-14"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="text-[1.1rem] font-normal tracking-[-0.02em] text-ink mb-4">Problem</h2>
          <div className="space-y-3 text-[15px] leading-[1.6] text-ink max-w-xl">
            {project.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="cs-outcome"
          className="pt-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h2 className="text-[1.1rem] font-normal tracking-[-0.02em] text-ink mb-4">Outcome</h2>
          <ul className="space-y-3 text-[15px] leading-[1.6] text-ink max-w-xl">
            {project.outcome.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          id="cs-role"
          className="pt-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
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
        </motion.section>
      </div>

      <ImagePreview
        items={items}
        index={previewIndex}
        onClose={closePreview}
        onIndexChange={setPreviewIndex}
      />

      <FloatingControls showIndex showTop={showTop} links={sections} />
    </div>
  )
}
