import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandMark from './BrandMark';
import { ArrowUpRight, Shield, Menu, X } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { inquiries } = useStudio();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' }
  ];

  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'new').length;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="NetCraft Studio home">
          <BrandMark size={30} />
          <span>
            NETCRAFT<br />
            <b>STUDIO</b>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="header-right">
          <Link
            to="/admin"
            className={`header-admin-btn ${isActive('/admin') ? 'active' : ''}`}
            title="Admin Management Portal"
          >
            <Shield size={14} />
            <span>Admin</span>
            {newInquiriesCount > 0 && (
              <span
                style={{
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 'bold'
                }}
              >
                {newInquiriesCount}
              </span>
            )}
          </Link>

          <Link to="/contact" className="header-cta">
            Start a project <ArrowUpRight size={13} />
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-drawer">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/admin"
              className="button button-primary"
              style={{ justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              <Shield size={16} /> Admin Portal ({newInquiriesCount} new)
            </Link>
            <Link
              to="/contact"
              className="button button-primary"
              style={{ background: '#2563eb', justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Start a project <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
