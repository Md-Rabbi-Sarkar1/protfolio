import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'Arial, sans-serif' }}>
      <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>← Back to home</Link>
      <h1 style={{ fontSize: '2rem', marginTop: '1rem' }}>Project: {params.slug}</h1>
      <p style={{ color: '#4b5563' }}>
        This page is ready for your real project details, tech stack, live link, GitHub link, challenges, and future improvements.
      </p>
    </main>
  );
}
