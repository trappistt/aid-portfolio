import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // total animation time in ms
    let frameId
    let start = null

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const nextValue = Math.round(eased * 100)
      setCount(nextValue)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  useEffect(() => {
    if (count === 100) {
      // Small delay before triggering completion to let the user see 100%
      const timeout = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [count, onComplete])

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -80,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* White fill progressing left → right */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-white"
        style={{ width: `${count}%` }}
      />

      <div className="relative overflow-hidden flex flex-col items-center mix-blend-difference text-white">
        <motion.span
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="block text-9xl font-medium tracking-tighter mb-4"
        >
          {count}%
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm uppercase tracking-widest font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )
}


