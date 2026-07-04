import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioContent } from '@/lib/portfolio-service';

export const dynamic = 'force-dynamic';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const data = await getPortfolioContent();
  const project = data.projects.find((item) => {
    const slugFromLink = item.link
      ?.replace(/^\/+/, '')
      .split('/')
      .filter(Boolean)
      .pop();

    return slugify(item.title) === params.slug || slugFromLink === params.slug;
  });

  if (!project) {
    notFound();
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'Arial, sans-serif' }}>
      <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>← Back to home</Link>

      <h1 style={{ fontSize: '2rem', marginTop: '1rem' }}>{project.title}</h1>
      <p style={{ color: '#4b5563', fontSize: '1.05rem', marginTop: '0.75rem' }}>{project.description}</p>

      {project.imageUrl ? (
        <img src={project.imageUrl} alt={project.title} style={{ width: '100%', borderRadius: '1rem', marginTop: '1.5rem', objectFit: 'cover', maxHeight: '320px' }} />
      ) : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#4f46e5', fontWeight: 600 }}>Live Demo</a>
        ) : null}
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#4f46e5', fontWeight: 600 }}>GitHub</a>
        ) : null}
      </div>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Tech Stack</h2>
        <p style={{ color: '#4b5563', whiteSpace: 'pre-wrap' }}>{project.technologies || 'Not provided yet.'}</p>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Challenges</h2>
        <p style={{ color: '#4b5563', whiteSpace: 'pre-wrap' }}>{project.challenges || 'Not provided yet.'}</p>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Future Improvements</h2>
        <p style={{ color: '#4b5563', whiteSpace: 'pre-wrap' }}>{project.improvements || 'Not provided yet.'}</p>
      </section>
    </main>
  );
}
