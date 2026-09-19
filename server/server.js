import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function loadEnvFile() {
  const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env');
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

loadEnvFile();

import {
  initialContactInfo,
  initialServices,
  initialProjects,
  initialClients,
  initialInquiries,
  initialTodos
} from '../src/data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'studio-data.json');
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_TABLES = {
  projects: 'studio_projects',
  clients: 'studio_clients',
  inquiries: 'studio_inquiries',
  todos: 'studio_todos',
  settings: 'studio_settings'
};
let supabaseConnected = false;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to get default dataset
function getDefaultData() {
  return {
    contactInfo: initialContactInfo,
    services: initialServices,
    projects: initialProjects,
    clients: initialClients,
    inquiries: initialInquiries,
    todos: initialTodos,
    lastUpdated: new Date().toISOString()
  };
}

// Load data from disk or initialize
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      // Ensure todos array exists for backwards compatibility
      if (!Array.isArray(parsed.todos)) {
        parsed.todos = initialTodos;
        saveData(parsed);
      }
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read studio data file, fallback to defaults:', err);
  }

  const defaults = getDefaultData();
  saveData(defaults);
  return defaults;
}

// Save data atomically to disk
function saveData(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    persistToSupabase(data).catch((err) => {
      supabaseConnected = false;
      console.error('Failed to persist data to Supabase:', err.message);
    });
    return true;
  } catch (err) {
    console.error('Failed to save studio data file:', err);
    return false;
  }
}

async function supabaseRequest(pathname, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`);
  }

  return response.status === 204 ? null : response.json();
}

async function hydrateFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('Supabase is not configured; using local JSON persistence.');
    return;
  }

  try {
    const [projects, clients, inquiries, todos, settings] = await Promise.all([
      supabaseRequest(`${SUPABASE_TABLES.projects}?select=id,data&order=updated_at.desc`),
      supabaseRequest(`${SUPABASE_TABLES.clients}?select=id,data&order=updated_at.desc`),
      supabaseRequest(`${SUPABASE_TABLES.inquiries}?select=id,data&order=updated_at.desc`),
      supabaseRequest(`${SUPABASE_TABLES.todos}?select=id,data&order=updated_at.desc`),
      supabaseRequest(`${SUPABASE_TABLES.settings}?select=contact_info,services&id=eq.1&limit=1`)
    ]);

    const hasNormalizedData = [projects, clients, inquiries, todos, settings?.[0]?.contact_info]
      .some((value) => Array.isArray(value) ? value.length > 0 : Boolean(value));

    if (hasNormalizedData) {
      const localData = loadData();
      const remoteData = {
        ...localData,
        projects: projects.map((row) => row.data).filter(Boolean),
        clients: clients.map((row) => row.data).filter(Boolean),
        inquiries: inquiries.map((row) => row.data).filter(Boolean),
        todos: todos.map((row) => row.data).filter(Boolean),
        contactInfo: settings?.[0]?.contact_info || localData.contactInfo,
        services: settings?.[0]?.services || localData.services,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(remoteData, null, 2), 'utf-8');
    } else {
      const legacyRows = await supabaseRequest('studio_state?select=state&id=eq.1&limit=1');
      const legacyData = legacyRows?.[0]?.state;
      await persistToSupabase(legacyData && typeof legacyData === 'object' ? legacyData : loadData());
    }
    supabaseConnected = true;
    console.log('Supabase persistence connected.');
  } catch (err) {
    supabaseConnected = false;
    console.error('Supabase unavailable; using local JSON persistence:', err.message);
  }
}

async function persistToSupabase(data) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  const updatedAt = new Date().toISOString();
  const replaceCollection = async (table, records) => {
    await supabaseRequest(`${table}?id=not.is.null`, { method: 'DELETE' });
    if (records.length > 0) {
      await supabaseRequest(table, {
        method: 'POST',
        body: JSON.stringify(records.map((record) => ({
          id: String(record.id),
          data: record,
          updated_at: updatedAt
        })))
      });
    }
  };

  await Promise.all([
    replaceCollection(SUPABASE_TABLES.projects, data.projects || []),
    replaceCollection(SUPABASE_TABLES.clients, data.clients || []),
    replaceCollection(SUPABASE_TABLES.inquiries, data.inquiries || []),
    replaceCollection(SUPABASE_TABLES.todos, data.todos || []),
    supabaseRequest(SUPABASE_TABLES.settings, {
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        contact_info: data.contactInfo || {},
        services: data.services || [],
        updated_at: updatedAt
      })
    })
  ]);
  supabaseConnected = true;
}

// ----------------------
// SYSTEM & HEALTH ROUTES
// ----------------------
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    port: PORT,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: supabaseConnected ? 'Supabase (normalized studio tables)' : 'file-persistent (studio-data.json)'
  });
});

app.get('/api/data', (req, res) => {
  const data = loadData();
  res.json(data);
});

app.post('/api/data/reset', (req, res) => {
  const defaults = getDefaultData();
  saveData(defaults);
  res.json({ success: true, message: 'All studio data reset to defaults', data: defaults });
});

app.post('/api/data/import', (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
  }
  const current = loadData();
  const merged = {
    ...current,
    ...payload,
    lastUpdated: new Date().toISOString()
  };
  saveData(merged);
  res.json({ success: true, message: 'Backup imported successfully', data: merged });
});

// ----------------------
// THINGS TO DO (TODOS)
// ----------------------
app.get('/api/todos', (req, res) => {
  const data = loadData();
  res.json(data.todos || []);
});

app.post('/api/todos', (req, res) => {
  const data = loadData();
  const newTodo = {
    id: `todo-${Date.now()}`,
    title: req.body.title || 'Untitled task',
    category: req.body.category || 'General',
    priority: req.body.priority || 'medium',
    status: req.body.status || 'pending',
    dueDate: req.body.dueDate || new Date().toISOString().slice(0, 10),
    assignedTo: req.body.assignedTo || 'Unassigned',
    createdAt: new Date().toISOString().slice(0, 10)
  };
  data.todos = [newTodo, ...(data.todos || [])];
  saveData(data);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  let updatedTodo = null;
  data.todos = (data.todos || []).map((todo) => {
    if (todo.id === id) {
      updatedTodo = { ...todo, ...req.body };
      return updatedTodo;
    }
    return todo;
  });

  if (!updatedTodo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  saveData(data);
  res.json(updatedTodo);
});

app.patch('/api/todos/:id/toggle', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  let updatedTodo = null;
  data.todos = (data.todos || []).map((todo) => {
    if (todo.id === id) {
      const nextStatus = todo.status === 'completed' ? 'pending' : 'completed';
      updatedTodo = { ...todo, status: nextStatus };
      return updatedTodo;
    }
    return todo;
  });

  if (!updatedTodo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  saveData(data);
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const initialLength = (data.todos || []).length;
  data.todos = (data.todos || []).filter((t) => t.id !== id);

  if (data.todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  saveData(data);
  res.json({ success: true, id });
});

// ----------------------
// PROJECTS CRUD
// ----------------------
app.get('/api/projects', (req, res) => {
  const data = loadData();
  res.json(data.projects || []);
});

app.post('/api/projects', (req, res) => {
  const data = loadData();
  const newProject = {
    ...req.body,
    id: `proj-${Date.now()}`,
    status: req.body.status || 'Completed',
    featured: Boolean(req.body.featured),
    techStack: Array.isArray(req.body.techStack)
      ? req.body.techStack
      : (req.body.techStack || '').split(',').map((s) => s.trim()).filter(Boolean)
  };
  data.projects = [newProject, ...(data.projects || [])];
  saveData(data);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  let updated = null;
  data.projects = (data.projects || []).map((p) => {
    if (p.id === id) {
      updated = {
        ...p,
        ...req.body,
        techStack: Array.isArray(req.body.techStack)
          ? req.body.techStack
          : (req.body.techStack || '').split(',').map((s) => s.trim()).filter(Boolean)
      };
      return updated;
    }
    return p;
  });

  if (!updated) return res.status(404).json({ error: 'Project not found' });
  saveData(data);
  res.json(updated);
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  data.projects = (data.projects || []).filter((p) => p.id !== id);
  saveData(data);
  res.json({ success: true, id });
});

// ----------------------
// CLIENTS CRUD
// ----------------------
app.get('/api/clients', (req, res) => {
  const data = loadData();
  res.json(data.clients || []);
});

app.post('/api/clients', (req, res) => {
  const data = loadData();
  const newClient = {
    ...req.body,
    id: `cli-${Date.now()}`,
    rating: Number(req.body.rating) || 5,
    status: req.body.status || 'Active Partner',
    projectsDone: Array.isArray(req.body.projectsDone)
      ? req.body.projectsDone
      : (req.body.projectsDone || '').split(',').map((s) => s.trim()).filter(Boolean)
  };
  data.clients = [...(data.clients || []), newClient];
  saveData(data);
  res.status(201).json(newClient);
});

app.put('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  let updated = null;
  data.clients = (data.clients || []).map((c) => {
    if (c.id === id) {
      updated = {
        ...c,
        ...req.body,
        rating: Number(req.body.rating) || c.rating,
        projectsDone: Array.isArray(req.body.projectsDone)
          ? req.body.projectsDone
          : (req.body.projectsDone || '').split(',').map((s) => s.trim()).filter(Boolean)
      };
      return updated;
    }
    return c;
  });

  if (!updated) return res.status(404).json({ error: 'Client not found' });
  saveData(data);
  res.json(updated);
});

app.delete('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  data.clients = (data.clients || []).filter((c) => c.id !== id);
  saveData(data);
  res.json({ success: true, id });
});

// ----------------------
// CONTACT INFO & INQUIRIES
// ----------------------
app.get('/api/contact', (req, res) => {
  const data = loadData();
  res.json(data.contactInfo || {});
});

app.put('/api/contact', (req, res) => {
  const data = loadData();
  data.contactInfo = { ...(data.contactInfo || {}), ...req.body };
  saveData(data);
  res.json(data.contactInfo);
});

app.get('/api/inquiries', (req, res) => {
  const data = loadData();
  res.json(data.inquiries || []);
});

app.post('/api/inquiries', (req, res) => {
  const data = loadData();
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 16).replace('T', ' ');
  const newInquiry = {
    ...req.body,
    id: `inq-${Date.now()}`,
    date: dateStr,
    status: 'new'
  };
  data.inquiries = [newInquiry, ...(data.inquiries || [])];
  saveData(data);
  res.status(201).json(newInquiry);
});

app.put('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  let updated = null;
  data.inquiries = (data.inquiries || []).map((inq) => {
    if (inq.id === id) {
      updated = { ...inq, ...req.body };
      return updated;
    }
    return inq;
  });

  if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
  saveData(data);
  res.json(updated);
});

app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  data.inquiries = (data.inquiries || []).filter((inq) => inq.id !== id);
  saveData(data);
  res.json({ success: true, id });
});

// Start Server
loadData(); // Ensure data file is seeded immediately on startup
hydrateFromSupabase().finally(() => app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 NetCraft Studio Backend Server Active`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📁 Database: ${supabaseConnected ? 'Supabase studio_state' : DATA_FILE}`);
  console.log(`=================================================\n`);
}));
