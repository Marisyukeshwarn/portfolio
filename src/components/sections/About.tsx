import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Trophy } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { LINKEDIN_PROFILE } from '@/config/linkedin';

const stats = [
  { label: 'Projects Completed', value: '45+', icon: Code, color: 'text-primary' },
  { label: 'Learning Hours', value: '2500+', icon: BookOpen, color: 'text-accent' },
  { label: 'AI Models Built', value: '15+', icon: Trophy, color: 'text-primary' },
  { label: 'GitHub Commits', value: '3000+', icon: FaGithub, color: 'text-accent' },
];

function Model() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/model.glb');

  // Slow continuous Y-axis rotation for a premium showcase feel
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2.8}
      position={[0, -1, 0]}
    />
  );
}

function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {/* Lighting for premium look */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#38BDF8" />
        <pointLight position={[0, 4, 0]} intensity={1} color="#e0f2fe" distance={10} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        <Model />

        {/* Subtle shadow beneath the model */}
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.3}
          scale={6}
          blur={2}
          far={5}
          color="#1e293b"
        />

        {/* Let user freely rotate/zoom the model */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={9}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Suspense>
    </Canvas>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            About Me
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </div>

        {/* Main grid: text left, 3D model right */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Bio text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a passionate{' '}
              <strong className="text-foreground font-semibold">
                AI Engineer and Data Scientist
              </strong>{' '}
              from <strong className="text-foreground font-semibold">{LINKEDIN_PROFILE.location}</strong>, studying at{' '}
              <strong className="text-foreground font-semibold">{LINKEDIN_PROFILE.college}</strong>.{' '}
              {LINKEDIN_PROFILE.about}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not training models or optimizing algorithms, I'm exploring the latest advancements in LLMs, computer vision, and generative AI to craft intuitive, futuristic experiences.
            </p>

            {/* Stats grid below bio text */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-card/50 backdrop-blur-md p-6 rounded-2xl hover:bg-card/80 transition-colors group shadow-sm hover:shadow-md"
                >
                  <stat.icon className={`w-8 h-8 mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Interactive 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative w-full h-[560px] overflow-hidden"
          >
            {/* Ambient glow ring */}


            <ModelViewer />

            {/* Subtle label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="text-xs text-slate-400 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full tracking-widest uppercase">
                Drag to rotate · Scroll to zoom
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
