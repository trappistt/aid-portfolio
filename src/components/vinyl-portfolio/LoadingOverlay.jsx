import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVinylUI } from './VinylPortfolioContext'

/**
 * Loading screen shown while vinyl records animate into the basket.
 */
export default function LoadingOverlay() {
  const { isLoading, setIsLoading } = useVinylUI()

  // Safety fallback — dismiss loader if entry animations are skipped
  useEffect(() => {
    if (!isLoading) return
    const timer = setTimeout(() => setIsLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [isLoading, setIsLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="vinyl-loading absolute inset-0 z-20 flex flex-col items-center justify-center"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Loading Collection
            </p>
            <h2 className="font-serif text-2xl text-stone-800">Setting the stage</h2>
            <div className="w-48 h-0.5 bg-stone-900/10 rounded-full overflow-hidden relative">
              <div className="vinyl-loading__bar absolute inset-0 w-1/2" />
            </div>
            <p className="text-xs text-stone-500/80">Records sliding into the crate…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
