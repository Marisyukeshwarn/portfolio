import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Hero } from '@/components/hero/Hero'
import { Navbar } from '@/components/navigation/Navbar'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { GithubDashboard } from '@/components/sections/GithubDashboard'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/navigation/Footer'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { CertificatesPage } from '@/pages/CertificatesPage'
import { SmoothScroll } from '@/components/SmoothScroll'

function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <GithubDashboard />
      <Contact />
      <Footer />
    </main>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
}

function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SmoothScroll />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <HomePage />
            </motion.div>
          } />
          <Route
            path="/projects"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Navbar />
                <ProjectsPage />
                <Footer />
              </motion.div>
            }
          />
          <Route
            path="/certificates"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Navbar />
                <CertificatesPage />
                <Footer />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
