import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { experience, type ExperienceItem } from '../data/experience'
import { easeOutExpo, viewportOnce } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-x-clip py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute top-1/3 right-0 -z-10 size-[30rem] rounded-full bg-iris-deep/15 blur-[140px]"
      />
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I’ve been building."
          highlight={['building']}
          id="experience-title"
        >
          From early Python and AI internships to building enterprise software full-time.
        </SectionHeading>

        <ol ref={listRef} className="relative">
          {/* rail + progress */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(30%+7px)]" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-iris via-iris-soft to-aqua md:left-[calc(30%+7px)]"
          />
          {experience.map((item, i) => (
            <TimelineItem key={item.company} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.li
      className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[30%_1fr] md:gap-0 md:pl-0"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {/* node */}
      <motion.span
        aria-hidden
        className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-iris-soft/60 bg-ink md:left-[30%]"
        variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
      >
        <span className={`size-[5px] rounded-full ${item.current ? 'bg-aqua' : 'bg-iris-soft'}`} />
        {item.current && <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full border border-aqua/60" />}
      </motion.span>

      {/* meta column */}
      <motion.div
        className="md:pr-12 md:text-right"
        variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
      >
        <p className="font-display text-sm tracking-wide text-iris-soft">{item.period}</p>
        <p className="mt-1 text-xs tracking-[0.2em] text-faint uppercase">{item.type}</p>
      </motion.div>

      {/* card */}
      <motion.article
        className={`group relative md:ml-12 ${index === 0 ? 'glass rounded-3xl p-6 sm:p-9' : 'pt-0'}`}
        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 1, ease: easeOutExpo, delay: 0.1 }}
      >
        {index === 0 && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_100%_0%,rgb(139_92_246_/_0.14),transparent_55%)]"
          />
        )}
        <div className="relative">
          <h3 className="font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">{item.company}</h3>
          <p className="mt-1 text-paper/80">{item.role}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-mute">{item.summary}</p>

          <ul className="mt-5 max-w-2xl space-y-2.5">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-mute">
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-iris-soft/70" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.li>
  )
}
