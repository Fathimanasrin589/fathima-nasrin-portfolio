import { motion } from 'motion/react'
import { easeOutExpo } from '../../lib/motion'

interface SplitTextProps {
  text: string
  className?: string
  /** Extra class for each word — e.g. a gradient on selected words. */
  wordClassName?: (word: string, index: number) => string | undefined
  delay?: number
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean
}

/**
 * Word-by-word masked reveal. The full sentence is kept for screen readers,
 * the animated pieces are hidden from them.
 */
export function SplitText({ text, className, wordClassName, delay = 0, immediate = false }: SplitTextProps) {
  const words = text.split(' ')
  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, amount: 0.5 } }

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName?.(word, i) ?? ''}`}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                show: { y: '0%', rotate: 0, transition: { duration: 1, ease: easeOutExpo } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </span>
  )
}
