import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

/** Subtle 3D tilt that follows the pointer, with a moving glare highlight. Desktop only. */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const finePointer = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = finePointer && !reduce

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 150, damping: 18 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const glareX = useTransform(px, (v) => v * 100)
  const glareY = useTransform(py, (v) => v * 100)
  const glare = useMotionTemplate`radial-gradient(600px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 45%)`

  return (
    <div className={`group/tilt [perspective:1400px] ${className ?? ''}`}>
      <motion.div
        className="relative h-full w-full rounded-[inherit] [transform-style:preserve-3d]"
        style={enabled ? { rotateX, rotateY } : undefined}
        onPointerMove={(e) => {
          if (!enabled) return
          const r = e.currentTarget.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
      >
        {children}
        {enabled && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{ background: glare }}
          />
        )}
      </motion.div>
    </div>
  )
}
