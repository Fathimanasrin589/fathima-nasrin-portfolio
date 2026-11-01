import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Pulls its child slightly toward the pointer on desktop. Inert on touch / reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const enabled = finePointer && !reduce

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!enabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
