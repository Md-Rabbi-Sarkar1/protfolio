"use client";

import { useEffect, useState } from 'react';
import type { PortfolioContent } from '@/lib/portfolio-service';

const emptySkill = { name: '', category: '', level: '' };
const emptyEducation = { degree: '', institution: '', year: '', description: '' };
const emptyExperience = { role: '', company: '', period: '', description: '' };
const emptyProject = { title: '', description: '', imageUrl: '', liveUrl: '', githubUrl: '', technologies: '', challenges: '', improvements: '', link: '' };

const slugify = (value: string, fallback: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return slug || fallback;
};

export default function AdminPage() {
  const [form, setForm] = useState<PortfolioContent | null>(null);
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const savedPassword = window.localStorage.getItem('portfolio-admin-password');
    if (savedPassword) {
      setPassword(savedPassword);
      verifyPassword(savedPassword);
      return;
    }

    setIsCheckingAuth(false);
  }, []);

  const verifyPassword = async (value: string) => {
    setIsCheckingAuth(true);
    const response = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: value }),
    });

    if (response.ok) {
      window.localStorage.setItem('portfolio-admin-password', value);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setStatus('Access denied. Use the correct admin password.');
    }

    setIsCheckingAuth(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyPassword(password);
  };

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch(() => setStatus('Unable to load portfolio data.'));
  }, []);

  if (isCheckingAuth) {
    return <div style={{ padding: '2rem' }}>Checking access...</div>;
  }

  if (!isAuthenticated) {
    return (
      <main style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 1.25rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Admin Access</h1>
        <p>Enter the admin password to edit this portfolio.</p>
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Access Admin</button>
        </form>
        {status ? <p style={{ marginTop: '1rem', color: '#ef4444' }}>{status}</p> : null}
      </main>
    );
  }

  if (!form) {
    return <div style={{ padding: '2rem' }}>Loading admin panel...</div>;
  }

  const updateField = (field: keyof PortfolioContent, value: string) => {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const updateSkill = (index: number, field: 'name' | 'category' | 'level', value: string) => {
    const skills = [...form.skills];
    skills[index] = { ...skills[index], [field]: value };
    setForm((prev) => prev ? { ...prev, skills } : prev);
  };

  const addSkill = () => {
    setForm((prev) => prev ? { ...prev, skills: [...prev.skills, { ...emptySkill }] } : prev);
  };

  const removeSkill = (index: number) => {
    const skills = form.skills.filter((_, i) => i !== index);
    setForm((prev) => prev ? { ...prev, skills } : prev);
  };

  const updateEducation = (index: number, field: 'degree' | 'institution' | 'year' | 'description', value: string) => {
    const education = [...form.education];
    education[index] = { ...education[index], [field]: value };
    setForm((prev) => prev ? { ...prev, education } : prev);
  };

  const addEducation = () => {
    setForm((prev) => prev ? { ...prev, education: [...prev.education, { ...emptyEducation }] } : prev);
  };

  const removeEducation = (index: number) => {
    const education = form.education.filter((_, i) => i !== index);
    setForm((prev) => prev ? { ...prev, education } : prev);
  };

  const updateExperience = (index: number, field: 'role' | 'company' | 'period' | 'description', value: string) => {
    const experience = [...form.experience];
    experience[index] = { ...experience[index], [field]: value };
    setForm((prev) => prev ? { ...prev, experience } : prev);
  };

  const addExperience = () => {
    setForm((prev) => prev ? { ...prev, experience: [...prev.experience, { ...emptyExperience }] } : prev);
  };

  const removeExperience = (index: number) => {
    const experience = form.experience.filter((_, i) => i !== index);
    setForm((prev) => prev ? { ...prev, experience } : prev);
  };

  const updateProject = (index: number, field: keyof typeof emptyProject, value: string) => {
    const projects = [...form.projects];
    projects[index] = { ...projects[index], [field]: value };
    setForm((prev) => prev ? { ...prev, projects } : prev);
  };

  const addProject = () => {
    setForm((prev) => prev ? { ...prev, projects: [...prev.projects, { ...emptyProject }] } : prev);
  };

  const removeProject = (index: number) => {
    const projects = form.projects.filter((_, i) => i !== index);
    setForm((prev) => prev ? { ...prev, projects } : prev);
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const sections = [...form.sections];
    const current = sections[index];
    sections[index] = {
      ...current,
      [field]: value,
      ...(field === 'title' ? { id: slugify(value, current.id || `section-${index + 1}`) } : {}),
    };
    setForm((prev) => prev ? { ...prev, sections } : prev);
  };

  const addSection = () => {
    setForm((prev) => prev ? {
      ...prev,
      sections: [...prev.sections, { id: slugify('', `section-${prev.sections.length + 1}`), title: '', content: '' }],
    } : prev);
  };

  const removeSection = (index: number) => {
    const sections = form.sections.filter((_, i) => i !== index);
    setForm((prev) => prev ? { ...prev, sections } : prev);
  };

  const save = async () => {
    setStatus('Saving...');
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setStatus('Saved successfully.');
    } else {
      setStatus('Failed to save.');
    }
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.25rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Customize each section and subsection of your portfolio here.</p>
      <p style={{ color: '#4f46e5' }}>{status}</p>
      <button
        onClick={() => {
          window.localStorage.removeItem('portfolio-admin-password');
          setPassword('');
          setIsAuthenticated(false);
          setStatus('Logged out.');
        }}
        style={{ ...dangerButtonStyle, marginTop: '0.75rem' }}
      >
        Logout
      </button>

      <section style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
        <label>Name<input value={form.name} onChange={(e) => updateField('name', e.target.value)} style={inputStyle} /></label>
        <label>Professional Title<input value={form.title} onChange={(e) => updateField('title', e.target.value)} style={inputStyle} /></label>
        <label>Hero Subtitle<textarea value={form.heroSubtitle} onChange={(e) => updateField('heroSubtitle', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} /></label>
        <label>About Me<textarea value={form.about} onChange={(e) => updateField('about', e.target.value)} style={{ ...inputStyle, minHeight: '100px' }} /></label>
        <label>Programming Journey / Bio<textarea value={form.bio} onChange={(e) => updateField('bio', e.target.value)} style={{ ...inputStyle, minHeight: '100px' }} /></label>
        <label>Email<input value={form.email} onChange={(e) => updateField('email', e.target.value)} style={inputStyle} /></label>
        <label>Phone<input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} style={inputStyle} /></label>
        <label>WhatsApp<input value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} style={inputStyle} /></label>
        <label>Resume URL<input value={form.resumeUrl} onChange={(e) => updateField('resumeUrl', e.target.value)} style={inputStyle} /></label>
        <label>Profile Image URL<input value={form.imageUrl} onChange={(e) => updateField('imageUrl', e.target.value)} style={inputStyle} /></label>
        <label>GitHub URL<input value={form.githubUrl} onChange={(e) => updateField('githubUrl', e.target.value)} style={inputStyle} /></label>
        <label>LinkedIn URL<input value={form.linkedinUrl} onChange={(e) => updateField('linkedinUrl', e.target.value)} style={inputStyle} /></label>
        <label>Twitter URL<input value={form.twitterUrl} onChange={(e) => updateField('twitterUrl', e.target.value)} style={inputStyle} /></label>
        <label>Contact Heading<input value={form.contactHeading} onChange={(e) => updateField('contactHeading', e.target.value)} style={inputStyle} /></label>
        <label>Footer Text<input value={form.footerText} onChange={(e) => updateField('footerText', e.target.value)} style={inputStyle} /></label>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Skills</h2>
        {form.skills.map((skill, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Skill #{index + 1}</strong>
              <button onClick={() => removeSkill(index)} style={dangerButtonStyle}>Remove</button>
            </div>
            <input value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Skill name" />
            <input value={skill.category} onChange={(e) => updateSkill(index, 'category', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Category" />
            <input value={skill.level} onChange={(e) => updateSkill(index, 'level', e.target.value)} style={inputStyle} placeholder="Level" />
          </div>
        ))}
        <button onClick={addSkill} style={buttonStyle}>Add Skill</button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Education</h2>
        {form.education.map((item, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Education #{index + 1}</strong>
              <button onClick={() => removeEducation(index)} style={dangerButtonStyle}>Remove</button>
            </div>
            <input value={item.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Degree" />
            <input value={item.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Institution" />
            <input value={item.year} onChange={(e) => updateEducation(index, 'year', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Year" />
            <textarea value={item.description} onChange={(e) => updateEducation(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} placeholder="Description" />
          </div>
        ))}
        <button onClick={addEducation} style={buttonStyle}>Add Education</button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Experience</h2>
        {form.experience.map((item, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Experience #{index + 1}</strong>
              <button onClick={() => removeExperience(index)} style={dangerButtonStyle}>Remove</button>
            </div>
            <input value={item.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Role" />
            <input value={item.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Company" />
            <input value={item.period} onChange={(e) => updateExperience(index, 'period', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Period" />
            <textarea value={item.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} placeholder="Description" />
          </div>
        ))}
        <button onClick={addExperience} style={buttonStyle}>Add Experience</button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Custom Sections</h2>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Add sections like Services, Testimonials, Clients, or anything else here. They will appear on the homepage and in the navbar automatically.</p>
        {form.sections.map((section, index) => (
          <div key={section.id || index} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Section #{index + 1}</strong>
              <button onClick={() => removeSection(index)} style={dangerButtonStyle}>Remove</button>
            </div>
            <input value={section.title} onChange={(e) => updateSection(index, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Section title" />
            <textarea value={section.content} onChange={(e) => updateSection(index, 'content', e.target.value)} style={{ ...inputStyle, minHeight: '100px' }} placeholder="Section content" />
          </div>
        ))}
        <button onClick={addSection} style={buttonStyle}>Add Custom Section</button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Projects</h2>
        {form.projects.map((project, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Project #{index + 1}</strong>
              <button onClick={() => removeProject(index)} style={dangerButtonStyle}>Remove</button>
            </div>
            <input value={project.title} onChange={(e) => updateProject(index, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Project title" />
            <textarea value={project.description} onChange={(e) => updateProject(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px', marginBottom: '0.75rem' }} placeholder="Description" />
            <input value={project.imageUrl} onChange={(e) => updateProject(index, 'imageUrl', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Image URL" />
            <input value={project.liveUrl} onChange={(e) => updateProject(index, 'liveUrl', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Live URL" />
            <input value={project.githubUrl} onChange={(e) => updateProject(index, 'githubUrl', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="GitHub URL" />
            <input value={project.technologies} onChange={(e) => updateProject(index, 'technologies', e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }} placeholder="Technologies" />
            <textarea value={project.challenges} onChange={(e) => updateProject(index, 'challenges', e.target.value)} style={{ ...inputStyle, minHeight: '80px', marginBottom: '0.75rem' }} placeholder="Challenges" />
            <textarea value={project.improvements} onChange={(e) => updateProject(index, 'improvements', e.target.value)} style={{ ...inputStyle, minHeight: '80px', marginBottom: '0.75rem' }} placeholder="Future improvements" />
            <input value={project.link} onChange={(e) => updateProject(index, 'link', e.target.value)} style={inputStyle} placeholder="/projects/slug" />
          </div>
        ))}
        <button onClick={addProject} style={buttonStyle}>Add Project</button>
      </section>

      <button onClick={save} style={{ ...buttonStyle, marginTop: '2rem' }}>Save Changes</button>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '0.75rem',
  border: '1px solid #d1d5db',
  display: 'block',
  marginTop: '0.35rem',
  boxSizing: 'border-box' as const,
};

const buttonStyle: React.CSSProperties = {
  padding: '0.8rem 1rem',
  borderRadius: '0.75rem',
  border: 'none',
  background: '#4f46e5',
  color: 'white',
  cursor: 'pointer',
};

const dangerButtonStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderRadius: '0.6rem',
  border: 'none',
  background: '#ef4444',
  color: 'white',
  cursor: 'pointer',
};
