import { useRef, useEffect, useLayoutEffect, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'
import { useVinylInteraction } from './VinylPortfolioContext'
import { SLEEVE } from './utils/sleeveLayout'

const edgeMaterial = new THREE.MeshStandardMaterial({ color: '#1c1c1c', roughness: 0.9 })
const topMaterial = new THREE.MeshStandardMaterial({ color: '#161616', roughness: 0.9 })
const sleeveBoxGeometry = new THREE.BoxGeometry(SLEEVE.width, SLEEVE.height, SLEEVE.depth)

const HOVER_LIFT = 0.15
const HOVER_DURATION = 0.18
/** Back-of-stack records need a larger forward nudge to clear the rear wall. */
const HOVER_FORWARD_MAX = 0.32

/**
 * A single flat album sleeve standing in the crate.
 * Hover lift uses a dedicated GSAP tween on a proxy value so it never
 * fights selection or drop-in animations on group.position.
 */
function VinylSleeve({
  project,
  index,
  totalCount,
  basePosition,
  baseRotation,
  coverTexture = null,
  staggerDelay = 0,
}) {
  const groupRef = useRef()
  const meshRef = useRef()
  const liftRef = useRef(0)
  const forwardRef = useRef(0)
  const leanRef = useRef(0)
  const hoverProxy = useRef({ value: 0 })
  const hoverForwardMax = useRef(0)
  const hoverLeanMax = useRef(0)
  const hoverTweenRef = useRef(null)
  const lastHoveredRef = useRef(false)
  const introCompleteRef = useRef(false)
  const animStateRef = useRef('rest')
  const basePos = useRef(new THREE.Vector3())
  const baseRot = useRef(new THREE.Euler())

  const { hoveredIdRef, selectedIdRef, registerSleeve, unregisterSleeve, dismissLoadingRef } =
    useVinylInteraction()

  const placeholderColor = project.accent || '#d4d0c8'

  const [frontMaterial, backMaterial] = useMemo(() => {
    const front = new THREE.MeshStandardMaterial({
      color: placeholderColor,
      roughness: 0.6,
      metalness: 0.05,
    })
    const back = new THREE.MeshStandardMaterial({
      color: placeholderColor,
      roughness: 0.7,
      metalness: 0.05,
    })
    return [front, back]
  }, [placeholderColor])

  const materials = useMemo(
    () => [edgeMaterial, edgeMaterial, topMaterial, topMaterial, frontMaterial, backMaterial],
    [frontMaterial, backMaterial]
  )

  const killHoverTween = () => {
    if (hoverTweenRef.current) {
      hoverTweenRef.current.kill()
      hoverTweenRef.current = null
    }
  }

  const applyHoverOffsets = (progress) => {
    liftRef.current = progress * HOVER_LIFT
    forwardRef.current = progress * hoverForwardMax.current
    leanRef.current = progress * hoverLeanMax.current
  }

  const setHoverPeek = (active, immediate = false) => {
    killHoverTween()

    if (immediate) {
      hoverProxy.current.value = active ? 1 : 0
      applyHoverOffsets(hoverProxy.current.value)
      return
    }

    hoverTweenRef.current = gsap.to(hoverProxy.current, {
      value: active ? 1 : 0,
      duration: HOVER_DURATION,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => applyHoverOffsets(hoverProxy.current.value),
      onComplete: () => {
        hoverTweenRef.current = null
      },
    })
  }

  useLayoutEffect(() => {
    basePos.current.set(basePosition[0], basePosition[1], basePosition[2])
    baseRot.current.set(baseRotation[0], baseRotation[1], baseRotation[2], 'XYZ')

    const depthT = totalCount > 1 ? index / (totalCount - 1) : 0
    hoverForwardMax.current = depthT * HOVER_FORWARD_MAX
    hoverLeanMax.current = Math.max(0, -baseRot.current.x * 0.55)

    const group = groupRef.current
    if (group) {
      group.position.copy(basePos.current)
      group.rotation.copy(baseRot.current)
    }
  }, [basePosition, baseRotation, index, totalCount])

  useEffect(() => {
    registerSleeve(project.id, meshRef.current)
    return () => unregisterSleeve(project.id)
  }, [project.id, registerSleeve, unregisterSleeve])

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.projectId = project.id
    }
  }, [project.id])

  useEffect(() => {
    if (coverTexture) {
      frontMaterial.map = coverTexture
      backMaterial.map = coverTexture
      frontMaterial.color.set('#ffffff')
      backMaterial.color.set('#cfcfcf')
    } else {
      frontMaterial.map = null
      backMaterial.map = null
      frontMaterial.color.set(placeholderColor)
      backMaterial.color.set(placeholderColor)
    }
    frontMaterial.needsUpdate = true
    backMaterial.needsUpdate = true
  }, [coverTexture, placeholderColor, frontMaterial, backMaterial])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      introCompleteRef.current = true
      if (index === totalCount - 1) dismissLoadingRef.current()
      return
    }

    gsap.fromTo(
      group.position,
      { y: basePos.current.y + 2.6 },
      {
        y: basePos.current.y,
        duration: 0.9,
        delay: staggerDelay + 0.3,
        ease: 'back.out(1.4)',
        onComplete: () => {
          introCompleteRef.current = true
          if (index === totalCount - 1) dismissLoadingRef.current()
        },
      }
    )
  }, [staggerDelay, index, totalCount, dismissLoadingRef])

  useEffect(() => () => killHoverTween(), [])

  const animateToSelected = () => {
    const group = groupRef.current
    if (!group) return

    killHoverTween()
    lastHoveredRef.current = false
    setHoverPeek(false, true)

    gsap.killTweensOf(group.position)
    gsap.killTweensOf(group.rotation)

    gsap.to(group.position, {
      x: basePos.current.x,
      y: basePos.current.y + 1.15,
      z: basePos.current.z + 0.35,
      duration: 1,
      ease: 'power3.inOut',
      overwrite: true,
    })

    gsap.to(group.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: 'power3.inOut',
      overwrite: true,
    })
  }

  const animateToRest = () => {
    const group = groupRef.current
    if (!group) return

    killHoverTween()
    lastHoveredRef.current = false
    setHoverPeek(false, true)

    gsap.killTweensOf(group.position)
    gsap.killTweensOf(group.rotation)

    gsap.to(group.position, {
      x: basePos.current.x,
      y: basePos.current.y,
      z: basePos.current.z,
      duration: 0.85,
      ease: 'power3.inOut',
      overwrite: true,
    })

    gsap.to(group.rotation, {
      x: baseRot.current.x,
      y: baseRot.current.y,
      z: baseRot.current.z,
      duration: 0.85,
      ease: 'power3.inOut',
      overwrite: true,
      onComplete: () => {
        animStateRef.current = 'rest'
      },
    })
  }

  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    const selectedId = selectedIdRef.current
    const isSelected = selectedId === project.id

    if (isSelected && animStateRef.current !== 'selected') {
      animStateRef.current = 'selected'
      animateToSelected()
    } else if (!isSelected && animStateRef.current === 'selected') {
      animStateRef.current = 'returning'
      animateToRest()
    }

    if (selectedId || animStateRef.current !== 'rest' || !introCompleteRef.current) return

    const isHovered = hoveredIdRef.current === project.id
    if (isHovered !== lastHoveredRef.current) {
      lastHoveredRef.current = isHovered
      setHoverPeek(isHovered)
    }

    group.position.y = basePos.current.y + liftRef.current
    group.position.z = basePos.current.z + forwardRef.current
    group.rotation.x = baseRot.current.x + leanRef.current

    if (meshRef.current) {
      meshRef.current.renderOrder = isHovered ? 20 : index
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        geometry={sleeveBoxGeometry}
        material={materials}
        castShadow={false}
        receiveShadow={false}
      />
    </group>
  )
}

export default memo(VinylSleeve)
