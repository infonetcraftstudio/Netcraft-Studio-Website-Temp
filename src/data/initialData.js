export const initialContactInfo = {
  email: "hello@netcraftstudios.org",
  phone: "+1 (415) 890-3420",
  address: "742 Montgomery St, Suite 400, San Francisco, CA",
  coordinates: "12° 34' 56\" N / 77° 35' 12\" E",
  systemCode: "SYSTEM 01.26",
  estYear: "2021",
  status: "Available for Q4 & 2026",
  officeHours: "Mon – Fri, 09:00 – 18:00 PST",
  headline: "Have a bold idea? Let’s build it.",
  subheadline: "We turn complex ideas into clear, capable digital products for teams moving with intent."
};

export const initialServices = [
  {
    id: "serv-1",
    num: "01",
    icon: "↗",
    title: "Web Development",
    shortDesc: "Fast, responsive platforms that make your business impossible to overlook.",
    fullDesc: "We build enterprise-grade modern web applications and landing systems with zero bloat, blazing fast load times, and uncompromising security. Architected for scale and search prominence.",
    deliverables: ["Single Page Applications (SPA)", "Full-Stack Web Portals", "Headless CMS Integrations", "Core Web Vitals Optimization", "Custom API & Microservices"],
    technologies: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"]
  },
  {
    id: "serv-2",
    num: "02",
    icon: "◈",
    title: "AI & Emerging Tech",
    shortDesc: "Practical intelligence that gives your teams a smarter way to work.",
    fullDesc: "Deploy transformative machine learning pipelines, fine-tuned LLM agents, and real-time computer vision workflows that unlock operational efficiency and delight end-users.",
    deliverables: ["LLM Agents & Copilots", "Vector Search & RAG Architectures", "Custom Model Fine-tuning", "Intelligent Automation Workflows", "AI Strategy & Safety Auditing"],
    technologies: ["Python", "PyTorch", "LangChain", "OpenAI / Claude APIs", "FastAPI"]
  },
  {
    id: "serv-3",
    num: "03",
    icon: "▣",
    title: "Digital Products",
    shortDesc: "Useful, intuitive products built around the people who use them.",
    fullDesc: "From 0-to-1 prototype validation to comprehensive SaaS ecosystem design, we craft interfaces that make complex interactions feel obvious, enjoyable, and frictionless.",
    deliverables: ["End-to-End Product Design", "Design Systems & Token Libraries", "Interactive High-Fidelity Prototypes", "User Journey & Usability Testing", "Product Roadmap & Strategy"],
    technologies: ["Figma", "Design Tokens", "Storybook", "React", "UserTesting"]
  },
  {
    id: "serv-4",
    num: "04",
    icon: "⌁",
    title: "Mobile Experiences",
    shortDesc: "Thoughtful mobile applications that keep your audience connected.",
    fullDesc: "Engineered for iOS and Android with tactile responsiveness, offline first reliability, and seamless hardware sensor integration.",
    deliverables: ["Cross-Platform Mobile Apps", "Native iOS & Android Modules", "Offline-First Sync Engines", "Push Notification Architecture", "App Store Optimization & Deployment"],
    technologies: ["React Native", "Swift", "Kotlin", "Expo", "Firebase"]
  }
];

export const initialProjects = [
  {
    id: "proj-1",
    title: "AeroPulse Enterprise",
    client: "Aeroform Spatial",
    category: "Digital Products",
    tag: "Digital product",
    year: "2025",
    description: "Product strategy and web application experience for next-generation spatial computing telemetry and collaborative team workflows.",
    longDescription: "NetCraft Studio architected AeroPulse from initial UX wireframing through high-performance WebGL telemetry visualizers. The system enables multi-disciplinary aerospace teams to review 3D spatial models concurrently with real-time biometric and pressure annotations.",
    techStack: ["React", "WebGL", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    featured: true,
    metrics: "+65% Team Velocity",
    imageType: "city",
    accentColor: "#2563eb",
    liveUrl: "https://aeropulse.netcraft.example"
  },
  {
    id: "proj-2",
    title: "Synthetix AI Copilot",
    client: "Synthetix Labs",
    category: "AI & Emerging Tech",
    tag: "AI System",
    year: "2025",
    description: "Autonomous workflow assistant and neural UI orchestration layer for high-throughput robotics data analysis.",
    longDescription: "Synthetix needed an intuitive operational dashboard where factory engineers can query complex robotic arms in natural language. We designed a reactive conversational canvas connected directly to live streaming telemetry.",
    techStack: ["Python", "FastAPI", "React", "PyTorch", "WebSockets"],
    status: "Completed",
    featured: true,
    metrics: "99.4% Model Precision",
    imageType: "purple",
    accentColor: "#7457e8",
    liveUrl: "https://synthetix.netcraft.example"
  },
  {
    id: "proj-3",
    title: "Veloce Real-Time Trading Terminal",
    client: "Veloce Financial",
    category: "Web Development",
    tag: "Web experience",
    year: "2024",
    description: "Ultra low-latency streaming dashboard, order routing terminal, and market liquidity heatmaps for institutional crypto trading.",
    longDescription: "Handling millions of streaming ticks per second requires zero unnecessary DOM updates. We built a high-performance Canvas-rendered orderbook and customized charting widget suite for Veloce traders.",
    techStack: ["React", "WebSockets", "Rust", "HTML5 Canvas"],
    status: "Completed",
    featured: true,
    metrics: "<12ms Latency",
    imageType: "cyan",
    accentColor: "#2dd4bf",
    liveUrl: "https://veloce.netcraft.example"
  },
  {
    id: "proj-4",
    title: "Orbit Mobile Companion",
    client: "Kroma Media",
    category: "Mobile Experiences",
    tag: "Mobile App",
    year: "2024",
    description: "Cross-platform mobile application delivering curated immersive multimedia stories and offline caching for global creators.",
    longDescription: "Orbit provides creative directors and journalists an offline-first workspace to record audio notes, assemble moodboards, and sync high-res video clips instantly when back on Wi-Fi.",
    techStack: ["React Native", "Swift", "Kotlin", "GraphQL"],
    status: "Completed",
    featured: true,
    metrics: "4.9 App Store Rating",
    imageType: "city",
    accentColor: "#163c83",
    liveUrl: "https://orbit.netcraft.example"
  },
  {
    id: "proj-5",
    title: "Cortex Knowledge Graph Engine",
    client: "Horizon Health",
    category: "AI & Emerging Tech",
    tag: "Enterprise AI",
    year: "2024",
    description: "Vector-indexed clinical research discovery engine that indexes 10M+ medical papers with instant semantic verification.",
    longDescription: "A revolutionary semantic engine for biomedical researchers, synthesizing clinical trial papers and visualizing chemical relationship clusters in interactive 3D graphs.",
    techStack: ["Node.js", "pgvector", "LangChain", "React"],
    status: "Completed",
    featured: false,
    metrics: "10x Faster Inquiries",
    imageType: "purple",
    accentColor: "#7457e8",
    liveUrl: "https://cortex.netcraft.example"
  },
  {
    id: "proj-6",
    title: "Lumina Brand & Tokenized Design System",
    client: "Lumina Collective",
    category: "Digital Products",
    tag: "Brand system",
    year: "2023",
    description: "Complete brand identity, accessible tokenized UI library, and interactive documentation built for a global lifestyle collective.",
    longDescription: "We developed a living design token architecture bridging Figma and automated CSS build steps, powering 14 sub-brands with consistent typography, motion curves, and palette definitions.",
    techStack: ["Figma", "Design Tokens", "Storybook", "React"],
    status: "Completed",
    featured: false,
    metrics: "120+ Tokenized Components",
    imageType: "cyan",
    accentColor: "#2dd4bf",
    liveUrl: "https://lumina.netcraft.example"
  }
];

export const initialMembers = [
  {
    id: "mem-1",
    name: "Elena Vance",
    role: "Design Director & Co-Founder",
    department: "Design & Product",
    bio: "Pioneering systematic UI/UX and brand identities that feel timeless yet futuristic. Ex-Pentagram with 12+ years shaping software surfaces.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    skills: ["Design Systems", "Creative Direction", "Information Architecture", "Typography"],
    email: "elena@netcraftstudios.org",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", github: "https://github.com" },
    featured: true
  },
  {
    id: "mem-2",
    name: "Marcus Chen",
    role: "Principal Systems Architect",
    department: "Engineering",
    bio: "Specializing in high-throughput distributed web systems, WebGL graphics, and ultra-fast micro-frontends with zero runtime waste.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    skills: ["Distributed Systems", "React / Vite", "Rust", "High Concurrency"],
    email: "marcus@netcraftstudios.org",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", github: "https://github.com" },
    featured: true
  },
  {
    id: "mem-3",
    name: "Aria Thorne",
    role: "Lead AI & Machine Learning Engineer",
    department: "AI & Innovation",
    bio: "Bridging neural synthesis, LLM pipelines, and interactive web surfaces. Passionate about ethical AI agents that empower human creators.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    skills: ["PyTorch", "RAG Pipelines", "Agentic Systems", "FastAPI"],
    email: "aria@netcraftstudios.org",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", github: "https://github.com" },
    featured: true
  },
  {
    id: "mem-4",
    name: "Devon Reynolds",
    role: "Head of Product Strategy",
    department: "Strategy",
    bio: "Transforming intricate venture ambitions into lean, high-converting product roadmaps and clear go-to-market milestones.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    skills: ["Product Discovery", "Market Fit", "SaaS Analytics", "User Interviews"],
    email: "devon@netcraftstudios.org",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", github: "https://github.com" },
    featured: true
  },
  {
    id: "mem-5",
    name: "Kiran Patel",
    role: "Senior Mobile & Creative Technologist",
    department: "Mobile",
    bio: "Crafting buttery smooth native and cross-platform mobile interactions with fluid micro-interactions and tactile physics.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    skills: ["React Native", "Swift", "Interactive Animation", "Offline Sync"],
    email: "kiran@netcraftstudios.org",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", github: "https://github.com" },
    featured: false
  },
  {
    id: "mem-6",
    name: "Sonia Morales",
    role: "Senior Full-Stack Engineer",
    department: "Engineering",
    bio: "Relentless about clean code, component modularity, and rock-solid automated testing pipelines.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    skills: ["TypeScript", "GraphQL", "PostgreSQL", "Tailwind CSS"],
    email: "sonia@netcraftstudios.org",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", github: "https://github.com" },
    featured: false
  }
];

export const initialClients = [
  {
    id: "cli-1",
    name: "Synthetix Labs",
    industry: "AI & Robotics",
    logoText: "SYNTHETIX",
    website: "https://synthetix.example",
    testimonial: "NetCraft revamped our entire platform. The polish and responsiveness exceeded every KPI we set. Our customer onboarding duration dropped by half.",
    author: "Dr. Julian Cole",
    authorRole: "VP of Product, Synthetix Labs",
    rating: 5,
    projectsDone: ["Synthetix AI Copilot"],
    featured: true,
    status: "Active Partner"
  },
  {
    id: "cli-2",
    name: "Veloce Financial",
    industry: "Fintech & Trading",
    logoText: "VELOCE",
    website: "https://veloce.example",
    testimonial: "They turned a tangled financial data dashboard into an intuitive, razor-sharp experience our institutional traders rely on every market morning.",
    author: "Sarah Lindqvist",
    authorRole: "Chief Design Officer, Veloce Financial",
    rating: 5,
    projectsDone: ["Veloce Real-Time Trading Terminal"],
    featured: true,
    status: "Active Partner"
  },
  {
    id: "cli-3",
    name: "Aeroform Spatial",
    industry: "Spatial Computing",
    logoText: "AEROFORM",
    website: "https://aeroform.example",
    testimonial: "NetCraft Studio brings a rare harmony of artistic taste and deep technical engineering. They don't just write code; they elevate your product vision.",
    author: "Aris Thorne",
    authorRole: "Founder & CEO, Aeroform Spatial",
    rating: 5,
    projectsDone: ["AeroPulse Enterprise"],
    featured: true,
    status: "Active Partner"
  },
  {
    id: "cli-4",
    name: "Kroma Media",
    industry: "Digital Media & Streaming",
    logoText: "KROMA",
    website: "https://kroma.example",
    testimonial: "Our creator engagement surged 42% in the first quarter after NetCraft delivered our new mobile app. Their communication was flawless.",
    author: "Tara Washington",
    authorRole: "Head of Digital, Kroma Media",
    rating: 5,
    projectsDone: ["Orbit Mobile Companion"],
    featured: true,
    status: "Completed Project"
  },
  {
    id: "cli-5",
    name: "Horizon Health",
    industry: "Healthcare & AI",
    logoText: "HORIZON",
    website: "https://horizonhealth.example",
    testimonial: "Reliable, fast, and intensely collaborative. They handled complex HIPAA constraints effortlessly while keeping the UX modern and crisp.",
    author: "Dr. Ethan Park",
    authorRole: "Director of Tech, Horizon Health",
    rating: 5,
    projectsDone: ["Cortex Knowledge Graph Engine"],
    featured: false,
    status: "Active Partner"
  },
  {
    id: "cli-6",
    name: "Lumina Collective",
    industry: "E-Commerce & Lifestyle",
    logoText: "LUMINA",
    website: "https://lumina.example",
    testimonial: "The tokenized design system NetCraft created has saved our engineering team hundreds of development hours across multiple brand launches.",
    author: "Camilla Ramos",
    authorRole: "Brand Director, Lumina Collective",
    rating: 5,
    projectsDone: ["Lumina Brand & Tokenized Design System"],
    featured: false,
    status: "Completed Project"
  }
];

export const initialInquiries = [
  {
    id: "inq-1",
    name: "Alexander Wright",
    email: "a.wright@solaris-mobility.io",
    company: "Solaris Mobility",
    service: "Digital Products",
    budget: "$50k - $100k",
    message: "We are designing a new autonomous fleet management dashboard and would love to partner with NetCraft for product strategy and frontend architecture.",
    date: "2026-09-10 14:22",
    status: "new"
  },
  {
    id: "inq-2",
    name: "Miriam O'Connor",
    email: "m.oconnor@apexquantum.tech",
    company: "Apex Quantum",
    service: "AI & Emerging Tech",
    budget: "$100k+",
    message: "Looking for senior engineers and designers to build an interactive quantum simulator web portal for academic and commercial clients.",
    date: "2026-09-08 09:45",
    status: "replied"
  },
  {
    id: "inq-3",
    name: "David Sterling",
    email: "david@sterlingcapital.com",
    company: "Sterling Capital",
    service: "Web Development",
    budget: "$25k - $50k",
    message: "Need a complete brand refresh and ultra-clean modern corporate website built with high security and blazing fast performance.",
    date: "2026-09-05 16:30",
    status: "archived"
  }
];
