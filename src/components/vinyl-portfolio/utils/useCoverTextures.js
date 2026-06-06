import { useEffect, useState } from 'react'
import { loadSleeveTexture } from './createSleeveTexture'

/**
 * Loads an array of cover textures — one slot per project.
 * Pass the returned array to VinylSleeve via `coverTexture={textures[index]}`.
 *
 * @param {object[]} projects
 * @param {THREE.Texture[] | null} [externalTextures] — optional pre-built texture array
 */
export function useCoverTextures(projects, externalTextures = null) {
  const [textures, setTextures] = useState(() => projects.map(() => null))

  useEffect(() => {
    if (externalTextures) {
      setTextures(externalTextures)
      return
    }

    let cancelled = false

    const pending = new Array(projects.length).fill(null)
    let loaded = 0

    projects.forEach((project, index) => {
      loadSleeveTexture(project, (tex) => {
        if (cancelled) return
        pending[index] = tex
        loaded += 1
        if (loaded === projects.length) {
          setTextures(pending)
        }
      })
    })

    return () => {
      cancelled = true
    }
  }, [projects, externalTextures])

  return textures
}
