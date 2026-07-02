import Link from 'next/link';
import { getPortfolioContent } from '@/lib/portfolio-service';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getPortfolioContent();

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: '#111827' }}>
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{data.name}</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#about" style={{ color: '#111827', textDecoration: 'none' }}>About</a>
            <a href="#skills" style={{ color: '#111827', textDecoration: 'none' }}>Skills</a>
            <a href="#education" style={{ color: '#111827', textDecoration: 'none' }}>Education</a>
            <a href="#experience" style={{ color: '#111827', textDecoration: 'none' }}>Experience</a>
            <a href="#projects" style={{ color: '#111827', textDecoration: 'none' }}>Projects</a>
            <a href="#contact" style={{ color: '#111827', textDecoration: 'none' }}>Contact</a>
            <Link href="/admin" style={{ color: '#4f46e5', textDecoration: 'none' }}>Admin</Link>
          </div>
        </nav>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: '#4f46e5', fontWeight: 600 }}>{data.title}</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0.5rem 0' }}>{data.name}</h1>
            <p style={{ fontSize: '1.05rem', color: '#4b5563', maxWidth: '650px' }}>{data.heroSubtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a href={data.resumeUrl} style={{ background: '#4f46e5', color: 'white', padding: '0.8rem 1.2rem', borderRadius: '999px', textDecoration: 'none' }}>Download Resume</a>
              <a href="#projects" style={{ border: '1px solid #d1d5db', color: '#111827', padding: '0.8rem 1.2rem', borderRadius: '999px', textDecoration: 'none' }}>View Projects</a>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
              <a href={data.githubUrl} style={{ color: '#4f46e5', textDecoration: 'none' }}>GitHub</a>
              <a href={data.linkedinUrl} style={{ color: '#4f46e5', textDecoration: 'none' }}>LinkedIn</a>
              <a href={data.twitterUrl} style={{ color: '#4f46e5', textDecoration: 'none' }}>Twitter</a>
            </div>
          </div>
          <div style={{ background: '#eef2ff', borderRadius: '1.5rem', padding: '2rem', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#4338ca' }}>
            <img src={data.imageUrl} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
          </div>
        </section>
      </section>

      <section id="about" style={{ background: '#f9fafb', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Me</h2>
          <p style={{ maxWidth: '800px', color: '#4b5563' }}>{data.about}</p>
          <p style={{ maxWidth: '800px', color: '#4b5563', marginTop: '1rem' }}>{data.bio}</p>
        </div>
      </section>

      <section id="skills" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {data.skills.map((skill) => (
            <div key={skill.name} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '1rem', background: '#fff' }}>
              <strong>{skill.name}</strong>
              <div style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '0.35rem' }}>{skill.category} • {skill.level}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Education</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {data.education.map((item) => (
            <div key={item.degree} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.25rem', background: '#fff' }}>
              <h3 style={{ margin: 0 }}>{item.degree}</h3>
              <p style={{ margin: '0.25rem 0', color: '#4f46e5' }}>{item.institution} • {item.year}</p>
              <p style={{ color: '#4b5563', marginBottom: 0 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Experience</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {data.experience.map((item) => (
            <div key={item.role} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.25rem', background: '#fff' }}>
              <h3 style={{ margin: 0 }}>{item.role}</h3>
              <p style={{ margin: '0.25rem 0', color: '#4f46e5' }}>{item.company} • {item.period}</p>
              <p style={{ color: '#4b5563', marginBottom: 0 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {data.projects.map((project) => (
            <div key={project.title} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.25rem', background: '#fff' }}>
              <h3 style={{ marginTop: 0 }}>{project.title}</h3>
              <p style={{ color: '#4b5563' }}>{project.description}</p>
              <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{project.technologies}</p>
              <Link href={project.link} style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>View More</Link>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{data.contactHeading}</h2>
        <p style={{ color: '#4b5563' }}>Email: {data.email}</p>
        <p style={{ color: '#4b5563' }}>Phone: {data.phone}</p>
        <p style={{ color: '#4b5563' }}>WhatsApp: {data.whatsapp}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href={data.githubUrl} style={{ color: '#4f46e5', textDecoration: 'none' }}>GitHub</a>
          <a href={data.linkedinUrl} style={{ color: '#4f46e5', textDecoration: 'none' }}>LinkedIn</a>
          <a href={data.twitterUrl} style={{ color: '#4f46e5', textDecoration: 'none' }}>Twitter</a>
        </div>
      </section>

      <footer style={{ padding: '2rem 1.5rem', background: '#f9fafb', textAlign: 'center', color: '#6b7280' }}>{data.footerText}</footer>
    </main>
  );
}
