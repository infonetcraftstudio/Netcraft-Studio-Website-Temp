import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { 
  ArrowUpRight, 
  ArrowRight,
  Compass, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Layers, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import CommitmentBanner from '../components/CommitmentBanner';

export default function About() {
  const { contactInfo } = useStudio();

  // Core Pillars inspired by Solvian Technologies
  const pillars = [
    {
      num: '01',
      title: 'Business First',
      icon: <TrendingUp size={22} color="var(--blue)" />,
      desc: 'We unpack commercial goals, unit economics, and user retention curves before writing any code. Technology serves the business, not the other way around.'
    },
    {
      num: '02',
      title: 'Modern Engineering',
      icon: <Zap size={22} color="#0d9488" />,
      desc: 'Clean architecture, strict TypeScript types, and modular design tokens engineered for sub-second rendering, high test coverage, and linear scalability.'
    },
    {
      num: '03',
      title: 'Transparent Process',
      icon: <Compass size={22} color="#8b5cf6" />,
      desc: 'Bi-weekly sprint demos, real-time shared project boards, and direct partner access. Zero gatekeeping, zero junior handoffs, zero unpleasant surprises.'
    },
    {
      num: '04',
      title: 'Built to Evolve',
      icon: <RefreshCw size={22} color="#ea580c" />,
      desc: 'Adaptive, decoupled architectures designed to gracefully scale as your customer volume grows from thousands to millions without complete rewrites.'
    }
  ];

  return (
    <div className="about-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <h1>
            A studio for<br />
            what is <em>next.</em>
          </h1>
        </div>
        <p>
          Founded in {contactInfo.estYear}, NetCraft Studio was established on a simple conviction:
          software should be mathematically precise, aesthetically compelling, and built with enduring craftsmanship.
        </p>
      </header>

      {/* Story & Philosophy Section */}
      <section className="section section-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-14 items-center">
          <div>
            <p className="eyebrow">Our Philosophy</p>
            <h2 style={{ fontSize: '38px', marginBottom: '24px' }}>
              We reject digital noise.<br />
              We engineer <em>clarity.</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
              The modern web is congested with slow bloated libraries, confusing micro-interactions,
              and generic template designs. NetCraft Studio operates as an antidote: a senior collective
              of technologists and designers who build lean, bespoke systems that command attention.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px' }}>
              Whether launching an AI copilot interface or rebuilding an enterprise core platform,
              we bridge conceptual design with high-concurrency systems engineering.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/contact" className="button button-primary">
                Collaborate with us <ArrowUpRight size={14} />
              </Link>
              <Link to="/services" className="button button-quiet">
                Our capabilities →
              </Link>
            </div>
          </div>

          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--mist)',
              padding: '36px',
              position: 'relative',
              borderRadius: '4px'
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', marginBottom: '16px' }}>
              // STUDIO CORE PRINCIPLES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}><Compass size={22} color="var(--blue)" /></div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>Architectural Rigor</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5' }}>
                    We prioritize clean foundations, resilient architectures, and zero unnecessary dependencies over trendy shortcuts.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}><Zap size={22} color="var(--blue)" /></div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>Performance as a Feature</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5' }}>
                    Speed is usability. Every interaction, load state, and render cycle is calibrated to feel instantaneous.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}><ShieldCheck size={22} color="var(--blue)" /></div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>Senior Ownership</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5' }}>
                    You work directly with principal designers and architects. No hand-offs to junior pools or bloated project layers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose NetCraft: 4 Pillars (Inspired by Solvian Technologies) */}
      <section className="section section-light">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="eyebrow-decorated">
              <span className="eyebrow-line"></span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">WHY NETCRAFT STUDIO</span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 style={{ fontSize: '38px', margin: '0 0 14px' }}>
              Technology Is Everywhere.<br />
              Building the <em>Right Thing</em> Isn't.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6' }}>
              We focus on understanding the root operational problem first, selecting the optimal architecture, 
              and delivering practical software that endures.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                style={{
                  background: 'white',
                  border: '1px solid var(--mist)',
                  padding: '28px',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--paper)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {pillar.icon}
                  </div>
                  <span style={{ font: '11px var(--mono)', color: 'var(--blue)', background: '#eff6ff', padding: '2px 8px', borderRadius: '2px' }}>
                    {pillar.num}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>{pillar.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Transformation: Legacy to Modern Cloud-Native (Solvian Inspiration) */}
      <section className="section section-white">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <div className="eyebrow-decorated">
              <span className="eyebrow-line"></span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">TRANSFORMATION CASE STUDY</span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 style={{ fontSize: '36px', margin: '0 0 12px' }}>
              How We Turn Legacy Debt Into <em>Modern Advantage.</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '560px', lineHeight: '1.6', margin: 0 }}>
              Whether uncoupling a monolithic stack or refactoring outdated UI/UX, we transition enterprise codebases with zero business disruption.
            </p>
          </div>

          <div className="transformation-card">
            <div className="transformation-grid">
              {/* Old System Panel */}
              <div className="story-panel legacy">
                <span className="story-tag tag-legacy">
                  <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Legacy Monolith (Before)
                </span>
                <h4 style={{ margin: '0 0 10px', fontSize: '16px' }}>Bloated Stacks &amp; Tech Debt</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                  <li>❌ Monolithic code with cascading merge conflicts</li>
                  <li>❌ 1,200ms+ initial page loads &amp; server latency</li>
                  <li>❌ Brittle manual deployments with constant rollbacks</li>
                  <li>❌ Outdated jQuery / legacy framework security vulnerabilities</li>
                </ul>
              </div>

              {/* Transition Bridge Arrow */}
              <div className="story-bridge">
                <div className="story-bridge-arrow">→</div>
                <span style={{ font: '10px var(--mono)', color: 'var(--blue)', textTransform: 'uppercase' }}>
                  NetCraft Overhaul
                </span>
              </div>

              {/* Modern Solution Panel */}
              <div className="story-panel modern">
                <span className="story-tag tag-modern">
                  <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Modern Architecture (After)
                </span>
                <h4 style={{ margin: '0 0 10px', fontSize: '16px', color: '#0f766e' }}>Cloud-Native &amp; Sub-Second</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#134e4a' }}>
                  <li>✓ Type-safe React 19 + TypeScript component architecture</li>
                  <li>✓ Sub-80ms edge cached responses with 99.99% uptime</li>
                  <li>✓ Automated GitHub Actions CI/CD with automated testing</li>
                  <li>✓ Clean design tokens with accessible WCAG 2.1 UI</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Full-width Commitment Banner */}
          <CommitmentBanner />
        </div>
      </section>

      {/* Next Flow CTA */}
      <section className="section section-paper" style={{ textAlign: 'center', borderTop: '1px solid var(--mist)' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Next Chapter</p>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>
          Discover our full spectrum of <em>capabilities.</em>
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 28px' }}>
          From reactive frontend architectures to proprietary AI workflows and legacy modernizations.
        </p>
        <Link to="/services" className="button button-primary">
          Explore Services <ArrowUpRight size={14} />
        </Link>
      </section>
    </div>
  );
}
