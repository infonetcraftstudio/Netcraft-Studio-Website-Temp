import React, { useState } from 'react';
import { 
  Lightbulb, 
  Search, 
  Map, 
  Layers, 
  Cpu, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EngineeringPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      name: 'Understand',
      icon: <Lightbulb size={20} color="var(--blue)" />,
      subtitle: 'Problem Definition & Core Hypotheses',
      tagline: 'We unpack the business constraint before writing a single line of code.',
      desc: 'We conduct deep technical discovery into your operational bottlenecks, existing system architecture, user workflows, and commercial objectives to establish quantifiable success metrics.',
      deliverables: [
        'Technical constraints audit',
        'Business requirements specification (BRD)',
        'Key performance indicators (KPIs) baseline'
      ],
      timeframe: 'Week 1'
    },
    {
      num: '02',
      name: 'Discover',
      icon: <Search size={20} color="#0d9488" />,
      subtitle: 'Research & Feasibility Analysis',
      tagline: 'Empirical market research, security bounds, and tech stack benchmarking.',
      desc: 'We explore data schema options, API limits, third-party dependencies, and compliance requirements (GDPR/HIPAA/SOC2) to ensure the proposed solution is resilient from day zero.',
      deliverables: [
        'Third-party dependency risk matrix',
        'Data schema & entity relationship draft',
        'Technical proof-of-concept (PoC) validation'
      ],
      timeframe: 'Week 1–2'
    },
    {
      num: '03',
      name: 'Plan',
      icon: <Map size={20} color="#8b5cf6" />,
      subtitle: 'Architecture & Sprint Roadmap',
      tagline: 'Concrete system schematics and fixed sprint milestones.',
      desc: 'We architect the database diagrams, API contracts, deployment pipeline, and sprint-by-sprint release schedule so stakeholders have 100% visibility from kickoff.',
      deliverables: [
        'System architecture blueprint',
        'Formal API contract specifications',
        'Agile sprint timeline with fixed milestones'
      ],
      timeframe: 'Week 2'
    },
    {
      num: '04',
      name: 'Design',
      icon: <Layers size={20} color="#ea580c" />,
      subtitle: 'UI/UX Design Systems & Prototypes',
      tagline: 'Ergonomic interface design built around real workflows.',
      desc: 'We craft comprehensive Figma component systems, interactive clickable prototypes, and accessibility-compliant design tokens calibrated for lightning-fast user adoption.',
      deliverables: [
        'Modular design system & component tokens',
        'Full interactive Figma prototype',
        'Responsive layout specs (Mobile, Tablet, Desktop)'
      ],
      timeframe: 'Weeks 3–4'
    },
    {
      num: '05',
      name: 'Build',
      icon: <Cpu size={20} color="var(--blue)" />,
      subtitle: 'Production Engineering & Test Automation',
      tagline: 'Type-safe codebases, automated CI/CD, and sub-100ms response times.',
      desc: 'Our senior engineers execute sprint cycles with continuous integration, unit/integration testing, peer code reviews, and weekly staging deployments for stakeholder verification.',
      deliverables: [
        'Production-grade TypeScript codebase',
        'Automated CI/CD deployment pipelines',
        'Comprehensive unit & end-to-end test suite'
      ],
      timeframe: 'Weeks 5–10'
    },
    {
      num: '06',
      name: 'Evolve',
      icon: <Rocket size={20} color="#0d9488" />,
      subtitle: 'Deployment, SLA Monitoring & Continuous Scale',
      tagline: 'Zero-downtime launch and proactive performance scaling.',
      desc: 'Post-launch, we monitor error telemetry, cache hit ratios, and real user interactions—iterating features and optimizing infrastructure as your traffic multiplies.',
      deliverables: [
        'Zero-downtime production cutover',
        'Realtime APM & observability dashboard',
        'Quarterly performance & security audits'
      ],
      timeframe: 'Ongoing'
    }
  ];

  const current = steps[activeStep];

  return (
    <section className="section section-light pipeline-section" id="process">
      <div className="pipeline-container">
        {/* Section Header */}
        <div className="pipeline-header">
          <div className="eyebrow-decorated">
            <span className="eyebrow-line"></span>
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-text">OUR ENGINEERING PROCESS</span>
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-line"></span>
          </div>
          <h2 style={{ fontSize: '38px', margin: '0 0 14px' }}>
            From Concept to Scale.<br />
            A <em>Disciplined Methodology.</em>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '520px', lineHeight: '1.6', margin: '0 auto' }}>
            We eliminate speculation with a structured 6-stage lifecycle designed to deliver predictable milestones, 
            transparent telemetry, and zero technical debt.
          </p>
        </div>

        {/* Pipeline Layout: Left Step Navigation & Right Active Detail Stage */}
        <div className="pipeline-grid">
          {/* Step List / Railway Track */}
          <div className="pipeline-steps-nav">
            <div className="pipeline-track-line"></div>
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  className={`pipeline-step-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  type="button"
                >
                  <div className="pipeline-node">
                    <span className="pipeline-node-num">{step.num}</span>
                  </div>
                  <div className="pipeline-step-text">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong className="pipeline-step-title">{step.name}</strong>
                      <span className="pipeline-timeframe">{step.timeframe}</span>
                    </div>
                    <span className="pipeline-step-sub">{step.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details Card */}
          <div className="pipeline-stage-card">
            <div className="stage-top-meta">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stage-icon-box">{current.icon}</div>
                <div>
                  <span className="stage-eyebrow">Phase {current.num} of 06</span>
                  <h3 className="stage-title">{current.name} · {current.subtitle}</h3>
                </div>
              </div>
              <span className="stage-badge">{current.timeframe}</span>
            </div>

            <p className="stage-tagline">
              "{current.tagline}"
            </p>

            <p className="stage-desc">{current.desc}</p>

            <div className="stage-deliverables-box">
              <h4 className="deliverables-heading">
                <ShieldCheck size={16} color="var(--blue)" />
                Phase Core Deliverables
              </h4>
              <ul className="deliverables-list">
                {current.deliverables.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} color="#0d9488" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="stage-footer">
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="button button-quiet"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                >
                  ← Previous Phase
                </button>
                <button
                  className="button button-quiet"
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                >
                  Next Phase →
                </button>
              </div>

              <Link to="/contact" className="button button-primary" style={{ fontSize: '11px', padding: '6px 14px' }}>
                Initiate Project Discovery <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
