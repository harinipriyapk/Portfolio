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
  componentDidCatch(error) {
    console.warn('Avatar GLB load fallback triggered:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Procedural 3D Developer Avatar Fallback Mesh
function ProceduralAvatar() {
  const avatarGroup = useRef();

  useFrame((state) => {
    if (avatarGroup.current) {
      avatarGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      avatarGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 - 0.2;
    }
  });

  return (
    <group ref={avatarGroup} position={[0, -0.2, 0]}>
      {/* Head Sphere */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#1a232e" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Cyber Visor / Tech Headband Accent */}
      <mesh position={[0, 0.95, 0.2]}>
        <boxGeometry args={[0.7, 0.12, 0.4]} />
        <meshStandardMaterial color="#c87f4f" emissive="#c87f4f" emissiveIntensity={0.5} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.2, 16]} />
        <meshStandardMaterial color="#151c24" />
      </mesh>

      {/* Torso / Jacket */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.55, 0.4, 1.2, 24]} />
        <meshStandardMaterial color="#151c24" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Chest Circuit Badge */}
      <mesh position={[0, 0.1, 0.38]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#c87f4f" wireframe />
      </mesh>
    </group>
  );
}

// GLB Avatar Loader Component
function GlbAvatarModel() {
  const { scene } = useGLTF('/models/avatar.glb');
  const avatarRef = useRef();

  useFrame((state) => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <primitive
      ref={avatarRef}
      object={scene}
      scale={1.5}
      position={[0, -1.2, 0]}
    />
  );
}

try {
  useGLTF.preload('/models/avatar.glb');
} catch (e) {
  // Ignore preloader error
}

export default function AvatarCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '350px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} color="#c87f4f" />
        <pointLight position={[-3, 1, -2]} intensity={0.8} color="#d99362" />

        <CanvasErrorBoundary fallback={<ProceduralAvatar />}>
          <Suspense fallback={<ProceduralAvatar />}>
            <GlbAvatarModel />
          </Suspense>
        </CanvasErrorBoundary>

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

