import React, { useRef, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('Laptop Canvas error fallback:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Screen Display component using texture
function ScreenDisplay() {
  const texture = useTexture('/hero-display.jpg');
  return (
    <mesh position={[0, 0.85, 0.045]}>
      <planeGeometry args={[2.3, 1.45]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// Fallback plain screen if texture loading
function ScreenFallback() {
  return (
    <mesh position={[0, 0.85, 0.045]}>
      <planeGeometry args={[2.3, 1.45]} />
      <meshBasicMaterial color="#141b24" />
    </mesh>
  );
}

// 3D Laptop Mesh
function LaptopModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Base Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 0.1, 1.8]} />
        <meshStandardMaterial color="#1a232e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Keyboard Area */}
      <mesh position={[0, 0.06, -0.1]}>
        <boxGeometry args={[2.3, 0.02, 1.1]} />
        <meshStandardMaterial color="#0b0f14" roughness={0.7} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.06, 0.55]}>
        <boxGeometry args={[0.75, 0.01, 0.48]} />
        <meshStandardMaterial color="#232e3c" roughness={0.4} />
      </mesh>

      {/* Screen Lid */}
      <group position={[0, 0.05, -0.9]} rotation={[-0.25, 0, 0]}>
        {/* Back Lid */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.55, 1.65, 0.06]} />
          <meshStandardMaterial color="#11161d" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Screen Bezel */}
        <mesh position={[0, 0.85, 0.035]}>
          <boxGeometry args={[2.45, 1.55, 0.01]} />
          <meshBasicMaterial color="#05070a" />
        </mesh>

        {/* Image Display */}
        <Suspense fallback={<ScreenFallback />}>
          <ScreenDisplay />
        </Suspense>

        {/* Glass Glow */}
        <mesh position={[0, 0.85, 0.05]}>
          <planeGeometry args={[2.3, 1.45]} />
          <meshBasicMaterial color="#c87f4f" transparent opacity={0.05} />
        </mesh>
      </group>
    </group>
  );
}

// Fallback mesh if 3D Canvas completely fails
function FallbackCanvasMesh() {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[2.5, 1.6, 0.1]} />
        <meshBasicMaterial color="#141b24" />
      </mesh>
    </group>
  );
}

export default function LaptopCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '380px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#c87f4f" />
        <pointLight position={[-3, 2, -2]} intensity={1.0} color="#38bdf8" />

        <CanvasErrorBoundary fallback={<FallbackCanvasMesh />}>
          <LaptopModel />
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
