import { Link } from 'react-router-dom'
import { IconArrowUpRight } from './icons'
import { projects } from '../data/projects'

export default function Work() {
  return (
    <section id="work" className="pt-20">
      <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-8">Work</h2>

      <ul className="space-y-10">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to={`/work/${project.slug}`}
              className="group block"
            >
              {project.logo && (
                <img
                  src={project.logo}
                  alt=""
                  className={`${project.logoClass || 'h-6'} w-auto object-contain object-left mb-4 opacity-90`}
                  loading="lazy"
                  draggable={false}
                />
              )}

              <h3 className="text-[15px] text-ink tracking-[-0.01em]">{project.title}</h3>
              {project.summary && (
                <p className="mt-2 text-[14px] leading-[1.55] text-mute max-w-md">
                  {project.summary}
                </p>
              )}

              <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-ink">
                Read case study
                <IconArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
