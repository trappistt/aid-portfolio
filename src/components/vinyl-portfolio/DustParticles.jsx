import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Ambient dust particles floating in the studio atmosphere.
 * Lightweight point cloud for cinematic depth without hurting performance.
 */
export default function DustParticles({ count = 120 }) {
  const pointsRef = useRef()

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = Math.random() * 4 - 1
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      spd[i] = 0.1 + Math.random() * 0.3
    }

    return { positions: pos, speeds: spd }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i)
      y += speeds[i] * delta * 0.15
      if (y > 3) y = -1
      posAttr.setY(i, y)
    }
    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#fff4dd"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
