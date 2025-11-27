import { motion } from 'framer-motion'

export default function SpotifyPlaylist() {
  const playlistId = '6JLesk9XALDIrpEj2nfix3'
  const playlistUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`

  return (
    <section id="coding-with" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 text-black tracking-tight">
            Who I'm coding with
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src={playlistUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

