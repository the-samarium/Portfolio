import React, { useState, useEffect, useRef, lazy, Suspense, Component, ReactNode } from 'react';
import {
  Terminal as TerminalIcon,
  Code,
  User,
  Zap,
  Briefcase,
  GraduationCap,
  Mail,
  Palette,
  Power,
  Send,
  Github,
  Linkedin,
  Cpu,
  Database,
  Layers,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const Spline = lazy(() => import('@splinetool/react-spline'));
import Lenis from 'lenis';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface Experience {
  role: string;
  period: string;
  company: string;
  description: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 'PROJ_01',
    title: 'DocsNavigator',
    description: 'Local CLI tool that crawls documentation websites and enables accurate conversational Q&A using a full RAG pipeline (Recursive URL loader, FAISS, Ollama LLM).',
    tags: ['RAG', 'FAISS', 'OLLAMA'],
    link: 'https://github.com/the-samarium/DocsNavigator'
  },
  {
    id: 'PROJ_02',
    title: 'YouTube Video Q&A',
    description: 'Browser extension that extracts YouTube transcripts and answers natural language questions via a complete RAG pipeline to reduce hallucinations.',
    tags: ['CHROME EXT', 'LangChain', 'VECTOR SEARCH'],
    link: 'https://github.com/the-samarium/RAG-based-chrome-extension-for-Youtube-videos'
  },
  {
    id: 'PROJ_03',
    title: 'Z-Image-Interface',
    description: 'Streamlit UI for generating high-quality marketing visuals (ads, banners, social creatives) using fully local diffusion models via ComfyUI.',
    tags: ['STREAMLIT', 'COMFYUI', 'DIFFUSION'],
    link: 'https://github.com/the-samarium/z-image-interface'
  },
  {
    id: 'PROJ_04',
    title: 'RepoLens',
    description: 'React + FastAPI application that analyzes GitHub repositories and auto-generates structured documentation and architectural insights using tree-sitter for AST parsing.',
    tags: ['REACT', 'FASTAPI', 'AST'],
    link: 'https://github.com/the-samarium/repolens'
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: 'PROJECT INTERN',
    period: 'JUL 2025 - MAR 2026',
    company: 'Edgillence Pvt. Ltd.',
    description: 'Developed computer vision applications using OpenCV and OpenVINO for real-time image/video intelligence on resource-constrained edge devices.'
  },
  {
    role: 'GEN AI RESEARCH DEV',
    period: 'AUG 2025 - NOV 2025',
    company: 'GUIDED BY SR. ARCHITECT, WALMART',
    description: 'Designed and implemented RAG-based workflows combined with diffusion models and LLMs to automate domain-specific content generation. Architected multi-modal pipelines in ComfyUI.'
  }
];

// --- UI Components ---

class SplineErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-surface/20 border border-white/5 space-y-4">
          <div className="text-secondary/50 font-mono text-xs uppercase tracking-widest">[WebGL Simulation Offline]</div>
          <div className="w-16 h-1 bg-accent/20" />
        </div>
      );
    }
    return this.props.children;
  }
}

const SectionHeader = ({ id, title }: { id: string, title: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex flex-col gap-2 mb-12"
  >
    <span className="font-headline text-[10px] text-accent tracking-[0.4em] uppercase">[{id}]</span>
    <h2 className="font-headline text-4xl font-bold uppercase tracking-tighter text-white">{title}</h2>
  </motion.div>
);

const NavItem = ({ icon: Icon, label, href, active, collapsed }: { icon: any, label: string, href: string, active?: boolean, collapsed?: boolean }) => (
  <a
    href={href}
    className={cn(
      "px-6 py-4 flex items-center gap-4 transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden",
      active
        ? "text-accent bg-accent/10"
        : "text-secondary hover:bg-white/5 hover:text-white"
    )}
  >
    {active && (
      <motion.div
        layoutId="active-indicator"
        className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <Icon className={cn("w-5 h-5 flex-shrink-0 transition-transform duration-300", active && "scale-110")} />
    {!collapsed && (
      <span className="font-headline text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">{label}</span>
    )}
    {collapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-accent text-white text-[8px] font-headline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {label}
      </div>
    )}
  </a>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['Terminal Session Established.', "Type 'help' for commands."]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeState, setTimeState] = useState(new Date().toLocaleTimeString());
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Time Updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Active Section Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: about, skills, projects, contact, clear';
        break;
      case 'about':
        response = 'Sameer Chavan: Generative AI systems developer & enthusiast.';
        break;
      case 'skills':
        response = 'Python, FastAPI, LangChain, OpenCV, Ollama, Docker, ComfyUI...';
        break;
      case 'projects':
        response = 'DocsNavigator, YouTube Q&A, Z-Image-Interface, RepoLens.';
        break;
      case 'contact':
        response = '[EMAIL_ADDRESS]';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = `Command not found: ${cmd}`;
    }

    setTerminalHistory(prev => [...prev, `$ ${terminalInput}`, response]);
    setTerminalInput('');
  };

  const changeAccentColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.documentElement.style.setProperty('--color-accent', randomColor);
  };

  const handleLogout = () => {
    setTerminalHistory(prev => [...prev, '$ system logout', 'Session terminated.', 'Reconnecting...']);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;

    setContactStatus('sending');

    // Create mailto link as a fallback since this is a static portfolio
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent(`From: ${contactEmail}\n\n${contactMessage}`);
    window.location.href = `mailto:sameerrchavan31@gmail.com?subject=${subject}&body=${body}`;

    // Simulate sending state briefly then reset
    setTimeout(() => {
      setContactStatus('sent');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactStatus('idle'), 3000);
    }, 500);
  };

  const navItems = [
    { icon: User, label: "ABOUT", href: "#about", id: "about" },
    { icon: Zap, label: "SKILLS", href: "#skills", id: "skills" },
    { icon: TerminalIcon, label: "PROJECTS", href: "#projects", id: "projects" },
    { icon: Briefcase, label: "EXPERIENCE", href: "#experience", id: "experience" },
    { icon: Mail, label: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-secondary font-body selection:bg-accent/30 overflow-x-hidden">
      {/* Top Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 backdrop-blur-md bg-[#131313]/80 border-b border-white/10 flex items-center justify-between px-6 z-50">
        <div className="flex-1 flex items-center justify-start gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a href="https://github.com/the-samarium" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-accent transition-colors">
            <Github className="w-5 h-5" />
            <span className="hidden md:inline font-headline text-[10px] font-bold uppercase tracking-[0.2em]">GitHub</span>
          </a>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="font-mono text-sm text-accent tracking-widest font-bold">
            {timeState}
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <a href="/resume.pdf" download className="px-4 py-2 border border-accent/50 bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all font-headline text-[10px] uppercase tracking-widest font-bold cursor-pointer">
            Download Resume
          </a>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-20"
          >
            <div className="flex flex-col p-8 gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-headline tracking-widest",
                    activeSection === item.id ? "text-accent" : "text-secondary"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 backdrop-blur-md bg-[#131313]/80 border-r border-white/10 hidden md:flex flex-col z-40 transition-all duration-500 ease-in-out",
        sidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className="p-8 flex items-center justify-between">
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-accent font-black font-headline text-lg tracking-tighter">AI_ENG_01</div>
              <div className="text-[10px] font-headline tracking-[0.3em] text-outline">V.2.0.4-STABLE</div>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-accent"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-grow py-4">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={activeSection === item.id || (activeSection === 'hero' && item.id === 'about')}
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>

        <div className="p-6 border-t border-white/10 space-y-4">
          <div
            onClick={changeAccentColor}
            className="flex items-center gap-4 text-secondary hover:text-accent cursor-pointer transition-colors group"
          >
            <Palette className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-headline text-[10px] tracking-[0.2em]">CHANGE COLOR</span>}
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center gap-4 text-secondary hover:text-red-500 cursor-pointer transition-colors group"
          >
            <Power className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-headline text-[10px] tracking-[0.2em]">LOGOUT</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-500 ease-in-out pt-16",
        "md:ml-64",
        sidebarCollapsed && "md:ml-20"
      )}>
        {/* Hero Section */}
        <section id="hero" className="h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center px-8 md:px-24 relative overflow-hidden">
          <div className="flex-1 z-10 space-y-8 py-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="font-headline text-[10px] text-accent tracking-[0.5em] uppercase">
                SYSTEM_INITIALIZED // USER_ID: SAMEER_CHAVAN
              </div>
              <h1 className="font-headline text-4xl md:text-6xl font-light tracking-[0.1em] leading-tight text-white uppercase max-w-xl">
                SAMEER <span className="text-accent/60">CHAVAN</span>
              </h1>
              <p className="text-secondary/60 font-mono text-xs tracking-widest max-w-md">
                THIRD-YEAR UNDERGRADUATE DEVELOPING SCALABLE AI SYSTEMS & RAG PIPELINES.
              </p>

              <div className="bg-surface/40 backdrop-blur-sm p-6 border border-white/10 font-mono text-sm space-y-2 relative overflow-hidden max-w-md text-left shadow-2xl">
                <div className="flex gap-2">
                  <span className="text-accent">root@sameer_chavan:~ $</span>
                  <span className="terminal-cursor">whoami</span>
                </div>
                <div className="text-secondary opacity-80">
                  Output: Generative AI Developer & Undergraduate.
                </div>
                <div className="flex gap-2 pt-4">
                  <span className="text-accent">root@sameer_chavan:~ $</span>
                  <span className="terminal-cursor"></span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 h-[400px] md:h-[600px] w-full relative">
            <SplineErrorBoundary>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-accent font-mono text-sm animate-pulse">Loading 3D Scene...</div>
                </div>
              }>
                <Spline scene="https://prod.spline.design/fc5ec012-1755-4337-a98d-5c9f3cec0ffd/scene.splinecode" />
              </Suspense>
            </SplineErrorBoundary>
            <div className="absolute bottom-12 right-0 text-[8px] text-outline font-mono opacity-30 text-right">
              LAT: 18.5204° N | LONG:
              73.8567° E<br />
              SIG_STRENGTH: 98% | CORE_TEMP: 42°C
            </div>
          </div>

          {/* Background Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] -z-10" />
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-8 md:px-24 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <div className="sticky top-32">
                <SectionHeader id="ABOUT_CORE" title="ABOUT ME" />
              </div>
            </div>
            <div className="md:col-span-8 space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl text-white font-light leading-relaxed"
              >
                I am a third-year undergraduate focused on building <span className="text-accent font-bold">Generative AI systems</span>, combining local LLMs and multi-modal workflows to solve edge-case problems.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-secondary/80 leading-relaxed"
              >
                My work centers around architecting <span className="text-white">RAG pipelines</span> using open-source models like Ollama, and creating local multi-modal applications with <span className="text-white">ComfyUI</span>. I'm passionate about developing scalable LLM applications and eager to contribute to production-grade intelligence systems.
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface/50 backdrop-blur-sm p-8 border border-white/10 group hover:border-accent/30 transition-all"
                >
                  <div className="text-accent font-headline text-3xl font-bold mb-1">04+</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-outline">Major Projects</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface/50 backdrop-blur-sm p-8 border border-white/10 group hover:border-accent/30 transition-all"
                >
                  <div className="text-accent font-headline text-3xl font-bold mb-1">LOCAL</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-outline">First Approach</div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-8 md:px-24 bg-surface/10 border-y border-white/10">
          <SectionHeader id="TECH_STACK" title="SKILLS" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { icon: Code, title: 'Languages', skills: ['PYTHON', 'C++', 'FASTAPI', 'BASH'] },
              { icon: Cpu, title: 'GenAI & LLMs', skills: ['LANGCHAIN', 'RAG', 'OLLAMA', 'COMFYUI', 'HUGGING FACE'] },
              { icon: Database, title: 'CV & Edge', skills: ['OPENCV', 'OPENVINO', 'EDGE IOT', 'UBUNTU CORE'] },
              { icon: Layers, title: 'Infrastructure', skills: ['DOCKER', 'GIT', 'GITHUB', 'LINUX'] }
            ].map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-8 space-y-6 hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <category.icon className="w-4 h-4 text-accent" />
                  <h3 className="font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span key={skill} className="bg-surface-container px-3 py-1 text-[9px] font-headline tracking-widest text-secondary hover:text-accent hover:ring-1 hover:ring-accent/30 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-8 md:px-24">
          <div className="flex justify-between items-end mb-16">
            <SectionHeader id="PROJECT_LOGS" title="PROJECTS" />
            <div className="hidden md:block text-[10px] font-mono text-outline tracking-widest mb-12">FILTER: ALL_SYSTEMS</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-surface/30 backdrop-blur-sm p-10 border border-white/10 hover:border-accent/20 transition-all"
              >
                <div className="absolute top-6 right-8 font-headline text-[10px] text-accent tracking-widest">[{proj.id}]</div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="font-headline text-2xl font-bold text-white group-hover:text-accent transition-colors">{proj.title}</h3>
                    <p className="text-secondary/70 text-sm leading-relaxed">{proj.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-accent border border-accent/20 px-2 py-0.5 tracking-widest">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-white text-black text-center font-headline text-[10px] font-bold uppercase tracking-[0.3em] hover:shadow-[0_4px_0_0_var(--color-accent)] transition-all active:translate-y-1 active:shadow-none"
                  >
                    Initialize Source
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-8 md:px-24 bg-surface/10 border-y border-white/10">
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="text-center">
              <SectionHeader id="CHRONOLOGY" title="EXPERIENCE" />
              {/* Subtle Animated Graph */}
              <div className="h-16 w-full flex items-end justify-center gap-1 mt-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-accent/20"
                  />
                ))}
              </div>
            </div>

            <div className="relative space-y-16">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                >
                  <div className={cn("md:pr-12 space-y-1", idx % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left md:pl-12 md:pr-0")}>
                    <h3 className="font-headline text-2xl font-bold text-white">{exp.role}</h3>
                    <div className="text-accent font-headline text-[10px] tracking-[0.3em]">{exp.period}</div>
                  </div>
                  <div className={cn("md:pl-12 space-y-3", idx % 2 === 0 ? "" : "md:order-1 md:text-right md:pr-12 md:pl-0")}>
                    <div className="font-headline text-xs font-bold uppercase text-outline tracking-widest">{exp.company}</div>
                    <p className="text-secondary/70 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-2 w-2 h-2 bg-accent -translate-x-1/2 hidden md:block ring-4 ring-accent/10" />
                </motion.div>
              ))}

              <motion.div
                id="education"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-16 border-t border-white/10"
              >
                <div className="md:text-right md:pr-12 space-y-1">
                  <h3 className="font-headline text-2xl font-bold text-white">B.TECH E&TC ENGINEERING</h3>
                  <div className="text-accent font-headline text-[10px] tracking-[0.3em]">2023 - 2027</div>
                </div>
                <div className="md:pl-12 space-y-3">
                  <div className="font-headline text-xs font-bold uppercase text-outline tracking-widest">Vishwakarma Institute of Info Tech</div>
                  <p className="text-secondary/70 text-sm leading-relaxed">CGPA: 8.74 / 10.0</p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-[4.5rem] w-2 h-2 bg-white -translate-x-1/2 hidden md:block ring-4 ring-white/10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-8 md:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                <div className="space-y-6">
                  <SectionHeader id="DATA_TRANSMISSION" title="CONTACT" />
                  <p className="text-xl text-secondary/80 font-light leading-relaxed">
                    Ready to collaborate on the next generation of intelligent systems. Terminal open for queries.
                  </p>
                </div>
                <div className="space-y-6">
                  <a href="mailto:sameerrchavan31@gmail.com" className="flex items-center gap-4 text-white hover:text-accent transition-all group">
                    <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent/5 transition-colors">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-headline tracking-[0.3em] text-[10px] uppercase">SAMEERRCHAVAN31@GMAIL.COM</span>
                  </a>
                  <a href="https://github.com/the-samarium" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-accent transition-all group">
                    <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent/5 transition-colors">
                      <Github className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-headline tracking-[0.3em] text-[10px] uppercase">GITHUB/THE-SAMARIUM</span>
                  </a>
                  <a href="https://linkedin.com/in/chavan-sameer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-accent transition-all group">
                    <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent/5 transition-colors">
                      <Linkedin className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-headline tracking-[0.3em] text-[10px] uppercase">LINKEDIN/CHAVAN-SAMEER</span>
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-surface/30 backdrop-blur-sm p-10 space-y-8 border border-white/10 shadow-2xl"
              >
                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label htmlFor="contact-email" className="text-[9px] text-outline uppercase font-headline tracking-[0.3em]">Transmission Origin</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      className="w-full bg-transparent border-0 border-b border-outline/30 focus:ring-0 focus:border-accent focus:outline-none text-white font-mono text-sm placeholder:text-outline/30 pb-2 transition-colors"
                      placeholder="name@domain.com"
                    />
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="contact-message" className="text-[9px] text-outline uppercase font-headline tracking-[0.3em]">Packet Content</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                      className="w-full bg-transparent border-0 border-b border-outline/30 focus:ring-0 focus:border-accent focus:outline-none text-white font-mono text-sm placeholder:text-outline/30 pb-2 transition-colors resize-none"
                      placeholder="Request message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactStatus === 'sending'}
                    className="w-full py-5 bg-accent text-white font-headline text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-accent/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactStatus === 'sending' ? 'TRANSMITTING...' : contactStatus === 'sent' ? 'TRANSMITTED ✓' : 'EXECUTE SEND'} <Send className="w-3 h-3" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-8 md:px-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#131313]">
          <div className="font-headline text-[9px] tracking-[0.3em] text-outline uppercase">
            © {new Date().getFullYear()} SAMEER CHAVAN // STATUS: 200 OK
          </div>
          <div className="flex gap-10">
            <a href="https://github.com/the-samarium" target="_blank" rel="noopener noreferrer" className="font-headline text-[9px] tracking-[0.3em] text-outline hover:text-accent transition-all uppercase">GITHUB</a>
            <a href="https://linkedin.com/in/chavan-sameer" target="_blank" rel="noopener noreferrer" className="font-headline text-[9px] tracking-[0.3em] text-outline hover:text-accent transition-all uppercase">LINKEDIN</a>
            <span className="hidden md:inline font-headline text-[9px] tracking-[0.3em] text-outline/50 uppercase">BUILD_V1.0.2</span>
          </div>
        </footer>
      </main>

      {/* Interactive Command-Line Prompt */}
      <div className="fixed bottom-12 right-12 z-50 hidden xl:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="backdrop-blur-md bg-black/80 border border-accent/30 w-80 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 bg-accent/10 border-b border-accent/30">
            <span className="text-[9px] font-mono text-accent font-bold tracking-widest">CORE_TERMINAL</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-red-500/50" />
              <div className="w-2 h-2 bg-yellow-500/50" />
              <div className="w-2 h-2 bg-green-500/50" />
            </div>
          </div>
          <div className="p-5 font-mono text-[10px] h-56 overflow-y-auto space-y-2 scroll-smooth">
            {terminalHistory.map((line, i) => (
              <div key={i} className={cn(line.startsWith('$') ? "text-accent" : "text-secondary/70")}>
                {line}
              </div>
            ))}
            <form onSubmit={handleTerminalSubmit} className="flex gap-2">
              <span className="text-accent">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="bg-transparent border-0 p-0 m-0 w-full focus:ring-0 focus:outline-none text-white text-[10px] placeholder:text-white/10"
                placeholder="about, skills, proj..."
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
