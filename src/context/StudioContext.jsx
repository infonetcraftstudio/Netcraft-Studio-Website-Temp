import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialContactInfo,
  initialServices,
  initialProjects,
  initialClients,
  initialInquiries,
  initialTodos
} from '../data/initialData';
import { supabase, supabaseConfigured } from '../lib/supabase';

const StudioContext = createContext(null);
const TABLES = {
  projects: 'studio_projects',
  clients: 'studio_clients',
  inquiries: 'studio_inquiries',
  todos: 'studio_todos'
};
function defaultData() {
  return {
    contactInfo: initialContactInfo,
    services: initialServices,
    projects: initialProjects,
    clients: initialClients,
    inquiries: initialInquiries,
    todos: initialTodos
  };
}

async function readData() {
  if (!supabase) return defaultData();

  const [projects, clients, inquiries, todos, settings] = await Promise.all([
    supabase.from(TABLES.projects).select('id,data').order('updated_at', { ascending: false }),
    supabase.from(TABLES.clients).select('id,data').order('updated_at', { ascending: false }),
    supabase.from(TABLES.inquiries).select('id,data').order('updated_at', { ascending: false }),
    supabase.from(TABLES.todos).select('id,data').order('updated_at', { ascending: false }),
    supabase.from('studio_settings').select('contact_info,services').eq('id', 1).maybeSingle()
  ]);
  const result = [projects, clients, inquiries, todos, settings].find((query) => query.error);
  if (result) throw result.error;

  const defaults = defaultData();
  return {
    ...defaults,
    projects: projects.data?.map((row) => row.data).filter(Boolean) || defaults.projects,
    clients: clients.data?.map((row) => row.data).filter(Boolean) || defaults.clients,
    inquiries: inquiries.data?.map((row) => row.data).filter(Boolean) || defaults.inquiries,
    todos: todos.data?.map((row) => row.data).filter(Boolean) || defaults.todos,
    contactInfo: { ...defaults.contactInfo, ...(settings.data?.contact_info || {}) },
    services: settings.data?.services?.length ? settings.data.services : defaults.services
  };
}

async function saveData(data) {
  if (!supabase) return;
  const updatedAt = new Date().toISOString();
  const collections = Object.entries(TABLES).map(([key, table]) =>
    supabase.from(table).upsert((data[key] || []).map((record) => ({
      id: String(record.id),
      data: record,
      updated_at: updatedAt
    })))
  );
  const settings = supabase.from('studio_settings').upsert({
    id: 1,
    contact_info: data.contactInfo || {},
    services: data.services || initialServices,
    updated_at: updatedAt
  });
  const results = await Promise.all([...collections, settings]);
  const result = results.find((query) => query.error);
  if (result) throw result.error;
}

export function StudioProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [clients, setClients] = useState(initialClients);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [todos, setTodos] = useState(initialTodos);
  const [services] = useState(initialServices);

  const [backendConnected, setBackendConnected] = useState(supabaseConfigured);
  const [databaseConnected, setDatabaseConnected] = useState(supabaseConfigured);

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() =>
    sessionStorage.getItem('netcraft-admin-authenticated') === 'true'
  );

  // Global Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3800);
  };

  const closeToast = () => setToast(null);

  // Supabase persistence helper. The browser only uses the publishable key.
  const databaseCall = async (url, method = 'GET', body = null) => {
    if (!supabase) return null;
    try {
      const parts = url.split('/').filter(Boolean);
      const resource = parts[1];
      const id = parts[2];
      const table = TABLES[resource];

      if (url === '/api/data' && method === 'GET') return await readData();
      if (url === '/api/data/reset' && method === 'POST') {
        const data = defaultData();
        await saveData(data);
        return data;
      }
      if (url === '/api/data/import' && method === 'POST') {
        await saveData({ ...defaultData(), ...body });
        return body;
      }
      if (resource === 'contact' && method === 'PUT') {
        const current = await supabase.from('studio_settings').select('contact_info').eq('id', 1).maybeSingle();
        if (current.error) throw current.error;
        const contactInfo = { ...initialContactInfo, ...(current.data?.contact_info || {}), ...body };
        const result = await supabase.from('studio_settings').upsert({ id: 1, contact_info: contactInfo, services: initialServices });
        if (result.error) throw result.error;
        return contactInfo;
      }
      if (!table || !id && method !== 'POST') return null;

      if (method === 'GET') {
        const result = await supabase.from(table).select('id,data').order('updated_at', { ascending: false });
        if (result.error) throw result.error;
        return result.data.map((row) => row.data).filter(Boolean);
      }
      if (method === 'POST') {
        const result = await supabase.from(table).upsert({ id: String(body.id), data: body });
        if (result.error) throw result.error;
        return body;
      }

      const existing = await supabase.from(table).select('data').eq('id', id).single();
      if (existing.error) throw existing.error;
      const updated = url.endsWith('/toggle')
        ? { ...existing.data.data, status: existing.data.data.status === 'completed' ? 'pending' : 'completed' }
        : { ...existing.data.data, ...body };
      if (method === 'DELETE') {
        const result = await supabase.from(table).delete().eq('id', id);
        if (result.error) throw result.error;
        return { success: true, id };
      }
      const result = await supabase.from(table).upsert({ id, data: updated });
      if (result.error) throw result.error;
      return updated;
    } catch (error) {
      console.error('Supabase operation failed:', error);
      setBackendConnected(false);
      setDatabaseConnected(false);
      return null;
    }
  };

  // Initialize the UI directly from Supabase.
  useEffect(() => {
    let isMounted = true;
    async function initFromDatabase() {
      try {
        const data = await readData();
        if (!isMounted) return;
        setBackendConnected(supabaseConfigured);
        setDatabaseConnected(supabaseConfigured);
        if (Array.isArray(data.projects)) setProjects(data.projects);
        if (Array.isArray(data.clients)) setClients(data.clients);
        if (data.contactInfo && typeof data.contactInfo === 'object') setContactInfo(data.contactInfo);
        if (Array.isArray(data.inquiries)) setInquiries(data.inquiries);
        if (Array.isArray(data.todos)) setTodos(data.todos);
      } catch (error) {
        console.error('Supabase initialization failed:', error);
        if (isMounted) {
          setBackendConnected(false);
          setDatabaseConnected(false);
        }
      }
    }

    initFromDatabase();
    return () => { isMounted = false; };
  }, []);

  // ----------------------
  // THINGS TO DO (TODOS) CRUD
  // ----------------------
  const addTodo = async (todoData) => {
    const newTodo = {
      id: `todo-${Date.now()}`,
      title: todoData.title || 'Untitled Task',
      category: todoData.category || 'General',
      priority: todoData.priority || 'medium',
      status: todoData.status || 'pending',
      dueDate: todoData.dueDate || new Date().toISOString().slice(0, 10),
      assignedTo: todoData.assignedTo || 'Squad Lead',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    setTodos((prev) => [newTodo, ...prev]);
    showToast(`Task added to Things to Do!`);
    await databaseCall('/api/todos', 'POST', newTodo);
    return newTodo;
  };

  const updateTodo = async (id, updatedData) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
    showToast(`Task updated successfully!`);
    await databaseCall(`/api/todos/${id}`, 'PUT', updatedData);
  };

  const toggleTodoStatus = async (id) => {
    let nextStatus = 'completed';
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          nextStatus = t.status === 'completed' ? 'pending' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
    showToast(nextStatus === 'completed' ? `Task completed! ✓` : `Task marked as pending`, 'info');
    await databaseCall(`/api/todos/${id}/toggle`, 'PATCH');
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast(`Task deleted.`, 'info');
    await databaseCall(`/api/todos/${id}`, 'DELETE');
  };

  // ----------------------
  // PROJECTS CRUD
  // ----------------------
  const addProject = async (projectData) => {
    const newProj = {
      ...projectData,
      id: `proj-${Date.now()}`,
      status: projectData.status || 'Completed',
      featured: Boolean(projectData.featured),
      techStack: Array.isArray(projectData.techStack)
        ? projectData.techStack
        : (projectData.techStack || '').split(',').map((s) => s.trim()).filter(Boolean)
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${newProj.title}" added successfully!`);
    await databaseCall('/api/projects', 'POST', newProj);
    return newProj;
  };

  const updateProject = async (id, updatedData) => {
    const formatted = {
      ...updatedData,
      techStack: Array.isArray(updatedData.techStack)
        ? updatedData.techStack
        : (updatedData.techStack || '').split(',').map((s) => s.trim()).filter(Boolean)
    };
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...formatted } : p))
    );
    showToast(`Project updated successfully!`);
    await databaseCall(`/api/projects/${id}`, 'PUT', formatted);
  };

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast(`Project deleted.`, 'info');
    await databaseCall(`/api/projects/${id}`, 'DELETE');
  };

  const toggleProjectFeatured = async (id) => {
    let nextVal = false;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          nextVal = !p.featured;
          return { ...p, featured: nextVal };
        }
        return p;
      })
    );
    await databaseCall(`/api/projects/${id}`, 'PUT', { featured: nextVal });
  };

  // ----------------------
  // CLIENTS CRUD
  // ----------------------
  const addClient = async (clientData) => {
    const newClient = {
      ...clientData,
      id: `cli-${Date.now()}`,
      rating: Number(clientData.rating) || 5,
      status: clientData.status || 'Active Partner',
      projectsDone: Array.isArray(clientData.projectsDone)
        ? clientData.projectsDone
        : (clientData.projectsDone || '').split(',').map((s) => s.trim()).filter(Boolean)
    };
    setClients((prev) => [...prev, newClient]);
    showToast(`Client "${newClient.name}" added!`);
    await databaseCall('/api/clients', 'POST', newClient);
    return newClient;
  };

  const updateClient = async (id, updatedData) => {
    const formatted = {
      ...updatedData,
      rating: Number(updatedData.rating) || 5,
      projectsDone: Array.isArray(updatedData.projectsDone)
        ? updatedData.projectsDone
        : (updatedData.projectsDone || '').split(',').map((s) => s.trim()).filter(Boolean)
    };
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...formatted } : c))
    );
    showToast(`Client information updated!`);
    await databaseCall(`/api/clients/${id}`, 'PUT', formatted);
  };

  const deleteClient = async (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast(`Client deleted.`, 'info');
    await databaseCall(`/api/clients/${id}`, 'DELETE');
  };

  // ----------------------
  // CONTACT INFO & INQUIRIES
  // ----------------------
  const updateContactInfo = async (newInfo) => {
    setContactInfo((prev) => ({ ...prev, ...newInfo }));
    showToast(`Studio contact details updated!`);
    await databaseCall('/api/contact', 'PUT', newInfo);
  };

  const submitInquiry = async (inquiryData) => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16).replace('T', ' ');
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: dateStr,
      status: 'new'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    await databaseCall('/api/inquiries', 'POST', newInquiry);

    const response = await fetch('/api/send-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.error || `Email server returned ${response.status}`);
    }

    showToast(`Thank you! Your message has been sent to our studio team.`);

    return newInquiry;
  };

  const updateInquiryStatus = async (id, status) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry marked as ${status}`);
    await databaseCall(`/api/inquiries/${id}`, 'PUT', { status });
  };

  const deleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast(`Inquiry deleted`, 'info');
    await databaseCall(`/api/inquiries/${id}`, 'DELETE');
  };

  // ----------------------
  // ADMIN AUTHENTICATION
  // ----------------------
  const adminLogin = (passcode) => {
    if (['admin123', 'netcraft2026', 'admin'].includes(passcode.trim())) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('netcraft-admin-authenticated', 'true');
      showToast(`Welcome back to NetCraft Admin!`);
      return true;
    }
    showToast(`Invalid passcode. Try 'admin123'`, 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('netcraft-admin-authenticated');
    showToast(`Signed out of Admin`, 'info');
  };

  // ----------------------
  // RESET / BACKUP
  // ----------------------
  const resetToDefaults = async () => {
    setProjects(initialProjects);
    setClients(initialClients);
    setContactInfo(initialContactInfo);
    setInquiries(initialInquiries);
    setTodos(initialTodos);

    await databaseCall('/api/data/reset', 'POST');
    showToast(`All data restored to factory defaults!`);
  };

  const exportBackup = () => {
    const data = {
      projects,
      clients,
      contactInfo,
      inquiries,
      todos,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `netcraft-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Backup file downloaded!`);
  };

  const importBackup = async (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects) setProjects(data.projects);
      if (data.clients) setClients(data.clients);
      if (data.contactInfo) setContactInfo(data.contactInfo);
      if (data.inquiries) setInquiries(data.inquiries);
      if (data.todos) setTodos(data.todos);

      await databaseCall('/api/data/import', 'POST', data);
      showToast(`Backup restored successfully!`);
      return true;
    } catch (e) {
      showToast(`Failed to parse backup JSON: ${e.message}`, 'error');
      return false;
    }
  };

  return (
    <StudioContext.Provider
      value={{
        projects,
        clients,
        contactInfo,
        inquiries,
        todos,
        services,
        backendConnected,
        databaseConnected,
        toast,
        showToast,
        closeToast,
        // Todos
        addTodo,
        updateTodo,
        toggleTodoStatus,
        deleteTodo,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        // Clients
        addClient,
        updateClient,
        deleteClient,
        // Contact
        updateContactInfo,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        // Admin
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        // Reset / Backup
        resetToDefaults,
        exportBackup,
        importBackup
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
