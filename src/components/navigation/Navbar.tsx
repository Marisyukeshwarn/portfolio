import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LINKEDIN_PROFILE_URL } from '@/config/linkedin';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash links only work on the home page
  const anchorLinks = [
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Skills', href: isHome ? '#skills' : '/#skills' },
    { name: 'Experience', href: isHome ? '#experience' : '/#experience' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  const pageLinks = [
    { name: 'Projects', to: '/projects' },
    { name: 'Certificates', to: '/certificates' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-shadow">
            M
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">Yukesh<span className="text-primary">.</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {anchorLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
          {pageLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-sm font-medium transition-colors relative group ${
                location.pathname === link.to
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="rounded-full shadow-lg shadow-primary/20">
              Hire Me
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border absolute top-full left-0 right-0 py-4 px-6 flex flex-col space-y-4"
        >
          {anchorLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium text-foreground py-2 border-b border-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {pageLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-lg font-medium py-2 border-b border-border/50 ${
                location.pathname === link.to ? 'text-primary' : 'text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button variant="default" className="w-full rounded-full mt-4">
              Hire Me
            </Button>
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
