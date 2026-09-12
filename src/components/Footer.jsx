import React from 'react';
import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { ArrowUp, ArrowUpRight, Shield } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export default function Footer() {
  const { contactInfo } = useStudio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <BrandMark size={26} />
            <h4 style={{ margin: 0 }}>NetCraft Studio</h4>
          </div>
          <p>
            Digital product studio for ambitious teams. We craft intuitive web platforms,
            AI systems, and brand experiences that push technical and design boundaries.
          </p>
          <div style={{ marginTop: '16px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)' }}>
            {contactInfo.coordinates}
          </div>
        </div>

        <div className="footer-nav-col">
          <h5>Navigation</h5>
          <ul>
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/about">About Studio</Link></li>
            <li><Link to="/services">Capabilities</Link></li>
            <li><Link to="/projects">Selected Work</Link></li>
            <li><Link to="/clients">Clients & Reviews</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h5>Studio Direct</h5>
          <ul>
            <li>
              <a href={`mailto:${contactInfo.email}`} style={{ color: 'var(--cyan)' }}>
                {contactInfo.email} ↗
              </a>
            </li>
            <li>
              <span style={{ color: '#9eb0cc' }}>{contactInfo.phone}</span>
            </li>
            <li style={{ maxWidth: '220px', color: '#8b9cb8', fontSize: '12px' }}>
              {contactInfo.address}
            </li>
            <li>
              <span style={{ color: '#0d9488', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                ● {contactInfo.status}
              </span>
            </li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h5>Internal</h5>
          <ul>
            <li>
              <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} color="var(--cyan)" /> Admin Control Center
              </Link>
            </li>
            <li>
              <span style={{ fontSize: '11px', color: '#687994', fontFamily: 'var(--mono)' }}>
                {contactInfo.systemCode}
              </span>
            </li>
            <li>
              <button
                onClick={scrollToTop}
                style={{
                  color: 'white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '12px',
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  padding: '6px 10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '3px'
                }}
              >
                <ArrowUp size={13} /> Back to top
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} NetCraft Studio. All rights reserved. EST. {contactInfo.estYear}.</div>
        <div>CRAFTING DIGITAL EXPERIENCES WITH INTENT</div>
      </div>
    </footer>
  );
}
