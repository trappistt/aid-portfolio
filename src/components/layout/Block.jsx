import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const sizeClasses = {
  xs: 'w-[calc((100vw-2rem)*0.28)]',
  sm: 'w-[calc((100vw-2rem)*0.35)]',
  md: 'w-[calc((100vw-2rem)*0.5)]',
  lg: 'w-[calc((100vw-2rem)*0.65)]',
  xl: 'w-[calc((100vw-2rem)*0.8)]',
  full: 'w-[calc(100vw-1.5rem)]',
}

const bgClasses = {
  white: 'bg-block text-ink',
  cream: 'bg-[#1E1D1C] text-ink',
  warm: 'bg-[#222120] text-ink',
  dark: 'bg-[#141414] text-white',
  ink: 'bg-[#0A0A0A] text-white',
}

const Block = forwardRef(function Block(
  { 
    id, 
    children, 
    className = '', 
    size = 'md', 
    bg = 'white',
    noPadding = false,
    animate = true,
    stacked = false,
  }, 
  ref
) {
  const Component = animate ? motion.section : 'section'
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  } : {}

  const layoutClasses = stacked
    ? 'w-full h-full min-h-0'
    : `flex-shrink-0 ${sizeClasses[size]} h-[calc(100vh-1.5rem)]`

  return (
    <Component
      ref={ref}
      id={id}
      className={`${layoutClasses} ${bgClasses[bg]} rounded-2xl overflow-hidden relative ${className}`}
      {...animationProps}
    >
      {noPadding ? children : (
        <div className="h-full overflow-y-auto p-8 lg:p-12">
          {children}
        </div>
      )}
    </Component>
  )
})

export default Block
