'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  rotationSpeed?: number;
}

function FloatingCrystals() {
  const crystals = Array.from({ length: 15 }, (_, i) => ({
    position: [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ],
    scale: Math.random() * 0.4 + 0.2,
    speed: Math.random() * 0.3 + 0.2
  }));

  return (
    <>
      {crystals.map((crystal, i) => (
        <Float
          key={i}
          speed={crystal.speed} 
          rotationIntensity={0.6} 
          floatIntensity={1.5}
          position={crystal.position as [number, number, number]}
        >
          <mesh
            rotation={crystal.rotation as [number, number, number]}
            scale={crystal.scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="#00f5d4"
              roughness={0.1}
              metalness={0.8}
              emissive="#00f5d4"
              emissiveIntensity={0.4}
              transparent
              opacity={0.9}
              envMapIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function InteractiveRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      ringsRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <group ref={ringsRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
          <torusGeometry args={[2 + i * 0.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#00f5d4"
            roughness={0.1}
            metalness={0.8}
            emissive="#00f5d4"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene({ rotationSpeed = 0.2 }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00f5d4" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      <Environment preset="night" />
      <Stars
        radius={50}
        depth={50}
        count={3000}
        factor={4}
        saturation={1}
        fade
        speed={0.5}
      />

      {/* Background Elements */}
      <FloatingCrystals />
      <InteractiveRings />

      {/* Main Content */}
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh
            ref={meshRef}
            position={[0, 0, 0]}
            castShadow
            receiveShadow
          >
            <torusKnotGeometry args={[1, 0.3, 256, 32]} />
            <meshPhysicalMaterial
              color="#00f5d4"
              roughness={0.1}
              metalness={0.9}
              emissive="#00f5d4"
              emissiveIntensity={0.4}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={2}
            />
          </mesh>
        </Float>
      </PresentationControls>
    </>
  );
} 