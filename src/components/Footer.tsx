import { navLinks, profile } from '../data/profile'
import { scrollToId } from '../lib/motion'
import { SocialLinks } from './ui/SocialLinks'

export function Footer() {
  return (
    <footer className="relative border-t border-line pt-16 pb-10">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_auto]">
          <div>
            <p className="font-display text-2xl font-medium tracking-tight">
              <span className="text-gradient">{profile.initials}</span>
              <span className="ml-3 text-paper">{profile.fullName}</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
              {profile.roles.join(' · ')}. {profile.currentRole} at {profile.company}, {profile.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(l.id)
                    }}
                    className="text-mute transition-colors hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks withEmail />
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-8 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
          <p>Designed & built with React, TypeScript and Motion.</p>
        </div>
      </div>
    </footer>
  )
}
