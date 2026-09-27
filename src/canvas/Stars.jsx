import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 1200 }) {
  const pointsRef = useRef();

  // Generate random 3D position points in a sphere
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorCopper = new THREE.Color('#c87f4f');
    const colorWhite = new THREE.Color('#f1f5f9');
    const colorSlate = new THREE.Color('#475569');

    for (let i = 0; i < count; i++) {
      // Position spread
      const r = 20 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color variation - blend white, copper, slate
      const rand = Math.random();
      let chosenColor = colorWhite;
      if (rand > 0.7) chosenColor = colorCopper;
      else if (rand > 0.4) chosenColor = colorSlate;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  // Gentle slow rotation frame loop
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.02;
      pointsRef.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.7}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function StarsCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(21, 28, 36, 0.4) 0%, rgba(15, 20, 25, 1) 100%)'
      }}
    >
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }} gl={{ antialias: false }}>
        <StarField count={1500} />
      </Canvas>
    </div>
  );
}

