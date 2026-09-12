import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

const PAGE_FLOW = [
  { path: '/', label: 'Home', num: '01' },
  { path: '/about', label: 'About', num: '02' },
  { path: '/services', label: 'Services', num: '03' },
  { path: '/projects', label: 'Projects', num: '04' },
  { path: '/clients', label: 'Clients', num: '05' },
  { path: '/contact', label: 'Contact', num: '06' }
];

export default function PageNavigator() {
  const location = useLocation();
  const navigate = useNavigate();
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 80) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // If in admin portal, hide floating page navigator (after all hooks have been called)
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const currentIndex = PAGE_FLOW.findIndex((p) => p.path === location.pathname);
  const activePage = currentIndex !== -1 ? PAGE_FLOW[currentIndex] : PAGE_FLOW[0];

  const prevPage = currentIndex > 0 ? PAGE_FLOW[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGE_FLOW.length - 1 ? PAGE_FLOW[currentIndex + 1] : null;

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <>
      {/* Discreet bottom alert when reached bottom to advance to next page */}
      {atBottom && nextPage && (
        <div
          onClick={() => goTo(nextPage.path)}
          style={{
            position: 'fixed',
            bottom: '76px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--blue)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '11px',
            fontFamily: 'var(--mono)',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            zIndex: 44,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
            animation: 'bounce 2s infinite',
            whiteSpace: 'nowrap',
            maxWidth: 'calc(100vw - 32px)'
          }}
        >
          <span>Continue: <b>{nextPage.label}</b></span>
          <ChevronRight size={14} />
        </div>
      )}

      <div className="page-navigator" role="navigation" aria-label="Sequential Page Navigator">
        <button
          className="nav-arrow-btn"
          disabled={!prevPage}
          onClick={() => prevPage && goTo(prevPage.path)}
          title={prevPage ? `Previous: ${prevPage.label}` : 'First Page'}
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="nav-dots">
          {PAGE_FLOW.map((/** @type {any} */ page, /** @type {number} */ idx) => (
            <div
              key={page.path}
              className={`nav-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(page.path)}
              title={`${page.num} / ${page.label}`}
            />
          ))}
        </div>

        <div className="nav-curr-label">
          {activePage.num} / 06 {activePage.label}
        </div>

        <button
          className="nav-arrow-btn"
          disabled={!nextPage}
          onClick={() => nextPage && goTo(nextPage.path)}
          title={nextPage ? `Next: ${nextPage.label}` : 'End of Pages'}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </>
  );
}
