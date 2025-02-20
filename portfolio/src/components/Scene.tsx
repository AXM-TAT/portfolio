import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  rotationSpeed?: number;
}

function FloatingCrystals() {
  const crystals = Array.from({ length: 30 }, (_, i) => ({
    position: [
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ],
    scale: Math.random() * 0.3 + 0.1,
    speed: Math.random() * 0.5 + 0.5
  }));

  return (
    <>
      {crystals.map((crystal, i) => (
        <Float
          key={i}
          speed={crystal.speed} 
          rotationIntensity={0.5} 
          floatIntensity={2}
          position={crystal.position as [number, number, number]}
        >
          <mesh
            rotation={crystal.rotation as [number, number, number]}
            scale={crystal.scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#00f5d4"
              roughness={0.1}
              metalness={0.8}
              emissive="#00f5d4"
              emissiveIntensity={0.2}
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
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <pointLight position={[0, 0, 0]} intensity={1} color="#00f5d4" />
      <Environment preset="night" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Background Elements */}
      <FloatingCrystals />
      <InteractiveRings />

      {/* Main Content */}
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
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
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial
              color="#00f5d4"
              roughness={0.2}
              metalness={0.8}
              emissive="#00f5d4"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      </PresentationControls>
    </>
  );
} 