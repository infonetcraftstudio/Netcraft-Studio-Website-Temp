import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, CheckCircle, Sparkles, Layers, ShieldCheck, Star } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export default function Home() {
  const { contactInfo, services, projects, clients } = useStudio();

  // Get featured projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredClients = clients.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line"></span>
            Digital Product Studio
            <span className="status-dot">{contactInfo.status}</span>
          </p>
          <h1>
            Build what’s<br />
            <em>next.</em>
          </h1>
          <p className="hero-description">
            {contactInfo.subheadline}
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="button button-primary">
              Start a project <ArrowUpRight size={14} />
            </Link>
            <Link to="/projects" className="button button-quiet">
              See selected work <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Abstract Geometric Art */}
        <div className="hero-art" aria-label="Abstract blue geometric artwork">
          <div className="art-glow"></div>
          <div className="art-orbit orbit-one"></div>
          <div className="art-orbit orbit-two"></div>
          <div className="art-triangle triangle-main"></div>
          <div className="art-triangle triangle-cut"></div>
          <div className="art-triangle triangle-small"></div>
          <span className="art-label">{contactInfo.systemCode}</span>
          <span className="art-coordinates">{contactInfo.coordinates}</span>
        </div>

        <div className="hero-meta">
          <span>Scroll to explore</span>
          <span className="scroll-line"></span>
          <span>{new Date().getFullYear()} / EST. {contactInfo.estYear}</span>
        </div>
      </section>

      {/* Statement / About Preview */}
      <section className="section section-white">
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(40px, 6vw, 70px) 1fr 1fr', gap: '32px' }}>
          <div style={{ color: 'var(--blue)', font: '500 12px var(--mono)' }}>01</div>
          <div>
            <p className="eyebrow">A studio for what is next</p>
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 62px)', margin: 0 }}>
              Ideas need<br />
              good <em>company.</em>
            </h2>
          </div>
          <div style={{ alignSelf: 'end' }}>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
              NetCraft Studio is a senior product engineering practice for the moments when your
              platform, software architecture, or brand needs to become unmistakably better.
            </p>
            <Link to="/about" className="button button-quiet" style={{ fontSize: '12px' }}>
              Meet the studio & team <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Stat Row */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 8vw, 120px)',
            marginTop: '70px',
            paddingTop: '28px',
            borderTop: '1px solid var(--mist)',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>32+</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Products Shipped
            </span>
          </div>
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>14</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Countries Reached
            </span>
          </div>
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>
              4.9<span style={{ color: 'var(--blue)', fontSize: '18px' }}>/5</span>
            </strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Partner Rating
            </span>
          </div>
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>100%</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              On-Time Delivery
            </span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section-light">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="eyebrow">02 / What we do</p>
            <h2 style={{ fontSize: 'clamp(34px, 4vw, 56px)', margin: 0 }}>
              Make the<br />
              <em>complex clear.</em>
            </h2>
          </div>
          <div style={{ maxWidth: '340px' }}>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
              Strategy, design, and engineering in one focused team, shaped around the outcome you need next.
            </p>
            <Link to="/services" className="button button-quiet" style={{ fontSize: '11px' }}>
              View all capabilities <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="service-grid">
          {services.map((/** @type {any} */ service, /** @type {number} */ index) => (
            <article key={service.id} className={`service-card ${index === 0 ? 'featured' : ''}`}>
              <span className="card-number">{service.num}</span>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.shortDesc}</p>
              <Link to="/services" className="card-link">
                Explore service <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Selected Work Preview */}
      <section className="section section-white">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="eyebrow">03 / Selected work</p>
            <h2 style={{ fontSize: 'clamp(34px, 4vw, 56px)', margin: 0 }}>
              Made to<br />
              <em>matter.</em>
            </h2>
          </div>
          <Link to="/projects" className="button button-quiet" style={{ fontSize: '12px' }}>
            Explore all {projects.length} projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <Link to="/projects" key={project.id} className="project-card">
              <div className={`project-visual visual-${project.imageType || 'city'}`}>
                <span className="project-badge">{project.tag}</span>
                <span className="project-year">{project.year}</span>
                <div style={{ color: 'white', opacity: 0.8, fontSize: '32px' }}>
                  <Layers size={44} />
                </div>
              </div>
              <div className="project-body">
                <span className="project-client-name">{project.client}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.techStack.map((/** @type {any} */ tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-footer">
                  <span className="project-metric">{project.metrics}</span>
                  <span style={{ color: 'var(--blue)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                    Details <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Clients & Testimonial Preview */}
      <section className="section section-paper" style={{ borderTop: '1px solid var(--mist)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="eyebrow">04 / Collaborators</p>
            <h2 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: 0 }}>
              Trusted by<br />
              <em>industry leaders.</em>
            </h2>
          </div>
          <Link to="/clients" className="button button-quiet" style={{ fontSize: '12px' }}>
            Read client case reviews <ArrowRight size={14} />
          </Link>
        </div>

        <div className="clients-grid">
          {featuredClients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <div className="client-logo-box">{client.logoText}</div>
                <span className="client-industry">{client.industry}</span>
              </div>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                {[...Array(client.rating || 5)].map((_, i) => (
                  <Star key={i} size={14} fill="#2563eb" color="#2563eb" />
                ))}
              </div>
              <p className="client-quote">"{client.testimonial}"</p>
              <div className="client-author">
                <div>
                  <strong>{client.author}</strong>
                  <span>{client.authorRole}</span>
                </div>
                <span style={{ font: '10px var(--mono)', color: 'var(--blue)' }}>{client.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="section section-dark">
        <div style={{ maxWidth: '820px' }}>
          <p className="eyebrow" style={{ color: '#9ab0d2' }}>05 / Ready to begin?</p>
          <h2 style={{ fontSize: 'clamp(42px, 5.5vw, 76px)', margin: '20px 0 24px', letterSpacing: '-3px' }}>
            Have a bold idea?<br />
            <em style={{ color: 'var(--cyan)' }}>Let’s build it.</em>
          </h2>
          <p style={{ color: '#9eb0cc', fontSize: '17px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '580px' }}>
            From high-performance web products to AI orchestration, our studio engineers
            meaningful impact. Connect directly with our partners.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="button button-primary" style={{ background: 'white', color: 'var(--ink)' }}>
              Start your project <ArrowUpRight size={14} color="var(--blue)" />
            </Link>
            <a
              href={`mailto:${contactInfo.email}`}
              style={{
                color: 'white',
                fontFamily: 'var(--mono)',
                fontSize: '14px',
                borderBottom: '1px solid rgba(255,255,255,0.4)',
                paddingBottom: '4px'
              }}
            >
              {contactInfo.email} ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
