import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { easeOutExpo } from '../lib/motion'

const DURATION = 1400

/** Short intro: monogram + counter, then a curtain lift. Calls onDone when finished. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const total = reduce ? 300 : DURATION
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      // ease-out so the counter decelerates near 100
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setTimeout(onDone, reduce ? 0 : 250)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone, reduce])

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={reduce ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
    >
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute -inset-16 rounded-full bg-iris/25 blur-3xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
        />
        <div className="relative overflow-hidden">
          <motion.p
            className="font-display text-7xl font-semibold tracking-[-0.06em] text-gradient sm:text-8xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            {profile.initials}
          </motion.p>
        </div>
      </div>

      <div className="mt-10 w-48">
        <div className="h-px w-full overflow-hidden bg-line">
          <div
            className="h-full bg-gradient-to-r from-iris to-aqua"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between font-display text-[0.7rem] tracking-[0.25em] text-mute uppercase">
          <span>{profile.name}</span>
          <span className="tabular-nums text-paper">{progress}</span>
        </div>
      </div>
    </motion.div>
  )
}
