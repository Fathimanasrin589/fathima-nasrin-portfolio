import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { skillGroups, type SkillGroup } from '../data/skills'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'

// Bento placement: backend & AI get the large tiles.
const layout: Record<string, string> = {
  backend: 'lg:col-span-7',
  frontend: 'lg:col-span-5',
  data: 'lg:col-span-4',
  ai: 'lg:col-span-8',
  tools: 'lg:col-span-12',
}

export function Skills() {
  const marquee = skillGroups.flatMap((g) => g.skills)

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="A toolkit built around real work."
          highlight={['real', 'work']}
          id="skills-title"
        >
          Grouped by how I use them — no inflated percentage bars, just the technologies I work with.
        </SectionHeading>

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-12"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillGroups.map((group) => (
            <SkillCluster key={group.id} group={group} className={layout[group.id]} />
          ))}
        </motion.div>
      </div>

      {/* ambient marquee */}
      <div
        aria-hidden
        className="mt-24 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-10">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-3xl tracking-tight text-paper/20 sm:text-4xl">
              {s}
              <span className="size-1.5 rounded-full bg-iris/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCluster({ group, className }: { group: SkillGroup; className?: string }) {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, ${group.accent}22, transparent 70%)`
  const Icon = group.icon

  return (
    <motion.article
      variants={fadeUp}
      viewport={viewportOnce}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      onPointerLeave={() => {
        mx.set(-200)
        my.set(-200)
      }}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-line-strong sm:p-8 ${className ?? ''}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-medium text-paper sm:text-2xl">{group.title}</h3>
          <p className="mt-1.5 max-w-sm text-sm text-mute">{group.blurb}</p>
        </div>
        <span
          className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line transition-transform duration-500 group-hover:rotate-[8deg]"
          style={{ background: `linear-gradient(140deg, ${group.accent}33, transparent)` }}
        >
          <Icon className="size-5" style={{ color: group.accent }} />
        </span>
      </div>

      <ul className="relative mt-8 flex flex-wrap gap-2.5">
        {group.skills.map((skill) => (
          <motion.li
            key={skill}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="cursor-default rounded-xl border border-line bg-white/[0.025] px-3.5 py-2 font-display text-sm text-paper/85 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-paper"
          >
            <span className="mr-2 inline-block size-1.5 -translate-y-px rounded-full" style={{ background: group.accent }} />
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}
