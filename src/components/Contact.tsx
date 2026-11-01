import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { easeOutExpo } from '../lib/motion'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SplitText } from './ui/SplitText'

const channels = [
  { label: 'LinkedIn', handle: 'fthima-nasrin', href: profile.linkedin, Icon: LinkedinIcon },
  { label: 'GitHub', handle: 'fathnas589', href: profile.github, Icon: GithubIcon },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(t)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — fall back to the mail client.
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 sm:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute bottom-[-30%] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-iris-deep/30 blur-[160px]" />
      </div>

      <div className="container-x">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="font-display text-xs text-iris-soft">07</span>
          <span className="h-px w-10 bg-gradient-to-r from-iris-soft/70 to-transparent" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <h2
          id="contact-title"
          className="max-w-5xl font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-medium tracking-[-0.045em] text-balance"
        >
          <SplitText
            text="Have an interesting idea? Let’s build something meaningful."
            wordClassName={(w) => (['something', 'meaningful.'].includes(w) ? 'text-gradient' : undefined)}
          />
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-4">Email me directly</p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="group relative font-display text-[clamp(1.4rem,4.2vw,2.75rem)] tracking-tight break-all text-paper"
              >
                {profile.email}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-iris-soft to-aqua transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="hover"
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                className="glass relative grid size-12 shrink-0 place-items-center rounded-full text-mute transition-colors hover:text-paper"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="size-4 text-emerald-300" />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy className="size-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      role="status"
                      className="absolute -top-11 left-1/2 rounded-full bg-paper px-3 py-1.5 text-xs font-medium whitespace-nowrap text-ink"
                      initial={{ opacity: 0, y: 6, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, y: 6, x: '-50%' }}
                      transition={{ duration: 0.4, ease: easeOutExpo }}
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href={`mailto:${profile.email}?subject=Hello%20Fathima`} icon={<Mail className="size-4" />}>
                Start a conversation
              </Button>
              <p className="flex items-center gap-2 text-sm text-mute">
                <MapPin className="size-4" /> Based in {profile.location}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="divide-y divide-line border-y border-line">
              {channels.map(({ label, handle, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="group flex items-center gap-5 py-6"
                  >
                    <span className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-iris-soft/50 group-hover:bg-iris/10">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl text-paper">{label}</span>
                      <span className="text-sm text-mute">{handle}</span>
                    </span>
                    <ArrowUpRight className="size-5 text-mute transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-aqua" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
