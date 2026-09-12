import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight, ArrowRight, Star, Building2, Quote, CheckCircle } from 'lucide-react';

export default function Clients() {
  const { clients } = useStudio();

  return (
    <div className="clients-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line"></span> 04 / Partners & Clients
          </p>
          <h1>
            Trusted by<br />
            <em>industry leaders.</em>
          </h1>
        </div>
        <p>
          We collaborate with category-defining startups, fast-growing scale-ups, and established enterprises.
          Here is what our partners say about working alongside NetCraft Studio.
        </p>
      </header>

      {/* Featured Testimonials */}
      <section className="section section-white">
        <p className="eyebrow">
          <span className="eyebrow-line"></span> Client Reviews
        </p>
        <h2 style={{ fontSize: '36px', marginBottom: '44px' }}>
          Partnerships built on <em>results.</em>
        </h2>

        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <div className="client-logo-box">{client.logoText || client.name}</div>
                <span className="client-industry">{client.industry}</span>
              </div>

              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(client.rating || 5)].map((_, i) => (
                  <Star key={i} size={15} fill="#2563eb" color="#2563eb" />
                ))}
              </div>

              <p className="client-quote">
                "{client.testimonial}"
              </p>

              <div className="client-author">
                <div>
                  <strong>{client.author}</strong>
                  <span>{client.authorRole}</span>
                </div>
                <span style={{ font: '10px var(--mono)', color: 'var(--blue)' }}>
                  {client.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roster Table of Collaborations */}
      <section className="section section-light">
        <p className="eyebrow">
          <span className="eyebrow-line"></span> Collaboration Roster
        </p>
        <h2 style={{ fontSize: '34px', marginBottom: '32px' }}>
          Companies we've shipped with.
        </h2>

        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Industry</th>
                <th>Shipped Work</th>
                <th>Relationship</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <strong>{client.name}</strong>
                  </td>
                  <td style={{ color: 'var(--muted)' }}>{client.industry}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {client.projectsDone?.length > 0 ? (
                        client.projectsDone.map((proj, i) => (
                          <span key={i} className="tech-tag" style={{ background: '#eef2f8' }}>
                            {proj}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: 'var(--muted)', fontSize: '12px' }}>Enterprise System</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        font: '11px var(--mono)',
                        color: client.status.includes('Active') ? '#0d9488' : 'var(--muted)'
                      }}
                    >
                      <CheckCircle size={13} /> {client.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Flow CTA */}
      <section className="section section-paper" style={{ textAlign: 'center', borderTop: '1px solid var(--mist)' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Next Chapter</p>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>
          Ready to join our <em>client roster?</em>
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 28px' }}>
          Reach out directly to schedule a project scoping discussion with our studio founders.
        </p>
        <Link to="/contact" className="button button-primary">
          Get in touch <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
