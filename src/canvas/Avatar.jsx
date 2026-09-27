import React, { useRef, useState, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const HOVER_MESSAGES = [
  "Hi, I'm Harini! 👋",
  "Let's build something.",
  "Full-stack developer",
];

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

// Simple Procedural Fallback (used only if InteractiveAiBot errors/GLB fails)
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
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#1a232e" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.95, 0.2]}>
        <boxGeometry args={[0.7, 0.12, 0.4]} />
        <meshStandardMaterial color="#c87f4f" emissive="#c87f4f" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.2, 16]} />
        <meshStandardMaterial color="#151c24" />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.55, 0.4, 1.2, 24]} />
        <meshStandardMaterial color="#151c24" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0.38]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#c87f4f" wireframe />
      </mesh>
    </group>
  );
}

// Interactive Procedural Bot — arc reactor chest, orbiting ring, hover message cycle
function InteractiveAiBot({ isHovered, setIsHovered, messageIndex, setMessageIndex }) {
  const bodyGroupRef = useRef();
  const chestCoreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (bodyGroupRef.current) {
      bodyGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * (isHovered ? 0.35 : 0.15);
      bodyGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 - 0.2;
    }
    if (chestCoreRef.current) {
      const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      chestCoreRef.current.material.emissiveIntensity = isHovered ? 1.4 : pulse;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += isHovered ? 0.02 : 0.006;
    }
  });

  const handleClick = () => {
    setMessageIndex((messageIndex + 1) % HOVER_MESSAGES.length);
  };

  return (
    <group
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <group ref={bodyGroupRef} position={[0, -0.2, 0]}>
        {/* Head */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#1a232e" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Visor accent */}
        <mesh position={[0, 0.95, 0.2]}>
          <boxGeometry args={[0.7, 0.12, 0.4]} />
          <meshStandardMaterial color="#c87f4f" emissive="#c87f4f" emissiveIntensity={0.5} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.2, 16]} />
          <meshStandardMaterial color="#151c24" />
        </mesh>

        {/* Torso */}
        <group position={[0, -0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.55, 0.4, 1.2, 24]} />
            <meshStandardMaterial color="#151c24" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Arc Reactor Glowing Chest Core */}
          <mesh ref={chestCoreRef} position={[0, 0.15, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} />
            <meshStandardMaterial
              color="#c87f4f"
              emissive="#c87f4f"
              emissiveIntensity={1.0}
            />
          </mesh>

          {/* Shoulder Pads */}
          <mesh position={[-0.52, 0.25, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#232e3c" metalness={0.8} />
          </mesh>
          <mesh position={[0.52, 0.25, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#232e3c" metalness={0.8} />
          </mesh>
        </group>

        {/* Orbiting Holographic Data Ring */}
        <mesh ref={ringRef} position={[0, -0.2, 0]}>
          <torusGeometry args={[0.85, 0.015, 16, 64]} />
          <meshBasicMaterial
            color={isHovered ? '#38bdf8' : '#c87f4f'}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}

// GLB Avatar Loader (kept as optional real-model path)
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
  const [isHovered, setIsHovered] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '360px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.3, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#c87f4f" />
        <pointLight position={[-4, 2, -2]} intensity={1.0} color="#38bdf8" />
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#c87f4f" />

        <CanvasErrorBoundary fallback={<ProceduralAvatar />}>
          <Suspense fallback={<ProceduralAvatar />}>
            <InteractiveAiBot
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              messageIndex={messageIndex}
              setMessageIndex={setMessageIndex}
            />
          </Suspense>
        </CanvasErrorBoundary>

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.6}
        />
      </Canvas>

      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#c87f4f',
            fontSize: 14,
            fontWeight: 600,
            pointerEvents: 'none',
          }}
        >
          {HOVER_MESSAGES[messageIndex]}
        </div>
      )}
    </div>
  );
}