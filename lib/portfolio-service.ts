import { PrismaClient } from '@prisma/client';

export interface SkillItem {
  name: string;
  category: string;
  level: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string;
  challenges: string;
  improvements: string;
  link: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface PortfolioContent {
  name: string;
  title: string;
  heroSubtitle: string;
  bio: string;
  about: string;
  email: string;
  phone: string;
  whatsapp: string;
  resumeUrl: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  skills: SkillItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  sections: CustomSection[];
  contactHeading: string;
  footerText: string;
}

const defaultContent: PortfolioContent = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  heroSubtitle: 'I build fast, polished, and scalable digital products for modern businesses.',
  bio: 'I started my programming journey by building small personal projects and gradually moved into full-stack product development. I enjoy creating thoughtful interfaces, reliable APIs, and clean systems that help people work better.',
  about: 'I am a developer who enjoys turning ideas into reliable and elegant digital products. Outside of programming, I enjoy reading, fitness, and exploring new design ideas.',
  email: 'hello@yourdomain.com',
  phone: '+880123456789',
  whatsapp: '+880123456789',
  resumeUrl: '/resume.pdf',
  imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://twitter.com',
  skills: [
    { name: 'Next.js', category: 'Frontend', level: 'Advanced' },
    { name: 'Express.js', category: 'Backend', level: 'Advanced' },
    { name: 'Prisma', category: 'Database', level: 'Intermediate' },
    { name: 'PostgreSQL', category: 'Database', level: 'Intermediate' },
    { name: 'TypeScript', category: 'Language', level: 'Advanced' },
    { name: 'Tailwind CSS', category: 'UI', level: 'Advanced' },
  ],
  education: [
    { degree: 'B.Sc. in Computer Science', institution: 'Your University', year: '2020 - 2024', description: 'Focused on software engineering, web development, and human-computer interaction.' },
  ],
  experience: [
    { role: 'Frontend Developer', company: 'Example Studio', period: '2022 - Present', description: 'Built responsive web interfaces and collaborated on product design systems.' },
  ],
  projects: [
    { title: 'E-Commerce Platform', description: 'A scalable storefront built for modern retail experiences.', imageUrl: '', liveUrl: 'https://example.com', githubUrl: 'https://github.com', technologies: 'Next.js, Prisma, PostgreSQL', challenges: 'Needed to balance performance with a rich product experience.', improvements: 'Add admin analytics and payment integration.', link: '/projects/ecommerce' },
    { title: 'Analytics Dashboard', description: 'A data visualization app with actionable business insights.', imageUrl: '', liveUrl: 'https://example.com', githubUrl: 'https://github.com', technologies: 'React, Express, PostgreSQL', challenges: 'Complex data shaping for charts and filters.', improvements: 'Add real-time updates and export support.', link: '/projects/analytics' },
    { title: 'Task Collaboration Hub', description: 'A collaborative workspace for remote product teams.', imageUrl: '', liveUrl: 'https://example.com', githubUrl: 'https://github.com', technologies: 'Next.js, Node.js, Prisma', challenges: 'Maintaining real-time collaboration reliability.', improvements: 'Add notifications and file sharing.', link: '/projects/collab' },
  ],
  sections: [],
  contactHeading: 'Let’s build something meaningful together.',
  footerText: '© 2026 Your Name. Built with Next.js, Express, Prisma, and TypeScript.',
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

function normalizeContent(input: Partial<PortfolioContent> | null | undefined): PortfolioContent {
  return {
    ...defaultContent,
    ...input,
    skills: Array.isArray(input?.skills) ? input!.skills : defaultContent.skills,
    education: Array.isArray(input?.education) ? input!.education : defaultContent.education,
    experience: Array.isArray(input?.experience) ? input!.experience : defaultContent.experience,
    projects: Array.isArray(input?.projects) ? input!.projects : defaultContent.projects,
    sections: Array.isArray(input?.sections) ? input!.sections : defaultContent.sections,
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const record = await prisma.portfolioContent.findFirst({
      orderBy: { id: 'desc' },
    });

    if (record) {
      return normalizeContent(record as unknown as Partial<PortfolioContent>);
    }
  } catch (error) {
    console.error('Prisma portfolio read failed', error);
  }

  return defaultContent;
}

export async function savePortfolioContent(content: PortfolioContent): Promise<PortfolioContent> {
  const normalized = normalizeContent(content);

  try {
    const existing = await prisma.portfolioContent.findFirst({
      orderBy: { id: 'desc' },
    });

    if (existing) {
      await prisma.portfolioContent.update({
        where: { id: existing.id },
        data: {
          name: normalized.name,
          title: normalized.title,
          heroSubtitle: normalized.heroSubtitle,
          bio: normalized.bio,
          about: normalized.about,
          email: normalized.email,
          phone: normalized.phone,
          whatsapp: normalized.whatsapp,
          resumeUrl: normalized.resumeUrl,
          imageUrl: normalized.imageUrl,
          githubUrl: normalized.githubUrl,
          linkedinUrl: normalized.linkedinUrl,
          twitterUrl: normalized.twitterUrl,
          skills: normalized.skills as never,
          education: normalized.education as never,
          experience: normalized.experience as never,
          projects: normalized.projects as never,
          sections: normalized.sections as never,
          contactHeading: normalized.contactHeading,
          footerText: normalized.footerText,
        },
      });
    } else {
      await prisma.portfolioContent.create({
        data: {
          name: normalized.name,
          title: normalized.title,
          heroSubtitle: normalized.heroSubtitle,
          bio: normalized.bio,
          about: normalized.about,
          email: normalized.email,
          phone: normalized.phone,
          whatsapp: normalized.whatsapp,
          resumeUrl: normalized.resumeUrl,
          imageUrl: normalized.imageUrl,
          githubUrl: normalized.githubUrl,
          linkedinUrl: normalized.linkedinUrl,
          twitterUrl: normalized.twitterUrl,
          skills: normalized.skills as never,
          education: normalized.education as never,
          experience: normalized.experience as never,
          projects: normalized.projects as never,
          sections: normalized.sections as never,
          contactHeading: normalized.contactHeading,
          footerText: normalized.footerText,
        },
      });
    }
  } catch (error) {
    console.error('Prisma portfolio save failed', error);
  }

  return normalized;
}
