import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/wooden_table_02/wooden_table_02.gltf'

/**
 * Polyhaven "Wooden Table 02" — loaded from GLTF (converted from the .blend asset).
 * Scaled and positioned so the tabletop aligns with `topY` in world space.
 */
export default function WoodenTable({ topY = -0.525, targetWidth = 4.2 }) {
  const { scene } = useGLTF(MODEL_PATH)

  const table = useMemo(() => {
    const group = scene.clone(true)

    group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    const box = new THREE.Box3().setFromObject(group)
    const size = new THREE.Vector3()
    box.getSize(size)

    const scale = targetWidth / size.x
    group.scale.setScalar(scale)

    box.setFromObject(group)
    group.position.y = topY - box.max.y

    return group
  }, [scene, topY, targetWidth])

  return <primitive object={table} />
}

useGLTF.preload(MODEL_PATH)
