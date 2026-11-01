import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitText } from './SplitText'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  /** Words in the title rendered with the accent gradient. */
  highlight?: string[]
  children?: ReactNode
  align?: 'left' | 'split'
  /** id for the h2, so the section can reference it with aria-labelledby. */
  id?: string
}

export function SectionHeading({ index, eyebrow, title, highlight = [], children, align = 'split', id }: SectionHeadingProps) {
  return (
    <div
      className={`mb-14 grid gap-6 md:mb-20 ${align === 'split' ? 'lg:grid-cols-[1.3fr_1fr] lg:items-end' : ''}`}
    >
      <div>
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-display text-xs text-iris-soft">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-iris-soft/70 to-transparent" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <h2 id={id} className="font-display text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
          <SplitText
            text={title}
            wordClassName={(w) => (highlight.includes(w.replace(/[.,]/g, '')) ? 'text-gradient' : undefined)}
          />
        </h2>
      </div>
      {children && (
        <Reveal delay={0.15} className="max-w-md text-base leading-relaxed text-mute lg:justify-self-end">
          {children}
        </Reveal>
      )}
    </div>
  )
}
