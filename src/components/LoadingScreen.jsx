import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import LoadingScene from './LoadingScene'

const AnimatedText = ({ text, delay = 0 }) => {
  const letters = text.split('')
  return (
    <div className="flex justify-center">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}


export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef(null)

  // Mouse-based parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 40, stiffness: 120 })
  const springY = useSpring(mouseY, { damping: 40, stiffness: 120 })

  useEffect(() => {
    const start = performance.now()
    const duration = 2600

    const easeOut = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t))

    const tick = (now) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = easeOut(t)
      setProgress(eased * 100)
      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setIsReady(true)
      }
    }

    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      mouseX.set(x * 20)
      mouseY.set(y * 20)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, onComplete])

  const handleEnter = () => {
    setIsVisible(false)
  }

  const xBg = useTransform(springX, (v) => v * 0.4)
  const yBg = useTransform(springY, (v) => v * 0.4)
  const xContent = useTransform(springX, (v) => v * 0.6)
  const yContent = useTransform(springY, (v) => v * 0.6)

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden"
    >
      {/* WebGL rocket background */}
      <motion.div style={{ x: xBg, y: yBg }} className="absolute inset-0">
        <LoadingScene progress={progress} />
      </motion.div>

      {/* Light overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80 pointer-events-none" />

      {/* Main content */}
      <motion.div
        style={{ x: xContent, y: yContent }}
        className="relative z-10 flex flex-col items-center gap-8 px-4"
      >
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">
            Creative AI loading sequence
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-tight">
            <AnimatedText text="Alireza Iman" delay={0.15} />
          </h1>
        </div>

        {/* Enter button */}
        <motion.button
          onClick={handleEnter}
          disabled={!isReady}
          className={`mt-4 px-10 py-3 border border-black text-sm uppercase tracking-[0.25em] ${
            isReady
              ? 'bg-black text-white hover:bg-white hover:text-black transition-colors'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={isReady ? { scale: 1.03 } : {}}
          whileTap={isReady ? { scale: 0.97 } : {}}
        >
          {isReady ? 'Enter Portfolio' : 'Loading AI modules'}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}


