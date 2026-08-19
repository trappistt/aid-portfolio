import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function GalleryFrame({ src, alt, eager = false, aspect = 'aspect-video', className = '' }) {
  return (
    <div
      className={`flex ${aspect} w-full items-center justify-center overflow-hidden rounded-xl bg-soft ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading={eager ? 'eager' : 'lazy'}
        draggable={false}
      />
    </div>
  )
}

export function NavArrow({ label, disabled, onClick, direction }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:opacity-25 hover:bg-soft"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        {direction === 'prev' ? (
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </motion.button>
  )
}

export function ImagePreview({ items, index, onClose, onIndexChange, aspect = 'aspect-video' }) {
  const count = items.length
  const preview = index !== null ? items[index] : null

  useEffect(() => {
    if (index === null) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onIndexChange(Math.max(index - 1, 0))
      if (e.key === 'ArrowRight') onIndexChange(Math.min(index + 1, count - 1))
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [index, count, onClose, onIndexChange])

  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-page/92 px-5 sm:px-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-end gap-3">
              {count > 1 && (
                <>
                  <p className="mr-auto text-[13px] tabular-nums text-mute">
                    <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mx-1.5 text-ink/25">/</span>
                    <span>{String(count).padStart(2, '0')}</span>
                  </p>
                  <NavArrow
                    label="Previous image"
                    disabled={index === 0}
                    onClick={() => onIndexChange(index - 1)}
                    direction="prev"
                  />
                  <NavArrow
                    label="Next image"
                    disabled={index >= count - 1}
                    onClick={() => onIndexChange(index + 1)}
                    direction="next"
                  />
                </>
              )}
              <motion.button
                type="button"
                aria-label="Close preview"
                onClick={onClose}
                whileTap={{ scale: 0.92 }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:bg-soft"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            <GalleryFrame
              src={preview.src}
              alt={preview.caption || preview.title || ''}
              eager
              aspect={aspect}
              className="rounded-2xl"
            />

            <div className="mt-4 max-w-xl space-y-2">
              {preview.title && (
                <p className="text-[15px] text-ink">{preview.title}</p>
              )}
              {preview.caption && (
                <p className="text-[15px] leading-[1.6] text-mute">{preview.caption}</p>
              )}
              {preview.url && (
                <a
                  href={preview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[14px] text-ink underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
                >
                  {preview.url.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
