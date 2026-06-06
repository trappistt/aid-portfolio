import * as THREE from 'three'

/**
 * Builds a square album-sleeve cover texture for a project.
 * Loads the project artwork (cover-fit) and overlays a title/category strip.
 * Falls back to an accent-gradient cover if the image is missing.
 *
 * @param {object} project
 * @param {(tex: THREE.CanvasTexture) => void} onLoad
 */
export function loadSleeveTexture(project, onLoad) {
  const size = 512

  const render = (img) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    if (img) {
      // Cover-fit the artwork into the square
      const aspect = img.width / img.height
      let dw, dh, dx, dy
      if (aspect > 1) {
        dh = size
        dw = size * aspect
        dx = (size - dw) / 2
        dy = 0
      } else {
        dw = size
        dh = size / aspect
        dx = 0
        dy = (size - dh) / 2
      }
      ctx.drawImage(img, dx, dy, dw, dh)
    } else {
      // Accent gradient fallback
      const g = ctx.createLinearGradient(0, 0, size, size)
      g.addColorStop(0, shade(project.accent || '#333', 25))
      g.addColorStop(1, shade(project.accent || '#222', -45))
      ctx.fillStyle = g
      ctx.fillRect(0, 0, size, size)

      // Decorative concentric "record" hint
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      for (let r = 40; r < 220; r += 18) {
        ctx.beginPath()
        ctx.arc(size / 2, size * 0.42, r, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // Bottom gradient scrim for legible text
    const scrim = ctx.createLinearGradient(0, size * 0.6, 0, size)
    scrim.addColorStop(0, 'rgba(0,0,0,0)')
    scrim.addColorStop(1, 'rgba(0,0,0,0.85)')
    ctx.fillStyle = scrim
    ctx.fillRect(0, size * 0.6, size, size * 0.4)

    // Category label
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font = '500 22px "PP Neue Montreal", system-ui, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(project.category.toUpperCase(), 32, size - 78)

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 40px "PP Neue Montreal", system-ui, sans-serif'
    wrapText(ctx, project.title, 32, size - 36, size - 64, 42)

    // Year tag (top-right)
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.font = '500 20px "PP Neue Montreal", system-ui, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(project.year, size - 28, 44)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    onLoad(texture)
  }

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => render(img)
  img.onerror = () => render(null)
  img.src = project.image
}

function wrapText(ctx, text, x, baselineY, maxWidth, lineHeight) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line.trim())
      line = word + ' '
    } else {
      line = test
    }
  }
  lines.push(line.trim())
  // Draw bottom-up so the last line sits on baselineY
  lines.reverse().forEach((ln, i) => ctx.fillText(ln, x, baselineY - i * lineHeight))
}

function shade(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + percent))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
