import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { LINKEDIN_PROFILE_URL } from '@/config/linkedin';
import { GITHUB_PROFILE_URL } from '@/config/github';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-card border-t border-border overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-shadow">
                P
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Portfolio<span className="text-primary">.</span></span>
            </a>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} AI Engineer Portfolio. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </Button>
            </a>
            <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Back to top */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollToTop}
            className="rounded-full border-border hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>

        </div>
      </div>
    </footer>
  );
}
