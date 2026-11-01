import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import type { Project } from '../data/projects'
import { easeOutExpo } from '../lib/motion'

interface ProjectPreviewProps {
  project: Project
  className?: string
  /** Tailwind aspect-ratio classes for the image area. */
  aspect?: string
}

/**
 * Shows the project screenshot with a curtain reveal. Until a screenshot is
 * added to /public/images/projects, a designed abstract preview is rendered.
 */
export function ProjectPreview({ project, className, aspect = 'aspect-[16/10]' }: ProjectPreviewProps) {
  const [failed, setFailed] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] border border-line-strong bg-ink-3 ${className ?? ''}`}
    >
      {/* window chrome */}
      <div className="relative z-10 flex h-9 items-center gap-1.5 border-b border-line bg-ink-2/90 px-4">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate font-display text-[0.68rem] tracking-wide text-faint">
          {project.title.toLowerCase().replace(/\s+/g, '-')}
        </span>
      </div>

      <div className={`relative overflow-hidden ${aspect}`}>
        {!failed ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]">
            <Mock id={project.id} />
          </div>
        )}

        {/* reveal curtain */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-0 origin-top bg-gradient-to-b from-iris-deep to-ink-3"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
          />
        )}
      </div>
    </div>
  )
}

/* ---------------- abstract previews (decorative, aria-hidden) ---------------- */

function Mock({ id }: { id: string }) {
  switch (id) {
    case 'resolvehub':
      return <TicketsMock />
    case 'codegenie':
      return <AssistantMock />
    case 'lifeaura':
      return <HealthMock />
    default:
      return <ClassifierMock />
  }
}

const bar = 'rounded-full bg-white/10'

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_80%_0%,rgb(139_92_246_/_0.22),transparent_55%),linear-gradient(180deg,#14141f,#0d0d14)]">
      {children}
    </div>
  )
}

function TicketsMock() {
  const rows = [
    { status: 'Open', tone: 'bg-aqua/20 text-aqua', w: 'w-3/5' },
    { status: 'In progress', tone: 'bg-iris/25 text-iris-soft', w: 'w-2/5' },
    { status: 'Resolved', tone: 'bg-emerald-400/15 text-emerald-300', w: 'w-1/2' },
    { status: 'Open', tone: 'bg-aqua/20 text-aqua', w: 'w-2/3' },
    { status: 'In progress', tone: 'bg-iris/25 text-iris-soft', w: 'w-1/3' },
    { status: 'Resolved', tone: 'bg-emerald-400/15 text-emerald-300', w: 'w-3/5' },
    { status: 'Open', tone: 'bg-aqua/20 text-aqua', w: 'w-2/5' },
    { status: 'Resolved', tone: 'bg-emerald-400/15 text-emerald-300', w: 'w-1/2' },
  ]
  return (
    <Frame>
      <div className="flex h-full">
        <aside className="hidden w-[18%] flex-col gap-3 border-r border-line p-4 sm:flex">
          <div className="mb-3 h-3 w-3/4 rounded-full bg-gradient-to-r from-iris-soft to-aqua opacity-80" />
          {['w-4/5', 'w-3/5', 'w-2/3', 'w-1/2', 'w-3/4'].map((w, i) => (
            <div key={i} className={`h-2 ${w} ${i === 0 ? 'rounded-full bg-iris-soft/60' : bar}`} />
          ))}
        </aside>
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className={`h-3 w-28 ${bar} bg-white/25`} />
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-md border border-line bg-white/5" />
              <div className="h-6 w-14 rounded-md bg-iris/60" />
            </div>
          </div>
          <div className="mb-5 grid grid-cols-3 gap-3">
            {['from-iris/40', 'from-aqua/30', 'from-fuchsia-400/25'].map((c) => (
              <div key={c} className={`rounded-xl border border-line bg-gradient-to-br ${c} to-transparent p-3`}>
                <div className={`mb-3 h-1.5 w-1/2 ${bar}`} />
                <div className="h-4 w-1/3 rounded bg-white/30" />
              </div>
            ))}
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden rounded-xl border border-line bg-black/20 p-3">
            {rows.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-2 py-1.5 odd:bg-white/[0.02]">
                <div className="size-5 shrink-0 rounded-full bg-white/10" />
                <div className={`h-2 ${r.w} ${bar}`} />
                <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 font-display text-[0.55rem] ${r.tone}`}>
                  {r.status}
                </span>
                <span className="hidden h-2 w-10 shrink-0 rounded-full bg-white/10 sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function AssistantMock() {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[1.1fr_1fr] gap-4 p-5">
        <div className="rounded-xl border border-line bg-black/30 p-4 font-mono text-[0.6rem] leading-5">
          {[
            ['bg-iris-soft/60 w-10', 'w-24'],
            ['bg-aqua/60 w-6', 'w-16', 'w-10'],
            ['w-4', 'w-28'],
            ['w-4', 'w-20', 'w-8'],
            ['bg-iris-soft/60 w-12', 'w-14'],
            ['w-4', 'w-24'],
          ].map((line, i) => (
            <div key={i} className="flex items-center gap-2 py-[3px]" style={{ paddingLeft: `${(i % 3) * 10}px` }}>
              <span className="w-3 text-faint">{i + 1}</span>
              {line.map((cls, j) => (
                <span key={j} className={`h-1.5 rounded-full ${cls.includes('bg-') ? cls : `bg-white/15 ${cls}`}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-end gap-3">
          <div className="ml-auto w-4/5 rounded-2xl rounded-br-sm bg-iris/40 p-3">
            <div className={`h-1.5 w-full ${bar} bg-white/40`} />
            <div className={`mt-2 h-1.5 w-2/3 ${bar} bg-white/40`} />
          </div>
          <div className="w-11/12 rounded-2xl rounded-bl-sm border border-line bg-white/[0.04] p-3">
            {['w-full', 'w-5/6', 'w-3/4', 'w-1/2'].map((w) => (
              <div key={w} className={`mb-2 h-1.5 ${w} ${bar} last:mb-0`} />
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-black/30 px-3 py-2">
            <div className={`h-1.5 flex-1 ${bar}`} />
            <div className="size-4 rounded-full bg-aqua/60" />
          </div>
        </div>
      </div>
    </Frame>
  )
}

function HealthMock() {
  return (
    <Frame>
      <div className="flex h-full flex-col justify-between p-5">
        <svg viewBox="0 0 300 70" className="w-full" fill="none">
          <path
            d="M0 40 H90 L105 40 L115 12 L128 62 L140 26 L150 40 H300"
            stroke="url(#pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="pulse" x1="0" x2="1">
              <stop offset="0" stopColor="#6ee7f2" stopOpacity="0" />
              <stop offset="0.5" stopColor="#6ee7f2" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        <div className="space-y-3">
          <div className="ml-auto w-3/5 rounded-2xl rounded-br-sm bg-aqua/25 p-3">
            <div className={`h-1.5 w-full ${bar} bg-white/40`} />
          </div>
          <div className="w-4/5 rounded-2xl rounded-bl-sm border border-line bg-white/[0.04] p-3">
            {['w-full', 'w-4/5', 'w-2/3'].map((w) => (
              <div key={w} className={`mb-2 h-1.5 ${w} ${bar} last:mb-0`} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function ClassifierMock() {
  const bars = [82, 46, 28, 14]
  return (
    <Frame>
      <div className="grid h-full grid-cols-2 gap-5 p-5">
        <div className="space-y-2 rounded-xl border border-line bg-black/25 p-4">
          {['w-full', 'w-11/12', 'w-full', 'w-4/5', 'w-full', 'w-3/5', 'w-5/6'].map((w, i) => (
            <div key={i} className={`h-1.5 ${w} ${i === 2 || i === 5 ? 'rounded-full bg-iris-soft/50' : bar}`} />
          ))}
        </div>
        <div className="flex flex-col justify-center gap-3">
          {bars.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`h-1.5 w-8 shrink-0 ${bar}`} />
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-iris to-aqua' : 'bg-white/15'}`}
                  style={{ width: `${v}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}
