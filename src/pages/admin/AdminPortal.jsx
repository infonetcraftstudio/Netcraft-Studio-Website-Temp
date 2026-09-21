import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  LayoutDashboard,
  FolderGit2,
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
  Clock,
  CheckSquare,
  Calendar,
  AlertCircle,
  Server
} from 'lucide-react';

export default function AdminPortal() {
  const {
    projects,
    clients,
    contactInfo,
    inquiries,
    todos = [],
    backendConnected,
    databaseConnected,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectFeatured,
    addClient,
    updateClient,
    deleteClient,
    updateContactInfo,
    updateInquiryStatus,
    deleteInquiry,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    resetToDefaults,
    exportBackup,
    importBackup
  } = useStudio();

  const [activeTab, setActiveTab] = useState('overview');
  const [passcode, setPasscode] = useState('');

  // Modals state
  const [projectModal, setProjectModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [clientModal, setClientModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [todoModal, setTodoModal] = useState({ isOpen: false, mode: 'add', data: null });

  // Quick Todo bar state
  const [quickTodoTitle, setQuickTodoTitle] = useState('');
  const [quickTodoPriority, setQuickTodoPriority] = useState('medium');
  const [quickTodoCategory, setQuickTodoCategory] = useState('General');
  const [quickTodoDue, setQuickTodoDue] = useState('');

  // Contact Info edit state
  const [contactEdit, setContactEdit] = useState(contactInfo);

  // Inquiries filter
  const [inquiryFilter, setInquiryFilter] = useState('all');

  // Todos filter
  const [todoFilter, setTodoFilter] = useState('all');

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
              <h2 style={{ margin: 0, fontSize: '20px' }}>Studio Updates & Operations</h2>
              <span style={{ font: '10px var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                Secure Updates & Operations Console
              </span>
            </div>
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
            Enter your passcode to manage studio updates, things to do, project case studies, client reviews, and incoming inquiries.
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
  const pendingTodosCount = todos.filter((t) => t.status !== 'completed').length;
  const completedTodosCount = todos.filter((t) => t.status === 'completed').length;
  const inProgressTodosCount = todos.filter((t) => t.status === 'in_progress').length;
  const highPriorityTodosCount = todos.filter((t) => t.priority === 'high' && t.status !== 'completed').length;

  // Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (todoFilter === 'all') return true;
    if (todoFilter === 'pending') return todo.status === 'pending';
    if (todoFilter === 'in_progress') return todo.status === 'in_progress';
    if (todoFilter === 'completed') return todo.status === 'completed';
    if (todoFilter === 'high_priority') return todo.priority === 'high' && todo.status !== 'completed';
    return true;
  });

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ font: '10px var(--mono)', color: 'var(--cyan)', letterSpacing: '1px' }}>
              NETCRAFT // ADMIN
            </span>
            <span
              style={{
                fontSize: '9px',
                background: databaseConnected ? 'rgba(45,212,191,0.2)' : 'rgba(234,179,8,0.2)',
              color: databaseConnected ? 'var(--cyan)' : '#fde047',
                padding: '2px 6px',
                borderRadius: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
              title={databaseConnected ? 'Connected to Supabase database' : 'Supabase database connection unavailable'}
            >
              {databaseConnected ? '● DATABASE CONNECTED' : '○ DATABASE OFFLINE'}
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
            className={`admin-nav-item ${activeTab === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveTab('todos')}
          >
            <CheckSquare size={17} />
            <span>Things to Do</span>
            <span
              className="admin-nav-count"
              style={{
                background: pendingTodosCount > 0 ? '#ea580c' : 'rgba(255,255,255,0.1)',
                color: 'white'
              }}
            >
              {pendingTodosCount}
            </span>
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

              <div
                className="metric-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('todos')}
              >
                <div className="metric-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
                  <CheckSquare size={22} />
                </div>
                <div className="metric-info">
                  <strong>{pendingTodosCount}</strong>
                  <span>Things to Do ({completedTodosCount} completed)</span>
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
                    onClick={() => setTodoModal({ isOpen: true, mode: 'add', data: null })}
                  >
                    <span>Add Task to Things to Do</span>
                    <Plus size={14} />
                  </button>
                  <button
                    className="action-btn"
                    style={{ justifyContent: 'space-between', width: '100%', padding: '8px 12px' }}
                    onClick={() => setProjectModal({ isOpen: true, mode: 'add', data: null })}
                  >
                    <span>Add New Project Case Study</span>
                    <Plus size={14} />
                  </button>
                  <button
                    className="action-btn"
                    style={{ justifyContent: 'space-between', width: '100%', padding: '8px 12px' }}
                    onClick={() => setActiveTab('contact')}
                  >
                    <span>Edit Studio Contact Info</span>
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>

              {/* Things to Do / Priority Tasks Preview */}
              <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Pending Things to Do</h3>
                  <button
                    className="button button-quiet"
                    style={{ fontSize: '11px', padding: 0 }}
                    onClick={() => setActiveTab('todos')}
                  >
                    View All ({todos.length}) →
                  </button>
                </div>

                {todos.filter((t) => t.status !== 'completed').length === 0 ? (
                  <p style={{ color: '#16a34a', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={15} /> All studio tasks completed!
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {todos
                      .filter((t) => t.status !== 'completed')
                      .slice(0, 3)
                      .map((todo) => (
                        <div
                          key={todo.id}
                          style={{
                            padding: '10px 12px',
                            background: 'var(--paper)',
                            borderLeft: todo.priority === 'high' ? '3px solid #dc2626' : '3px solid var(--blue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                            <button
                              type="button"
                              onClick={() => toggleTodoStatus(todo.id)}
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '3px',
                                border: '2px solid #94a3b8',
                                background: 'transparent',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                              title="Mark complete"
                            />
                            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {todo.title}
                            </span>
                          </div>
                          <span style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            borderRadius: '2px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            background: todo.priority === 'high' ? '#fee2e2' : '#fef3c7',
                            color: todo.priority === 'high' ? '#dc2626' : '#d97706',
                            flexShrink: 0
                          }}>
                            {todo.priority}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {client.photoBase64 && (
                            <img
                              src={client.photoBase64}
                              alt=""
                              style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                          )}
                          <strong>{client.name}</strong>
                        </div>
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
            TAB 6: THINGS TO DO (STUDIO TASKS & ROADMAP)
        ========================================================================= */}
        {activeTab === 'todos' && (
          <div>
            <div className="admin-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2>Things to Do</h2>
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'var(--mono)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: databaseConnected ? '#ecfdf5' : '#fffbeb',
                    color: databaseConnected ? '#059669' : '#b45309',
                    border: databaseConnected ? '1px solid #a7f3d0' : '1px solid #fde68a'
                  }}>
                    {databaseConnected ? '● Database Connected' : '○ Database Offline'}
                  </span>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0, fontSize: '13px' }}>
                  Manage operational tasks, sprint deliverables, client commitments, and internal checklists.
                </p>
              </div>

              <button
                className="button button-primary"
                onClick={() => setTodoModal({ isOpen: true, mode: 'add', data: null })}
              >
                <Plus size={14} /> Add New Task
              </button>
            </div>

            {/* Quick-Add Bar */}
            <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '16px 20px', marginBottom: '24px' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!quickTodoTitle.trim()) return;
                  addTodo({
                    title: quickTodoTitle.trim(),
                    priority: quickTodoPriority,
                    category: quickTodoCategory,
                    dueDate: quickTodoDue || new Date().toISOString().slice(0, 10),
                    status: 'pending'
                  });
                  setQuickTodoTitle('');
                }}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="What needs to be done next? (e.g. Deploy client staging API, Review NDA...)"
                  style={{ flex: '1 1 280px' }}
                  value={quickTodoTitle}
                  onChange={(e) => setQuickTodoTitle(e.target.value)}
                />

                <select
                  className="form-input"
                  style={{ width: '130px' }}
                  value={quickTodoPriority}
                  onChange={(e) => setQuickTodoPriority(e.target.value)}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low Priority</option>
                </select>

                <select
                  className="form-input"
                  style={{ width: '140px' }}
                  value={quickTodoCategory}
                  onChange={(e) => setQuickTodoCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Deployment">Deployment</option>
                  <option value="Governance">Governance</option>
                  <option value="Client Work">Client Work</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Performance">Performance</option>
                  <option value="Design">Design</option>
                  <option value="Bugfix">Bugfix</option>
                </select>

                <input
                  type="date"
                  className="form-input"
                  style={{ width: '140px' }}
                  value={quickTodoDue}
                  onChange={(e) => setQuickTodoDue(e.target.value)}
                />

                <button type="submit" className="button button-primary">
                  <Plus size={14} /> Quick Add
                </button>
              </form>
            </div>

            {/* Todo Metrics Row */}
            <div className="admin-metrics" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', marginBottom: '24px' }}>
              <div className="metric-card" style={{ padding: '16px' }}>
                <div className="metric-info">
                  <strong style={{ fontSize: '24px' }}>{todos.length}</strong>
                  <span style={{ fontSize: '11px' }}>Total Tasks</span>
                </div>
              </div>
              <div className="metric-card" style={{ padding: '16px' }}>
                <div className="metric-info">
                  <strong style={{ fontSize: '24px', color: '#ea580c' }}>{pendingTodosCount}</strong>
                  <span style={{ fontSize: '11px' }}>Pending</span>
                </div>
              </div>
              <div className="metric-card" style={{ padding: '16px' }}>
                <div className="metric-info">
                  <strong style={{ fontSize: '24px', color: '#2563eb' }}>{inProgressTodosCount}</strong>
                  <span style={{ fontSize: '11px' }}>In Progress</span>
                </div>
              </div>
              <div className="metric-card" style={{ padding: '16px' }}>
                <div className="metric-info">
                  <strong style={{ fontSize: '24px', color: '#16a34a' }}>{completedTodosCount}</strong>
                  <span style={{ fontSize: '11px' }}>Completed</span>
                </div>
              </div>
              <div className="metric-card" style={{ padding: '16px' }}>
                <div className="metric-info">
                  <strong style={{ fontSize: '24px', color: '#dc2626' }}>{highPriorityTodosCount}</strong>
                  <span style={{ fontSize: '11px' }}>High Priority</span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="filter-bar" style={{ marginBottom: '20px' }}>
              <button
                className={`filter-btn ${todoFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTodoFilter('all')}
              >
                All ({todos.length})
              </button>
              <button
                className={`filter-btn ${todoFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setTodoFilter('pending')}
              >
                Pending ({pendingTodosCount})
              </button>
              <button
                className={`filter-btn ${todoFilter === 'in_progress' ? 'active' : ''}`}
                onClick={() => setTodoFilter('in_progress')}
              >
                In Progress ({inProgressTodosCount})
              </button>
              <button
                className={`filter-btn ${todoFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setTodoFilter('completed')}
              >
                Completed ({completedTodosCount})
              </button>
              <button
                className={`filter-btn ${todoFilter === 'high_priority' ? 'active' : ''}`}
                onClick={() => setTodoFilter('high_priority')}
              >
                High Priority ({highPriorityTodosCount})
              </button>
            </div>

            {/* Task List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredTodos.length === 0 ? (
                <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '40px', textAlign: 'center' }}>
                  <CheckSquare size={36} color="var(--blue)" style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                  <h3 style={{ margin: '0 0 6px', fontSize: '16px' }}>No tasks in this view</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
                    Add a new item using the quick bar above or click "Add New Task".
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => {
                  const isDone = todo.status === 'completed';
                  return (
                    <div
                      key={todo.id}
                      style={{
                        background: 'white',
                        border: '1px solid var(--mist)',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        transition: 'all 0.2s ease',
                        opacity: isDone ? 0.7 : 1
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                        <button
                          type="button"
                          onClick={() => toggleTodoStatus(todo.id)}
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '4px',
                            border: isDone ? '2px solid #16a34a' : '2px solid #cbd5e1',
                            background: isDone ? '#16a34a' : 'transparent',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                          title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isDone && <Check size={14} />}
                        </button>

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <span
                            style={{
                              fontSize: '14px',
                              fontWeight: 600,
                              color: isDone ? 'var(--muted)' : 'var(--ink)',
                              textDecoration: isDone ? 'line-through' : 'none',
                              display: 'block',
                              wordBreak: 'break-word'
                            }}
                          >
                            {todo.title}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                              Assigned: <b>{todo.assignedTo || 'Unassigned'}</b>
                            </span>
                            {todo.dueDate && (
                              <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Calendar size={11} /> {todo.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                        <span
                          style={{
                            fontSize: '10px',
                            padding: '3px 8px',
                            borderRadius: '3px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            background:
                              todo.priority === 'high'
                                ? '#fee2e2'
                                : todo.priority === 'medium'
                                ? '#fef3c7'
                                : '#e2e8f0',
                            color:
                              todo.priority === 'high'
                                ? '#dc2626'
                                : todo.priority === 'medium'
                                ? '#d97706'
                                : '#475569'
                          }}
                        >
                          {todo.priority}
                        </span>

                        <span
                          style={{
                            fontSize: '10px',
                            padding: '3px 8px',
                            borderRadius: '3px',
                            background: 'var(--paper)',
                            border: '1px solid var(--mist)',
                            fontFamily: 'var(--mono)',
                            color: 'var(--muted)'
                          }}
                        >
                          {todo.category}
                        </span>

                        <button
                          className="action-btn"
                          onClick={() => setTodoModal({ isOpen: true, mode: 'edit', data: todo })}
                          title="Edit Task"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => {
                            if (window.confirm(`Delete task "${todo.title}"?`)) {
                              deleteTodo(todo.id);
                            }
                          }}
                          title="Delete Task"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: BACKUP & DATA RESET
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
                  Download a complete snapshot of projects, client reviews, contact info, and inquiry messages.
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
                  Reverts all projects, client reviews, and contact settings to NetCraft Studio original seed data.
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

      {/* =========================================================================
          TODO MODAL (ADD / EDIT)
      ========================================================================= */}
      {todoModal.isOpen && (
        <TodoFormModal
          mode={todoModal.mode}
          initialData={todoModal.data}
          onClose={() => setTodoModal({ isOpen: false, mode: 'add', data: null })}
          onSubmit={(data) => {
            if (todoModal.mode === 'add') {
              addTodo(data);
            } else {
              updateTodo(todoModal.data.id, data);
            }
            setTodoModal({ isOpen: false, mode: 'add', data: null });
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
    imageBase64: initialData?.imageBase64 || '',
    status: initialData?.status || 'Completed',
    featured: initialData?.featured ?? true,
    liveUrl: initialData?.liveUrl || 'https://netcraftstudios.org'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Add New Project Done by Company' : 'Edit Company Project'}</h3>
          <button type="button" onClick={onClose}><X size={20} /></button>
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

            <div className="form-group">
              <label>Portfolio Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setFormData({ ...formData, imageBase64: reader.result });
                  reader.readAsDataURL(file);
                }}
              />
              {formData.imageBase64 && (
                <img
                  src={formData.imageBase64}
                  alt="Portfolio preview"
                  style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', marginTop: '8px', borderRadius: '4px' }}
                />
              )}
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

function ClientFormModal({ mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    logoText: initialData?.logoText || '',
    logoBase64: initialData?.logoBase64 || '',
    photoBase64: initialData?.photoBase64 || '',
    industry: initialData?.industry || 'Fintech',
    website: initialData?.website || 'https://example.com',
    testimonial: initialData?.testimonial || '',
    author: initialData?.author || '',
    authorRole: initialData?.authorRole || '',
    status: initialData?.status || 'Active Partner',
    projectsDone: Array.isArray(initialData?.projectsDone) ? initialData.projectsDone.join(', ') : (initialData?.projectsDone || '')
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Add New Client Record' : 'Edit Client Record'}</h3>
          <button type="button" onClick={onClose}><X size={20} /></button>
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

            <div className="form-group">
              <label>Client Logo</label>
              <input
                type="file"
                accept="image/*"
                className="form-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setFormData({ ...formData, logoBase64: reader.result });
                  reader.readAsDataURL(file);
                }}
              />
              {formData.logoBase64 && (
                <img
                  src={formData.logoBase64}
                  alt="Client logo preview"
                  style={{ width: '120px', height: '56px', objectFit: 'contain', marginTop: '8px' }}
                />
              )}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

function TodoFormModal({ mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'General',
    priority: initialData?.priority || 'medium',
    status: initialData?.status || 'pending',
    dueDate: initialData?.dueDate || new Date().toISOString().slice(0, 10),
    assignedTo: initialData?.assignedTo || 'Squad Lead'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Add Task to Things to Do' : 'Edit Studio Task'}</h3>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="modal-body">
            <div className="form-group">
              <label>Task Title / Deliverable *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Deploy V2 client portal staging build"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Deployment">Deployment</option>
                  <option value="Governance">Governance</option>
                  <option value="Client Work">Client Work</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Performance">Performance</option>
                  <option value="Design">Design</option>
                  <option value="Bugfix">Bugfix</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="high">High Priority (Urgent)</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Client Photo</label>
              <input
                type="file"
                accept="image/*"
                className="form-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setFormData({ ...formData, photoBase64: reader.result });
                  reader.readAsDataURL(file);
                }}
              />
              {formData.photoBase64 && (
                <img
                  src={formData.photoBase64}
                  alt="Client preview"
                  style={{ width: '72px', height: '72px', objectFit: 'cover', marginTop: '8px', borderRadius: '50%' }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Assigned To</label>
              <input
                type="text"
                className="form-input"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                placeholder="e.g. Lead Squad / Operations / Frontend"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="button button-quiet" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {mode === 'add' ? 'Add Task' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
