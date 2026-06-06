import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { downscaleTexture } from './textureUtils'

const BASE = '/textures/oak'
const MAX_TEXTURE_SIZE = 1024

/**
 * Oak veneer diffuse + AO — loaded once, downscaled to 1K, shared across the crate.
 */
export function useOakVeneerTextures() {
  const [map, aoMap] = useTexture([
    `${BASE}/oak_veneer_01_diff_4k.jpg`,
    `${BASE}/oak_veneer_01_ao_4k.jpg`,
  ])

  return useMemo(() => {
    downscaleTexture(map, MAX_TEXTURE_SIZE)
    downscaleTexture(aoMap, MAX_TEXTURE_SIZE)

    ;[map, aoMap].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.anisotropy = 4
      texture.generateMipmaps = true
      texture.minFilter = THREE.LinearMipmapLinearFilter
    })
    map.colorSpace = THREE.SRGBColorSpace

    return { map, aoMap }
  }, [map, aoMap])
}
