import { SocialIcons } from './SideNav'
import { tools, EMAIL } from '../data/projects'

export default function Tools() {
  return (
    <section id="tools" className="pt-20 pb-28">
      <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-2">Tools</h2>
      <p className="text-[14px] text-mute mb-8">What I’m using right now.</p>

      <ul className="space-y-8">
        {tools.map((group) => (
          <li
            key={group.category}
            className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_1fr] gap-3 items-start"
          >
            <span className="text-[14px] text-mute pt-0.5">{group.category}</span>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.name}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-ink underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-[15px] text-ink">{item.name}</span>
                  )}
                  {item.note && (
                    <p className="mt-0.5 text-[13px] text-mute">{item.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </li>
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
