import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { ArrowRight, CheckCircle, Send } from 'lucide-react';

export default function Clients() {
  const { clients, submitInquiry } = useStudio();
  const [reviewData, setReviewData] = useState({
    clientId: clients[0]?.id || '',
    name: '',
    email: '',
    product: clients[0]?.projectsDone?.[0] || '',
    rating: 5,
    review: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const selectedClient = clients.find((client) => client.id === reviewData.clientId);
  const requestedProducts = selectedClient?.projectsDone || [];

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!selectedClient || !reviewData.product || !reviewData.review.trim()) return;

    await submitInquiry({
      type: 'client-review',
      name: reviewData.name.trim(),
      email: reviewData.email.trim(),
      company: selectedClient.name,
      service: reviewData.product,
      reviewFor: reviewData.product,
      rating: Number(reviewData.rating),
      message: reviewData.review.trim()
    });

    setReviewSubmitted(true);
    setReviewData((current) => ({ ...current, name: '', email: '', review: '' }));
  };

  return (
    <div className="clients-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
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

              <p className="client-quote">
                "{client.testimonial}"
              </p>

              <span style={{ display: 'block', marginBottom: '18px', color: 'var(--muted)', font: '10px var(--mono)', textTransform: 'uppercase' }}>
                Review for: {client.projectsDone?.join(', ') || 'Completed project'}
              </span>

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

      {/* Client Review Submission */}
      <section className="section section-light">
        <div className="contact-container">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line"></span> Share Your Experience
            </p>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>
              Review the product <em>you requested.</em>
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: '480px', lineHeight: '1.7' }}>
              Tell us how the product or project delivered for your company worked for you.
            </p>
          </div>

          <div className="contact-card-box">
            {reviewSubmitted ? (
              <div style={{ padding: '20px 0', textAlign: 'center' }}>
                <CheckCircle size={42} color="var(--blue)" style={{ margin: '0 auto 14px' }} />
                <h3 style={{ fontSize: '22px', margin: '0 0 8px' }}>Review Received</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                  Thank you for reviewing the product you requested. Our studio team will review your feedback shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Client / Company *</label>
                    <select
                      className="form-select"
                      required
                      value={reviewData.clientId}
                      onChange={(event) => {
                        const client = clients.find((item) => item.id === event.target.value);
                        setReviewData({
                          ...reviewData,
                          clientId: event.target.value,
                          product: client?.projectsDone?.[0] || ''
                        });
                      }}
                    >
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Product / Project Requested *</label>
                    <select
                      className="form-select"
                      required
                      value={reviewData.product}
                      onChange={(event) => setReviewData({ ...reviewData, product: event.target.value })}
                    >
                      {requestedProducts.map((product) => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={reviewData.name}
                      onChange={(event) => setReviewData({ ...reviewData, name: event.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Work Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      value={reviewData.email}
                      onChange={(event) => setReviewData({ ...reviewData, email: event.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <select
                    className="form-select"
                    value={reviewData.rating}
                    onChange={(event) => setReviewData({ ...reviewData, rating: Number(event.target.value) })}
                  >
                    <option value={5}>5 stars</option>
                    <option value={4}>4 stars</option>
                    <option value={3}>3 stars</option>
                    <option value={2}>2 stars</option>
                    <option value={1}>1 star</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    className="form-textarea"
                    required
                    value={reviewData.review}
                    onChange={(event) => setReviewData({ ...reviewData, review: event.target.value })}
                    placeholder="How did the requested product help your company?"
                  />
                </div>

                <button type="submit" className="button button-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit Product Review <Send size={14} />
                </button>
              </form>
            )}
          </div>
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
