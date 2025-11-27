import { motion } from 'framer-motion'

const logos = [
  {
    name: 'Awwwards',
    image: '/awwwards.png',
    url: 'https://www.awwwards.com/',
  },
  {
    name: 'TRMA',
    image: '/trma.png',
    url: 'https://www.linkedin.com/posts/kaitlanuy_nine-months-of-zoom-calls-until-midnight-ugcPost-7162617346455527424-SyjJ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACXckmUBw1Blmbu1iNGY4DxJDrWmWFM2bDA',
  },
  {
    name: 'Bootcamp Publication',
    image: '/bootcamp.png',
    url: 'https://medium.com/design-bootcamp/you-just-need-to-be-louder-45878ad3dad0',
  },
  {
    name: 'INGKA Group',
    image: '/Ingka.jpg',
    url: 'https://www.ingka.com/newsroom/ikea-festival-from-dreaming-to-doing/',
  },
  {
    name: 'Shulich Business School',
    image: '/shulich.png',
    url: 'https://www.linkedin.com/posts/yorkmarketing_marketingcommunity-ymafycc2024-casecompetition-ugcPost-7258213529516683264-oiQd?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACXckmUBw1Blmbu1iNGY4DxJDrWmWFM2bDA',
  },
]

export default function Logos() {
  return (
    <section id="logos" className="relative py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 text-black tracking-tight text-center">
            Featured In
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 items-center justify-items-center">
          {logos.map((logo, index) => (
            <motion.a
              key={logo.name}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-full h-24 sm:h-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

