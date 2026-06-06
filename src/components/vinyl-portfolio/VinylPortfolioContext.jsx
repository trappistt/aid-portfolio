import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react'
import { projects as defaultProjects } from '../../data/projects'

const VinylInteractionContext = createContext(null)
const VinylUIContext = createContext(null)

/**
 * Stable refs + callbacks for the 3D scene. This context value intentionally
 * excludes hover/selection UI state so pointer interaction never re-renders
 * the Canvas subtree.
 */
export function useVinylInteraction() {
  const ctx = useContext(VinylInteractionContext)
  if (!ctx) {
    throw new Error('useVinylInteraction must be used within VinylPortfolioProvider')
  }
  return ctx
}

/** Overlay / panel state — may change on selection, loading, etc. */
export function useVinylUI() {
  const ctx = useContext(VinylUIContext)
  if (!ctx) {
    throw new Error('useVinylUI must be used within VinylPortfolioProvider')
  }
  return ctx
}

/** @deprecated Prefer useVinylInteraction (3D) or useVinylUI (overlays). */
export function useVinylPortfolio() {
  return { ...useVinylInteraction(), ...useVinylUI() }
}

export function VinylPortfolioProvider({ children, onProjectDetail, projectList = defaultProjects }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const audioEnabledRef = useRef(false)
  audioEnabledRef.current = audioEnabled

  const hoveredIdRef = useRef(null)
  const selectedIdRef = useRef(null)
  const tooltipPosRef = useRef({ x: 0, y: 0 })
  const tooltipElRef = useRef(null)
  const tooltipCategoryRef = useRef(null)
  const tooltipTitleRef = useRef(null)
  const tooltipYearRef = useRef(null)
  const sleeveRegistry = useRef(new Map())
  const sleeveMeshCache = useRef([])
  const sleeveMeshCacheDirty = useRef(true)

  const projectsById = useMemo(
    () => new Map(projectList.map((p) => [p.id, p])),
    [projectList]
  )

  const projectsByIdRef = useRef(projectsById)
  projectsByIdRef.current = projectsById

  const rebuildSleeveMeshCache = useCallback(() => {
    sleeveMeshCache.current = Array.from(sleeveRegistry.current.values()).filter(Boolean)
    sleeveMeshCacheDirty.current = false
  }, [])

  const getSleeveMeshes = useCallback(() => {
    if (sleeveMeshCacheDirty.current) rebuildSleeveMeshCache()
    return sleeveMeshCache.current
  }, [rebuildSleeveMeshCache])

  const registerSleeve = useCallback((projectId, mesh) => {
    sleeveRegistry.current.set(projectId, mesh)
    sleeveMeshCacheDirty.current = true
  }, [])

  const unregisterSleeve = useCallback((projectId) => {
    sleeveRegistry.current.delete(projectId)
    sleeveMeshCacheDirty.current = true
  }, [])

  const dismissLoadingRef = useRef(() => {})

  const hideTooltip = useCallback(() => {
    const el = tooltipElRef.current
    if (el) el.style.display = 'none'
  }, [])

  const dismissLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  dismissLoadingRef.current = dismissLoading

  const openProjectDetail = useCallback(
    (projectData) => {
      selectedIdRef.current = projectData?.id ?? null
      hoveredIdRef.current = null
      hideTooltip()
      setSelectedProject(projectData)
      onProjectDetail?.(projectData)
    },
    [hideTooltip, onProjectDetail]
  )

  const closePanel = useCallback(() => {
    selectedIdRef.current = null
    setSelectedProject(null)
  }, [])

  const interactionValue = useMemo(
    () => ({
      hoveredIdRef,
      selectedIdRef,
      tooltipPosRef,
      tooltipElRef,
      tooltipCategoryRef,
      tooltipTitleRef,
      tooltipYearRef,
      audioEnabledRef,
      projectsByIdRef,
      projectsById,
      projectList,
      sleeveRegistry,
      getSleeveMeshes,
      registerSleeve,
      unregisterSleeve,
      openProjectDetail,
      hideTooltip,
      dismissLoadingRef,
    }),
    [
      getSleeveMeshes,
      registerSleeve,
      unregisterSleeve,
      openProjectDetail,
      hideTooltip,
      projectsById,
      projectList,
    ]
  )

  const uiValue = useMemo(
    () => ({
      selectedProject,
      isLoading,
      setIsLoading,
      audioEnabled,
      setAudioEnabled,
      closePanel,
      openProjectDetail,
      selectProject: openProjectDetail,
    }),
    [selectedProject, isLoading, audioEnabled, closePanel, openProjectDetail]
  )

  return (
    <VinylInteractionContext.Provider value={interactionValue}>
      <VinylUIContext.Provider value={uiValue}>{children}</VinylUIContext.Provider>
    </VinylInteractionContext.Provider>
  )
}
