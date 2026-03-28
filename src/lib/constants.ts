// ─── LUMA CAPTURES ───────────────────────────────────────────────────────────
// TODO: replace with João's own Luma capture URLs
export const LUMA_CAPTURES = {
  hero: 'https://lumalabs.ai/capture/da82625c-9c8d-4d05-a9f7-3367ecab438c',
  // add more as needed
}

// ─── COLORS ──────────────────────────────────────────────────────────────────
export const COLORS = {
  bg: '#05010f',
  surface: '#0d0720',
  border: '#2a1f4a',
  purpleCore: '#7B2FFF',
  purpleGlow: '#9D5CFF',
  cyanAccent: '#00FFD1',
  pinkAccent: '#FF2D78',
  textPrimary: '#F0EAFF',
  textMuted: '#6B5FA0',
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  link?: string
  year: string
}

export const PROJECTS: Project[] = [
  {
    id: 'rift',
    name: 'Rift',
    description: 'Gamified training app inspired by Solo Leveling. AI reads your personal trainer sheet and tracks your progress. Connect with Apple Health, form guilds, compete on leaderboards, and share daily workout photos with your crew.',
    tags: ['React Native', 'Health API', 'Claude AI', 'TypeScript', 'Gamification'],
    link: 'https://github.com/jpazv/SoloTraining',
    year: '2025',
  },
  {
    id: 'inkdesk',
    name: 'InkDesk',
    description: 'SaaS platform for tattoo artists. WhatsApp automation, intelligent scheduling, and client management. Reduces no-shows by 60%.',
    tags: ['Next.js', 'Supabase', 'WhatsApp API', 'Evolution API', 'TypeScript'],
    year: '2025',
  },
  {
    id: 'pixel-news',
    name: 'Pixel News',
    description: 'Geek news portal with autonomous content ingestion. Auto-aggregates Reddit, HackerNews, and RSS feeds with AI curation.',
    tags: ['Next.js', 'Prisma', 'Supabase', 'AI Pipeline', 'TypeScript'],
    link: '#',
    year: '2025',
  },
  {
    id: 'pixel-researches',
    name: 'Pixel Researches',
    description: 'Science & tech Instagram page powered by an autonomous AI content pipeline. Automated research, writing, and publishing.',
    tags: ['Claude AI', 'n8n', 'Python', 'Instagram API', 'Agents'],
    link: 'https://github.com/jpazv/pixel-news',
    year: '2024',
  },
]

// ─── TECH STACK ───────────────────────────────────────────────────────────────
export interface TechItem {
  name: string
  tooltip: string
  color: string
}

export interface TechGroup {
  label: string
  items: TechItem[]
}

export const STACK: TechGroup[] = [
  {
    label: 'FRONTEND',
    items: [
      { name: 'Next.js', tooltip: 'App Router, RSC, edge functions — production-grade frontend.', color: '#F0EAFF' },
      { name: 'React', tooltip: 'Component architecture, hooks, concurrent features.', color: '#61DAFB' },
      { name: 'TypeScript', tooltip: 'End-to-end type safety across full stack.', color: '#3178C6' },
      { name: 'Tailwind CSS', tooltip: 'Rapid, design-system-grade styling with custom tokens.', color: '#38BDF8' },
      { name: 'Framer Motion', tooltip: 'Physics-based animations and gesture-driven UIs.', color: '#FF0055' },
      { name: 'Three.js / R3F', tooltip: '3D scenes, particle systems, and WebGL experiences.', color: '#00FFD1' },
    ],
  },
  {
    label: 'AGENTS',
    items: [
      { name: 'Claude AI', tooltip: 'Primary LLM for agent reasoning and content generation.', color: '#CC785C' },
      { name: 'Claude Code', tooltip: 'Agentic coding workflows and autonomous development.', color: '#7B2FFF' },
      { name: 'n8n', tooltip: 'Workflow orchestration for multi-agent pipelines.', color: '#EA4B71' },
      { name: 'LangChain', tooltip: 'Agent tooling, RAG pipelines, and LLM chaining.', color: '#1C3C3C' },
    ],
  },
  {
    label: 'BACKEND',
    items: [
      { name: 'Supabase', tooltip: 'PostgreSQL, realtime, auth, and storage as a unified platform.', color: '#3ECF8E' },
      { name: 'Prisma', tooltip: 'Type-safe ORM for complex data modeling.', color: '#5A67D8' },
      { name: 'Node.js', tooltip: 'Server-side JS for APIs and automation scripts.', color: '#68A063' },
    ],
  },
  {
    label: 'TOOLS',
    items: [
      { name: 'React Native', tooltip: 'Cross-platform mobile apps with native performance.', color: '#61DAFB' },
      { name: 'Vercel', tooltip: 'Zero-config deploys with edge network and analytics.', color: '#F0EAFF' },
      { name: 'Git / GitHub', tooltip: 'Version control and collaborative dev workflows.', color: '#F05032' },
    ],
  },
]

// ─── NAV LINKS ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
]

// ─── STATS ───────────────────────────────────────────────────────────────────
export const STATS = [
  { value: '5+', label: 'years' },
  { value: 'AI', label: 'agents' },
  { value: 'Full', label: 'stack' },
  { value: '10+', label: 'products' },
]
