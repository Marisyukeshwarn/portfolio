import React, { Suspense, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import { LINKEDIN_PROFILE_URL, LINKEDIN_PROFILE } from '@/config/linkedin';

function ObjModel() {
  const groupRef = useRef<THREE.Group>(null);
  const obj = useLoader(OBJLoader, '/Rmk3.obj');

  // Clone and apply material so it looks premium
  const model = React.useMemo(() => {
    const cloned = obj.clone();
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#cbd5e1',
          roughness: 0.3,
          metalness: 0.7,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return cloned;
  }, [obj]);

  // Compute bounding box to auto-center and scale the model
  const { scale, center } = React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return { scale: 3.5 / maxDim, center: c };
  }, [model]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={model}
        scale={scale}
        position={[-center.x * scale, -center.y * scale, -center.z * scale]}
      />
    </group>
  );
}

function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      dpr={[1, 2]}
      shadows
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#38BDF8" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#e0f2fe" distance={12} />

        <Environment preset="city" />
        <ObjModel />

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.25}
          scale={8}
          blur={2.5}
          far={6}
          color="#1e293b"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Suspense>
    </Canvas>
  );
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Convert FormData to URLSearchParams for better compatibility with Google Apps Script
      const data = new URLSearchParams();
      formData.forEach((value, key) => {
        data.append(key, value.toString());
      });

      await fetch('https://script.google.com/macros/s/AKfycbyeyzog-fgE39x7dLtHLF_zz3SNhmviGMdbxAqfnCtaWGFtT-Yqcp1ybh3Bxze1gFtJ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
      setSubmitStatus('success');
      form.reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Get In Touch
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">

          {/* Left: 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Heading above the model */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-3">Let's build the future together.</h3>
              <p className="text-muted-foreground text-lg">
                Whether you have a question, a project in mind, or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* 3D OBJ Model — no background, no border */}
            <div className="relative w-full h-[380px]">
              <ModelViewer />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="text-xs text-muted-foreground bg-background/30 backdrop-blur-sm px-3 py-1 rounded-full tracking-widest uppercase">
                  Drag to rotate · Scroll to zoom
                </span>
              </div>
            </div>

            {/* Contact info below model */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground text-sm">{LINKEDIN_PROFILE.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground text-sm">{LINKEDIN_PROFILE.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] shrink-0">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground">LinkedIn</h4>
                  <a
                    href={LINKEDIN_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-[#0A66C2] transition-colors"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground resize-none disabled:opacity-50"
                  placeholder="How can I help you?"
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full group">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
              
              {submitStatus === 'success' && (
                <p className="text-green-500 text-sm text-center">Message sent successfully! I'll get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center">There was an error sending your message. Please try again.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
