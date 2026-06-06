import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useVinylUI } from './VinylPortfolioContext'

function ShowcaseTile({ tile, accent, index }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="project-showcase__tile relative overflow-hidden rounded-2xl bg-[#141416]"
      style={{ gridColumn: tile.gridColumn, gridRow: tile.gridRow }}
    >
      {!loaded && !failed && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(145deg, ${accent}22 0%, #141416 70%)`,
          }}
        />
      )}
      {failed && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${accent}33 0%, #141416 70%)`,
          }}
        />
      )}
      <img
        src={tile.src}
        alt={tile.alt || ''}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectPosition: tile.objectPosition ?? 'center' }}
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </motion.figure>
  )
}

/**
 * Full-screen bento showcase — opens when a vinyl record is clicked.
 */
export default function ProjectShowcase() {
  const { selectedProject, closePanel } = useVinylUI()

  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedProject) return
      if (e.key === 'Escape') closePanel()
    },
    [selectedProject, closePanel]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (!selectedProject) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const tiles = selectedProject?.showcase?.tiles ?? []
  const tag = selectedProject?.showcase?.tag ?? selectedProject?.category
  const backdropSrc =
    tiles.find((tile) => tile.file === '02.jpg')?.src ??
    tiles[1]?.src ??
    selectedProject?.image

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-showcase-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="project-showcase fixed inset-0 z-50 flex flex-col overflow-hidden"
        >
          {/* Blurred image backdrop */}
          <div className="project-showcase__backdrop" aria-hidden="true">
            {backdropSrc && (
              <img src={backdropSrc} alt="" className="project-showcase__backdrop-img" />
            )}
          </div>

          <button
            onClick={closePanel}
            className="project-showcase__close absolute top-5 right-5 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Close project showcase"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bento grid — fills viewport above footer */}
          <div className="relative z-10 flex-1 min-h-0 px-4 sm:px-8 lg:px-10 pt-5 sm:pt-6 pb-3">
            <div className="project-showcase__grid h-full w-full">
              {tiles.map((tile, index) => (
                <ShowcaseTile
                  key={`${tile.gridColumn}-${tile.gridRow}-${index}`}
                  tile={tile}
                  accent={selectedProject.accent}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="project-showcase__footer relative z-10 shrink-0 px-4 sm:px-8 lg:px-10 pb-8 sm:pb-10 pt-5 sm:pt-6 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_1.5fr_auto] gap-6 sm:gap-12 items-end"
          >
            <div>
              <h2
                id="project-showcase-title"
                className="font-serif text-3xl sm:text-[2.75rem] text-white leading-[1.1] tracking-[-0.01em]"
              >
                {selectedProject.title}
              </h2>
              <p className="mt-2.5 text-[11px] uppercase tracking-[0.28em] text-white/40 font-medium">
                {selectedProject.category}
              </p>
            </div>

            <p className="text-sm sm:text-[15px] text-white/60 leading-[1.65] max-w-lg">
              {selectedProject.description}
            </p>

            <div className="flex flex-col items-start sm:items-end gap-2.5">
              <span className="project-showcase__tag px-5 py-2 rounded-full text-xs text-white/80 border border-white/25">
                {tag}
              </span>
              {selectedProject.caseStudy && (
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-medium">
                  Case study
                </span>
              )}
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
