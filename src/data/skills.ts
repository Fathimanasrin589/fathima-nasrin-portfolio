import type { LucideIcon } from 'lucide-react'
import { BrainCircuit, Database, Layout, Server, Wrench } from 'lucide-react'

export interface SkillGroup {
  id: string
  title: string
  blurb: string
  icon: LucideIcon
  /** Accent used for the cluster glow — keep to the theme's violet / cyan family. */
  accent: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'Services, APIs and business logic — my day-to-day focus.',
    icon: Server,
    accent: '#8b5cf6',
    skills: ['C#', '.NET', 'ASP.NET Core', 'REST APIs', 'API Integration'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces that make complex workflows feel simple.',
    icon: Layout,
    accent: '#6ee7f2',
    skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'data',
    title: 'Databases',
    blurb: 'Relational and document data modelling and querying.',
    icon: Database,
    accent: '#a78bfa',
    skills: ['SQL Server', 'MySQL', 'MongoDB'],
  },
  {
    id: 'ai',
    title: 'AI & ML',
    blurb: 'Bringing language models and ML into practical products.',
    icon: BrainCircuit,
    accent: '#c084fc',
    skills: [
      'Python',
      'Generative AI',
      'LLM Integration',
      'NLP',
      'Prompt Engineering',
      'Machine Learning Fundamentals',
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'The workbench behind shipping and testing.',
    icon: Wrench,
    accent: '#67e8f9',
    skills: ['Git', 'GitHub', 'Postman', 'Swagger', 'Visual Studio', 'VS Code', 'SSMS'],
  },
]
