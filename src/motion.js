export const easeOut = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -48px 0px' }

export const springSoft = { type: 'spring', stiffness: 460, damping: 32, mass: 0.75 }
