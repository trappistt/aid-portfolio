import * as THREE from 'three'

/**
 * Downscale a loaded texture on the CPU so the GPU uploads a smaller mip chain.
 * Keeps VRAM usage predictable for large source assets (e.g. 4K JPGs).
 */
export function downscaleTexture(texture, maxSize = 1024) {
  const img = texture.image
  if (!img?.width || !img?.height) return texture

  const largest = Math.max(img.width, img.height)
  if (largest <= maxSize) return texture

  const scale = maxSize / largest
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(img.width * scale))
  canvas.height = Math.max(1, Math.round(img.height * scale))
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)

  texture.image = canvas
  texture.needsUpdate = true
  return texture
}

/** Configure repeat + color space on a texture clone (one clone per unique UV repeat). */
export function repeatTexture(texture, repeat = [1, 1]) {
  const clone = texture.clone()
  clone.wrapS = THREE.RepeatWrapping
  clone.wrapT = THREE.RepeatWrapping
  clone.repeat.set(repeat[0], repeat[1])
  clone.needsUpdate = true
  return clone
}
