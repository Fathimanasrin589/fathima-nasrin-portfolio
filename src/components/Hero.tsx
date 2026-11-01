import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Download, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { useAssetAvailable } from '../hooks/useAssetAvailable'
import { easeOutExpo, scrollToId } from '../lib/motion'
import { ParticleField } from './ParticleField'
import { Portrait } from './Portrait'
import { Button } from './ui/Button'
import { SocialLinks } from './ui/SocialLinks'
import { SplitText } from './ui/SplitText'

const floatingChips = [
  { label: 'C# · .NET', className: 'top-[12%] -left-4 sm:-left-10', delay: 1.1 },
  { label: 'Angular · React', className: 'top-[48%] -right-3 sm:-right-12', delay: 1.25 },
  { label: 'LLM Integration', className: 'bottom-[10%] -left-2 sm:-left-14', delay: 1.4 },
]

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: easeOutExpo, delay },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const resumeAvailable = useAssetAvailable(profile.resume, 'pdf')

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60])
  const nameX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-10 sm:pt-32"
    >
      {/* background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <ParticleField className="absolute inset-0 opacity-70" />
        <div className="absolute top-[-20%] left-[-10%] size-[42rem] rounded-full bg-iris-deep/25 blur-[140px]" />
        <div className="absolute right-[-15%] bottom-[-10%] size-[34rem] rounded-full bg-aqua/[0.07] blur-[140px]" />
      </div>

      <div className="container-x grid flex-1 items-center gap-10 sm:gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* LEFT */}
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 lg:order-1">
          <motion.div
            {...enter(0.15)}
            className="glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-2 text-xs text-paper/85"
          >
            <span className="relative grid size-5 place-items-center">
              <span className="absolute size-2 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-emerald-400" />
              <span className="relative size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.currentRole} at {profile.company}
          </motion.div>

          <motion.p {...enter(0.25)} className="eyebrow mb-5 text-iris-soft!">
            Hello, I’m {profile.name}
          </motion.p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.98] font-medium tracking-[-0.045em] text-balance"
          >
            <SplitText
              immediate
              delay={0.35}
              text="Building digital experiences that matter."
              wordClassName={(w) => (w === 'matter.' ? 'text-gradient-animated pr-1' : undefined)}
            />
          </h1>

          <motion.p
            {...enter(0.8)}
            className="mt-7 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div {...enter(0.95)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
              icon={<ArrowUpRight className="size-4" />}
            >
              Explore My Work
            </Button>
            {resumeAvailable ? (
              <Button variant="ghost" href={profile.resume} download icon={<Download className="size-4" />}>
                Download Resume
              </Button>
            ) : (
              <Button
                variant="ghost"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('contact')
                }}
              >
                Get in Touch
              </Button>
            )}
          </motion.div>

          <motion.div
            {...enter(1.1)}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-line pt-8"
          >
            <SocialLinks />
            <div className="text-sm leading-relaxed">
              <p className="text-paper">{profile.roles.join(' · ')}</p>
              <p className="mt-1 flex items-center gap-1.5 text-mute">
                <MapPin className="size-3.5" /> {profile.location}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div style={{ y: portraitY }} className="relative order-1 lg:order-2">
          <Portrait />
          {floatingChips.map((chip) => (
            <motion.span
              key={chip.label}
              aria-hidden
              className={`glass absolute hidden items-center rounded-full px-4 py-2 font-display text-xs text-paper/90 shadow-[0_8px_30px_-10px_rgb(0_0_0_/_0.6)] xs:inline-flex ${chip.className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: chip.delay },
                scale: { duration: 0.8, delay: chip.delay, ease: easeOutExpo },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: chip.delay },
              }}
            >
              <span className="mr-2 size-1.5 rounded-full bg-aqua" />
              {chip.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* oversized signature name */}
      <motion.div
        aria-hidden
        style={{ x: nameX }}
        className="pointer-events-none mt-14 overflow-hidden whitespace-nowrap select-none lg:mt-6"
      >
        <motion.p
          className="font-display text-[clamp(4rem,15.5vw,15rem)] leading-[0.85] font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(184_162_255_/_0.22)]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.6 }}
        >
          {profile.fullName}
        </motion.p>
      </motion.div>
    </section>
  )
}
