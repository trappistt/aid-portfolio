/**
 * Default bento-grid tile layout (4 columns × 2 rows, 6 tiles).
 * Tall left, wide hero top-center, mixed tiles on the right.
 *
 * Upload assets as 01.jpg … 06.jpg inside each project's `showcase/` folder.
 * Override `showcase.tiles` on a project entry for a custom layout.
 */
export const DEFAULT_SHOWCASE_TILES = [
  { file: '01.jpg', gridColumn: '1', gridRow: '1 / 3', alt: 'Detail shot' },
  { file: '02.jpg', gridColumn: '2 / 4', gridRow: '1', alt: 'Hero' },
  { file: '03.jpg', gridColumn: '4', gridRow: '1', alt: 'Product view' },
  { file: '04.jpg', gridColumn: '2', gridRow: '2', alt: 'Campaign' },
  { file: '05.jpg', gridColumn: '3', gridRow: '2', alt: 'Environment' },
  { file: '06.jpg', gridColumn: '4', gridRow: '2', alt: 'Collateral' },
]

/** Resolve showcase tile paths from a project slug (showcase/01.jpg … 06.jpg). */
export function buildShowcaseTiles(slug, tileDefs = DEFAULT_SHOWCASE_TILES) {
  return tileDefs.map((tile) => ({
    ...tile,
    src: `/projects/${slug}/showcase/${tile.file}`,
  }))
}

/**
 * Map an ordered list of image paths onto the default bento tiles.
 * Cycles through `images` when fewer than 6 assets are available.
 */
export function buildShowcaseFromImages(images, { tag, tiles, objectPositions } = {}) {
  if (!images?.length) return { tag, tiles: [] }

  const tileDefs = tiles ?? DEFAULT_SHOWCASE_TILES
  return {
    tag,
    tiles: tileDefs.map((tile, index) => ({
      ...tile,
      src: images[index % images.length],
      objectPosition: objectPositions?.[index] ?? tile.objectPosition ?? 'center',
    })),
  }
}

/** Build a full showcase config for projects.js */
export function buildShowcase(slug, { tag, tiles, images, objectPositions } = {}) {
  if (images?.length) {
    return buildShowcaseFromImages(images, { tag, tiles, objectPositions })
  }

  return {
    tag,
    tiles: buildShowcaseTiles(slug, tiles ?? DEFAULT_SHOWCASE_TILES),
  }
}
