import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Layers, 
  Star,
  Check,
  HelpCircle,
  Clock,
  Code2
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import EngineeringPipeline from '../components/EngineeringPipeline';
import TechStackMatrix from '../components/TechStackMatrix';
import EnterpriseFAQ from '../components/EnterpriseFAQ';

export default function Home() {
  const { contactInfo, services, projects, clients } = useStudio();

  // Typewriter dynamic keyword animation with custom color palettes
  const typewriterWords = [
    { 
      text: 'Web Applications', 
      color: '#2563eb', 
      gradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)' 
    },
    { 
      text: 'Mobile Apps', 
      color: '#0d9488', 
      gradient: 'linear-gradient(135deg, #0d9488 0%, #10b981 100%)' 
    },
    { 
      text: 'Desktop Software', 
      color: '#7c3aed', 
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)' 
    },
    { 
      text: 'Automation Systems', 
      color: '#0284c7', 
      gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)' 
    },
    { 
      text: 'Digital Products', 
      color: '#ea580c', 
      gradient: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)' 
    }
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex].text;
    const typingSpeed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  // Get featured projects & clients
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredClients = clients.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow-decorated" style={{ marginBottom: '14px' }}>
            <span className="eyebrow-line"></span>
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-text">SERVICE &amp; PRODUCT BASED IT COMPANY</span>
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-line"></span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-row-1">
              We Build{' '}
              <span 
                className="typewriter-word-highlight"
                style={{
                  backgroundImage: typewriterWords[wordIndex].gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: typewriterWords[wordIndex].color
                }}
              >
                {currentText}
              </span>
              <span 
                className="typewriter-cursor"
                style={{ color: typewriterWords[wordIndex].color }}
              >
                |
              </span>
            </span>
            <span className="hero-title-row-2">
              That Move Businesses Forward.
            </span>
          </h1>

          <p className="hero-description">
            NetCraft Studio crafts powerful digital experiences that blend cutting-edge engineering with intuitive design. 
            From web applications and mobile platforms to custom desktop suites and automation systems, we build solutions engineered to perform flawlessly.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="button button-primary">
              Start a project <ArrowUpRight size={14} />
            </Link>
            <Link to="/projects" className="button button-quiet">
              Explore Selected Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Brand Artwork Showcase */}
        <div className="hero-art" aria-label="NetCraft Studio logo artwork">
          <div className="art-glow"></div>
          <div className="art-orbit orbit-one"></div>
          <div className="art-orbit orbit-two"></div>
          <img src="/logo.png" alt="NetCraft Studio logo" className="hero-logo-image" />
        </div>
      </section>

      {/* Statement / About Preview */}
      <section className="section section-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', margin: 0 }}>
              Ideas need<br />
              good <em>company.</em>
            </h2>
          </div>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
              NetCraft Studio was born from a simple idea — to build digital experiences that don't just work, but leave a lasting impact.
              We are a service and product based IT company crafting fast, scalable, and visually compelling solutions for modern businesses.
            </p>
            <Link to="/about" className="button button-quiet" style={{ fontSize: '12px' }}>
              Meet the studio philosophy <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Stat Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 md:mt-16 pt-7 border-t border-[var(--mist)]">
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>10+</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Projects Done
            </span>
          </div>
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>8+</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Specialist Developers
            </span>
          </div>
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>100%</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Client Satisfaction
            </span>
          </div>
          <div>
            <strong style={{ font: '500 36px var(--display)', color: 'var(--ink)' }}>24/7</strong>
            <span style={{ display: 'block', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase', marginTop: '4px' }}>
              Reliability &amp; Support
            </span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section-light" id="capabilities">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="eyebrow-decorated">
              <span className="eyebrow-line"></span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">OUR CAPABILITIES</span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 style={{ fontSize: 'clamp(34px, 4vw, 56px)', margin: 0 }}>
              Technology. Built Around<br />
              <em>Your Business.</em>
            </h2>
          </div>
          <div style={{ maxWidth: '380px' }}>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
              From web development and mobile apps to desktop applications and smart automation, every solution is engineered for performance and scalability.
            </p>
            <Link to="/services" className="button button-quiet" style={{ fontSize: '11px' }}>
              View all {services.length} core capabilities <ArrowRight size={12} />
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
                Explore capability <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Engineering Pipeline (6-Step Structured Methodology) */}
      <EngineeringPipeline />

      {/* Technology & Expertise Stack Matrix */}
      <TechStackMatrix />

      {/* Selected Work Preview */}
      <section className="section section-white">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="eyebrow-decorated">
              <span className="eyebrow-line"></span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">SELECTED WORK</span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 style={{ fontSize: 'clamp(34px, 4vw, 56px)', margin: 0 }}>
              Made to<br />
              <em>matter.</em>
            </h2>
          </div>
          <Link to="/projects" className="button button-quiet" style={{ fontSize: '12px' }}>
            Explore all {projects.length} case studies <ArrowRight size={14} />
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
            <div className="eyebrow-decorated">
              <span className="eyebrow-line"></span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">PARTNER VOICES</span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-line"></span>
            </div>
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

      {/* Enterprise FAQ Accordion Section */}
      <EnterpriseFAQ />

      {/* High-Conversion Enterprise Call To Action (Solvian Inspiration) */}
      <section className="section section-dark" id="contact-cta">
        <div style={{ maxWidth: '860px' }}>
          <div className="eyebrow-decorated" style={{ color: 'var(--cyan)' }}>
            <span className="eyebrow-line" style={{ background: 'var(--cyan)' }}></span>
            <span className="eyebrow-dot" style={{ background: 'var(--cyan)' }}></span>
            <span className="eyebrow-text" style={{ color: 'var(--cyan)' }}>LET'S BUILD SOMETHING THAT MATTERS</span>
            <span className="eyebrow-dot" style={{ background: 'var(--cyan)' }}></span>
            <span className="eyebrow-line" style={{ background: 'var(--cyan)' }}></span>
          </div>

          <h2 style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', margin: '16px 0 24px', letterSpacing: '-2px', lineHeight: '1.08' }}>
            Have Something<br />
            <em style={{ color: 'var(--cyan)' }}>Worth Building?</em>
          </h2>

          <p style={{ color: '#9eb0cc', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '620px' }}>
            Whether you are starting from an early-stage concept, untangling an existing monolithic codebase, 
            or seeking enterprise-grade engineering partners, let's architect something practical and enduring together.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '36px' }}>
            <Link to="/contact" className="button button-primary" style={{ background: 'white', color: 'var(--ink)' }}>
              Start a project <ArrowUpRight size={14} color="var(--blue)" />
            </Link>
            <Link to="/contact" className="button button-quiet" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
              Schedule a Scoping Call <ArrowRight size={14} />
            </Link>
          </div>

          {/* Credibility / Trust Points */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4d7ee', fontSize: '13px' }}>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>✓</span>
              <span>Transparent Bi-Weekly Sprints</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4d7ee', fontSize: '13px' }}>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>✓</span>
              <span>100% Code &amp; IP Ownership</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4d7ee', fontSize: '13px' }}>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(45,212,191,0.2)', color: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>✓</span>
              <span>Sub-100ms Performance Targets</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
