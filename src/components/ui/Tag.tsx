import type { ReactNode } from 'react'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-white/[0.03] px-3 py-1 font-display text-[0.72rem] tracking-wide text-paper/80 ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
