import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

export function BrainModel() {
  const group = useRef<THREE.Group>(null);
  
  // Attempt to load the model. Ensure aibrain.glb is in the public folder.
  // We use try/catch or assume it's there. 
  // For now, we will just use the hook. If the file is missing, it might throw a 404 in console but React Suspense should be handled by a parent.
  const { nodes, materials } = useGLTF('/aibrain.glb') as any;

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={group} dispose={null} scale={3}>
        {/* If nodes exist, render the first mesh or the scene */}
        {nodes && Object.keys(nodes).length > 0 ? (
          <primitive object={nodes.Scene || nodes[Object.keys(nodes)[0]]} />
        ) : (
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#38BDF8" wireframe emissive="#38BDF8" emissiveIntensity={2} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

// Preload the model
useGLTF.preload('/aibrain.glb');
