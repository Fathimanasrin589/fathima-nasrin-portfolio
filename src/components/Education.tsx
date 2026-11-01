import { motion, useReducedMotion } from 'motion/react'
import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/education'
import { easeOutExpo, viewportOnce } from '../lib/motion'
import { CountUp } from './ui/CountUp'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Education() {
  const reduce = useReducedMotion()
  const ratio = education.cgpa / education.cgpaScale
  const circumference = 2 * Math.PI * 54

  return (
    <section id="education" aria-labelledby="education-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Education" title="Foundations in Computer Science." highlight={['Computer', 'Science']} id="education-title" />

        <Reveal y={50}>
          <article className="glass relative grid items-center gap-10 overflow-hidden rounded-[2rem] p-7 sm:p-12 md:grid-cols-[1fr_auto]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-iris/20 blur-[100px]"
            />
            <div className="relative">
              <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-mute">
                <span className="grid size-11 place-items-center rounded-2xl border border-line bg-white/[0.04]">
                  <GraduationCap className="size-5 text-iris-soft" />
                </span>
                <span className="font-display tracking-wide text-paper">{education.period}</span>
                <span className="text-faint">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {education.location}
                </span>
              </div>
              <h3 className="max-w-2xl font-display text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                {education.degree}
              </h3>
              <p className="mt-4 text-lg text-mute">{education.institution}</p>
            </div>

            <div className="relative mx-auto size-44 sm:size-52" aria-label={`CGPA ${education.cgpa} out of ${education.cgpaScale}`} role="img">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="5" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#cgpa)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: reduce ? circumference * (1 - ratio) : circumference }}
                  whileInView={{ strokeDashoffset: circumference * (1 - ratio) }}
                  viewport={viewportOnce}
                  transition={{ duration: 2, ease: easeOutExpo, delay: 0.2 }}
                />
                <defs>
                  <linearGradient id="cgpa" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#6ee7f2" />
                  </linearGradient>
                </defs>
              </svg>
              <div aria-hidden className="absolute inset-0 grid place-content-center text-center">
                <p className="font-display text-5xl font-medium tracking-tight">
                  <CountUp to={education.cgpa} decimals={1} />
                </p>
                <p className="mt-1 text-xs tracking-[0.25em] text-mute uppercase">CGPA / {education.cgpaScale}</p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
