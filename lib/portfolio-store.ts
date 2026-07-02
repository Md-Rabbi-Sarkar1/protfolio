import fs from 'fs';
import path from 'path';

export type PortfolioProject = {
  title: string;
  description: string;
  link: string;
};

export type PortfolioData = {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  skills: string[];
  projects: PortfolioProject[];
};

export const defaultPortfolioData: PortfolioData = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  bio: 'I build modern, scalable web experiences with a strong focus on usability and reliability.',
  email: 'hello@yourdomain.com',
  phone: '+880123456789',
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  skills: ['Next.js', 'Express.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A scalable storefront built for modern retail experiences.',
      link: '/projects/ecommerce',
    },
    {
      title: 'Analytics Dashboard',
      description: 'A data visualization app with actionable business insights.',
      link: '/projects/analytics',
    },
    {
      title: 'Task Collaboration Hub',
      description: 'A collaborative workspace for remote product teams.',
      link: '/projects/collab',
    },
  ],
};

const storagePath = path.join(process.cwd(), 'data', 'portfolio.json');

function ensureStorageFile() {
  const dir = path.dirname(storagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(storagePath)) {
    fs.writeFileSync(storagePath, JSON.stringify(defaultPortfolioData, null, 2));
  }
}

export function loadPortfolioData(): PortfolioData {
  ensureStorageFile();

  try {
    const raw = fs.readFileSync(storagePath, 'utf8');
    const parsed = JSON.parse(raw) as PortfolioData;

    return {
      ...defaultPortfolioData,
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : defaultPortfolioData.skills,
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultPortfolioData.projects,
    };
  } catch {
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): PortfolioData {
  ensureStorageFile();
  const normalized: PortfolioData = {
    ...defaultPortfolioData,
    ...data,
    skills: Array.isArray(data.skills) ? data.skills : defaultPortfolioData.skills,
    projects: Array.isArray(data.projects) ? data.projects : defaultPortfolioData.projects,
  };

  fs.writeFileSync(storagePath, JSON.stringify(normalized, null, 2));
  return normalized;
}
