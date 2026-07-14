"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual animated particle cloud (Sparse Ambient Starfield)
function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 350; // Sparse particle count for clean look

  // Generate particle positions scattered in a wide space
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Uniform distribution in a larger sphere shell to act as background stars
      const theta = Math.random() * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const r = 4.0 + Math.random() * 6.0; // Scatter widely between 4.0 and 10.0 radius

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Slow, ambient background rotation (zero CPU vertex morphing)
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Tiny constant rotation
    pointsRef.current.rotation.y = time * 0.008;
    pointsRef.current.rotation.x = time * 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#818cf8" // Premium indigo-400 color
        size={0.025}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeCanvas() {
  const [mounted, setMounted] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(support);
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#030014]/50" />;
  }

  // Fallback visual if WebGL is not supported
  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-30">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/10 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/5 blur-[110px] rounded-full animate-bounce duration-[15s]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[1, 1, 1]} intensity={0.5} />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
