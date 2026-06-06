import * as THREE from 'three'

/**
 * Generates a circular vinyl label texture with album artwork fallback.
 * Uses canvas rendering so records look premium even without image assets.
 */
export function createLabelTexture(project) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Vinyl base — dark grooves area around label
  ctx.fillStyle = '#111111'
  ctx.fillRect(0, 0, size, size)

  // Outer ring grooves
  const center = size / 2
  for (let r = 200; r < 250; r += 2) {
    ctx.beginPath()
    ctx.arc(center, center, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.02})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Label circle
  const labelRadius = 160
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, labelRadius)
  gradient.addColorStop(0, project.accent || '#444')
  gradient.addColorStop(0.6, shadeColor(project.accent || '#333333', -20))
  gradient.addColorStop(1, shadeColor(project.accent || '#222222', -40))

  ctx.beginPath()
  ctx.arc(center, center, labelRadius, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  // Subtle noise texture on label
  for (let i = 0; i < 800; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = Math.random() * labelRadius
    const x = center + Math.cos(angle) * dist
    const y = center + Math.sin(angle) * dist
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`
    ctx.fillRect(x, y, 1, 1)
  }

  // Center spindle hole
  ctx.beginPath()
  ctx.arc(center, center, 12, 0, Math.PI * 2)
  ctx.fillStyle = '#0a0a0a'
  ctx.fill()

  // Project title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 28px "PP Neue Montreal", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  wrapText(ctx, project.title, center, center - 30, labelRadius * 1.4, 32)

  // Category & year
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '500 16px "PP Neue Montreal", system-ui, sans-serif'
  ctx.fillText(project.category, center, center + 20)
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '400 14px "PP Neue Montreal", system-ui, sans-serif'
  ctx.fillText(project.year, center, center + 48)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

/**
 * Attempts to load project artwork; falls back to generated label.
 */
export function loadRecordTexture(project, onLoad) {
  const img = new Image()
  img.crossOrigin = 'anonymous'

  img.onload = () => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Dark vinyl background with grooves
    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, size, size)

    const center = size / 2
    for (let r = 200; r < 250; r += 2) {
      ctx.beginPath()
      ctx.arc(center, center, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Circular clip for artwork
    ctx.save()
    ctx.beginPath()
    ctx.arc(center, center, 155, 0, Math.PI * 2)
    ctx.clip()
    const aspect = img.width / img.height
    let dw, dh
    if (aspect > 1) {
      dh = 310
      dw = dh * aspect
    } else {
      dw = 310
      dh = dw / aspect
    }
    ctx.drawImage(img, center - dw / 2, center - dh / 2, dw, dh)
    ctx.restore()

    // Spindle hole
    ctx.beginPath()
    ctx.arc(center, center, 12, 0, Math.PI * 2)
    ctx.fillStyle = '#0a0a0a'
    ctx.fill()

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    onLoad(texture)
  }

  img.onerror = () => {
    onLoad(createLabelTexture(project))
  }

  img.src = project.image
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  const lines = []

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

  const startY = y - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((ln, i) => ctx.fillText(ln, x, startY + i * lineHeight))
}

function shadeColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + percent))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
