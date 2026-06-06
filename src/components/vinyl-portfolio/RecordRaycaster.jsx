import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useVinylInteraction } from './VinylPortfolioContext'
import { playHoverSound } from './utils/hoverSound'

const RAYCAST_FPS = 60
const RAYCAST_INTERVAL = 1 / RAYCAST_FPS

/**
 * Raycasting throttled to 60 Hz against the cached sleeve mesh list only.
 * Hover state and tooltip updates are ref/DOM only — no React setState.
 */
export default function RecordRaycaster() {
  const { camera, gl } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const raycastAccumulator = useRef(0)
  const lastHoveredId = useRef(null)

  const {
    getSleeveMeshes,
    hoveredIdRef,
    tooltipPosRef,
    tooltipElRef,
    tooltipCategoryRef,
    tooltipTitleRef,
    tooltipYearRef,
    audioEnabledRef,
    projectsByIdRef,
    openProjectDetail,
    selectedIdRef,
  } = useVinylInteraction()

  const updateTooltipContent = (projectId) => {
    const el = tooltipElRef.current
    if (!el) return

    if (!projectId) {
      el.style.display = 'none'
      return
    }

    const project = projectsByIdRef.current.get(projectId)
    if (!project) {
      el.style.display = 'none'
      return
    }

    if (tooltipCategoryRef.current) {
      tooltipCategoryRef.current.textContent = project.category
    }
    if (tooltipTitleRef.current) {
      tooltipTitleRef.current.textContent = project.title
    }
    if (tooltipYearRef.current) {
      tooltipYearRef.current.textContent = project.year
    }

    el.style.display = ''
    el.style.left = `${tooltipPosRef.current.x}px`
    el.style.top = `${tooltipPosRef.current.y - 16}px`
  }

  const applyHoverState = (nextId) => {
    if (nextId === lastHoveredId.current) return

    if (nextId !== null && audioEnabledRef.current) {
      playHoverSound()
    }

    lastHoveredId.current = nextId
    hoveredIdRef.current = nextId

    updateTooltipContent(nextId)
    gl.domElement.classList.toggle('vinyl-portfolio__canvas--pointer', Boolean(nextId))
  }

  const updateTooltipPosition = () => {
    const el = tooltipElRef.current
    if (!el || el.style.display === 'none') return
    el.style.left = `${tooltipPosRef.current.x}px`
    el.style.top = `${tooltipPosRef.current.y - 16}px`
  }

  useEffect(() => {
    const canvas = gl.domElement

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      tooltipPosRef.current.x = event.clientX
      tooltipPosRef.current.y = event.clientY
      updateTooltipPosition()
    }

    const handlePointerLeave = () => {
      applyHoverState(null)
    }

    const handleClick = (event) => {
      if (selectedIdRef.current) return

      const rect = canvas.getBoundingClientRect()
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      const meshes = getSleeveMeshes()
      if (!meshes.length) return

      raycaster.current.setFromCamera(mouse.current, camera)
      const hit = raycaster.current.intersectObjects(meshes, false)[0]
      if (!hit) return

      const project = projectsByIdRef.current.get(hit.object.userData.projectId)
      if (project) openProjectDetail(project)
    }

    canvas.addEventListener('pointermove', handlePointerMove, { passive: true })
    canvas.addEventListener('pointerleave', handlePointerLeave)
    canvas.addEventListener('click', handleClick)

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      canvas.removeEventListener('click', handleClick)
    }
  }, [camera, gl, getSleeveMeshes, openProjectDetail, selectedIdRef])

  useFrame((_, delta) => {
    if (selectedIdRef.current) {
      if (lastHoveredId.current !== null) applyHoverState(null)
      return
    }

    raycastAccumulator.current += delta
    if (raycastAccumulator.current < RAYCAST_INTERVAL) return
    raycastAccumulator.current -= RAYCAST_INTERVAL

    const meshes = getSleeveMeshes()
    if (!meshes.length) return

    raycaster.current.setFromCamera(mouse.current, camera)
    const hit = raycaster.current.intersectObjects(meshes, false)[0]
    const nextId = hit?.object?.userData?.projectId ?? null

    applyHoverState(nextId)
  })

  return null
}
