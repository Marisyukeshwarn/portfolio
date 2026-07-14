import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const certifications = [
  { title: 'SQL (Structured Query Language)', issuer: 'DV Analytics', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'C Programming', issuer: 'Academic Certification', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'C++ Programming', issuer: 'Academic Certification', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { title: 'Java Programming', issuer: 'Academic Certification', color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

export function Education() {
  return (
    <section id="education" className="py-24 relative bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Education &amp; Certifications
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Education</h3>
            </div>

            {/* B.Tech Card */}
            <div className="relative bg-card/50 backdrop-blur-md border border-border p-6 rounded-2xl shadow-sm hover:shadow-primary/10 transition-all group overflow-hidden">
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    B.Tech — Artificial Intelligence &amp; Data Science
                  </h4>
                  <p className="text-muted-foreground font-medium mt-1">
                    NPR College of Engineering &amp; Technology
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary font-semibold">Currently Pursuing</span>
                </div>
              </div>

              {/* Relevant coursework */}
              <div className="flex flex-wrap gap-2 mt-5">
                {['Machine Learning', 'Deep Learning', 'Data Structures', 'Python', 'Database Systems', 'Computer Vision', 'NLP'].map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 bg-background rounded-lg text-xs font-medium text-foreground border border-border/50"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
            </div>

            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur-md border border-border p-5 rounded-2xl shadow-sm hover:shadow-accent/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-lg font-bold text-foreground group-hover:${cert.color} transition-colors`}>
                      {cert.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">{cert.issuer}</p>
                  </div>
                  <div className={`px-3 py-1 ${cert.bg} ${cert.color} rounded-full text-xs font-semibold`}>
                    Verified
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View all certs link */}
            <Link
              to="/certificates"
              className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline mt-2"
            >
              View all certificates with photos →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
