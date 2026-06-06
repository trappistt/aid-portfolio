const HOVER_SOUND_SRC = '/audio/hover.mp3'

let hoverAudio = null

/** Short pickup sound when hovering a vinyl record. */
export function playHoverSound() {
  if (!hoverAudio) {
    hoverAudio = new Audio(HOVER_SOUND_SRC)
    hoverAudio.volume = 0.42
  }

  hoverAudio.currentTime = 0
  hoverAudio.play().catch(() => {})
}
