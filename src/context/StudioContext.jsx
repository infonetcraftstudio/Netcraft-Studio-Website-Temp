import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialContactInfo,
  initialServices,
  initialProjects,
  initialClients,
  initialInquiries,
  initialTodos
} from '../data/initialData';

const StudioContext = createContext(null);

const STORAGE_KEYS = {
  PROJECTS: 'netcraft_studio_projects_v1',
  CLIENTS: 'netcraft_studio_clients_v1',
  CONTACT: 'netcraft_studio_contact_v1',
  INQUIRIES: 'netcraft_studio_inquiries_v1',
  TODOS: 'netcraft_studio_todos_v1',
  AUTH: 'netcraft_studio_auth_v1'
};

function getStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn(`Error reading localStorage for ${key}`, e);
  }
  return fallback;
}

function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing localStorage for ${key}`, e);
  }
}

export function StudioProvider({ children }) {
  const [projects, setProjects] = useState(() => getStorage(STORAGE_KEYS.PROJECTS, initialProjects));
  const [clients, setClients] = useState(() => getStorage(STORAGE_KEYS.CLIENTS, initialClients));
  const [contactInfo, setContactInfo] = useState(() => getStorage(STORAGE_KEYS.CONTACT, initialContactInfo));
  const [inquiries, setInquiries] = useState(() => getStorage(STORAGE_KEYS.INQUIRIES, initialInquiries));
  const [todos, setTodos] = useState(() => getStorage(STORAGE_KEYS.TODOS, initialTodos));
  const [services] = useState(initialServices);

  // Backend connection status
  const [backendConnected, setBackendConnected] = useState(false);

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Global Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3800);
  };

  const closeToast = () => setToast(null);

  // API Call helper with auto fallback
  const apiCall = async (url, method = 'GET', body = null) => {
    try {
      const opts = {
        method,
        headers: { 'Content-Type': 'application/json' }
      };
      if (body) opts.body = JSON.stringify(body);
      const res = await fetch(url, opts);
      if (res.ok) {
        setBackendConnected(true);
        return await res.json();
      }
    } catch (err) {
      // Backend not running or connection error
      setBackendConnected(false);
    }
    return null;
  };

  // On mount: Try initializing from backend server
  useEffect(() => {
    let isMounted = true;
    async function initFromBackend() {
      try {
        const statusRes = await fetch('/api/status');
        if (statusRes.ok) {
          if (isMounted) setBackendConnected(true);
          const dataRes = await fetch('/api/data');
          if (dataRes.ok) {
            const data = await dataRes.json();
            if (isMounted) {
              if (Array.isArray(data.projects)) setProjects(data.projects);
              if (Array.isArray(data.clients)) setClients(data.clients);
              if (data.contactInfo && typeof data.contactInfo === 'object') setContactInfo(data.contactInfo);
              if (Array.isArray(data.inquiries)) setInquiries(data.inquiries);
              if (Array.isArray(data.todos)) setTodos(data.todos);
            }
          }
        } else {
          if (isMounted) setBackendConnected(false);
        }
      } catch (e) {
        if (isMounted) setBackendConnected(false);
      }
    }

    initFromBackend();
    return () => { isMounted = false; };
  }, []);

  // Sync state to localStorage as offline safety cache
  useEffect(() => { setStorage(STORAGE_KEYS.PROJECTS, projects); }, [projects]);
  useEffect(() => { setStorage(STORAGE_KEYS.CLIENTS, clients); }, [clients]);
  useEffect(() => { setStorage(STORAGE_KEYS.CONTACT, contactInfo); }, [contactInfo]);
  useEffect(() => { setStorage(STORAGE_KEYS.INQUIRIES, inquiries); }, [inquiries]);
  useEffect(() => { setStorage(STORAGE_KEYS.TODOS, todos); }, [todos]);

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
    await apiCall('/api/todos', 'POST', newTodo);
    return newTodo;
  };

  const updateTodo = async (id, updatedData) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
    showToast(`Task updated successfully!`);
    await apiCall(`/api/todos/${id}`, 'PUT', updatedData);
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
    await apiCall(`/api/todos/${id}/toggle`, 'PATCH');
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast(`Task deleted.`, 'info');
    await apiCall(`/api/todos/${id}`, 'DELETE');
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
    await apiCall('/api/projects', 'POST', newProj);
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
    await apiCall(`/api/projects/${id}`, 'PUT', formatted);
  };

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast(`Project deleted.`, 'info');
    await apiCall(`/api/projects/${id}`, 'DELETE');
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
    await apiCall(`/api/projects/${id}`, 'PUT', { featured: nextVal });
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
    await apiCall('/api/clients', 'POST', newClient);
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
    await apiCall(`/api/clients/${id}`, 'PUT', formatted);
  };

  const deleteClient = async (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast(`Client deleted.`, 'info');
    await apiCall(`/api/clients/${id}`, 'DELETE');
  };

  // ----------------------
  // CONTACT INFO & INQUIRIES
  // ----------------------
  const updateContactInfo = async (newInfo) => {
    setContactInfo((prev) => ({ ...prev, ...newInfo }));
    showToast(`Studio contact details updated!`);
    await apiCall('/api/contact', 'PUT', newInfo);
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
    showToast(`Thank you! Your message has been sent to our studio team.`);
    await apiCall('/api/inquiries', 'POST', newInquiry);
    return newInquiry;
  };

  const updateInquiryStatus = async (id, status) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry marked as ${status}`);
    await apiCall(`/api/inquiries/${id}`, 'PUT', { status });
  };

  const deleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast(`Inquiry deleted`, 'info');
    await apiCall(`/api/inquiries/${id}`, 'DELETE');
  };

  // ----------------------
  // ADMIN AUTHENTICATION
  // ----------------------
  const adminLogin = (passcode) => {
    if (['admin123', 'netcraft2026', 'admin'].includes(passcode.trim())) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      showToast(`Welcome back to NetCraft Admin!`);
      return true;
    }
    showToast(`Invalid passcode. Try 'admin123'`, 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
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

    setStorage(STORAGE_KEYS.PROJECTS, initialProjects);
    setStorage(STORAGE_KEYS.CLIENTS, initialClients);
    setStorage(STORAGE_KEYS.CONTACT, initialContactInfo);
    setStorage(STORAGE_KEYS.INQUIRIES, initialInquiries);
    setStorage(STORAGE_KEYS.TODOS, initialTodos);

    await apiCall('/api/data/reset', 'POST');
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

      await apiCall('/api/data/import', 'POST', data);
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
