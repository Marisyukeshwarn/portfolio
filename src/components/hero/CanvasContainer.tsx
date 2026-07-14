import React, { Suspense, Component, ErrorBoundary } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { BrainModel } from './BrainModel';
import * as THREE from 'three';

// A simple error boundary to catch missing model errors
class ModelErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error loading 3D model:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#38BDF8" wireframe emissive="#38BDF8" emissiveIntensity={2} />
        </mesh>
      );
    }
    return this.props.children;
  }
}

export function CanvasContainer() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ModelErrorBoundary>
            <BrainModel />
          </ModelErrorBoundary>
        </Suspense>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={10} />
      </Canvas>
    </div>
  );
}
