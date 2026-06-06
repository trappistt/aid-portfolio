/** Deterministic pseudo-random in [0, 1) for stable per-index jitter. */
export function seededRandom(index, salt = 0) {
  const x = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Crate interior constants — keep in sync with WoodenCrate. */
export const CRATE = {
  innerW: 1.05,
  innerD: 1.5,
  wallH: 0.95,
  slat: 0.06,
}

export const SLEEVE = {
  width: 0.88,
  height: 0.88,
  depth: 0.02,
}

/**
 * Resting transforms for sleeves packed front-to-back on the crate floor.
 * Positions are in crate-local space (inside the WoodenCrate group).
 */
export function computeSleeveLayout(count) {
  const { innerD, wallH, slat } = CRATE
  const { width: sleeveW, height: sleeveH, depth: sleeveD } = SLEEVE

  const floorY = -wallH / 2
  const floorTop = floorY + slat / 2
  const baseY = floorTop + sleeveH / 2

  const zPadding = 0.05
  const zFront = innerD / 2 - zPadding - sleeveD / 2
  const zBack = -innerD / 2 + zPadding + sleeveD / 2

  const baseLeanX = -0.26 // lean backs toward the crate wall, faces toward camera
  const leanSpread = 0.04 // back records tilt a touch more than front ones

  return Array.from({ length: count }, (_, i) => {
    const t = count > 1 ? i / (count - 1) : 0.5
    const z = zFront + (zBack - zFront) * t

    const jitterX = (seededRandom(i, 1) - 0.5) * 0.03
    const rotX = baseLeanX - t * leanSpread + (seededRandom(i, 2) - 0.5) * 0.1
    const rotZ = (seededRandom(i, 3) - 0.5) * 0.1

    return {
      pos: [jitterX, baseY, z],
      rot: [rotX, 0, rotZ],
    }
  })
}
