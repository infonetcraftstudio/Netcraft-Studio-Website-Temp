import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight, Mail, Phone, MapPin, Clock, CheckCircle2, Send, Globe } from 'lucide-react';

export default function Contact() {
  const { contactInfo, services, submitInquiry } = useStudio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: services[0]?.title || 'Web Development',
    budget: '$50k - $100k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out your name, email, and message.');
      return;
    }

    submitInquiry(formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      service: services[0]?.title || 'Web Development',
      budget: '$50k - $100k',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <header className="page-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line"></span> 05 / Initiate Project
          </p>
          <h1>
            Have a bold idea?<br />
            <em>Let’s build it.</em>
          </h1>
        </div>
        <p>
          We are currently {contactInfo.status}. Tell us about your project vision, timeline,
          and desired outcomes. A principal partner will review and reply within 24 hours.
        </p>
      </header>

      {/* Main Contact Section */}
      <section className="section section-white">
        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-card-box">
            {submitted ? (
              <div style={{ padding: '32px 10px', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="var(--blue)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '24px', margin: '0 0 10px' }}>Inquiry Received</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto 24px' }}>
                  Thank you! Your inquiry has been logged in our studio admin dispatch. A senior partner will review the details and reach out to you shortly.
                </p>
                <button
                  className="button button-quiet"
                  onClick={() => setSubmitted(false)}
                >
                  Send another inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '22px', margin: '0 0 24px' }}>Project Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Work Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Organization / Company</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Acme Systems"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Area of Capability</label>
                    <select
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Multi-disciplinary Overhaul">Multi-disciplinary Overhaul</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Anticipated Budget Range</label>
                  <select
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="$25k - $50k">$25,000 – $50,000</option>
                    <option value="$50k - $100k">$50,000 – $100,000</option>
                    <option value="$100k - $250k">$100,000 – $250,000</option>
                    <option value="$250k+">$250,000+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Project Brief & Key Goals *</label>
                  <textarea
                    className="form-textarea"
                    required
                    placeholder="Tell us what you're building, target timeline, and any specific technical constraints..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="button button-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  Submit Inquiry to Studio <Send size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Studio Direct Info */}
          <div className="contact-info-panel">
            <div className="info-item">
              <h4>Direct Inquiries</h4>
              <p>
                <a href={`mailto:${contactInfo.email}`} style={{ color: 'var(--blue)' }}>
                  {contactInfo.email} ↗
                </a>
              </p>
            </div>

            <div className="info-item">
              <h4>Direct Telephone</h4>
              <p>{contactInfo.phone}</p>
            </div>

            <div className="info-item">
              <h4>Physical Headquarters</h4>
              <p style={{ maxWidth: '280px', lineHeight: '1.5' }}>
                {contactInfo.address}
              </p>
            </div>

            <div className="info-item">
              <h4>Studio Hours</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
                {contactInfo.officeHours}
              </p>
            </div>

            <div className="info-item">
              <h4>Global Telemetry</h4>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--blue)' }}>
                {contactInfo.coordinates}
              </p>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)', display: 'block', marginTop: '4px' }}>
                {contactInfo.systemCode}
              </span>
            </div>

            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--mist)',
                padding: '20px',
                marginTop: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-dot" style={{ margin: 0 }}></span>
                <strong style={{ fontSize: '12px', font: '500 11px var(--mono)', textTransform: 'uppercase' }}>
                  Availability Status
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
                {contactInfo.status}. We accept a maximum of 3 concurrent client engagements per quarter to protect craft excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
