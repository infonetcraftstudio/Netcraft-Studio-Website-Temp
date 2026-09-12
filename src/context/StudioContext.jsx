import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialContactInfo,
  initialServices,
  initialProjects,
  initialMembers,
  initialClients,
  initialInquiries
} from '../data/initialData';

const StudioContext = createContext(null);

const STORAGE_KEYS = {
  PROJECTS: 'netcraft_studio_projects_v1',
  MEMBERS: 'netcraft_studio_members_v1',
  CLIENTS: 'netcraft_studio_clients_v1',
  CONTACT: 'netcraft_studio_contact_v1',
  INQUIRIES: 'netcraft_studio_inquiries_v1',
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
  const [members, setMembers] = useState(() => getStorage(STORAGE_KEYS.MEMBERS, initialMembers));
  const [clients, setClients] = useState(() => getStorage(STORAGE_KEYS.CLIENTS, initialClients));
  const [contactInfo, setContactInfo] = useState(() => getStorage(STORAGE_KEYS.CONTACT, initialContactInfo));
  const [inquiries, setInquiries] = useState(() => getStorage(STORAGE_KEYS.INQUIRIES, initialInquiries));
  const [services] = useState(initialServices);

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

  // Sync to localStorage
  useEffect(() => { setStorage(STORAGE_KEYS.PROJECTS, projects); }, [projects]);
  useEffect(() => { setStorage(STORAGE_KEYS.MEMBERS, members); }, [members]);
  useEffect(() => { setStorage(STORAGE_KEYS.CLIENTS, clients); }, [clients]);
  useEffect(() => { setStorage(STORAGE_KEYS.CONTACT, contactInfo); }, [contactInfo]);
  useEffect(() => { setStorage(STORAGE_KEYS.INQUIRIES, inquiries); }, [inquiries]);

  // Projects CRUD
  const addProject = (projectData) => {
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
    return newProj;
  };

  const updateProject = (id, updatedData) => {
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
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast(`Project deleted.`, 'info');
  };

  const toggleProjectFeatured = (id) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  // Members CRUD
  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: `mem-${Date.now()}`,
      skills: Array.isArray(memberData.skills)
        ? memberData.skills
        : (memberData.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
      avatar: memberData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      socials: memberData.socials || { twitter: '', linkedin: '', github: '' }
    };
    setMembers((prev) => [...prev, newMember]);
    showToast(`Team member "${newMember.name}" added!`);
    return newMember;
  };

  const updateMember = (id, updatedData) => {
    const formatted = {
      ...updatedData,
      skills: Array.isArray(updatedData.skills)
        ? updatedData.skills
        : (updatedData.skills || '').split(',').map((s) => s.trim()).filter(Boolean)
    };
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...formatted } : m))
    );
    showToast(`Team member details updated!`);
  };

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(`Team member removed.`, 'info');
  };

  // Clients CRUD
  const addClient = (clientData) => {
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
    return newClient;
  };

  const updateClient = (id, updatedData) => {
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
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast(`Client deleted.`, 'info');
  };

  // Contact Info & Inquiries
  const updateContactInfo = (newInfo) => {
    setContactInfo((prev) => ({ ...prev, ...newInfo }));
    showToast(`Studio contact details updated!`);
  };

  const submitInquiry = (inquiryData) => {
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
    return newInquiry;
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry marked as ${status}`);
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast(`Inquiry deleted`, 'info');
  };

  // Admin Authentication
  const adminLogin = (passcode) => {
    // Default passcodes supported: admin123, netcraft2026, admin
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

  // Data management tools
  const resetToDefaults = () => {
    setProjects(initialProjects);
    setMembers(initialMembers);
    setClients(initialClients);
    setContactInfo(initialContactInfo);
    setInquiries(initialInquiries);
    setStorage(STORAGE_KEYS.PROJECTS, initialProjects);
    setStorage(STORAGE_KEYS.MEMBERS, initialMembers);
    setStorage(STORAGE_KEYS.CLIENTS, initialClients);
    setStorage(STORAGE_KEYS.CONTACT, initialContactInfo);
    setStorage(STORAGE_KEYS.INQUIRIES, initialInquiries);
    showToast(`All data restored to factory defaults!`);
  };

  const exportBackup = () => {
    const data = {
      projects,
      members,
      clients,
      contactInfo,
      inquiries,
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

  const importBackup = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects) setProjects(data.projects);
      if (data.members) setMembers(data.members);
      if (data.clients) setClients(data.clients);
      if (data.contactInfo) setContactInfo(data.contactInfo);
      if (data.inquiries) setInquiries(data.inquiries);
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
        members,
        clients,
        contactInfo,
        inquiries,
        services,
        toast,
        showToast,
        closeToast,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        // Members
        addMember,
        updateMember,
        deleteMember,
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
