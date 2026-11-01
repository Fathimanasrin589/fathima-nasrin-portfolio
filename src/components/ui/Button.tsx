import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Magnetic } from './Magnetic'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: Variant
  icon?: ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-paper text-ink hover:bg-white shadow-[0_10px_40px_-10px_rgb(139_92_246_/_0.7)] hover:shadow-[0_14px_50px_-8px_rgb(139_92_246_/_0.85)]',
  ghost: 'glass text-paper hover:border-iris-soft/40 hover:bg-white/[0.06]',
}

/** Magnetic pill link — every CTA on the site uses this. */
export function Button({ children, variant = 'primary', icon, className, ...props }: ButtonProps) {
  return (
    <Magnetic>
      <a
        data-cursor="hover"
        className={`group relative inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-full px-6 py-3 font-display text-sm font-medium tracking-wide transition-[background-color,box-shadow,border-color] duration-500 ${styles[variant]} ${className ?? ''}`}
        {...props}
      >
        <span className="relative">{children}</span>
        {icon && (
          <span className="relative transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        )}
      </a>
    </Magnetic>
  )
}
