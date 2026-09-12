import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight, Compass, ShieldCheck, Zap, Code2, Users, LayoutGrid, Sliders } from 'lucide-react';
import { MemberSlider } from '@/components/ui/member-slider';

export default function About() {
  const { members, contactInfo } = useStudio();
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'

  const values = [
    {
      icon: <Compass size={24} color="var(--blue)" />,
      title: 'Architectural Rigor',
      description: 'We prioritize clean foundations, resilient architectures, and zero unnecessary dependencies over trendy shortcuts.'
    },
    {
      icon: <Zap size={24} color="var(--blue)" />,
      title: 'Performance as a Feature',
      description: 'Speed is usability. Every interaction, load state, and render cycle is calibrated to feel instantaneous.'
    },
    {
      icon: <ShieldCheck size={24} color="var(--blue)" />,
      title: 'Senior Ownership',
      description: 'You work directly with principal designers and architects. No hand-offs to junior pools or bloated project layers.'
    },
    {
      icon: <Code2 size={24} color="var(--blue)" />,
      title: 'Future-Proof Codebases',
      description: 'Clean TypeScript, structured design tokens, and modular components your in-house engineers will genuinely love working on.'
    }
  ];

  return (
    <div className="about-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line"></span> 01 / Studio Manifesto
          </p>
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
              position: 'relative'
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', marginBottom: '16px' }}>
              // STUDIO CORE PRINCIPLES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {values.map((/** @type {any} */ v, /** @type {number} */ idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>{v.icon}</div>
                  <div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '16px' }}>{v.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.5' }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section section-light" id="members">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line"></span> The Collective
            </p>
            <h2 style={{ fontSize: '38px', margin: 0 }}>
              Senior minds.<br />
              <em>Zero bureaucracy.</em>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0, maxWidth: '380px' }} className="text-left sm:text-right">
              Meet the specialists behind NetCraft Studio. Managed dynamically via our internal studio records.
            </p>
            <div style={{ display: 'inline-flex', background: 'white', border: '1px solid var(--mist)', padding: '3px', borderRadius: '4px' }}>
              <button
                onClick={() => setViewMode('slider')}
                className={`filter-btn ${viewMode === 'slider' ? 'active' : ''}`}
                style={{ padding: '6px 12px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <Sliders size={13} /> Interactive Slider
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`filter-btn ${viewMode === 'grid' ? 'active' : ''}`}
                style={{ padding: '6px 12px', fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <LayoutGrid size={13} /> All Specialists ({members.length})
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'slider' ? (
          <div style={{ marginBottom: '24px' }}>
            <MemberSlider />
          </div>
        ) : (
          <div className="members-grid">
            {members.map((/** @type {any} */ member) => (
              <div key={member.id} className="member-card">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="member-avatar"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                  }}
                />
                <h3 className="member-name">{member.name}</h3>
                <div className="member-role">{member.role}</div>
                <p className="member-bio">{member.bio}</p>

                <div className="tech-tags" style={{ marginTop: 'auto', marginBottom: '14px' }}>
                  {member.skills?.map((/** @type {any} */ skill, /** @type {number} */ i) => (
                    <span key={i} className="tech-tag">{skill}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--mist)', paddingTop: '12px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: 'var(--muted)' }}>{member.department || 'Studio'}</span>
                  {member.email && (
                    <a href={`mailto:${member.email}`} style={{ color: 'var(--blue)' }}>
                      Contact ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Next Flow CTA */}
      <section className="section section-paper" style={{ textAlign: 'center', borderTop: '1px solid var(--mist)' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Next Chapter</p>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>
          Discover our full spectrum of <em>capabilities.</em>
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 28px' }}>
          From reactive frontend architectures to proprietary AI workflows.
        </p>
        <Link to="/services" className="button button-primary">
          Explore Services <ArrowUpRight size={14} />
        </Link>
      </section>
    </div>
  );
}
