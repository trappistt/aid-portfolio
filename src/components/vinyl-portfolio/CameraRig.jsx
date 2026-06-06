import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useVinylUI } from './VinylPortfolioContext'

/**
 * Camera with OrbitControls, damping, and mouse parallax offset.
 * Disables orbit when a record is selected for focused viewing.
 */
export default function CameraRig() {
  const controlsRef = useRef()
  const { camera, gl } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const targetOffset = useRef(new THREE.Vector3())
  const { selectedProject } = useVinylUI()

  // Track mouse position for parallax (outside render loop)
  useEffect(() => {
    const canvas = gl.domElement
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    canvas.addEventListener('pointermove', handleMove)
    return () => canvas.removeEventListener('pointermove', handleMove)
  }, [gl])

  // Smooth parallax camera offset each frame
  useFrame(() => {
    const parallaxStrength = selectedProject ? 0.05 : 0.12
    targetOffset.current.x = THREE.MathUtils.lerp(
      targetOffset.current.x,
      mouse.current.x * parallaxStrength,
      0.05
    )
    targetOffset.current.y = THREE.MathUtils.lerp(
      targetOffset.current.y,
      mouse.current.y * parallaxStrength * 0.5,
      0.05
    )

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetOffset.current.x, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.25 + targetOffset.current.y, 0.05)
  })

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !selectedProject
    }
  }, [selectedProject])

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={!selectedProject}
      enableRotate={!selectedProject}
      minDistance={2.4}
      maxDistance={6}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.1}
      target={[0, -0.05, 0]}
      dampingFactor={0.06}
      enableDamping
      makeDefault
    />
  )
}
