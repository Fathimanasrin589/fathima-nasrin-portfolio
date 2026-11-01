export interface ExperienceItem {
  company: string
  role: string
  period: string
  type: 'Full-time' | 'Internship'
  summary: string
  points: string[]
  tags: string[]
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    company: 'SCASYS',
    role: 'Junior Software Developer',
    period: '2026 — Present',
    type: 'Full-time',
    current: true,
    summary:
      'Building and maintaining enterprise applications at Infopark, Koratty — mostly on the .NET backend, with frontend work in Angular and React.',
    points: [
      'Develop .NET backend features and REST APIs, and test them end to end with Postman and Swagger.',
      'Write and maintain SQL Server queries and database operations behind enterprise workflows.',
      'Contribute to Procqur, the company’s enterprise product, and to backend work for AI-powered applications.',
      'Work across Angular and React frontends and learn ERP concepts and enterprise process flows.',
    ],
    tags: ['C#', '.NET', 'REST APIs', 'SQL Server', 'Angular', 'React'],
  },
  {
    company: 'Infosys Springboard',
    role: 'AI Developer Intern',
    period: 'Sep 2025 — Dec 2025',
    type: 'Internship',
    summary: 'Built AI chatbot applications on top of locally hosted large language models.',
    points: [
      'Developed chatbot interfaces in Python and Streamlit.',
      'Integrated local LLMs and designed prompt-based workflows.',
    ],
    tags: ['Python', 'Streamlit', 'Local LLMs', 'Prompt Engineering'],
  },
  {
    company: 'ICT Academy of Kerala',
    role: 'Full Stack MERN Intern',
    period: 'Jun 2025',
    type: 'Internship',
    summary: 'Hands-on training in full-stack JavaScript development with the MERN stack.',
    points: ['Worked with MongoDB, Express, React and Node.js to build full-stack web applications.'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    company: 'Pacelab',
    role: 'Python & AI Intern',
    period: 'Jan 2024',
    type: 'Internship',
    summary: 'Early, practical exposure to Python programming and AI fundamentals.',
    points: ['Applied Python to introductory AI and machine learning exercises.'],
    tags: ['Python', 'AI Fundamentals'],
  },
]
