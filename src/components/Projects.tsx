import { motion } from 'motion/react'
import { ArrowUpRight, Check, Droplet, Hospital, Smartphone, Sparkles, Users } from 'lucide-react'
import { profile } from '../data/profile'
import { projects, type CaseStudy, type Project } from '../data/projects'
import { easeOutExpo, fadeUp, stagger, viewportOnce } from '../lib/motion'
import { ProjectPreview } from './ProjectPreview'
import { GithubIcon } from './ui/BrandIcons'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { TiltCard } from './ui/TiltCard'

export function Projects() {
  const [featured, ...rest] = projects
  let splitCount = 0

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-x-clip py-28 sm:py-36">
      <div aria-hidden className="absolute top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-iris-deep/[0.12] blur-[160px]" />
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title="Projects that solve real problems."
          highlight={['real', 'problems']}
          id="projects-title"
        >
          Full-stack systems, AI tools and machine learning — each one built to learn something
          specific, and documented with what I actually did.
        </SectionHeading>

        <FeaturedProject project={featured} />
        {rest.map((p) =>
          p.caseStudy ? (
            <CaseStudyProject key={p.id} project={p} caseStudy={p.caseStudy} />
          ) : (
            <SplitProject key={p.id} project={p} reverse={splitCount++ % 2 === 1} />
          ),
        )}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */

function ProjectActions({ project }: { project: Project }) {
  const isProfileLink = project.github === profile.github
  return (
    <div className="flex flex-wrap gap-3">
      {project.live && (
        <Button href={project.live} target="_blank" rel="noopener noreferrer" icon={<ArrowUpRight className="size-4" />}>
          View Project
        </Button>
      )}
      {project.github && (
        <Button
          variant="ghost"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          icon={<GithubIcon className="size-4" />}
          aria-label={`${project.title} — ${isProfileLink ? 'more work on GitHub' : 'source on GitHub'}`}
        >
          {isProfileLink ? 'More on GitHub' : 'View Source'}
        </Button>
      )}
    </div>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
      {items.map((s) => (
        <li key={s}>
          <Tag>{s}</Tag>
        </li>
      ))}
    </ul>
  )
}

function Detail({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h4 className="eyebrow mb-3 text-iris-soft!">{label}</h4>
      <p className="leading-relaxed text-mute">{children}</p>
    </div>
  )
}

/* -------- 01 · featured: full-width preview + editorial spread -------- */

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.id}-title`} className="group relative">
      <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-iris to-aqua px-3 py-1 font-display text-[0.7rem] font-medium tracking-[0.18em] text-ink uppercase">
            Featured
          </span>
          <span className="eyebrow">{project.category}</span>
        </div>
        <span className="font-display text-sm text-faint">{project.index} / {String(projects.length).padStart(2, '0')}</span>
      </Reveal>

      <Reveal y={60}>
        <TiltCard max={3} className="rounded-[1.75rem] sm:rounded-[2.25rem]">
          <div className="relative rounded-[inherit] p-px [background:linear-gradient(140deg,rgb(184_162_255_/_0.5),rgb(255_255_255_/_0.05)_40%,rgb(110_231_242_/_0.35))]">
            <ProjectPreview
              project={project}
              aspect="aspect-[16/10] lg:aspect-[21/10]"
              className="rounded-[calc(1.75rem-1px)] sm:rounded-[calc(2.25rem-1px)]"
            />
          </div>
        </TiltCard>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h3
              id={`${project.id}-title`}
              className="inline-block pr-2 font-display text-[clamp(2.75rem,10vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-gradient lg:text-[clamp(3rem,5.6vw,5.25rem)]"
            >
              {project.title}
            </h3>
            <p className="mt-4 font-display text-xl text-paper/90">{project.tagline}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Stack items={project.stack} />
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <ProjectActions project={project} />
          </Reveal>
        </div>

        <div className="space-y-10 lg:col-span-7">
          <Reveal className="grid gap-10 sm:grid-cols-2">
            <Detail label="The problem">{project.problem}</Detail>
            <Detail label="What I built">{project.built}</Detail>
          </Reveal>
          <Reveal delay={0.1}>
            <Detail label="My contribution">{project.contribution}</Detail>
          </Reveal>
          <Reveal delay={0.15}>
            <h4 className="eyebrow mb-5 text-iris-soft!">Key features</h4>
            <motion.ul
              className="grid gap-x-8 gap-y-3 sm:grid-cols-2"
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {project.features.map((f) => (
                <motion.li key={f} variants={fadeUp} className="flex items-center gap-3 border-b border-line pb-3 text-paper/85">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-iris/20">
                    <Check className="size-3 text-iris-soft" />
                  </span>
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

/* -------- split: preview beside content, alternating sides -------- */

function SplitProject({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="group relative mt-28 grid items-center gap-10 border-t border-line pt-16 sm:mt-36 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
    >
      <motion.div
        className={reverse ? 'lg:order-2' : undefined}
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: easeOutExpo }}
      >
        <TiltCard className="rounded-[1.75rem]">
          <ProjectPreview project={project} className="rounded-[1.75rem]" />
        </TiltCard>
      </motion.div>

      <div>
        <ProjectIntro project={project} />
        <Reveal delay={0.1} className="mt-8 space-y-6">
          <Detail label="The problem">{project.problem}</Detail>
          <Detail label="What I built">{project.built}</Detail>
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
          <ul className="flex flex-col gap-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-paper/85">
                <span className="h-px w-4 bg-aqua/70" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 space-y-8">
          <Stack items={project.stack} />
          <ProjectActions project={project} />
        </Reveal>
      </div>
    </article>
  )
}

function ProjectIntro({ project }: { project: Project }) {
  return (
    <>
      <Reveal className="mb-6 flex flex-wrap items-center gap-4">
        <span className="font-display text-5xl font-semibold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(184_162_255_/_0.5)]">
          {project.index}
        </span>
        <span className="eyebrow">{project.category}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h3 id={`${project.id}-title`} className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-3 text-lg text-paper/80">{project.tagline}</p>
        {project.formerly && <p className="mt-1 text-sm text-faint">Formerly {project.formerly}</p>}
      </Reveal>
    </>
  )
}

/* -------- case study: multi-module ecosystem (LifeAura) -------- */

const platformIcons = {
  app: Smartphone,
  hospital: Hospital,
  organisation: Users,
  bloodbank: Droplet,
}

function CaseStudyProject({ project, caseStudy }: { project: Project; caseStudy: CaseStudy }) {
  return (
    <article aria-labelledby={`${project.id}-title`} className="group relative mt-28 border-t border-line pt-16 sm:mt-36">
      {/* overview */}
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <ProjectIntro project={project} />
          <Reveal delay={0.1} className="mt-8 space-y-6">
            <Detail label="The problem">{project.problem}</Detail>
            <Detail label="What I built">{project.built}</Detail>
          </Reveal>
        </div>
        <Reveal y={50}>
          <TiltCard max={4} className="rounded-[1.75rem]">
            <ProjectPreview project={project} className="rounded-[1.75rem]" />
          </TiltCard>
        </Reveal>
      </div>

      {/* platforms */}
      <motion.ul
        aria-label={`${project.title} platforms`}
        className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {caseStudy.platforms.map((p) => {
          const Icon = platformIcons[p.icon]
          return (
            <motion.li
              key={p.name}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-iris-soft/30 sm:p-6"
            >
              <div aria-hidden className="absolute -top-10 -right-10 size-28 rounded-full bg-iris/15 blur-2xl" />
              <Icon className="relative mb-8 size-6 text-iris-soft" />
              <p className="relative font-display text-lg text-paper sm:text-xl">{p.name}</p>
              <p className="relative mt-1 text-sm text-mute">{p.kind}</p>
            </motion.li>
          )
        })}
      </motion.ul>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        {/* donor matching workflow */}
        <Reveal className="flex flex-col rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
          <h4 className="eyebrow mb-8 text-iris-soft!">Blood donor matching</h4>
          <motion.ol
            className="relative my-auto grid gap-5 sm:grid-cols-5 sm:gap-3"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.span
              aria-hidden
              className="absolute top-4 bottom-4 left-4 w-px origin-top bg-gradient-to-b from-iris to-aqua sm:right-[10%] sm:bottom-auto sm:left-[10%] sm:h-px sm:w-auto sm:origin-left sm:bg-gradient-to-r"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 1.2, ease: easeOutExpo } } }}
            />
            {caseStudy.donorFlow.map((step, i) => (
              <motion.li key={step} variants={fadeUp} className="relative flex items-center gap-4 sm:flex-col sm:text-center">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-iris-soft/50 bg-ink font-display text-xs text-paper">
                  {i + 1}
                </span>
                <span className="text-sm leading-snug text-paper/85">{step}</span>
              </motion.li>
            ))}
          </motion.ol>
        </Reveal>

        {/* AI features */}
        <Reveal
          delay={0.1}
          className="rounded-2xl border border-line bg-[linear-gradient(160deg,rgb(139_92_246_/_0.12),transparent_60%)] p-6 sm:p-8"
        >
          <h4 className="eyebrow mb-6 flex items-center gap-2 text-iris-soft!">
            <Sparkles className="size-3.5" /> AI healthcare
          </h4>
          <ul className="space-y-4">
            {caseStudy.aiFeatures.map((f) => (
              <li key={f.title}>
                <p className="font-display text-paper">{f.title}</p>
                <p className="mt-0.5 text-sm text-mute">{f.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* contribution, stack, actions */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="space-y-4">
          <Detail label="My contribution">{project.contribution}</Detail>
          <p className="text-sm text-mute">Also includes {caseStudy.otherFeatures.join(' · ').toLowerCase()}.</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-8">
          <Stack items={project.stack} />
          <ProjectActions project={project} />
        </Reveal>
      </div>
    </article>
  )
}

