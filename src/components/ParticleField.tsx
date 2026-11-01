import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: 'iris' | 'aqua'
}

const COLORS = { iris: '167, 139, 250', aqua: '110, 231, 242' }
const LINK_DISTANCE = 130

/**
 * Lightweight constellation on a 2D canvas. Points drift slowly, link up when
 * close and ease away from the pointer. Pauses when off-screen or the tab is
 * hidden; draws a single static frame under reduced motion.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let running = false
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, (width * height) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() > 0.75 ? 'aqua' : 'iris',
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduce) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 0) {
            p.x += (dx / dist) * 0.6
            p.y += (dy / dist) * 0.6
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLORS[p.hue]}, 0.75)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${COLORS.iris}, ${0.16 * (1 - d / LINK_DISTANCE)})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      draw()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    resize()
    draw()

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })

    visibility.observe(canvas)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      visibility.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return <canvas ref={canvasRef} aria-hidden className={`h-full w-full ${className ?? ''}`} />
}
