import React, { Suspense, useRef, Component } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Code, Brain, BarChart3, Database, Sparkles } from 'lucide-react';
import { LINKEDIN_PROFILE_URL } from '@/config/linkedin';
import { Canvas } from '@react-three/fiber';
import { useFBX, OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';


const coreCompetencies = [
  { icon: Brain, label: 'Machine Learning', desc: 'Predictive modeling, classification & regression' },
  { icon: Code, label: 'Python & SQL', desc: 'Data wrangling, scripting & database querying' },
  { icon: BarChart3, label: 'Data Visualization', desc: 'Power BI, Matplotlib, Plotly dashboards' },
  { icon: Database, label: 'Data Analysis', desc: 'EDA, preprocessing & feature engineering' },
];

const projectHighlights = [
  'Built 8+ ML prediction models (healthcare, spam, loan, diabetes, drug type, ads CTR)',
  'Developed full-stack web apps with React, TypeScript, and Firebase',
  'Created mobile apps with Flutter (WakeStop, RoadSoS crash detection)',
  'Won participation in 4 national-level hackathons (VIT, Karpagam, M.Kumarasamy, Sri Eshwar)',
  'Implemented computer vision pipelines with OpenCV and YOLO',
  'Built AI-powered tools using Gemini AI (Gmail Automator, Linguisense, AI Notepad)',
];

// ── Error boundary that renders inside the Canvas ─────────────────
class CanvasErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(e: unknown) { console.warn('[MonitorModel] load failed:', e); }
  render() {
    if (this.state.hasError) {
      // Fallback: glowing wireframe sphere inside the canvas
      return (
        <mesh>
          <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
          <meshStandardMaterial
            color="#38BDF8"
            wireframe
            emissive="#38BDF8"
            emissiveIntensity={1.5}
          />
        </mesh>
      );
    }
    return this.props.children;
  }
}

// ── Robot FBX model ───────────────────────────────────────────────
function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const fbx = useFBX('/Robot.fbx');

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef} dispose={null}>
        <primitive object={fbx} scale={0.8} position={[0, -1.5, 0]} />
      </group>
    </Float>
  );
}

// ── Canvas viewer ──────────────────────────────────────────────────
function MonitorViewer() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      dpr={[1, 2]}
      shadows
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#38BDF8" />
      <pointLight position={[0, 5, 3]} intensity={1} color="#e0f2fe" distance={14} />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <CanvasErrorBoundary>
          <RobotModel />
        </CanvasErrorBoundary>
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={8}
          blur={2.5}
          far={6}
          color="#0f172a"
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={9}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate={false}
      />
    </Canvas>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Experience
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* LEFT — 3D Monitor  */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[500px] overflow-hidden"
          >
            <MonitorViewer />
            <div className="absolute inset-0 pointer-events-none rounded-3xl bg-primary/5 blur-3xl -z-10" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-xs text-muted-foreground bg-background/30 backdrop-blur-sm px-3 py-1 rounded-full tracking-widest uppercase">
                Drag · Rotate · Zoom
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Content */}
          <div className="space-y-8">

            {/* Fresher Profile Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-7 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-foreground">Fresher</h3>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                      Open to Work
                    </span>
                  </div>
                  <p className="text-sm text-primary font-semibold">Aspiring Data Scientist &amp; AI Engineer</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Currently seeking an entry-level Data Scientist opportunity to apply knowledge of
                <strong className="text-foreground"> Python, SQL, Machine Learning, Data Analysis, </strong>
                and <strong className="text-foreground">Power BI</strong>.
                Developed hands-on experience through academic projects, self-learning, and practical
                implementation of data science concepts — eager to contribute analytical skills and a
                passion for AI in a professional environment.
              </p>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#004182] transition-colors shadow-lg shadow-[#0A66C2]/20"
              >
                <Sparkles className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </motion.div>

            {/* Core Competencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {coreCompetencies.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-3 bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xs">{item.label}</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hands-On Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-accent" />
                Hands-On Highlights
              </h3>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5">
                <ul className="space-y-2.5">
                  {projectHighlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
