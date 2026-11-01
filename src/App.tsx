import { AnimatePresence, MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Projects } from './components/Projects'
import { BackToTop, ScrollProgress } from './components/ScrollChrome'
import { Skills } from './components/Skills'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  return (
    // reducedMotion="user" makes every Motion animation honour prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>

      {!loading && (
        <>
          <a
            href="#main"
            className="sr-only z-[100] rounded-full bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Certifications />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
          <CustomCursor />
        </>
      )}
      <div aria-hidden className="grain" />
    </MotionConfig>
  )
}
