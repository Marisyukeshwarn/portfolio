import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, Search } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Machine Learning', 'Computer Vision', 'LLM', 'Web Apps', 'Mobile Apps', 'Data Science'];

const projects = [
  {
    id: 1,
    title: 'WakeStop – Smart Travel Monitor',
    description: 'End-to-end smart travel monitoring app that wakes you up when you arrive at your destination. Features live GPS tracking, journey management, and safe transport alerts.',
    image: '/projects/WAKESTOP.jpeg',
    category: 'Mobile Apps',
    tech: ['Flutter', 'Google Maps API', 'Firebase', 'Dart'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'NextGen Innovators – Company Website',
    description: 'Modern corporate website for a tech company specializing in mobile apps, IoT systems, AI automation, and machine learning. Built with a stunning animated dark-purple design.',
    image: '/projects/company website.png',
    category: 'Web Apps',
    tech: ['HTML', 'CSS', 'JavaScript', 'Animations'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Deadline Priority Manager',
    description: 'Smart task prioritization web app for students managing multiple deadlines. Features focus mode, completion tracking, overdue detection, and real-time task analytics.',
    image: '/projects/deadline.png',
    category: 'Web Apps',
    tech: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'RescueLink – Disaster Response Platform',
    description: 'AI-powered emergency response command center (RescueLink) to manage disaster zones, coordinate volunteers, and visualize danger zones on a live map with risk assessment.',
    image: '/projects/disaster.png',
    category: 'Web Apps',
    tech: ['React', 'Google Maps', 'Gemini AI', 'Firebase'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 5,
    title: 'EntPortal – Enterprise Task Dashboard',
    description: 'Full-featured enterprise portal with global dashboard, task board, problem tracker, work logs, certificates module, and incident diagnostics with real-time analytics.',
    image: '/projects/edutrack---student-staff-task-manager (1).png',
    category: 'Web Apps',
    tech: ['React', 'TypeScript', 'Chart.js', 'Node.js', 'MongoDB'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 6,
    title: 'Gmail AI Automator Pro',
    description: 'Intelligent Gmail automation dashboard powered by Gemini AI. Detects urgent emails, auto-processes with AI, tracks automation status, and maintains live monitoring with 99.9% uptime.',
    image: '/projects/gmail-ai-automator-pro.png',
    category: 'LLM',
    tech: ['Google Apps Script', 'Gemini AI', 'React', 'Gmail API'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 7,
    title: 'EduSmart AI – Student Command Center',
    description: 'AI-powered academic platform with semantic scheduling, attendance tracking, productivity analytics, and an AI intelligence feed that optimizes personalized learning paths.',
    image: '/projects/lessoner app.png',
    category: 'Web Apps',
    tech: ['React', 'TypeScript', 'Gemini AI', 'Firebase'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 8,
    title: 'Linguisense AI – Pedagogical AI',
    description: 'Real-time lecture translation and note-taking AI. Bridges language barriers with live English translation (Tamil → English), concept cloud generation, and AI synthesis.',
    image: '/projects/linguisense-ai.png',
    category: 'LLM',
    tech: ['React', 'Web Speech API', 'Gemini AI', 'TypeScript'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 9,
    title: 'AI Note Taking Assistant',
    description: 'Offline AI-powered note-taking app that transforms rough thoughts into structured notes instantly. Supports audio recording input and generates clean, formatted notes with AI.',
    image: '/projects/offlinechatbot.png',
    category: 'LLM',
    tech: ['React', 'Vite', 'Gemini AI', 'Web Audio API'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 10,
    title: 'RoadSoS – AI Crash Detection',
    description: 'Integrated digital safety app with AI crash detection using computer vision (YOLO/OpenCV), live G-force monitoring, emergency map, and one-tap SOS to hospitals and police.',
    image: '/projects/road_sos.jpeg',
    category: 'Mobile Apps',
    tech: ['Flutter', 'OpenCV', 'YOLO', 'Google Maps', 'Firebase'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 11,
    title: 'NovaChat – Business Messaging App',
    description: 'Feature-rich business chat application with real-time messaging, call history, group chats, violet dark mode, privacy & security settings, and multi-language support.',
    image: '/projects/img (3).jpeg',
    category: 'Mobile Apps',
    tech: ['Flutter', 'Firebase', 'Dart', 'WebRTC'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 12,
    title: 'Mala Boutique – E-Commerce Website',
    description: 'Elegant e-commerce website for a handcrafted flower mala boutique. Features service showcase, custom request forms, and a clean green-themed responsive design.',
    image: '/projects/img (17).png',
    category: 'Web Apps',
    tech: ['React', 'Vite', 'Node.js', 'CSS'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 13,
    title: 'AI Notepad – Smart Text Editor',
    description: 'Dark-themed AI notepad with Summarize, Elaborate, and Fix Grammar capabilities. Allows users to write, enhance, and manage notes with intelligent AI-powered writing tools.',
    image: '/projects/img (20).png',
    category: 'LLM',
    tech: ['React', 'Gemini AI', 'Vite', 'TypeScript'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 14,
    title: 'NPR College Component Booking',
    description: 'Official college equipment and component reservation system for students. Supports browse, reserve, and manage workflows with admin-managed inventory and booking history.',
    image: '/projects/img (21).png',
    category: 'Web Apps',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 15,
    title: 'MSG Spam Prediction – ML Model',
    description: 'Machine learning-powered message spam detection system using NLP language models, heuristic pattern matching, behavioral analysis, and global threat intelligence for accurate filtering.',
    image: '/projects/img (9).png',
    category: 'Machine Learning',
    tech: ['Python', 'scikit-learn', 'NLP', 'Pandas', 'Streamlit'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 16,
    title: 'Loan Approval Prediction – ML',
    description: 'AI-powered loan approval prediction system analyzing credit history, income stability, debt ratios, and loan purpose to deliver instant decisions with credit scoring and risk assessment.',
    image: '/projects/img (10).png',
    category: 'Machine Learning',
    tech: ['Python', 'scikit-learn', 'Pandas', 'XGBoost', 'Streamlit'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 17,
    title: 'OpenCV Game Controller Prediction',
    description: 'Computer vision system using OpenCV and AI to predict game controller actions from player pose tracking, gesture recognition, and multi-modal inputs for adaptive gameplay.',
    image: '/projects/img (11).png',
    category: 'Computer Vision',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'NumPy'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 18,
    title: 'Healthcare Prediction – AI & ML',
    description: 'Comprehensive healthcare prediction platform using AI and ML to analyze patient vitals, genomic data, and EHRs for early disease detection, personalized treatment plans, and resource optimization.',
    image: '/projects/img (12).png',
    category: 'Machine Learning',
    tech: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas', 'Plotly'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 19,
    title: 'Drug Type Prediction – Advanced ML',
    description: 'Advanced machine learning system for drug type classification using molecular structure data, docking simulation, and ADME/Tox profiles to accelerate drug discovery and personalize treatment.',
    image: '/projects/img (13).png',
    category: 'Machine Learning',
    tech: ['Python', 'RDKit', 'scikit-learn', 'DeepChem', 'Pandas'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 20,
    title: 'Diabetes Prediction – ML Model',
    description: 'Clinical ML system predicting diabetes risk from glucose monitoring, biometrics, lab results, and genetic factors. Provides early diagnosis, personalized care plans, and long-term health monitoring.',
    image: '/projects/img (14).png',
    category: 'Machine Learning',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Streamlit'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 21,
    title: 'Bill Prediction – ML Forecasting',
    description: 'ML model that predicts utility bills (electricity, water, property tax) based on usage history, billing cycles, seasonal factors, and market trends to help users achieve budget stability.',
    image: '/projects/img (15).png',
    category: 'Data Science',
    tech: ['Python', 'scikit-learn', 'Prophet', 'Pandas', 'Plotly'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
  {
    id: 22,
    title: 'Ads Click-Through Rate Prediction',
    description: 'ML pipeline predicting ad click-through rates from user profiles, browsing history, social media activity, and demographics. Optimizes bidding strategies and delivers highly relevant advertising.',
    image: '/projects/img (16).png',
    category: 'Data Science',
    tech: ['Python', 'XGBoost', 'Pandas', 'scikit-learn', 'Matplotlib'],
    github: '#',
    demo: '#',
    status: 'Completed',
  },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Portfolio Projects
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              My{' '}
              <span className="bg-gradient-to-r from-primary via-sky-400 to-accent bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A curated collection of machine learning, AI, and full-stack projects built with
              cutting-edge technologies.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { label: 'Total Projects', value: projects.length },
              { label: 'Completed', value: projects.filter((p) => p.status === 'Completed').length },
              { label: 'In Progress', value: projects.filter((p) => p.status === 'In Progress').length },
              { label: 'Categories', value: categories.length - 1 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  filter === category
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-card/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 pb-24">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-2.5 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-semibold text-primary border border-primary/20">
                      {project.category}
                    </span>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-muted/40 rounded-md text-xs font-medium text-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 bg-muted/40 rounded-md text-xs font-medium text-muted-foreground border border-border/50">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border bg-card/50 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                    >
                      <FaGithub className="w-3.5 h-3.5" /> Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-muted-foreground"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
