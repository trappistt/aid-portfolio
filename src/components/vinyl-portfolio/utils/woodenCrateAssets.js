import * as THREE from 'three'
import { repeatTexture } from './textureUtils'

/** Cached box geometries — never allocate per render or per hover. */
const geometryCache = new Map()

function boxGeometry(...args) {
  const key = args.join(',')
  if (!geometryCache.has(key)) {
    geometryCache.set(key, new THREE.BoxGeometry(...args))
  }
  return geometryCache.get(key)
}

/**
 * Four shared oak materials (one per UV repeat pattern) instead of cloning per slat.
 * @param {{ map: THREE.Texture, aoMap: THREE.Texture }} textures
 */
export function createOakCrateMaterials(textures) {
  const { map, aoMap } = textures

  const make = (repeat) =>
    new THREE.MeshStandardMaterial({
      map: repeatTexture(map, repeat),
      aoMap: repeatTexture(aoMap, repeat),
      aoMapIntensity: 1.1,
      roughness: 0.82,
      metalness: 0.02,
    })

  return {
    floor: make([1.8, 1.4]),
    wallBF: make([2.2, 0.35]),
    wallLR: make([0.35, 2.4]),
    post: make([0.25, 1.6]),
  }
}

/** Pre-declared crate geometries keyed by role. */
export function getCrateGeometries({ innerW, innerD, wallH, slat, slatH, post }) {
  const halfW = innerW / 2 + slat / 2
  const halfD = innerD / 2 + slat / 2

  return {
    floor: boxGeometry(innerW + slat * 2, slat, innerD + slat * 2),
    wallBF: boxGeometry(innerW + slat * 2, slatH, slat),
    wallLR: boxGeometry(slat, slatH, innerD),
    post: boxGeometry(post, wallH, post),
    halfW,
    halfD,
  }
}
