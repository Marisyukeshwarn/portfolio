import React, { useEffect, useRef, useState } from 'react';
import { CanvasContainer } from './CanvasContainer';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Sparkles, ArrowDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { LINKEDIN_PROFILE_URL, LINKEDIN_PROFILE } from '@/config/linkedin';
import { GITHUB_PROFILE_URL } from '@/config/github';

const ROLES = ['AI Engineer', 'Data Scientist', 'ML Architect', 'LLM Developer'];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1500);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }
  }, [displayed, deleting, paused, roleIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

// Animated floating name letters
function AnimatedName({ name }: { name: string }) {
  return (
    <div className="flex flex-nowrap whitespace-nowrap items-baseline overflow-visible w-full">
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.7,
            delay: 0.2 + i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground"
          whileHover={{ scale: 1.12, color: '#38BDF8', transition: { duration: 0.2, ease: 'easeOut' } }}
          style={{ display: 'inline-block', cursor: 'default' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// Magnetic cursor glow
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
      }}
    />
  );
}

// Subtle animated grid
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial fade over grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,hsl(var(--background))_100%)]" />
    </div>
  );
}

// Floating tag badges
const TAGS = LINKEDIN_PROFILE.skills.slice(0, 6);
function FloatingTags() {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {TAGS.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.08, duration: 0.3 }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(56,189,248,0.15)' }}
          className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/5 border border-primary/20 text-primary cursor-default transition-colors"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <CursorGlow />
      <GridBackground />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-24 pb-12">
        {/* ── LEFT: Text Content ── */}
        <div className="flex flex-col items-start text-left space-y-6">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">Available for Opportunities</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg font-medium tracking-wide"
          >
            Hello, World! 👋 I'm
          </motion.p>

          {/* Animated Name */}
          <AnimatedName name={LINKEDIN_PROFILE.name} />

          {/* Typewriter Role */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-3xl lg:text-4xl font-bold"
          >
            <TypewriterText />
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            {LINKEDIN_PROFILE.about}
          </motion.p>

          {/* Tech tags */}
          <FloatingTags />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Button
              size="lg"
              className="rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group px-8"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full backdrop-blur-md bg-background/50 border-border hover:bg-primary/10 hover:border-primary/40 transition-all group px-8"
            >
              Download Resume
              <Download className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex items-center gap-3 text-sm text-muted-foreground pt-2"
          >
            <div className="flex -space-x-2">
              {['#38BDF8', '#818CF8', '#34D399'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white" style={{ background: c }}>
                  {['AI', 'ML', 'DL'][i]}
                </div>
              ))}
            </div>
            <span>3000+ GitHub commits · 45+ projects shipped</span>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="flex items-center gap-3 pt-1"
          >
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:shadow-[0_0_12px_rgba(10,102,194,0.25)] transition-all duration-300"
            >
              <FaLinkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-all duration-300"
            >
              <FaGithub className="w-4.5 h-4.5" />
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Brain ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:flex justify-center items-center h-[540px] w-full"
        >
          {/* Glow ring behind canvas */}
          <div className="absolute w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <CanvasContainer />

          {/* Floating info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute top-12 right-0 bg-background/70 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs text-muted-foreground">Specialization</p>
            <p className="text-sm font-bold text-foreground">Deep Learning & LLMs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 }}
            className="absolute bottom-16 left-0 bg-background/70 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs text-muted-foreground">Experience</p>
            <p className="text-sm font-bold text-foreground">AI / ML Engineering</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground cursor-pointer z-10"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
