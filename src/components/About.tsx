import { motion } from 'motion/react'
import { Briefcase, Building2, GraduationCap, Layers, Sparkles, TrendingUp } from 'lucide-react'
import { certifications, education } from '../data/education'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { CountUp } from './ui/CountUp'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const highlights = [
  {
    icon: GraduationCap,
    title: 'B.Tech, Computer Science',
    text: `${education.institution}, ${education.period.replace(' — ', '–')}.`,
  },
  {
    icon: Briefcase,
    title: `${profile.currentRole} at ${profile.company}`,
    text: `Building enterprise software at ${profile.companyLocation}.`,
  },
  {
    icon: Building2,
    title: 'Enterprise applications',
    text: 'Real business workflows, ERP concepts and production-grade data.',
  },
  {
    icon: Layers,
    title: 'Backend to frontend',
    text: '.NET APIs and SQL Server underneath, Angular and React on top.',
  },
  {
    icon: Sparkles,
    title: 'AI-powered solutions',
    text: 'Integrating LLMs and prompt workflows into useful tools.',
  },
  {
    icon: TrendingUp,
    title: 'Always learning',
    text: 'Certifications across ML, SQL, Python and system architecture.',
  },
]

// Every number here is derived from the data files — nothing is hand-typed.
const stats = [
  { value: education.cgpa, decimals: 1, suffix: `/${education.cgpaScale}`, label: 'B.Tech CGPA' },
  { value: experience.filter((e) => e.type === 'Internship').length, label: 'Internships completed' },
  { value: projects.length, label: 'Featured projects' },
  { value: certifications.length, label: 'Certifications' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Understand. Design. Build."
          highlight={['Build']}
          id="about-title"
        >
          A Computer Science graduate who moved straight from the classroom into enterprise software — and
          still treats every feature as a chance to learn something new.
        </SectionHeading>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="space-y-6 self-start text-lg leading-relaxed text-mute sm:text-xl lg:sticky lg:top-32">
            <p>
              I’m <span className="text-paper">{profile.fullName}</span>, a software developer from{' '}
              {profile.location.split(',').slice(0, 2).join(',')}. I work as a{' '}
              <span className="text-paper">
                {profile.currentRole} at {profile.company}
              </span>
              , where I build .NET backends, REST APIs and SQL Server data layers for enterprise
              applications, and contribute to Angular and React frontends.
            </p>
            <p>
              Alongside that, I’m drawn to <span className="text-gradient">AI-powered software</span> —
              from local LLM chatbots to NLP models — and to the engineering that makes those ideas
              dependable in real products.
            </p>
          </Reveal>

          <motion.ul
            className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {highlights.map(({ icon: Icon, title, text }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group relative bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 sm:p-7"
              >
                <Icon className="mb-5 size-5 text-iris-soft transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-aqua" />
                <h3 className="font-display text-[1.05rem] font-medium text-paper">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.dl
          className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line pt-12 lg:grid-cols-4"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col-reverse gap-2 pr-4">
              <dt className="text-sm text-mute">{s.label}</dt>
              <dd className="font-display text-5xl font-medium tracking-tight text-paper sm:text-6xl">
                <CountUp to={s.value} decimals={s.decimals} />
                {s.suffix && <span className="text-2xl text-faint sm:text-3xl">{s.suffix}</span>}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
