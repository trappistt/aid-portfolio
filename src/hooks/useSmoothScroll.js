import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export function useSmoothScroll({
  orientation = 'vertical',
  wrapperRef = null,
  contentRef = null,
} = {}) {
  useEffect(() => {
    const wrapper = wrapperRef?.current
    const content = contentRef?.current
    const isHorizontal = orientation === 'horizontal'

    const lenis = new Lenis({
      wrapper: wrapper ?? window,
      content: content ?? document.documentElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation,
      gestureOrientation: isHorizontal ? 'both' : 'vertical',
      smoothWheel: true,
      wheelMultiplier: isHorizontal ? 1.2 : 1,
      smoothTouch: isHorizontal,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisInstance = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [orientation, wrapperRef, contentRef])
}

export function getLenisInstance() {
  return lenisInstance
}
