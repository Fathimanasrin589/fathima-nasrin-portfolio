import { profile } from './profile'

/** Extra content for projects shown as a full case study (currently LifeAura). */
export interface CaseStudy {
  /** Platforms shown as separate module tiles. */
  platforms: { name: string; kind: string; icon: 'app' | 'hospital' | 'organisation' | 'bloodbank' }[]
  /** Steps of the blood donor matching workflow, in order. */
  donorFlow: string[]
  aiFeatures: { title: string; text: string }[]
  otherFeatures: string[]
}

export interface Project {
  id: string
  index: string
  title: string
  tagline: string
  category: string
  problem: string
  built: string
  contribution: string
  features: string[]
  stack: string[]
  /**
   * Screenshot inside /public/images/projects. If the file is missing, a styled
   * preview is rendered instead — no broken images.
   */
  image: string
  github?: string
  /** Only set this when a real, public deployment exists. */
  live?: string
  /** Previous project name, shown as a small note. */
  formerly?: string
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    id: 'resolvehub',
    index: '01',
    title: 'ResolveHub',
    tagline: 'Enterprise ticket management system',
    category: 'Full-Stack · Enterprise',
    problem:
      'Support requests in an organisation get lost across email threads and chats, with no ownership, no priority and no way to tell when a response is overdue.',
    built:
      'A full-stack ticketing platform with a .NET REST API and an Angular client on SQL Server. Tickets are routed through departments, categories and subcategories, and SLA rules track response deadlines.',
    contribution:
      'Built the application end to end — the SQL Server data model, the .NET REST API with authentication, and the Angular interface with search, filtering and pagination.',
    features: [
      'Authentication & user management',
      'Departments, categories & subcategories',
      'Ticket lifecycle management',
      'SLA management',
      'Search, filtering & pagination',
      'Notifications',
      'Responsive UI',
    ],
    stack: ['.NET', 'C#', 'Angular', 'SQL Server', 'REST APIs'],
    image: '/images/projects/resolvehub.jpg',
    github: profile.github,
  },
  {
    id: 'lifeaura',
    index: '02',
    title: 'LifeAura',
    tagline: 'AI-enabled healthcare & blood donation ecosystem',
    category: 'AI · Healthcare · Multi-platform',
    formerly: 'Expertease AI',
    problem:
      'Finding a suitable blood donor in time depends on scattered calls and messages, while users, hospitals, organisations and blood banks work in separate systems.',
    built:
      'A connected, multi-module ecosystem: a Flutter app for users, management modules for hospitals, organisations and blood banks, a blood donation and donor matching system, and AI-powered healthcare assistance.',
    // TODO: replace with your specific responsibilities across the modules.
    contribution: 'Designed and developed the LifeAura ecosystem across its modules.',
    features: [],
    stack: ['Flutter', 'Python', 'FastAPI', 'Gemini API', 'OCR', 'BERT', 'Node.js', 'Express', 'MySQL'],
    image: '/images/projects/lifeaura.jpg',
    github: profile.github,
    caseStudy: {
      platforms: [
        { name: 'User App', kind: 'Flutter mobile app', icon: 'app' },
        { name: 'Hospital', kind: 'Management module', icon: 'hospital' },
        { name: 'Organisation', kind: 'Management module', icon: 'organisation' },
        { name: 'Blood Bank', kind: 'Management module', icon: 'bloodbank' },
      ],
      donorFlow: [
        'Blood request raised',
        'Broadcast to donors',
        'Suitable donors matched',
        'Donor chat & coordination',
        'Donation managed',
      ],
      aiFeatures: [
        { title: 'Health score', text: 'Upload health vitals and generate a health score.' },
        { title: 'AI healthcare chatbot', text: 'Conversational healthcare assistance powered by Gemini.' },
        { title: 'Prescription OCR', text: 'Read prescriptions with OCR and set medicine reminders.' },
      ],
      otherFeatures: ['Healthcare events & calendar', 'Donation management'],
    },
  },
  {
    id: 'codegenie',
    index: '03',
    title: 'CodeGenie AI',
    tagline: 'AI coding assistant running on a local LLM',
    category: 'AI · Developer Tools',
    problem:
      'Cloud coding assistants send source code to third-party servers, and they cannot read code that only exists as screenshots or scanned documents.',
    built:
      'A Streamlit assistant backed by a locally hosted LLM through Ollama, with an OCR pipeline that extracts text from images and documents so they can be used as context.',
    contribution:
      'Built the Streamlit interface, the Ollama integration, the OCR extraction flow and the prompt handling that keeps responses context-aware.',
    features: [
      'AI-powered coding assistance',
      'Local LLM integration via Ollama',
      'OCR-based document understanding',
      'Context-aware responses',
    ],
    stack: ['Python', 'Streamlit', 'Ollama', 'LLM', 'OCR'],
    image: '/images/projects/codegenie.jpg',
    github: profile.github,
  },
  {
    id: 'genre',
    index: '04',
    title: 'Book Genre Classifier',
    tagline: 'NLP engine that predicts a book’s genre from its text',
    category: 'Machine Learning · NLP',
    problem: 'Categorising books by hand is slow and inconsistent across large catalogues.',
    built:
      'A supervised classification pipeline: text preprocessing, feature extraction and a trained Scikit-learn model that predicts the genre of a book from its description.',
    contribution: 'Built the full pipeline — data cleaning, vectorisation, model training and prediction.',
    features: ['Text preprocessing', 'Feature extraction', 'Model training', 'Genre prediction'],
    stack: ['Python', 'NLP', 'Scikit-learn'],
    image: '/images/projects/book-genre.jpg',
    github: profile.github,
  },
]
