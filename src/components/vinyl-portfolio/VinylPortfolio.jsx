import { VinylPortfolioProvider, useVinylUI } from './VinylPortfolioContext'
import VinylScene from './VinylScene'
import RecordTooltip from './RecordTooltip'
import ProjectShowcase from './ProjectShowcase'
import LoadingOverlay from './LoadingOverlay'
import AudioToggle from './AudioToggle'
import { projects } from '../../data/projects'
import '../../styles/vinyl-portfolio.css'

/** JSON-LD structured data for SEO */
const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Selected Works — Alireza Iman',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      dateCreated: p.year,
      genre: p.category,
      url: p.website || p.caseStudy || undefined,
    },
  })),
}

/**
 * Premium 3D vinyl portfolio experience.
 * Wire-frame record basket with interactive vinyl records representing projects.
 */
function VinylPortfolioInner() {
  const { selectedProject } = useVinylUI()

  return (
    <section
      className="vinyl-portfolio relative w-full h-full overflow-hidden"
      aria-label="Interactive 3D project portfolio"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <VinylScene className="vinyl-portfolio__canvas w-full h-full" />

      <LoadingOverlay />
      <RecordTooltip />
      <ProjectShowcase />
      <AudioToggle />

      {!selectedProject && (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300 font-medium">
            Hover the stack · Pull a record · Drag to orbit
          </p>
        </div>
      )}
    </section>
  )
}

/**
 * @param {object} props
 * @param {(projectData: object) => void} [props.onProjectDetail] — fired when a sleeve is clicked
 */
export default function VinylPortfolio({ onProjectDetail }) {
  return (
    <VinylPortfolioProvider onProjectDetail={onProjectDetail}>
      <VinylPortfolioInner />
    </VinylPortfolioProvider>
  )
}
