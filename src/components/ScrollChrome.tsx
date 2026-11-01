import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { scrollToId } from '../lib/motion'

/** Thin gradient progress bar at the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-iris via-iris-soft to-aqua"
      style={{ scaleX }}
    />
  )
}

/** Circular back-to-top button whose ring fills with scroll progress. */
export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShow(v > 0.12))

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          data-cursor="hover"
          onClick={() => scrollToId('home')}
          className="group fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full border border-line bg-ink-3/80 backdrop-blur-lg sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <motion.circle
              cx="24"
              cy="24"
              r="22.5"
              fill="none"
              stroke="url(#btt-grad)"
              strokeWidth="1.5"
              style={{ pathLength: scrollYProgress }}
            />
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#6ee7f2" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
