import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageNavigator from './components/PageNavigator';
import Toast from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import AdminPortal from './pages/admin/AdminPortal';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminPortal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <PageNavigator />}

      <Toast />
    </div>
  );
}
