import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Smartphone, 
  Database, 
  Cloud, 
  Cpu, 
  GitBranch, 
  Boxes,
  CheckCircle2
} from 'lucide-react';

export default function TechStackMatrix() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: <Code2 size={20} color="var(--blue)" />,
      desc: 'Reactive, type-safe interfaces built for sub-second load times and fluid 120fps interactions.',
      techs: [
        { name: 'React 19', tag: 'Core Library', highlight: true },
        { name: 'TypeScript', tag: 'Type Safety', highlight: true },
        { name: 'Next.js', tag: 'SSR / Edge', highlight: true },
        { name: 'Tailwind CSS', tag: 'Design Tokens', highlight: false },
        { name: 'Vite', tag: 'Build Engine', highlight: false },
        { name: 'Framer Motion', tag: 'Micro-interactions', highlight: false }
      ]
    },
    {
      id: 'backend',
      name: 'Backend & APIs',
      icon: <Server size={20} color="#0d9488" />,
      desc: 'High-concurrency servers, event streams, and resilient APIs engineered to scale linearly.',
      techs: [
        { name: 'Node.js', tag: 'Async Runtime', highlight: true },
        { name: 'Python / FastAPI', tag: 'High Performance', highlight: true },
        { name: 'Go', tag: 'Systems Level', highlight: false },
        { name: 'GraphQL', tag: 'Query Layer', highlight: false },
        { name: 'REST & gRPC', tag: 'Microservices', highlight: false },
        { name: 'WebSockets', tag: 'Realtime Bi-directional', highlight: false }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile Platforms',
      icon: <Smartphone size={20} color="#8b5cf6" />,
      desc: 'Polished iOS and Android applications with native performance and unified design systems.',
      techs: [
        { name: 'React Native', tag: 'Cross-Platform', highlight: true },
        { name: 'Expo', tag: 'Universal Deployment', highlight: true },
        { name: 'Flutter', tag: 'Native Compiled', highlight: false },
        { name: 'Swift (iOS)', tag: 'Platform Native', highlight: false },
        { name: 'Kotlin (Android)', tag: 'Platform Native', highlight: false },
        { name: 'Offline Sync', tag: 'Local SQLite/MMKV', highlight: false }
      ]
    },
    {
      id: 'database',
      name: 'Databases & Realtime',
      icon: <Database size={20} color="#ea580c" />,
      desc: 'ACID-compliant storage, caching hierarchies, and vector embeddings engineered for zero data loss.',
      techs: [
        { name: 'PostgreSQL', tag: 'Relational Core', highlight: true },
        { name: 'Redis', tag: 'In-Memory Cache', highlight: true },
        { name: 'Supabase', tag: 'Realtime DB', highlight: false },
        { name: 'pgvector / Pinecone', tag: 'AI Embeddings', highlight: true },
        { name: 'Prisma ORM', tag: 'Type-Safe Queries', highlight: false },
        { name: 'MongoDB', tag: 'Document Store', highlight: false }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud & Infrastructure',
      icon: <Cloud size={20} color="#2563eb" />,
      desc: 'Automated CI/CD pipelines, container orchestration, and multi-region edge deployment.',
      techs: [
        { name: 'AWS Cloud', tag: 'Enterprise Host', highlight: true },
        { name: 'Docker', tag: 'Containerization', highlight: true },
        { name: 'Kubernetes', tag: 'Orchestration', highlight: false },
        { name: 'Vercel / Cloudflare', tag: 'Global Edge', highlight: true },
        { name: 'Terraform', tag: 'Infra as Code', highlight: false },
        { name: 'GitHub Actions', tag: 'Automated CI/CD', highlight: false }
      ]
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      icon: <Cpu size={20} color="#06b6d4" />,
      desc: 'Autonomous LLM agent pipelines, semantic search, and proprietary workflow automation.',
      techs: [
        { name: 'OpenAI API', tag: 'GPT-4o / Realtime', highlight: true },
        { name: 'Anthropic Claude', tag: 'Long-Context Reasoning', highlight: true },
        { name: 'LangChain / LlamaIndex', tag: 'Agent Orchestration', highlight: true },
        { name: 'RAG Architectures', tag: 'Enterprise Knowledge', highlight: true },
        { name: 'Whisper / Vision', tag: 'Multimodal AI', highlight: false },
        { name: 'HuggingFace', tag: 'Open Weights', highlight: false }
      ]
    }
  ];

  const filteredCategories = activeTab === 'all' 
    ? categories 
    : categories.filter((c) => c.id === activeTab);

  return (
    <section className="section section-white tech-matrix-section" id="technology">
      <div className="tech-matrix-container">
        {/* Section Header */}
        <div className="tech-matrix-header">
          <div>
            <div className="eyebrow-decorated">
              <span className="eyebrow-line"></span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-text">TECHNOLOGY &amp; EXPERTISE</span>
              <span className="eyebrow-dot"></span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 style={{ fontSize: '38px', margin: '0 0 12px' }}>
              Modern Technology.<br />
              Thoughtful <em>Engineering.</em>
            </h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '440px', lineHeight: '1.6', margin: 0 }}>
            We calibrate our toolchains strictly for reliability, speed, and long-term maintainability. 
            No speculative experimental bloat—only battle-tested, enterprise-proven stacks.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="tech-tabs-bar">
          <button
            className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Disciplines ({categories.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="tech-cards-grid">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="tech-domain-card">
              <div className="tech-domain-header">
                <div className="tech-domain-icon-box">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="tech-domain-title">{cat.name}</h3>
                  <span className="tech-domain-badge">{cat.techs.length} Core Tools</span>
                </div>
              </div>

              <p className="tech-domain-desc">{cat.desc}</p>

              <div className="tech-chips-list">
                {cat.techs.map((tech, i) => (
                  <div key={i} className={`tech-chip ${tech.highlight ? 'highlight' : ''}`}>
                    <span className="tech-chip-dot"></span>
                    <strong className="tech-chip-name">{tech.name}</strong>
                    <span className="tech-chip-tag">{tech.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Guarantee Strip */}
        <div className="tech-guarantee-strip">
          <div className="guarantee-item">
            <CheckCircle2 size={16} color="var(--blue)" />
            <span>Strict Type Safety &amp; Static Linting</span>
          </div>
          <div className="guarantee-item">
            <CheckCircle2 size={16} color="var(--blue)" />
            <span>Sub-100ms API Latency Targets</span>
          </div>
          <div className="guarantee-item">
            <CheckCircle2 size={16} color="var(--blue)" />
            <span>Automated Integration Testing &amp; CI/CD</span>
          </div>
          <div className="guarantee-item">
            <CheckCircle2 size={16} color="var(--blue)" />
            <span>Clean Architecture &amp; Zero Vendor Lock-in</span>
          </div>
        </div>
      </div>
    </section>
  );
}
