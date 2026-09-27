import React, { useRef, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('GLB load fallback triggered:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
      
    }
    return this.props.children;
  }
}

// Procedural 3D Laptop Mesh (Fallback when GLB model is missing or loading)
function ProceduralLaptop() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.7]} />
        <meshStandardMaterial color="#1a232e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Keyboard Area */}
      <mesh position={[0, 0.06, -0.1]}>
        <boxGeometry args={[2.2, 0.02, 1.0]} />
        <meshStandardMaterial color="#0f1419" roughness={0.7} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.06, 0.5]}>
        <boxGeometry args={[0.7, 0.01, 0.45]} />
        <meshStandardMaterial color="#263342" roughness={0.4} />
      </mesh>

      {/* Screen Hinge & Lid */}
      <group position={[0, 0.05, -0.85]} rotation={[-0.3, 0, 0]}>
        {/* Lid Backing */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.5, 1.7, 0.06]} />
          <meshStandardMaterial color="#151c24" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Glowing Screen Display */}
        <mesh position={[0, 0.85, 0.04]}>
          <boxGeometry args={[2.3, 1.5, 0.01]} />
          <meshBasicMaterial color="#0f1419" />
        </mesh>

        {/* Code Terminal Glow Accent */}
        <mesh position={[0, 0.85, 0.05]}>
          <boxGeometry args={[2.1, 1.3, 0.005]} />
          <meshBasicMaterial color="#c87f4f" wireframe transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// GLB Laptop Model Loader
function GlbLaptopModel() {
  const { scene } = useGLTF('/models/laptop.glb');
  const laptopRef = useRef();

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <primitive
      ref={laptopRef}
      object={scene}
      scale={1.2}
      position={[0, -0.5, 0]}
    />
  );
}

// Preload attempt safely
try {
  useGLTF.preload('/models/laptop.glb');
} catch (e) {
  // Ignore preloader error
}

export default function LaptopCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '380px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#c87f4f" />
        <pointLight position={[-3, 2, -2]} intensity={1.0} color="#38bdf8" />

        <CanvasErrorBoundary fallback={<ProceduralLaptop />}>
          <Suspense fallback={<ProceduralLaptop />}>
            <GlbLaptopModel />
          </Suspense>
        </CanvasErrorBoundary>

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

