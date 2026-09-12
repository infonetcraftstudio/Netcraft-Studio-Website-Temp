import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const { services } = useStudio();

  const processSteps = [
    {
      num: '01',
      title: 'Discovery & Vector Framing',
      desc: 'We map out technical constraints, competitive positioning, and core user goals before writing a single line of production code.'
    },
    {
      num: '02',
      title: 'Interactive Prototyping',
      desc: 'We construct high-fidelity interactive canvases to test real tactile feedback, motion semantics, and design systems.'
    },
    {
      num: '03',
      title: 'Precision Engineering',
      desc: 'Modern React architectures, clean state management, modular components, and automated test coverage engineered for longevity.'
    },
    {
      num: '04',
      title: 'Observability & Scale',
      desc: 'Continuous integration, Core Web Vitals telemetry, zero-downtime deployment pipelines, and post-launch handover.'
    }
  ];

  return (
    <div className="services-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line"></span> 02 / Capabilities
          </p>
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
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(50px, 8vw, 90px) 1.2fr 1fr',
                gap: '36px',
                paddingBottom: '48px',
                borderBottom: '1px solid var(--mist)',
                alignItems: 'start'
              }}
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
                  padding: '24px 28px'
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

      {/* Engineering Process */}
      <section className="section section-light">
        <p className="eyebrow">
          <span className="eyebrow-line"></span> How We Execute
        </p>
        <h2 style={{ fontSize: '38px', marginBottom: '48px' }}>
          Predictable delivery.<br />
          <em>Uncompromising polish.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
          {processSteps.map((step) => (
            <div key={step.num} style={{ background: 'white', padding: '28px', border: '1px solid var(--mist)' }}>
              <div style={{ color: 'var(--blue)', font: '500 14px var(--mono)', marginBottom: '14px' }}>
                STAGE / {step.num}
              </div>
              <h3 style={{ fontSize: '18px', margin: '0 0 10px' }}>{step.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

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
