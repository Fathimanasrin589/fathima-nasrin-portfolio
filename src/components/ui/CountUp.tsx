import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  decimals?: number
  duration?: number
}

export function CountUp({ to, decimals = 0, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setValue })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
    </span>
  )
}
