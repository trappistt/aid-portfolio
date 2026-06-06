import { useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useVinylUI } from './VinylPortfolioContext'

const ROOM_AMBIENT_SRC = '/audio/room-ambient.mp3'

/**
 * Toggle for ambient room background audio.
 */
export default function AudioToggle() {
  const { audioEnabled, setAudioEnabled } = useVinylUI()
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioEnabled) {
      if (!audioRef.current) {
        const audio = new Audio(ROOM_AMBIENT_SRC)
        audio.loop = true
        audio.volume = 0.32
        audioRef.current = audio
      }
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current?.pause()
    }

    return () => {
      audioRef.current?.pause()
    }
  }, [audioEnabled])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <button
      onClick={() => setAudioEnabled(!audioEnabled)}
      className="vinyl-audio-toggle absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full transition-colors"
      aria-label={audioEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
      aria-pressed={audioEnabled}
    >
      {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      <span className="text-[10px] uppercase tracking-wider font-medium">
        {audioEnabled ? 'Audio On' : 'Audio Off'}
      </span>
    </button>
  )
}
