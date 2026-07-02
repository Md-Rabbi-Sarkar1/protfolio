import { savePortfolioContent } from '../lib/portfolio-service';

async function main() {
  const content = await savePortfolioContent({
    name: 'Demo Name',
    title: 'Demo Title',
    heroSubtitle: 'Demo hero',
    bio: 'Demo bio',
    about: 'Demo about',
    email: 'demo@example.com',
    phone: '+8800000000',
    whatsapp: '+8800000000',
    resumeUrl: '/resume.pdf',
    imageUrl: 'https://example.com/photo.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    skills: [{ name: 'Next.js', category: 'Frontend', level: 'Advanced' }],
    education: [{ degree: 'BSc', institution: 'Demo University', year: '2024', description: 'Demo' }],
    experience: [{ role: 'Developer', company: 'Demo', period: '2024', description: 'Demo' }],
    projects: [{ title: 'Demo Project', description: 'Demo', imageUrl: '', liveUrl: '', githubUrl: '', technologies: 'Next.js', challenges: '', improvements: '', link: '/projects/demo' }],
    contactHeading: 'Contact',
    footerText: 'Footer',
  });

  console.log(JSON.stringify(content));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
