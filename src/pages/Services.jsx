import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import EngineeringPipeline from '../components/EngineeringPipeline';
import TechStackMatrix from '../components/TechStackMatrix';

export default function Services() {
  const { services } = useStudio();

  return (
    <div className="services-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <h1>
            Make the<br />
            <em>complex clear.</em>
          </h1>
        </div>
        <p>
          We unite digital strategy, rigorous UI/UX, and bleeding-edge full-stack engineering
          into one cohesive execution squad. Shaped precisely around your outcomes.
        </p>
      </header>

      {/* Services List Breakdown */}
      <section className="section section-white">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {services.map((/** @type {any} */ service, /** @type {number} */ idx) => (
            <div
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-[clamp(40px,6vw,70px)_1.2fr_1fr] gap-6 lg:gap-9 pb-10 border-b border-[var(--mist)] items-start"
            >
              <div style={{ color: 'var(--blue)', font: '500 14px var(--mono)' }}>
                {service.num}
              </div>

              <div>
                <div style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '14px' }}>
                  {service.icon}
                </div>
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', margin: '0 0 16px' }}>
                  {service.title}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                  {service.fullDesc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {service.technologies.map((/** @type {any} */ tech) => (
                    <span key={tech} className="tech-tag" style={{ background: '#eef2f8', padding: '4px 10px', fontSize: '11px' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--mist)',
                  padding: '24px 28px',
                  borderRadius: '4px'
                }}
              >
                <h4 style={{ margin: '0 0 16px', fontSize: '12px', font: '500 11px var(--mono)', color: 'var(--ink)', textTransform: 'uppercase' }}>
                  // Key Deliverables
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {service.deliverables.map((/** @type {any} */ item, /** @type {number} */ i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--muted)' }}>
                      <CheckCircle2 size={14} color="var(--cyan)" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="button button-quiet" style={{ fontSize: '11px' }}>
                  Inquire regarding {service.title} <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Technology Stack Matrix */}
      <TechStackMatrix />

      {/* Embedded 6-Stage Engineering Process */}
      <EngineeringPipeline />

      {/* Next Flow CTA */}
      <section className="section section-paper" style={{ textAlign: 'center', borderTop: '1px solid var(--mist)' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Next Chapter</p>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>
          See our principles in <em>action.</em>
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 28px' }}>
          Review selected projects shipped across fintech, AI, spatial computing, and digital products.
        </p>
        <Link to="/projects" className="button button-primary">
          View Projects Portfolio <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
