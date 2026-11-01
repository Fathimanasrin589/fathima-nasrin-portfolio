import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Magnetic } from './Magnetic'

const links = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail, external: false },
]

export function SocialLinks({ className, withEmail = false }: { className?: string; withEmail?: boolean }) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ''}`}>
      {links
        .filter((l) => withEmail || l.external)
        .map(({ label, href, Icon, external }) => (
          <li key={label}>
            <Magnetic strength={0.4}>
              <a
                href={href}
                aria-label={label}
                data-cursor="hover"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="glass grid size-12 place-items-center rounded-full text-mute transition-colors duration-300 hover:border-iris-soft/40 hover:text-paper"
              >
                <Icon className="size-[18px]" />
              </a>
            </Magnetic>
          </li>
        ))}
    </ul>
  )
}
