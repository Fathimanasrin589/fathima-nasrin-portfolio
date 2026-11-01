export const education = {
  degree: 'B.Tech in Computer Science and Engineering',
  institution: 'Vidya Academy of Science and Technology',
  location: 'Thrissur, Kerala',
  period: '2022 — 2026',
  cgpa: 9.2,
  cgpaScale: 10,
}

export interface Certification {
  title: string
  issuer: string
}

export const certifications: Certification[] = [
  { title: 'Machine Learning & AI Foundations', issuer: 'Infosys Springboard' },
  { title: 'Essential Mathematics for Machine Learning', issuer: 'NPTEL' },
  { title: 'SQL Programming Fundamentals', issuer: 'Oracle Academy' },
  { title: 'Python & Django Framework', issuer: 'Govt. Rutronix' },
  { title: 'Java, Python & LaTeX Training', issuer: 'IIT Bombay Spoken Tutorial' },
  { title: 'Technical Architecture Job Simulation', issuer: 'Deloitte · Forage' },
]

export const leadership = [
  { title: 'NSS Unit Coordinator', detail: 'National Service Scheme' },
  { title: 'Arts College Vice Captain', detail: 'Student leadership' },
  { title: 'IEDC & Technical Events', detail: 'Innovation and technical event participation' },
  { title: 'Arabic Literary Awards', detail: 'Prizes in Arabic literary competitions' },
]
