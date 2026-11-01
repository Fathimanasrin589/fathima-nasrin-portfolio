import type { Transition, Variants } from 'motion/react'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const springSoft: Transition = { type: 'spring', stiffness: 160, damping: 20, mass: 0.6 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const viewportOnce = { once: true, amount: 0.25 } as const

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
