import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery'

/**
 * Dot + trailing ring. Grows over anything marked data-cursor="hover" or any
 * link / button. Only mounted for fine pointers without reduced motion.
 */
export function CustomCursor() {
  const finePointer = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = finePointer && !reduce

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHovering(!!target?.closest('a, button, [data-cursor="hover"]'))
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-paper"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
      />
      <motion.div
        className="absolute top-0 left-0 size-9 rounded-full border border-iris-soft/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.7 : 1,
          backgroundColor: hovering ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}
