import { useState } from 'react'
import { SocialIcons } from './SideNav'
import { playground, EMAIL } from '../data/projects'

function Shot({ item, index }) {
  const [failed, setFailed] = useState(!item.src)
  const showImage = item.src && !failed

  return (
    <li className="snap-start shrink-0">
      <div className="relative aspect-[3/4] w-[9.75rem] sm:w-[10.5rem] overflow-hidden rounded-2xl bg-soft">
        {item.src ? (
          <img
            src={item.src}
            alt={item.alt || ''}
            className={`absolute inset-0 h-full w-full object-cover ${failed ? 'hidden' : ''}`}
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
            onLoad={() => setFailed(false)}
          />
        ) : null}
        {!showImage && (
          <span className="absolute inset-0 flex items-center justify-center text-[12px] tabular-nums text-mute/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
    </li>
  )
}

export default function Playground() {
  return (
    <section id="playground" className="pt-20 pb-28">
      <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-8">
        Playground
      </h2>

      <ul className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide max-w-none pr-6 sm:pr-8 w-[calc(100%+1.5rem+max(0px,(100vw-40rem)/2))] sm:w-[calc(100%+2rem+max(0px,(100vw-40rem)/2))]">
        {playground.map((item, index) => (
          <Shot key={item.id} item={item} index={index} />
        ))}
      </ul>

      <div className="mt-16 pt-8 border-t border-line">
        <a
          href={`mailto:${EMAIL}`}
          className="text-[14px] text-ink underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
        >
          {EMAIL}
        </a>
        <div className="mt-6">
          <SocialIcons />
        </div>
      </div>
    </section>
  )
}
