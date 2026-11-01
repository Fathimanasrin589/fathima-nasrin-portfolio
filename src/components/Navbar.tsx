import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { navLinks, profile } from '../data/profile'
import { easeOutExpo, scrollToId } from '../lib/motion'
import { SocialLinks } from './ui/SocialLinks'

const sectionIds = navLinks.map((l) => l.id)

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Lock page scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easeOutExpo, delay: 0.2 }}
        className={`relative z-[60] mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled
            ? 'border border-line bg-ink/80 shadow-[0_10px_40px_-20px_rgb(0_0_0_/_0.8)] backdrop-blur-xl'
            : 'border border-transparent'
        }`}
      >
        <a
          href="#home"
          onClick={go('home')}
          data-cursor="hover"
          aria-label={`${profile.name} — back to top`}
          className="group flex items-center gap-3 pl-1"
        >
          <span className="relative grid size-10 place-items-center rounded-full border border-line-strong bg-ink-3 font-display text-sm font-semibold tracking-tight">
            <span className="text-gradient">{profile.initials}</span>
            <span className="absolute inset-0 rounded-full border border-iris-soft/0 transition-colors duration-500 group-hover:border-iris-soft/50" />
          </span>
          <span className="hidden font-display text-sm text-mute transition-colors group-hover:text-paper sm:inline">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={go(link.id)}
                data-cursor="hover"
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 font-display text-[0.82rem] transition-colors duration-300 ${
                  active === link.id ? 'text-paper' : 'text-mute hover:text-paper'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={go('contact')}
          data-cursor="hover"
          className="hidden rounded-full bg-paper px-5 py-2.5 font-display text-[0.82rem] font-medium text-ink transition-colors hover:bg-white md:inline-flex"
        >
          Let’s talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid size-11 place-items-center rounded-full border border-line-strong bg-ink-3 md:hidden"
        >
          <span className="relative block h-3 w-5">
            <motion.span
              className="absolute left-0 h-px w-5 bg-paper"
              animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            />
            <motion.span
              className="absolute left-0 h-px w-5 bg-paper"
              animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            />
          </span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col bg-ink/95 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl tracking-tight"
                  >
                    <span className="text-xs text-iris-soft">0{i + 1}</span>
                    <span className={active === link.id ? 'text-gradient' : 'text-paper'}>{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">Say hello</p>
                <a href={`mailto:${profile.email}`} className="text-sm text-paper">
                  {profile.email}
                </a>
              </div>
              <SocialLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
