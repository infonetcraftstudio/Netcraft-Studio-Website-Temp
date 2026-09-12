import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight, ArrowRight, Search, X, ExternalLink, Calendar, User, Tag, Sparkles } from 'lucide-react';

export default function Projects() {
  const { projects } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Digital Products', 'AI & Emerging Tech', 'Web Development', 'Mobile Experiences'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.techStack && project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="projects-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line"></span> 03 / Selected Work
          </p>
          <h1>
            Made to<br />
            <em>matter.</em>
          </h1>
        </div>
        <p>
          A selection of platforms, applications, and digital identities architected by our studio team.
          Every project is built to solve tangible business bottlenecks and endure over time.
        </p>
      </header>

      {/* Projects Gallery Section */}
      <section className="section section-white">
        {/* Controls: Category Filter and Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div className="filter-bar" style={{ margin: 0 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-[280px]" style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px', height: '38px', fontSize: '13px' }}
              placeholder="Search projects or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--paper)', border: '1px dashed var(--line)' }}>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>No projects match your current filter.</p>
            <button
              className="button button-quiet"
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => setActiveModalProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveModalProject(project)}
              >
                <div className={`project-visual visual-${project.imageType || 'city'}`}>
                  <span className="project-badge">{project.tag}</span>
                  <span className="project-year">{project.year}</span>
                  {project.featured && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '16px',
                        background: 'rgba(37, 99, 235, 0.9)',
                        color: 'white',
                        padding: '3px 8px',
                        fontSize: '9px',
                        fontFamily: 'var(--mono)',
                        borderRadius: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Sparkles size={11} /> Featured
                    </span>
                  )}
                </div>

                <div className="project-body">
                  <span className="project-client-name">{project.client}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="tech-tags">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <span className="project-metric">{project.metrics || 'Completed'}</span>
                    <span
                      style={{
                        color: 'var(--blue)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontFamily: 'var(--mono)'
                      }}
                    >
                      View Case <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Project Case Study Modal */}
      {activeModalProject && (
        <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span style={{ font: '10px var(--mono)', color: 'var(--blue)', textTransform: 'uppercase' }}>
                  {activeModalProject.category} · {activeModalProject.year}
                </span>
                <h3 style={{ marginTop: '4px' }}>{activeModalProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                style={{ padding: '6px', color: 'var(--muted)' }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div
                className={`project-visual visual-${activeModalProject.imageType || 'city'}`}
                style={{ height: '180px', borderRadius: '4px', marginBottom: '24px' }}
              >
                <span className="project-badge">{activeModalProject.tag}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 bg-[var(--paper)] p-4 rounded">
                <div>
                  <span style={{ display: 'block', font: '9px var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>Client</span>
                  <strong style={{ fontSize: '13px' }}>{activeModalProject.client}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', font: '9px var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>Key Outcome</span>
                  <strong style={{ fontSize: '13px', color: '#0d9488' }}>{activeModalProject.metrics || 'Production Verified'}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', font: '9px var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</span>
                  <strong style={{ fontSize: '13px', color: 'var(--blue)' }}>{activeModalProject.status || 'Completed'}</strong>
                </div>
              </div>

              <h4 style={{ margin: '0 0 10px', fontSize: '15px' }}>Project Overview</h4>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
                {activeModalProject.longDescription || activeModalProject.description}
              </p>

              <h4 style={{ margin: '0 0 10px', fontSize: '13px', font: '500 11px var(--mono)', textTransform: 'uppercase', color: 'var(--ink)' }}>
                Technologies & Architecture
              </h4>
              <div className="tech-tags" style={{ marginBottom: '24px' }}>
                {activeModalProject.techStack?.map((tech) => (
                  <span key={tech} className="tech-tag" style={{ padding: '5px 10px', fontSize: '11px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="button button-quiet"
                onClick={() => setActiveModalProject(null)}
              >
                Close
              </button>
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                >
                  Live Experience <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Next Flow CTA */}
      <section className="section section-paper" style={{ textAlign: 'center', borderTop: '1px solid var(--mist)' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Next Chapter</p>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>
          Hear from our <em>collaborators.</em>
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 28px' }}>
          Read direct feedback and impact testimonials from founders and engineering leaders.
        </p>
        <Link to="/clients" className="button button-primary">
          View Clients & Testimonials <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
