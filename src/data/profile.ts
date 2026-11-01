export const profile = {
  name: 'Fathima Nasrin',
  fullName: 'Fathima Nasrin T N',
  initials: 'FN',
  roles: ['Software Developer', 'Full-Stack Developer', 'AI Developer'],
  currentRole: 'Junior Software Developer',
  company: 'SCASYS',
  companyLocation: 'Infopark, Koratty',
  location: 'Thrissur, Kerala, India',
  intro:
    "I'm Fathima Nasrin — a software developer passionate about building scalable applications, intelligent solutions, and meaningful digital experiences.",
  email: 'nasrinvast@gmail.com',
  linkedin: 'https://linkedin.com/in/fthima-nasrin-8a3420291',
  github: 'https://github.com/fathnas589',
  /** Drop the files at these paths inside /public to replace them. */
  portrait: '/images/fathima-nasrin.jpg',
  resume: '/Fathima-Nasrin-Resume.pdf',
} as const

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id']
