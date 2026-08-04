import { experiences } from '../data/projects'

export default function Experience() {
  return (
    <section id="experience" className="pt-20">
      <h2 className="text-[1.15rem] font-normal tracking-[-0.02em] text-ink mb-8">Experience</h2>

      <ul className="space-y-5">
        {experiences.map((exp) => (
          <li
            key={`${exp.company}-${exp.period}`}
            className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_1fr] gap-3 items-start"
          >
            <span className="text-[14px] text-mute tabular-nums pt-0.5">{exp.period}</span>
            <div>
              <p className="text-[15px] text-ink leading-snug">
                {exp.role} at{' '}
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-[3px] decoration-ink/25 hover:decoration-ink"
                  >
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </p>
              {exp.location && (
                <p className="mt-1 text-[13px] text-mute">{exp.location}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
