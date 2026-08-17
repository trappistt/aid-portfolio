import { tools } from '../data/projects'
import { ToolLogo } from './toolLogos'

export default function Tools() {
  return (
    <section id="tools" className="pt-20">
      <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-2">Tools</h2>
      <p className="text-[14px] text-mute mb-8">Tools I’m loving right now.</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
        {tools.map((tool) => (
          <li key={tool.id}>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-[15px] leading-none text-ink transition-opacity hover:opacity-55"
            >
              <ToolLogo id={tool.id} />
              <span>{tool.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
