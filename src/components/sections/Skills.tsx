import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Sparkles, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const ORBIT_SKILLS = [
  { name: 'SQL', logo: '/Azure SQL Database.svg', prof: '90%' },
  { name: 'React', logo: '/React.svg', prof: '95%' },
  { name: 'AWS', logo: '/AWS.svg', prof: '85%' },
  { name: 'GitHub', logo: '/GitHub.svg', prof: '90%' },
  { name: 'NumPy', logo: '/NumPy.svg', prof: '92%' },
  { name: 'TensorFlow', logo: '/TensorFlow.svg', prof: '80%' },
  { name: 'LangChain', logo: '/LangChain.svg', prof: '85%' },
  { name: 'Scikit-learn', logo: '/scikit-learn.svg', prof: '88%' },
  { name: 'Pandas', logo: '/Pandas.svg', prof: '95%' },
  { name: 'Docker', logo: '/Docker.svg', prof: '80%' },
  { name: 'PyTorch', logo: '/PyTorch.svg', prof: '85%' }
];

// Reusable function to create perfect mathematically correct 2D ellipses
const createEllipsePoints = (rx: number, ry: number, segments: number = 128) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * rx, Math.sin(theta) * ry, 0));
  }
  return points;
};

interface OrbitRingsProps {
  rx: number;
  ry: number;
}

function OrbitRings({ rx, ry }: OrbitRingsProps) {
  const materialRef1 = useRef<THREE.LineDashedMaterial>(null);
  const materialRef2 = useRef<THREE.LineDashedMaterial>(null);

  // Animate the dash offsets to create the illusion of rotating rings around the fixed ellipse
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (materialRef1.current) materialRef1.current.dashOffset = -time * 50;
    if (materialRef2.current) materialRef2.current.dashOffset = time * 30;
  });

  const ellipse1 = useMemo(() => createEllipsePoints(rx, ry), [rx, ry]);
  const ellipse2 = useMemo(() => createEllipsePoints(rx + 30, ry + 30), [rx, ry]);

  return (
    <group>
      {/* Solid faint guide line */}
      <Line points={ellipse1} color="#38BDF8" lineWidth={1} transparent opacity={0.15} />
      
      {/* Glowing dashed orbit line passing EXACTLY through center of icons */}
      <Line points={ellipse1} color="#38BDF8" lineWidth={2} transparent opacity={0.6}>
        <lineDashedMaterial ref={materialRef1} dashSize={15} gapSize={15} color="#38BDF8" transparent opacity={0.6} />
      </Line>
      
      {/* Outer counter-rotating dashed ring */}
      <Line points={ellipse2} color="#94a3b8" lineWidth={1} transparent opacity={0.3}>
        <lineDashedMaterial ref={materialRef2} dashSize={25} gapSize={35} color="#94a3b8" transparent opacity={0.3} />
      </Line>
    </group>
  );
}

function CenterPython() {
  return (
    <Html center zIndexRange={[10, 0]}>
      {/* Python Center: Exactly 140px, fixed at mathematical center */}
      <div className="w-[140px] h-[140px] flex items-center justify-center rounded-full bg-slate-900/10 backdrop-blur-xl border border-slate-300 shadow-[0_0_40px_rgba(56,189,248,0.3)]">
        <div className="flex flex-col items-center">
          <img src="/Python.svg" alt="Python" className="w-[60px] h-[60px] object-contain drop-shadow-md" />
          <span className="mt-2 text-slate-800 font-bold tracking-widest text-sm uppercase">Python</span>
        </div>
      </div>
    </Html>
  );
}

interface SkillNodeProps {
  skill: typeof ORBIT_SKILLS[0];
  index: number;
  total: number;
  rx: number;
  ry: number;
}

function SkillNode({ skill, index, total, rx, ry }: SkillNodeProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Equal angular spacing calculated mathematically
  const baseAngle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (group.current) {
      // Position calculated from elapsedTime directly. 20 seconds = 1 full orbit (Math.PI * 2)
      // Icons continue to orbit continuously, even when hovered.
      const currentAngle = baseAngle + (state.clock.elapsedTime / 20) * Math.PI * 2;
      group.current.position.x = Math.cos(currentAngle) * rx;
      group.current.position.y = Math.sin(currentAngle) * ry;
      // Z remains 0. Rotation remains 0. The node only translates.
    }
  });

  return (
    <group ref={group}>
      <Html center zIndexRange={[100, 10]}>
        {/* The node never rotates, ensuring icons remain perfectly upright */}
        <div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Framer motion handles hover state independent of orbit translation */}
          <motion.div 
            initial={{ scale: 1, y: 0 }}
            animate={{ 
              scale: hovered ? 1.15 : 1, 
              y: hovered ? -8 : 0,
              boxShadow: hovered ? '0 0 25px rgba(56,189,248,0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`
              flex items-center justify-center w-[72px] h-[72px] rounded-full p-[14px]
              bg-slate-900/5 backdrop-blur-md border 
              ${hovered ? 'border-primary/60' : 'border-slate-300'}
            `}
          >
            <img 
              src={skill.logo} 
              alt={skill.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('text-xs', 'font-bold', 'text-slate-800');
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerText = skill.name.slice(0,2).toUpperCase();
                }
              }}
            />
          </motion.div>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center whitespace-nowrap z-50 pointer-events-none"
              >
                <div className="px-4 py-2 bg-slate-900 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl flex flex-col items-center">
                  <span className="text-white font-bold text-sm tracking-wide">{skill.name}</span>
                  <div className="w-full h-px bg-white/20 my-1" />
                  <span className="text-primary-foreground/80 text-xs font-medium">Proficiency: {skill.prof}</span>
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-l border-t border-slate-700 rotate-45 transform origin-center" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  const { size } = useThree();
  
  // Calculate exact radii based on pixel dimensions per breakpoint
  const orbitW = size.width < 768 ? 340 : size.width < 1024 ? 620 : 760;
  const orbitH = size.width < 768 ? 340 : size.width < 1024 ? 360 : 430;
  const rx = orbitW / 2;
  const ry = orbitH / 2;

  return (
    <>
      <ambientLight intensity={0.6} />
      
      {/* Background Particles mapped to the orthographic container space */}
      <Sparkles count={80} scale={[orbitW * 1.5, orbitH * 1.5, 100]} size={3} speed={0.2} opacity={0.5} color="#475569" />

      {/* Orbit Rings matching exact mathematical boundaries */}
      <OrbitRings rx={rx} ry={ry} />
      
      {/* 140px fixed Python Center */}
      <CenterPython />

      {/* Translating perfectly spaced icons */}
      {ORBIT_SKILLS.map((skill, index) => (
        <SkillNode 
          key={skill.name} 
          skill={skill} 
          index={index}
          total={ORBIT_SKILLS.length}
          rx={rx} 
          ry={ry} 
        />
      ))}
    </>
  );
}

export function Skills() {
  return (
    <section id="skills" className="w-full bg-white relative overflow-hidden">
      {/* Fog Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/50 to-white pointer-events-none z-10" />
      
      {/* Flex Layout Container enforcing 1200px max-width, center aligned */}
      <div className="relative z-20 max-w-[1200px] w-full mx-auto px-[24px] py-[80px] flex flex-col items-center justify-center">
        
        {/* 3D Canvas Context Container */}
        {/* Responsive constraints matching standard breakpoints */}
        <div className="relative w-full max-w-[800px] h-[340px] md:h-[400px] lg:h-[480px] flex items-center justify-center">
          {/* Orthographic Camera ensures 1 unit = 1 CSS pixel */}
          <Canvas orthographic camera={{ position: [0, 0, 500], zoom: 1 }}>
            <React.Suspense fallback={null}>
              <Scene />
            </React.Suspense>
          </Canvas>
        </div>

        {/* Typography Section perfectly centered below */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mt-[60px] flex flex-col items-center pointer-events-auto"
        >
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-[700] tracking-tight text-slate-900 drop-shadow-sm leading-tight">
            Skills Orbit
          </h2>
          <p className="text-slate-600 max-w-[600px] w-full mx-auto text-lg mt-[24px]">
            A constellation of modern technologies driving intelligent systems and seamless web applications.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
