import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Machine Learning', 'Computer Vision', 'LLM', 'Web Apps'];

const projects = [
  {
    id: 1,
    title: 'Autonomous Navigation Agent',
    description: 'Deep reinforcement learning model for autonomous drone navigation in complex environments using PyTorch and ROS.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
    category: 'Machine Learning',
    tech: ['PyTorch', 'Python', 'ROS', 'OpenCV'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'Vision-Language Model',
    description: 'Custom implementation of a lightweight Vision-Language Model capable of complex visual reasoning and zero-shot classification.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    category: 'Computer Vision',
    tech: ['TensorFlow', 'Hugging Face', 'Transformers'],
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'Enterprise RAG System',
    description: 'Retrieval-Augmented Generation system capable of parsing and answering queries over 10M+ documents with sub-second latency.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    category: 'LLM',
    tech: ['LangChain', 'Pinecone', 'OpenAI', 'FastAPI'],
    github: '#',
    demo: '#'
  },
  {
    id: 4,
    title: 'Predictive Analytics Dashboard',
    description: 'Full-stack web application providing real-time predictive analytics and forecasting for enterprise supply chains.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    category: 'Web Apps',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prophet'],
    github: '#',
    demo: '#'
  }
];

export function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Featured Projects
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === category
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
              >
                {/* Image Container with 3D tilt effect simulated by overflow & hover */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-semibold text-primary border border-primary/20">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative z-20 -mt-10">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-1 bg-muted/50 rounded-md text-xs font-medium text-foreground border border-border/50">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="rounded-full flex-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      <FaGithub className="w-4 h-4 mr-2" /> Code
                    </Button>
                    <Button size="sm" className="rounded-full flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
