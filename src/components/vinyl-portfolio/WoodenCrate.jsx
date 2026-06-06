import { memo, useMemo } from 'react'
import { useOakVeneerTextures } from './utils/useOakVeneerTextures'
import { createOakCrateMaterials, getCrateGeometries } from './utils/woodenCrateAssets'
import WoodenTable from './WoodenTable'

const CRATE_DIMS = {
  innerW: 1.05,
  innerD: 1.5,
  wallH: 0.95,
  slat: 0.06,
  slatH: 0.2,
  post: 0.1,
}

const SLAT_Y_OFFSETS = [0.15, 0.475, 0.8]

/**
 * A light blonde-pine record crate (slatted, like a raw shipping crate) sitting
 * on a light oak table. Materials and geometries are created once and reused.
 */
function WoodenCrate({ children }) {
  const oakTextures = useOakVeneerTextures()

  const materials = useMemo(() => createOakCrateMaterials(oakTextures), [oakTextures])

  const { floorY, geos, halfW, halfD } = useMemo(() => {
    const floorY = -CRATE_DIMS.wallH / 2
    const geos = getCrateGeometries(CRATE_DIMS)
    return { floorY, geos, halfW: geos.halfW, halfD: geos.halfD }
  }, [])

  const slatYs = useMemo(
    () => SLAT_Y_OFFSETS.map((offset) => floorY + offset),
    [floorY]
  )

  const tableTopY = floorY - CRATE_DIMS.slat / 2 - 0.02

  return (
    <group rotation={[0, -0.12, 0]} position={[0, 0.05, 0]}>
      <group>
        <mesh
          position={[0, floorY, 0]}
          geometry={geos.floor}
          material={materials.floor}
          castShadow
          receiveShadow
        />

        {slatYs.map((y, i) => (
          <mesh
            key={`b${i}`}
            position={[0, y, -halfD]}
            geometry={geos.wallBF}
            material={materials.wallBF}
            castShadow
            receiveShadow
          />
        ))}

        {slatYs.slice(0, 2).map((y, i) => (
          <mesh
            key={`f${i}`}
            position={[0, y, halfD]}
            geometry={geos.wallBF}
            material={materials.wallBF}
            castShadow
            receiveShadow
          />
        ))}

        {slatYs.map((y, i) => (
          <mesh
            key={`l${i}`}
            position={[-halfW, y, 0]}
            geometry={geos.wallLR}
            material={materials.wallLR}
            castShadow
            receiveShadow
          />
        ))}
        {slatYs.map((y, i) => (
          <mesh
            key={`r${i}`}
            position={[halfW, y, 0]}
            geometry={geos.wallLR}
            material={materials.wallLR}
            castShadow
            receiveShadow
          />
        ))}

        {[
          [-halfW, -halfD],
          [halfW, -halfD],
          [-halfW, halfD],
          [halfW, halfD],
        ].map(([x, z], i) => (
          <mesh
            key={`p${i}`}
            position={[x, floorY + CRATE_DIMS.wallH / 2, z]}
            geometry={geos.post}
            material={materials.post}
            castShadow
            receiveShadow
          />
        ))}

        {children}
      </group>

      <WoodenTable topY={tableTopY} />
    </group>
  )
}

export default memo(WoodenCrate)
