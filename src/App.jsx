import { useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import {
  IntroBlock,
  AboutBlock,
  WorksBlock,
  ExperienceBlock,
  PhilosophyBlock,
  StatementBlock,
  ContactBlock,
} from './components/sections'

export default function App() {
  const scrollRef = useRef(null)
  const trackRef = useRef(null)

  useSmoothScroll({
    orientation: 'horizontal',
    wrapperRef: scrollRef,
    contentRef: trackRef,
  })

  return (
    <>
      <div
        ref={scrollRef}
        className="h-screen w-screen overflow-x-auto overflow-y-hidden bg-page scrollbar-hide"
      >
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-3 p-3"
        >
          <IntroBlock />
          <AboutBlock />
          <PhilosophyBlock />
          <WorksBlock />
          <StatementBlock />
          <ExperienceBlock />
          <ContactBlock />
        </div>
      </div>
      <Analytics />
    </>
  )
}
