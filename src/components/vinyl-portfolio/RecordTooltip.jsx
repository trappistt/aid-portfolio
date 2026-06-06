import { useVinylInteraction } from './VinylPortfolioContext'

/**
 * Static tooltip shell — always mounted. Visibility, position, and text are
 * updated imperatively in RecordRaycaster (zero React updates on hover).
 */
export default function RecordTooltip() {
  const {
    tooltipElRef,
    tooltipCategoryRef,
    tooltipTitleRef,
    tooltipYearRef,
  } = useVinylInteraction()

  return (
    <div
      ref={tooltipElRef}
      className="vinyl-tooltip fixed z-30 px-4 py-3 rounded-xl vinyl-panel pointer-events-none"
      style={{ display: 'none' }}
      role="tooltip"
      aria-live="polite"
    >
      <p
        ref={tooltipCategoryRef}
        className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1 font-medium"
      />
      <p ref={tooltipTitleRef} className="font-serif text-lg text-white leading-tight" />
      <p ref={tooltipYearRef} className="text-xs text-white/40 mt-1" />
      <p className="text-[10px] text-white/30 mt-2">Click to view project</p>
    </div>
  )
}
