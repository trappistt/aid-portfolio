import { EMAIL, RESUME_URL } from '../data/projects'

export default function About() {
  return (
    <section id="about" className="min-h-[70vh] flex flex-col justify-center">
      <div className="flex items-start gap-4 sm:gap-5">
        <img
          src="/avatar.png"
          alt="Alireza Iman"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover select-none grayscale shrink-0"
          width={64}
          height={64}
        />
        <div className="min-w-0 pt-0.5">
          <h1 className="text-[1.35rem] sm:text-[1.5rem] font-normal tracking-[-0.02em] text-ink leading-tight">
            Alireza Iman
          </h1>
          <p className="mt-1 text-[14px] sm:text-[15px] text-mute">Digital Experience Manager</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[15px] leading-[1.6] text-mute max-w-md">
        <p>
          Based in Toronto. Currently leading digital experience at{' '}
          <a
            href="https://www.scotiabank.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-[3px] decoration-ink/30 hover:decoration-ink"
          >
            Scotiabank
          </a>
          .
        </p>
        <p>
          Previously at{' '}
          <a
            href="https://www.ikea.com/ca/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-[3px] decoration-ink/30 hover:decoration-ink"
          >
            IKEA
          </a>{' '}
          for nearly a decade, owning commerce journeys, merchandising, and conversion across web
          and app.
        </p>
      </div>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-ink hover:bg-soft transition-colors"
        >
          Resume
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-full bg-ink px-4 py-2 text-[13px] text-page hover:opacity-85 transition-opacity"
        >
          Let’s talk
        </a>
      </div>
    </section>
  )
}
