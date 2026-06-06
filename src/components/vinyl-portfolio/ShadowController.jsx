import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useVinylUI } from './VinylPortfolioContext'

/**
 * Bakes shadow maps on demand instead of every frame.
 * Static crate/table shadows are rebaked after load and on selection changes.
 */
export default function ShadowController() {
  const { gl } = useThree()
  const { isLoading, selectedProject } = useVinylUI()

  useEffect(() => {
    gl.shadowMap.needsUpdate = true
  }, [gl, isLoading, selectedProject])

  return null
}
