import { useLayoutEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const PLASTER_DIFF = '/textures/plaster/plastered_wall_04_diff_4k.jpg'

function usePlasterMaterial(texture, repeat = [3, 2], color = '#ffffff') {
  return useMemo(() => {
    const map = texture.clone()
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.repeat.set(repeat[0], repeat[1])
    map.colorSpace = THREE.SRGBColorSpace
    map.needsUpdate = true
    return { map, color, roughness: 0.94, metalness: 0 }
  }, [texture, repeat, color])
}

/**
 * Simple plaster-walled room — back wall + floor using the Polyhaven
 * plastered_wall_04 diffuse map. No HDRI; lightweight for the web.
 */
export default function PlasterEnvironment() {
  const diff = useTexture(PLASTER_DIFF)
  const scene = useThree((s) => s.scene)

  useLayoutEffect(() => {
    const prev = scene.background
    scene.background = new THREE.Color('#e9e5dc')
    return () => {
      scene.background = prev
    }
  }, [scene])

  useMemo(() => {
    diff.wrapS = THREE.RepeatWrapping
    diff.wrapT = THREE.RepeatWrapping
    diff.colorSpace = THREE.SRGBColorSpace
  }, [diff])

  const wallMat = usePlasterMaterial(diff, [5, 3.5])
  const floorMat = usePlasterMaterial(diff, [6, 6], '#ddd8cf')

  return (
    <group>
      <mesh position={[0, 1.8, -5.5]} receiveShadow>
        <planeGeometry args={[18, 11]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial {...floorMat} />
      </mesh>
    </group>
  )
}

useTexture.preload(PLASTER_DIFF)
