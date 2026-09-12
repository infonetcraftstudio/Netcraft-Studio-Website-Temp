import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  Building2,
  Mail,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Lock,
  LogOut,
  Download,
  Upload,
  RefreshCw,
  X,
  Eye,
  Check,
  Archive,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

export default function AdminPortal() {
  const {
    projects,
    members,
    clients,
    contactInfo,
    inquiries,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectFeatured,
    addMember,
    updateMember,
    deleteMember,
    addClient,
    updateClient,
    deleteClient,
    updateContactInfo,
    updateInquiryStatus,
    deleteInquiry,
    resetToDefaults,
    exportBackup,
    importBackup
  } = useStudio();

  const [activeTab, setActiveTab] = useState('overview');
  const [passcode, setPasscode] = useState('');

  // Modals state
  const [projectModal, setProjectModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [memberModal, setMemberModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [clientModal, setClientModal] = useState({ isOpen: false, mode: 'add', data: null });

  // Contact Info edit state
  const [contactEdit, setContactEdit] = useState(contactInfo);

  // Inquiries filter
  const [inquiryFilter, setInquiryFilter] = useState('all');

  // Handle Login
  if (!isAdminAuthenticated) {
    return (
      <div style={{ minHeight: 'calc(100vh - 82px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--paper)' }}>
        <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '8px', color: 'var(--blue)' }}>
              <Lock size={22} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Studio Admin Access</h2>
              <span style={{ font: '10px var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                Restricted Management Portal
              </span>
            </div>
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
            Enter your administrative passcode to manage studio projects, team members, client records, and incoming client inquiries.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(passcode);
            }}
          >
            <div className="form-group">
              <label>Admin Passcode</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>

            <button type="submit" className="button button-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
              Authenticate <Check size={14} />
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--mist)', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '0 0 8px' }}>Quick Demo Access:</p>
            <button
              className="button button-quiet"
              style={{ fontSize: '11px', color: 'var(--blue)' }}
              onClick={() => {
                setPasscode('admin123');
                adminLogin('admin123');
              }}
            >
              Log in with default (admin123)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === 'all') return true;
    return inq.status === inquiryFilter;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ font: '10px var(--mono)', color: 'var(--cyan)', letterSpacing: '1px' }}>
              NETCRAFT // ADMIN
            </span>
            <span style={{ fontSize: '9px', background: 'rgba(45,212,191,0.2)', color: 'var(--cyan)', padding: '2px 6px', borderRadius: '3px' }}>
              LIVE
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', color: 'white' }}>Studio Console</h3>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={17} />
            <span>Manage Projects</span>
            <span className="admin-nav-count">{projects.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            <Users size={17} />
            <span>Manage Members</span>
            <span className="admin-nav-count">{members.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            <Building2 size={17} />
            <span>Manage Clients</span>
            <span className="admin-nav-count">{clients.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('contact');
              setContactEdit(contactInfo);
            }}
          >
            <Mail size={17} />
            <span>Contact & Inquiries</span>
            {newInquiriesCount > 0 && (
              <span className="admin-nav-count" style={{ background: '#2563eb', color: 'white' }}>
                {newInquiriesCount} new
              </span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <Settings size={17} />
            <span>Backup & Reset</span>
          </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={adminLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#ef4444',
              fontSize: '12px',
              fontFamily: 'var(--mono)',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              background: 'rgba(239, 68, 68, 0.1)'
            }}
          >
            <LogOut size={14} /> Exit Admin Session
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="admin-content">
        {/* =========================================================================
            TAB 1: OVERVIEW
        ========================================================================= */}
        {activeTab === 'overview' && (
          <div>
            <div className="admin-header">
              <div>
                <h2>Studio Operations Overview</h2>
                <p style={{ color: 'var(--muted)', margin: '4px 0 0', fontSize: '13px' }}>
                  Real-time metrics, portfolio status, and incoming client inquiries.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="button button-primary"
                  onClick={() => setProjectModal({ isOpen: true, mode: 'add', data: null })}
                >
                  <Plus size={14} /> Add Project
                </button>
                <button
                  className="button button-quiet"
                  onClick={() => setActiveTab('contact')}
                >
                  View Inquiries ({newInquiriesCount})
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="admin-metrics">
              <div className="metric-card">
                <div className="metric-icon">
                  <FolderGit2 size={22} />
                </div>
                <div className="metric-info">
                  <strong>{projects.length}</strong>
                  <span>Shipped Projects</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon" style={{ background: '#f5f3ff', color: 'var(--violet)' }}>
                  <Users size={22} />
                </div>
                <div className="metric-info">
                  <strong>{members.length}</strong>
                  <span>Team Specialists</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon" style={{ background: '#ecfdf5', color: '#0d9488' }}>
                  <Building2 size={22} />
                </div>
                <div className="metric-info">
                  <strong>{clients.length}</strong>
                  <span>Partner Clients</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon" style={{ background: '#fff7ed', color: '#ea580c' }}>
                  <Mail size={22} />
                </div>
                <div className="metric-info">
                  <strong>{inquiries.length}</strong>
                  <span>Client Inquiries ({newInquiriesCount} new)</span>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '36px' }}>
              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Quick Management</h3>
                  <Sparkles size={16} color="var(--blue)" />
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '18px' }}>
                  Easily create new entries or update current studio records across the website.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    className="action-btn"
                    style={{ justifyContent: 'space-between', width: '100%', padding: '8px 12px' }}
                    onClick={() => setMemberModal({ isOpen: true, mode: 'add', data: null })}
                  >
                    <span>Add New Team Member</span>
                    <Plus size={14} />
                  </button>
                  <button
                    className="action-btn"
                    style={{ justifyContent: 'space-between', width: '100%', padding: '8px 12px' }}
                    onClick={() => setClientModal({ isOpen: true, mode: 'add', data: null })}
                  >
                    <span>Add New Client & Review</span>
                    <Plus size={14} />
                  </button>
                  <button
                    className="action-btn"
                    style={{ justifyContent: 'space-between', width: '100%', padding: '8px 12px' }}
                    onClick={() => setActiveTab('contact')}
                  >
                    <span>Edit Studio Contact Info & Telemetry</span>
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Recent Inquiries</h3>
                  <button
                    className="button button-quiet"
                    style={{ fontSize: '11px', padding: 0 }}
                    onClick={() => setActiveTab('contact')}
                  >
                    All ({inquiries.length}) →
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No inquiries received yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {inquiries.slice(0, 3).map((/** @type {any} */ inq) => (
                      <div
                        key={inq.id}
                        style={{
                          padding: '10px 12px',
                          background: inq.status === 'new' ? '#eff6ff' : 'var(--paper)',
                          borderLeft: inq.status === 'new' ? '3px solid var(--blue)' : '3px solid var(--line)',
                          borderRadius: '2px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '13px' }}>{inq.name}</strong>
                          <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{inq.date}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                          {inq.company || inq.email} · <span style={{ color: 'var(--blue)' }}>{inq.service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MANAGE PROJECTS
        ========================================================================= */}
        {activeTab === 'projects' && (
          <div>
            <div className="admin-header">
              <div>
                <h2>Manage Projects Done by Company</h2>
                <p style={{ color: 'var(--muted)', margin: '4px 0 0', fontSize: '13px' }}>
                  Add, edit, feature, or remove showcase projects. Changes instantly reflect on the public website.
                </p>
              </div>
              <button
                className="button button-primary"
                onClick={() => setProjectModal({ isOpen: true, mode: 'add', data: null })}
              >
                <Plus size={14} /> New Project
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title & Client</th>
                    <th>Category</th>
                    <th>Year</th>
                    <th>Tech Stack</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((/** @type {any} */ project) => (
                    <tr key={project.id}>
                      <td>
                        <strong style={{ fontSize: '14px', display: 'block' }}>{project.title}</strong>
                        <span style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                          {project.client}
                        </span>
                      </td>
                      <td>
                        <span className="tech-tag">{project.category}</span>
                      </td>
                      <td style={{ font: '11px var(--mono)' }}>{project.year}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '240px' }}>
                          {project.techStack?.slice(0, 3).map((/** @type {any} */ t, /** @type {number} */ i) => (
                            <span key={i} className="tech-tag" style={{ fontSize: '9px' }}>{t}</span>
                          ))}
                          {project.techStack?.length > 3 && (
                            <span className="tech-tag" style={{ fontSize: '9px' }}>+{project.techStack.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleProjectFeatured(project.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '3px',
                            fontSize: '11px',
                            fontFamily: 'var(--mono)',
                            background: project.featured ? '#eff6ff' : '#f1f5f9',
                            color: project.featured ? 'var(--blue)' : 'var(--muted)'
                          }}
                        >
                          <Sparkles size={12} /> {project.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="action-btn"
                            onClick={() => setProjectModal({ isOpen: true, mode: 'edit', data: project })}
                            title="Edit Project"
                          >
                            <Edit2 size={13} /> Edit
                          </button>
                          <button
                            className="action-btn btn-danger"
                            onClick={() => {
                              if (window.confirm(`Delete "${project.title}"?`)) {
                                deleteProject(project.id);
                              }
                            }}
                            title="Delete Project"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: MANAGE MEMBERS
        ========================================================================= */}
        {activeTab === 'members' && (
          <div>
            <div className="admin-header">
              <div>
                <h2>Manage Studio Members & Specialists</h2>
                <p style={{ color: 'var(--muted)', margin: '4px 0 0', fontSize: '13px' }}>
                  Manage team bios, roles, skills, and avatars shown on the About page.
                </p>
              </div>
              <button
                className="button button-primary"
                onClick={() => setMemberModal({ isOpen: true, mode: 'add', data: null })}
              >
                <Plus size={14} /> Add Member
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Specialist</th>
                    <th>Role & Dept</th>
                    <th>Skills</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((/** @type {any} */ member) => (
                    <tr key={member.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={member.avatar}
                            alt={member.name}
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div>
                            <strong style={{ fontSize: '14px', display: 'block' }}>{member.name}</strong>
                            <span style={{ color: 'var(--muted)', fontSize: '11px' }}>
                              {member.bio?.slice(0, 48)}...
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ display: 'block', fontWeight: 500 }}>{member.role}</span>
                        <span style={{ fontSize: '11px', color: 'var(--blue)', fontFamily: 'var(--mono)' }}>
                          {member.department}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '220px' }}>
                          {member.skills?.map((/** @type {any} */ skill, /** @type {number} */ i) => (
                            <span key={i} className="tech-tag" style={{ fontSize: '9px' }}>{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ font: '11px var(--mono)', color: 'var(--muted)' }}>
                        {member.email || '—'}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="action-btn"
                            onClick={() => setMemberModal({ isOpen: true, mode: 'edit', data: member })}
                          >
                            <Edit2 size={13} /> Edit
                          </button>
                          <button
                            className="action-btn btn-danger"
                            onClick={() => {
                              if (window.confirm(`Remove "${member.name}" from studio team?`)) {
                                deleteMember(member.id);
                              }
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: MANAGE CLIENTS
        ========================================================================= */}
        {activeTab === 'clients' && (
          <div>
            <div className="admin-header">
              <div>
                <h2>Manage Clients & Testimonials</h2>
                <p style={{ color: 'var(--muted)', margin: '4px 0 0', fontSize: '13px' }}>
                  Manage client partnerships, reviews, ratings, and delivered projects list.
                </p>
              </div>
              <button
                className="button button-primary"
                onClick={() => setClientModal({ isOpen: true, mode: 'add', data: null })}
              >
                <Plus size={14} /> Add Client
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Company / Logo</th>
                    <th>Industry</th>
                    <th>Quote / Testimonial</th>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((/** @type {any} */ client) => (
                    <tr key={client.id}>
                      <td>
                        <strong>{client.name}</strong>
                        <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                          {client.logoText}
                        </span>
                      </td>
                      <td>
                        <span className="tech-tag">{client.industry}</span>
                      </td>
                      <td style={{ maxWidth: '280px', fontSize: '12px', color: 'var(--ink)', fontStyle: 'italic' }}>
                        "{client.testimonial?.slice(0, 90)}..."
                      </td>
                      <td>
                        <strong style={{ fontSize: '12px', display: 'block' }}>{client.author}</strong>
                        <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{client.authorRole}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(client.rating || 5)].map((_, /** @type {number} */ i) => (
                            <Star key={i} size={12} fill="#2563eb" color="#2563eb" />
                          ))}
                        </div>
                      </td>
                      <td>
                        <span style={{ font: '10px var(--mono)', color: 'var(--blue)' }}>{client.status}</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="action-btn"
                            onClick={() => setClientModal({ isOpen: true, mode: 'edit', data: client })}
                          >
                            <Edit2 size={13} /> Edit
                          </button>
                          <button
                            className="action-btn btn-danger"
                            onClick={() => {
                              if (window.confirm(`Delete client "${client.name}"?`)) {
                                deleteClient(client.id);
                              }
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: CONTACT & INQUIRIES
        ========================================================================= */}
        {activeTab === 'contact' && (
          <div>
            <div className="admin-header">
              <div>
                <h2>Contact Details & Inquiries Inbox</h2>
                <p style={{ color: 'var(--muted)', margin: '4px 0 0', fontSize: '13px' }}>
                  Update studio contact information and manage incoming prospective project leads.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
              {/* Inquiries Inbox */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>
                    Incoming Client Inquiries ({filteredInquiries.length})
                  </h3>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['all', 'new', 'replied', 'archived'].map((/** @type {string} */ status) => (
                      <button
                        key={status}
                        className={`filter-btn ${inquiryFilter === status ? 'active' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '10px' }}
                        onClick={() => setInquiryFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredInquiries.length === 0 ? (
                  <div style={{ background: 'white', padding: '40px', border: '1px solid var(--mist)', textAlign: 'center' }}>
                    <Mail size={32} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
                    <p style={{ color: 'var(--muted)', margin: 0 }}>No inquiries found in this category.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredInquiries.map((/** @type {any} */ inq) => (
                      <div
                        key={inq.id}
                        style={{
                          background: 'white',
                          border: '1px solid var(--mist)',
                          borderLeft: inq.status === 'new' ? '4px solid var(--blue)' : '4px solid var(--line)',
                          padding: '20px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <strong style={{ fontSize: '15px' }}>{inq.name}</strong>
                            <span style={{ color: 'var(--muted)', fontSize: '13px', marginLeft: '8px' }}>
                              ({inq.email})
                            </span>
                            {inq.company && (
                              <span style={{ display: 'block', fontSize: '12px', color: 'var(--blue)', fontFamily: 'var(--mono)' }}>
                                {inq.company}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                            {inq.date}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          <span className="tech-tag" style={{ background: '#eff6ff', color: 'var(--blue)' }}>
                            Service: {inq.service}
                          </span>
                          {inq.budget && (
                            <span className="tech-tag">Budget: {inq.budget}</span>
                          )}
                        </div>

                        <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--ink)', background: 'var(--paper)', padding: '12px', borderRadius: '4px', margin: '0 0 16px' }}>
                          {inq.message}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <a
                            href={`mailto:${inq.email}?subject=Re: Project Inquiry with NetCraft Studio`}
                            className="button button-quiet"
                            style={{ fontSize: '11px', color: 'var(--blue)' }}
                            onClick={() => updateInquiryStatus(inq.id, 'replied')}
                          >
                            Reply via Email ↗
                          </a>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            {inq.status !== 'replied' && (
                              <button
                                className="action-btn"
                                onClick={() => updateInquiryStatus(inq.id, 'replied')}
                              >
                                Mark Replied
                              </button>
                            )}
                            {inq.status !== 'archived' && (
                              <button
                                className="action-btn"
                                onClick={() => updateInquiryStatus(inq.id, 'archived')}
                              >
                                <Archive size={12} /> Archive
                              </button>
                            )}
                            <button
                              className="action-btn btn-danger"
                              onClick={() => deleteInquiry(inq.id)}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Edit Studio Contact Details */}
              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '28px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '18px' }}>Manage Studio Contact Details</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '24px' }}>
                  Updating these fields will immediately update the email, telephone, address, and availability across the entire website.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateContactInfo(contactEdit);
                  }}
                >
                  <div className="form-group">
                    <label>Studio Contact Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={contactEdit.email || ''}
                      onChange={(e) => setContactEdit({ ...contactEdit, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Studio Direct Telephone</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactEdit.phone || ''}
                      onChange={(e) => setContactEdit({ ...contactEdit, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Physical Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactEdit.address || ''}
                      onChange={(e) => setContactEdit({ ...contactEdit, address: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Telemetry Coordinates</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactEdit.coordinates || ''}
                      onChange={(e) => setContactEdit({ ...contactEdit, coordinates: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Availability Status Badge</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactEdit.status || ''}
                      onChange={(e) => setContactEdit({ ...contactEdit, status: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Studio Office Hours</label>
                    <input
                      type="text"
                      className="form-input"
                      value={contactEdit.officeHours || ''}
                      onChange={(e) => setContactEdit({ ...contactEdit, officeHours: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="button button-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                  >
                    Save Studio Contact Details <Check size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: BACKUP & DATA RESET
        ========================================================================= */}
        {activeTab === 'backup' && (
          <div>
            <div className="admin-header">
              <div>
                <h2>Data Management & Backup</h2>
                <p style={{ color: 'var(--muted)', margin: '4px 0 0', fontSize: '13px' }}>
                  Export all studio records to JSON, import an external backup, or reset to factory defaults.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '28px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '16px' }}>Export JSON Backup</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
                  Download a complete snapshot of projects, team members, client reviews, contact info, and inquiry messages.
                </p>
                <button
                  className="button button-primary"
                  onClick={exportBackup}
                >
                  <Download size={14} /> Download Backup (.json)
                </button>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '28px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '16px' }}>Import JSON Backup</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
                  Restore previously exported studio records from a JSON file.
                </p>
                <input
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  id="backupFileInput"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        importBackup(event.target.result);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
                <button
                  className="button button-quiet"
                  onClick={() => document.getElementById('backupFileInput').click()}
                >
                  <Upload size={14} /> Select Backup File
                </button>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '28px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '16px', color: '#dc2626' }}>Restore Factory Defaults</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
                  Reverts all projects, team members, client reviews, and contact settings to NetCraft Studio original seed data.
                </p>
                <button
                  className="button button-quiet"
                  style={{ color: '#dc2626', borderColor: '#dc2626' }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all data to default? Any custom items will be replaced.')) {
                      resetToDefaults();
                    }
                  }}
                >
                  <RefreshCw size={14} /> Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          PROJECT MODAL (ADD / EDIT)
      ========================================================================= */}
      {projectModal.isOpen && (
        <ProjectFormModal
          mode={projectModal.mode}
          initialData={projectModal.data}
          onClose={() => setProjectModal({ isOpen: false, mode: 'add', data: null })}
          onSubmit={(data) => {
            if (projectModal.mode === 'add') {
              addProject(data);
            } else {
              updateProject(projectModal.data.id, data);
            }
            setProjectModal({ isOpen: false, mode: 'add', data: null });
          }}
        />
      )}

      {/* =========================================================================
          MEMBER MODAL (ADD / EDIT)
      ========================================================================= */}
      {memberModal.isOpen && (
        <MemberFormModal
          mode={memberModal.mode}
          initialData={memberModal.data}
          onClose={() => setMemberModal({ isOpen: false, mode: 'add', data: null })}
          onSubmit={(data) => {
            if (memberModal.mode === 'add') {
              addMember(data);
            } else {
              updateMember(memberModal.data.id, data);
            }
            setMemberModal({ isOpen: false, mode: 'add', data: null });
          }}
        />
      )}

      {/* =========================================================================
          CLIENT MODAL (ADD / EDIT)
      ========================================================================= */}
      {clientModal.isOpen && (
        <ClientFormModal
          mode={clientModal.mode}
          initialData={clientModal.data}
          onClose={() => setClientModal({ isOpen: false, mode: 'add', data: null })}
          onSubmit={(data) => {
            if (clientModal.mode === 'add') {
              addClient(data);
            } else {
              updateClient(clientModal.data.id, data);
            }
            setClientModal({ isOpen: false, mode: 'add', data: null });
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// MODAL SUB-COMPONENTS
// ============================================================================

function ProjectFormModal({ mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    client: initialData?.client || '',
    category: initialData?.category || 'Digital Products',
    tag: initialData?.tag || 'Digital product',
    year: initialData?.year || new Date().getFullYear().toString(),
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    techStack: Array.isArray(initialData?.techStack) ? initialData.techStack.join(', ') : (initialData?.techStack || 'React, TypeScript'),
    metrics: initialData?.metrics || '+40% Performance',
    imageType: initialData?.imageType || 'city',
    status: initialData?.status || 'Completed',
    featured: initialData?.featured ?? true,
    liveUrl: initialData?.liveUrl || 'https://netcraftstudios.org'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Add New Project Done by Company' : 'Edit Company Project'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="modal-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AeroPulse Enterprise"
                />
              </div>

              <div className="form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Aeroform Spatial"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Digital Products">Digital Products</option>
                  <option value="AI & Emerging Tech">AI & Emerging Tech</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Experiences">Mobile Experiences</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tag / Badge</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. AI System"
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2025"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Short Description *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="One sentence summary for the project cards..."
              />
            </div>

            <div className="form-group">
              <label>Detailed Case Overview</label>
              <textarea
                className="form-textarea"
                style={{ minHeight: '90px' }}
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Full case study explanation..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-4">
              <div className="form-group">
                <label>Tech Stack (Comma Separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React, WebGL, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="form-group">
                <label>Key Metric / Impact</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.metrics}
                  onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                  placeholder="+65% Team Velocity"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Visual Style Theme</label>
                <select
                  className="form-select"
                  value={formData.imageType}
                  onChange={(e) => setFormData({ ...formData, imageType: e.target.value })}
                >
                  <option value="city">Architectural Geometric (Blue / City)</option>
                  <option value="purple">Neural Synth (Purple / Violet)</option>
                  <option value="cyan">Digital Signal (Cyan / Teal)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Live URL</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://client-example.com"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
              <input
                type="checkbox"
                id="featuredCheck"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="featuredCheck" style={{ margin: 0, fontSize: '13px', cursor: 'pointer' }}>
                Feature on Homepage & Featured showcase
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="button button-quiet" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {mode === 'add' ? 'Add Project' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MemberFormModal({ mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    department: initialData?.department || 'Engineering',
    bio: initialData?.bio || '',
    avatar: initialData?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    skills: Array.isArray(initialData?.skills) ? initialData.skills.join(', ') : (initialData?.skills || 'React, TypeScript'),
    email: initialData?.email || 'name@netcraftstudios.org'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Add New Team Member' : 'Edit Team Member'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="modal-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elena Vance"
                />
              </div>

              <div className="form-group">
                <label>Role / Job Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Principal Systems Architect"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Engineering / Design / Strategy"
                />
              </div>

              <div className="form-group">
                <label>Studio Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Avatar Photo URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="form-group">
              <label>Bio / Background *</label>
              <textarea
                className="form-textarea"
                required
                style={{ minHeight: '80px' }}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief professional background and focus..."
              />
            </div>

            <div className="form-group">
              <label>Key Skills (Comma Separated)</label>
              <input
                type="text"
                className="form-input"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Design Systems, Distributed Systems, Rust"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="button button-quiet" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {mode === 'add' ? 'Add Member' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ClientFormModal({ mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    logoText: initialData?.logoText || '',
    industry: initialData?.industry || 'Fintech',
    website: initialData?.website || 'https://example.com',
    testimonial: initialData?.testimonial || '',
    author: initialData?.author || '',
    authorRole: initialData?.authorRole || '',
    rating: initialData?.rating || 5,
    status: initialData?.status || 'Active Partner',
    projectsDone: Array.isArray(initialData?.projectsDone) ? initialData.projectsDone.join(', ') : (initialData?.projectsDone || '')
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Add New Client Record' : 'Edit Client Record'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="modal-body">
            <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-4">
              <div className="form-group">
                <label>Company / Client Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Synthetix Labs"
                />
              </div>

              <div className="form-group">
                <label>Logo Text / Monogram</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.logoText}
                  onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                  placeholder="e.g. SYNTHETIX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Industry</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. AI & Robotics"
                />
              </div>

              <div className="form-group">
                <label>Relationship Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active Partner">Active Partner</option>
                  <option value="Completed Project">Completed Project</option>
                  <option value="Retainer Engagement">Retainer Engagement</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Client Testimonial / Feedback *</label>
              <textarea
                className="form-textarea"
                required
                style={{ minHeight: '80px' }}
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                placeholder="What did the client say about working with NetCraft Studio?..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_80px] gap-4">
              <div className="form-group">
                <label>Reviewer Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Dr. Julian Cole"
                />
              </div>

              <div className="form-group">
                <label>Reviewer Title / Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  placeholder="e.g. VP of Product"
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <select
                  className="form-select"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                >
                  <option value={5}>5 ★</option>
                  <option value={4}>4 ★</option>
                  <option value={3}>3 ★</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Projects Completed for Client (Comma Separated)</label>
              <input
                type="text"
                className="form-input"
                value={formData.projectsDone}
                onChange={(e) => setFormData({ ...formData, projectsDone: e.target.value })}
                placeholder="e.g. Synthetix AI Copilot"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="button button-quiet" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {mode === 'add' ? 'Add Client' : 'Save Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
