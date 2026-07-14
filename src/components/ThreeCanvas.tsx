"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual animated particle cloud
function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Generate particle positions on a sphere surface with slight noise
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.5; // Radius around 2.0

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Animate rotation & pulse scale for a subtle dynamic wave effect (highly optimized)
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x = time * 0.015;

    // Pulse scale mathematically to emulate expansion/contraction wave (highly optimized)
    const scaleVal = 1.0 + Math.sin(time * 0.35) * 0.03;
    pointsRef.current.scale.set(scaleVal, scaleVal, scaleVal);
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
        color="#a855f7"
        size={0.035}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Interactive rings rotating on opposite axes
function FloatingRings() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.15;
      outerRingRef.current.rotation.x = time * 0.05;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.2;
      innerRingRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group>
      {/* Outer Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.5, 0.015, 8, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} wireframe />
      </mesh>
      {/* Inner Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.1, 0.01, 8, 60]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.4} wireframe />
      </mesh>
    </group>
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

  // Fallback visual if WebGL is not supported (beautiful CSS radial blobs)
  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-40">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full animate-bounce duration-[10s]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ParticleCloud />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
