import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { profile } from '../data/profile'
import { easeOutExpo } from '../lib/motion'

/**
 * Arched portrait frame. Loads /public/images/fathima-nasrin.jpg; if the file is
 * missing it falls back to a monogram composition instead of a broken image.
 */
export function Portrait() {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[12.5rem] sm:max-w-[18rem] lg:max-w-[26rem]">
      {/* glow */}
      <div aria-hidden className="absolute -inset-10 rounded-full bg-iris/30 blur-[90px]" />
      <div aria-hidden className="absolute -right-8 -bottom-6 size-48 rounded-full bg-aqua/15 blur-[70px]" />

      {/* slow rotating orbit ring */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -inset-[12%] h-[124%] w-[124%] animate-[spin-slow_40s_linear_infinite] opacity-60"
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="url(#ring)" strokeWidth="0.4" strokeDasharray="1 5" />
        <circle cx="100" cy="2" r="1.6" fill="#6ee7f2" />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b8a2ff" />
            <stop offset="1" stopColor="#6ee7f2" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.25rem] border border-line-strong bg-ink-3 p-2"
        initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
        animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.35 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[1.85rem]">
          {!failed ? (
            <motion.img
              src={profile.portrait}
              alt={`Portrait of ${profile.fullName}`}
              width={800}
              height={1000}
              fetchPriority="high"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-top"
              initial={reduce ? false : { scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: easeOutExpo, delay: 0.35 }}
            />
          ) : (
            <MonogramFallback />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
          />
        </div>
      </motion.div>
    </div>
  )
}

function MonogramFallback() {
  return (
    <div
      role="img"
      aria-label={`${profile.fullName} monogram`}
      className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_30%,rgb(139_92_246_/_0.35),transparent_60%),linear-gradient(180deg,#14141f,#0b0b12)]"
    >
      <div className="grid-lines absolute inset-0 opacity-60" />
      <span className="relative font-display text-[4.5rem] leading-none sm:text-[7rem] font-semibold tracking-[-0.08em] text-gradient">
        {profile.initials}
      </span>
    </div>
  )
}
