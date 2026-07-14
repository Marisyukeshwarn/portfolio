import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ArrowLeft, CheckCircle, Calendar, Building2, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const certificates = [
  {
    id: 1,
    title: 'Appathon – Certificate of Participation',
    issuer: 'Sri Eshwar College of Engineering',
    issuerShort: 'SECE',
    date: 'Feb 2026',
    expires: 'Lifetime',
    credentialId: 'SECE-THIRAN-2026-APP',
    category: 'Hackathon',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    textColor: 'text-cyan-400',
    verified: true,
    image: '/cirtificate/appathon.jpg',
    description: 'Certificate of Participation for Appathon conducted as part of Sri Eshwar THIRAN 2026 — an International Techno Cultural Sports Fest held at Sri Eshwar College of Engineering.',
    skills: ['App Development', 'Problem Solving', 'Innovation', 'Teamwork'],
    verifyUrl: '#',
  },
  {
    id: 2,
    title: 'HackSpora 2k25 – National Hackathon',
    issuer: 'Karpagam Academy of Higher Education',
    issuerShort: 'KAHE',
    date: 'Sep 2025',
    expires: 'Lifetime',
    credentialId: 'KAHE-HACKSPORA-2025',
    category: 'Hackathon',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    textColor: 'text-yellow-400',
    verified: true,
    image: '/cirtificate/hackthonkalasalingam.jpg',
    description: 'Participated in the National Level 24 Hours Hackathon "HackSpora 2k25" organized by AIQUBIT Association, Dept. of AI & Data Science at Karpagam Academy, held on 12th & 13th September 2025.',
    skills: ['AI & ML', '24-Hour Hackathon', 'Data Science', 'Rapid Prototyping'],
    verifyUrl: '#',
  },
  {
    id: 3,
    title: 'MULTIVERSE – National 30-Hour Hackathon',
    issuer: 'M.Kumarasamy College of Engineering',
    issuerShort: 'MKCE',
    date: 'Mar 2026',
    expires: 'Lifetime',
    credentialId: 'MKCE-AAROH-MULTIVERSE-2026',
    category: 'Hackathon',
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    textColor: 'text-amber-400',
    verified: true,
    image: '/cirtificate/hackthonkumarasamy.jpg',
    description: 'Certificate of Participation in "MULTIVERSE" National Level 30 Hours Hackathon organized by AAROH Student Club at M.Kumarasamy College of Engineering, Karur, held on 2nd & 3rd March 2026.',
    skills: ['Hackathon', 'Innovation', '30-Hour Sprint', 'Engineering'],
    verifyUrl: '#',
  },
  {
    id: 4,
    title: 'SQL (Structured Query Language) Workshop',
    issuer: 'DV Analytics',
    issuerShort: 'DV',
    date: 'Jun 2025',
    expires: 'Lifetime',
    credentialId: 'DVANALYTICS-SQL-2025',
    category: 'Technical',
    color: 'from-blue-600 to-red-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400',
    verified: true,
    image: '/cirtificate/sql.jpg',
    description: 'Certificate of Participation in a hands-on SQL workshop covering SQL Basics, Data Retrieval, Joins, Subqueries, CTEs, Window Functions, and Real-Time SQL Projects with Performance Optimization.',
    skills: ['SQL', 'Data Retrieval', 'Joins & CTEs', 'Window Functions', 'Query Optimization'],
    verifyUrl: '#',
  },
  {
    id: 5,
    title: 'Dev Hub Hack-A-Thon – VIT Chennai',
    issuer: 'Vellore Institute of Technology, Chennai',
    issuerShort: 'VIT',
    date: 'Mar 2026',
    expires: 'Lifetime',
    credentialId: 'VIT-CAMITRC-DEVHUB-2026',
    category: 'Hackathon',
    color: 'from-yellow-400 to-yellow-700',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    textColor: 'text-yellow-400',
    verified: true,
    image: '/cirtificate/vit hackthon.jpg',
    description: 'Certificate of Participation in Hack-A-Thon "Dev Hub" organized by CAMIT-RC at Vellore Institute of Technology, Chennai, held from 23rd to 24th March 2026.',
    skills: ['Full-Stack Development', 'Hackathon', 'Innovation', 'Team Collaboration'],
    verifyUrl: '#',
  },
  {
    id: 6,
    title: 'C Programming – Certification',
    issuer: 'Academic Certification',
    issuerShort: 'C',
    date: '2025',
    expires: 'Lifetime',
    credentialId: 'ACADEMIC-C-2025',
    category: 'Programming',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
    verified: true,
    image: '',
    description: 'Certified in C Programming fundamentals including pointers, memory management, data structures, file I/O, and algorithm implementation.',
    skills: ['Pointers', 'Memory Management', 'Data Structures', 'File I/O'],
    verifyUrl: '#',
  },
  {
    id: 7,
    title: 'C++ Programming – Certification',
    issuer: 'Academic Certification',
    issuerShort: 'C++',
    date: '2025',
    expires: 'Lifetime',
    credentialId: 'ACADEMIC-CPP-2025',
    category: 'Programming',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    textColor: 'text-violet-400',
    verified: true,
    image: '',
    description: 'Certified in C++ Programming covering OOP concepts, STL, templates, exception handling, and modern C++ features.',
    skills: ['OOP', 'STL', 'Templates', 'Exception Handling', 'Modern C++'],
    verifyUrl: '#',
  },
  {
    id: 8,
    title: 'Java Programming – Certification',
    issuer: 'Academic Certification',
    issuerShort: 'Java',
    date: '2025',
    expires: 'Lifetime',
    credentialId: 'ACADEMIC-JAVA-2025',
    category: 'Programming',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    textColor: 'text-orange-400',
    verified: true,
    image: '',
    description: 'Certified in Java Programming including OOP principles, collections framework, multithreading, JDBC, and application development.',
    skills: ['OOP', 'Collections', 'Multithreading', 'JDBC', 'App Development'],
    verifyUrl: '#',
  },
];

const categoryFilters = ['All', 'Hackathon', 'Technical', 'Programming'];

export function CertificatesPage() {
  const [filter, setFilter] = useState('All');
  const [flipped, setFlipped] = useState<number | null>(null);

  const filtered = certificates.filter((c) => filter === 'All' || c.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-emerald-500/5" />
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Professional Certifications
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              My{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Certificates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Real certificates earned through hackathons, workshops, and national-level technical competitions.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { label: 'Total Certifications', value: certificates.length },
              { label: 'Verified', value: certificates.filter((c) => c.verified).length },
              { label: 'Active', value: certificates.filter((c) => c.expires !== 'Lifetime' && new Date(c.expires) > new Date()).length },
              { label: 'Lifetime Credentials', value: certificates.filter((c) => c.expires === 'Lifetime').length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === cat
                  ? 'bg-violet-500 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'bg-card/50 text-muted-foreground border-border hover:border-violet-500/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Certificates Grid - flip cards */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="h-80"
              style={{ perspective: '1000px' }}
              onClick={() => setFlipped(flipped === cert.id ? null : cert.id)}
            >
              {/* Flip container */}
              <motion.div
                animate={{ rotateY: flipped === cert.id ? 180 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d', position: 'relative', height: '100%' }}
                className="cursor-pointer"
              >
                {/* Front – image card OR gradient fallback */}
                <div
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className={`absolute inset-0 rounded-2xl border ${cert.borderColor} overflow-hidden group hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-500`}
                >
                  {cert.image ? (
                    /* Photo card */
                    <>
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </>
                  ) : (
                    /* Gradient icon fallback for certs without a photo */
                    <div className={`w-full h-full bg-gradient-to-br ${cert.color} flex flex-col items-center justify-center gap-3 opacity-90 group-hover:opacity-100 transition-opacity`}>
                      <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-black text-3xl shadow-lg">
                        {cert.issuerShort}
                      </div>
                      <p className="text-white/70 text-xs font-semibold tracking-widest uppercase">{cert.category}</p>
                    </div>
                  )}

                  {/* Badges top */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cert.bgColor} ${cert.textColor} border ${cert.borderColor} backdrop-blur-sm`}>
                      {cert.category}
                    </span>
                    {cert.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-sm">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Info bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-white/70 font-medium line-clamp-1 mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-white/50 italic">
                        <ZoomIn className="w-3 h-3" /> Tap to details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className={`absolute inset-0 rounded-2xl border ${cert.borderColor} bg-card/80 backdrop-blur-sm p-6 flex flex-col justify-between`}
                >
                  <div>
                    <h3 className={`text-base font-bold ${cert.textColor} mb-3`}>{cert.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-muted/40 rounded-md text-xs text-foreground border border-border/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="w-3 h-3 flex-shrink-0" />
                      <span className="font-mono">ID: {cert.credentialId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>Expires: {cert.expires}</span>
                    </div>
                    <a
                      href={cert.verifyUrl}
                      onClick={(e) => e.stopPropagation()}
                      className={`mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r ${cert.color} text-white text-xs font-semibold hover:opacity-90 transition-opacity`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify Credential
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
