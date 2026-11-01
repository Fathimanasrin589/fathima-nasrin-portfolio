# Fathima Nasrin — Portfolio

Personal portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer Motion) and Lucide**.
Theme: *Midnight Violet* — near-black, electric violet, soft cyan, Space Grotesk + Inter.

## Run it

```bash
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Requires Node.js 20 or newer.

## Folder structure

```
public/
  favicon.svg
  images/
    fathima-nasrin.jpg          ← your portrait (add this)
    projects/                   ← project screenshots (add these)
  Fathima-Nasrin-Resume.pdf     ← your resume (add this)
src/
  components/
    ui/                         reusable primitives (Button, Magnetic, Reveal, SplitText, TiltCard …)
    Navbar · Hero · Portrait · About · Experience · Skills · Projects · ProjectPreview
    Education · Certifications · Contact · Footer
    Preloader · CustomCursor · ScrollChrome (progress bar, back-to-top) · ParticleField
  data/                         ALL text content lives here — edit these, not the components
    profile.ts                  name, links, email, portrait & resume paths, nav
    experience.ts               timeline entries
    skills.ts                   skill clusters
    projects.ts                 project case studies
    education.ts                degree, CGPA, certifications, leadership
  hooks/                        useActiveSection, useMediaQuery, useAssetAvailable
  lib/motion.ts                 shared easing / variants / smooth scroll
  styles/index.css              design tokens (@theme) + global styles
  App.tsx · main.tsx
```

## Replace your profile photo

1. Save a portrait as **`public/images/fathima-nasrin.jpg`** (exact name).
2. Recommended: portrait orientation, roughly **1000 × 1250 px** (4:5), under ~300 KB.
   The frame is an arch, and the image is cropped from the top, so keep your face in the upper half.
3. Refresh. Until the file exists, an "FN" monogram is shown instead — never a broken image.

To use a different filename, change `portrait` in `src/data/profile.ts`.

## Add project screenshots

Put images in `public/images/projects/` using these names:

| Project               | File                 |
| --------------------- | -------------------- |
| ResolveHub            | `resolvehub.jpg`     |
| CodeGenie AI          | `codegenie.jpg`      |
| LifeAura              | `lifeaura.jpg`       |
| Book Genre Classifier | `book-genre.jpg`     |

Use **16:10** screenshots (e.g. 1600 × 1000). ResolveHub's featured frame is wider (21:10) on desktop and
crops from the top. Until a file exists, a designed abstract preview is shown.

Only use screenshots you are allowed to share — no SCASYS internal screens or client data.

## Update your resume

Save the PDF as **`public/Fathima-Nasrin-Resume.pdf`**. The hero's **Download Resume** button appears
automatically once the file exists (it shows *Get in Touch* until then, so there is never a dead link).
To replace it later, just overwrite the file.

## Editing content

- **Project GitHub links** — each project currently links to your GitHub profile. Set `github` in
  `src/data/projects.ts` to the exact repository URL; the button label changes to *View Source*.
- **Live demos** — add `live: 'https://…'` to a project only when a real deployment exists; a
  *View Project* button appears.
- **LifeAura** — shown as a case study (platforms, donor-matching flow, AI features) from the
  `caseStudy` field in `src/data/projects.ts`. Replace the placeholder `contribution` (marked `TODO`)
  with your specific responsibilities.
- **Stats in About** are calculated from the data files (CGPA, internships, projects, certifications),
  so they stay accurate as you edit.
- **Colours / fonts** — change the tokens in `src/styles/index.css` under `@theme`.

## Deploy to Vercel

**Option A — through GitHub (recommended)**

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/fathnas589/portfolio.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, sign in with GitHub and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`). Click **Deploy**.
4. Every later `git push` redeploys automatically. Add a custom domain under *Project → Settings → Domains*.

**Option B — from the terminal**

```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

## Accessibility & performance notes

- Honours `prefers-reduced-motion` (Motion `reducedMotion="user"` + CSS fallbacks; the particle field renders a static frame).
- Custom cursor, magnetic buttons and card tilt only run on fine-pointer (mouse) devices.
- Particle canvas pauses when off-screen or when the tab is hidden.
- Skip link, semantic landmarks, labelled sections, visible focus rings.
