import { motion } from 'motion/react'
import { Award, Users } from 'lucide-react'
import { certifications, leadership } from '../data/education'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Certifications & Leadership"
          title="Learning beyond the syllabus."
          highlight={['beyond']}
          id="certifications-title"
        >
          Courses and simulations that deepened my foundations — and the roles where I learned to lead.
        </SectionHeading>

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Reveal className="mb-6 flex items-center gap-3">
              <Award className="size-4 text-iris-soft" />
              <h3 className="eyebrow">Certifications</h3>
            </Reveal>
            <motion.ol
              className="border-t border-line"
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {certifications.map((c, i) => (
                <motion.li
                  key={c.title}
                  variants={fadeUp}
                  className="group relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 overflow-hidden border-b border-line py-6 sm:grid-cols-[3rem_1fr_auto]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-iris/10 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <span className="font-display text-sm text-faint transition-colors group-hover:text-iris-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg text-paper transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 sm:text-xl">
                    {c.title}
                  </span>
                  <span className="col-start-2 text-sm text-mute sm:col-start-3 sm:text-right">{c.issuer}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div>
            <Reveal className="mb-6 flex items-center gap-3">
              <Users className="size-4 text-aqua" />
              <h3 className="eyebrow">Leadership & Activities</h3>
            </Reveal>
            <motion.ul
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {leadership.map((l) => (
                <motion.li
                  key={l.title}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                  className="glass rounded-2xl px-5 py-4 transition-colors duration-500 hover:border-aqua/30"
                >
                  <p className="font-display text-paper">{l.title}</p>
                  <p className="mt-1 text-sm text-mute">{l.detail}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
