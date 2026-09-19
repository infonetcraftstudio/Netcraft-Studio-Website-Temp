import React from 'react';
import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { ArrowUp, ArrowUpRight, Shield, Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export default function Footer() {
  const { contactInfo } = useStudio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* Column 1: Brand & Strategic Purpose */}
        <div className="footer-brand">
          <Link to="/" className="footer-brand-header" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white', marginBottom: '16px' }}>
            <BrandMark size={28} />
            <div>
              <strong style={{ display: 'block', fontSize: '15px', letterSpacing: '0.5px' }}>NETCRAFT STUDIO</strong>
              <span style={{ fontSize: '10px', color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>SYSTEMS &amp; DIGITAL CRAFT</span>
            </div>
          </Link>
          <p style={{ color: '#9eb0cc', fontSize: '13px', lineHeight: '1.6', margin: '0 0 20px', maxWidth: '320px' }}>
            Service &amp; Product based IT company building high-performance web platforms, mobile apps, desktop software, and intelligent automation systems.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)' }}>
            <span>BASE // Coimbatore, Tamil Nadu, India</span>
            <span style={{ color: '#687994' }}>STUDIO // EST. {contactInfo.estYear}</span>
          </div>
        </div>

        {/* Column 2: Core Capabilities */}
        <div className="footer-nav-col">
          <p className="footer-col-title">
            <span>Capabilities</span>
            <span className="footer-title-bar"></span>
          </p>
          <ul>
            <li><Link to="/services">Web Development</Link></li>
            <li><Link to="/services">App Development</Link></li>
            <li><Link to="/services">UI/UX Design</Link></li>
            <li><Link to="/services">Website Restructuring</Link></li>
            <li><Link to="/services">Product Development</Link></li>
            <li><Link to="/services">Automation Solutions</Link></li>
            <li><Link to="/services">Internet of Things (IoT)</Link></li>
            <li><Link to="/services">Desktop Applications</Link></li>
          </ul>
        </div>

        {/* Column 3: Studio & Work */}
        <div className="footer-nav-col">
          <p className="footer-col-title">
            <span>Company</span>
            <span className="footer-title-bar"></span>
          </p>
          <ul>
            <li><Link to="/about">Studio Manifesto</Link></li>
            <li><Link to="/projects">Selected Case Studies</Link></li>
            <li><Link to="/clients">Collaborators &amp; Reviews</Link></li>
            <li><a href="#process">Engineering Pipeline</a></li>
            <li><a href="#technology">Technology Matrix</a></li>
            <li><Link to="/contact">Initiate Scoping</Link></li>
          </ul>
        </div>

        {/* Column 4: Resources & Governance */}
        <div className="footer-nav-col">
          <p className="footer-col-title">
            <span>Governance</span>
            <span className="footer-title-bar"></span>
          </p>
          <ul>
            <li><a href="#faq">Enterprise FAQs</a></li>
            <li>
              <span style={{ color: '#8b9cb8', fontSize: '12px' }}>
                Mutual NDA Protected
              </span>
            </li>
            <li>
              <span style={{ color: '#8b9cb8', fontSize: '12px' }}>
                100% IP Code Transfer
              </span>
            </li>
            <li>
              <span style={{ color: '#8b9cb8', fontSize: '12px' }}>
                Sub-100ms Architecture SLA
              </span>
            </li>
            <li>
              <span style={{ color: '#8b9cb8', fontSize: '12px' }}>
                Enterprise Security &amp; Compliance
              </span>
            </li>
          </ul>
        </div>

        {/* Column 5: Direct Telemetry & Contact */}
        <div className="footer-nav-col footer-contact-col">
          <p className="footer-col-title">
            <span>Direct Inquiries</span>
            <span className="footer-title-bar"></span>
          </p>
          <ul className="footer-contact-list">
            <li>
              <a href={`mailto:${contactInfo.email}`} style={{ color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={13} /> {contactInfo.email}
              </a>
            </li>
            <li style={{ color: '#9eb0cc', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={13} color="#687994" /> {contactInfo.phone}
              </span>
              {contactInfo.phoneAlt && (
                <span style={{ fontSize: '12px', color: '#8b9cb8', paddingLeft: '19px' }}>
                  {contactInfo.phoneAlt}
                </span>
              )}
            </li>
            <li style={{ color: '#8b9cb8', fontSize: '12px', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <MapPin size={13} color="#687994" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{contactInfo.address}</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              {contactInfo.whatsapp && (
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--cyan)', fontSize: '11px', textDecoration: 'none' }}
                >
                  WhatsApp ↗
                </a>
              )}
              {contactInfo.instagram && (
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--cyan)', fontSize: '11px', textDecoration: 'none' }}
                >
                  Instagram ↗
                </a>
              )}
            </li>
            <li>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                color: '#0d9488', 
                fontSize: '11px', 
                fontFamily: 'var(--mono)',
                background: 'rgba(13, 148, 136, 0.15)',
                padding: '4px 8px',
                borderRadius: '3px'
              }}>
                <span className="status-dot" style={{ margin: 0, width: '6px', height: '6px' }}></span>
                {contactInfo.status}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-Footer Bar */}
      <div className="footer-bottom">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>© {new Date().getFullYear()} NetCraft Studio. EST. {contactInfo.estYear}. All rights reserved.</span>
        </div>
        <div style={{ color: '#687994', letterSpacing: '0.5px' }}>
          BUILDING DIGITAL SOLUTIONS THAT MOVE BUSINESSES FORWARD.
        </div>
        <button
          onClick={scrollToTop}
          className="footer-back-to-top"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
