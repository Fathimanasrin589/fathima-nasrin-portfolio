import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOutExpo, viewportOnce } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'article'
}

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </Component>
  )
}
