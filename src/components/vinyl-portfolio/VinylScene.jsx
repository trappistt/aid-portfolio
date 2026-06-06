import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import WoodenCrate from './WoodenCrate'
import VinylSleeve from './VinylSleeve'
import DustParticles from './DustParticles'
import SceneLighting from './SceneLighting'
import CameraRig from './CameraRig'
import RecordRaycaster from './RecordRaycaster'
import ShadowController from './ShadowController'
import { useCoverTextures } from './utils/useCoverTextures'
import { computeSleeveLayout } from './utils/sleeveLayout'
import { useVinylInteraction } from './VinylPortfolioContext'

function SceneContent({ externalCoverTextures = null }) {
  const { projectList } = useVinylInteraction()
  const coverTextures = useCoverTextures(projectList, externalCoverTextures)
  const layouts = useMemo(() => computeSleeveLayout(projectList.length), [projectList.length])

  return (
    <>
      <SceneLighting />
      <CameraRig />
      <ShadowController />
      <RecordRaycaster />

      <WoodenCrate>
        {projectList.map((project, index) => (
          <VinylSleeve
            key={project.id}
            project={project}
            index={index}
            totalCount={projectList.length}
            basePosition={layouts[index].pos}
            baseRotation={layouts[index].rot}
            coverTexture={coverTextures[index]}
            staggerDelay={index * 0.09}
          />
        ))}
      </WoodenCrate>

      <DustParticles count={35} />
    </>
  )
}

/**
 * Three.js canvas wrapper with performance-conscious settings.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {THREE.Texture[] | null} [props.coverTextures] — optional pre-built cover texture array
 */
export default function VinylScene({ className = '', coverTextures: externalCoverTextures = null }) {
  return (
    <Canvas
      className={className}
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: [0, 2.25, 3.0],
        fov: 42,
        near: 0.1,
        far: 60,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
        gl.shadowMap.autoUpdate = false
        gl.shadowMap.needsUpdate = true
      }}
    >
      <Suspense fallback={null}>
        <SceneContent externalCoverTextures={externalCoverTextures} />
      </Suspense>
    </Canvas>
  )
}
