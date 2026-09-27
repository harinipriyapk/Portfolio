import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function WireframeGlobe() {
  const globeRef = useRef();
  const innerSphereRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25;
      globeRef.current.rotation.x += delta * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group scale={[2.3, 2.3, 2.3]}>
      {/* Dark Inner Core */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshBasicMaterial color="#0f1419" opacity={0.9} transparent />
      </mesh>

      {/* Main Procedural Wireframe Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial
          color="#d88b5c"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Equatorial Circuit Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial
          color="#d99362"
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function EarthCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '320px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#c87f4f" />
        <WireframeGlobe />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

