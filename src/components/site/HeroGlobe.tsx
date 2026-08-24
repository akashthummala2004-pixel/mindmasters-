import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Wireframe() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.12;
      ref.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.15;
    }
  });
  return (
    <group ref={ref}>
      {/* Core sphere */}
      <Sphere args={[1.6, 64, 64]}>
        <meshStandardMaterial
          color={"#0a1230"}
          emissive={"#1a2a6c"}
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>
      {/* Wireframe */}
      <Sphere args={[1.62, 48, 48]}>
        <meshBasicMaterial color={"#5ee4ff"} wireframe transparent opacity={0.35} />
      </Sphere>
      {/* Outer glow shell */}
      <Sphere args={[1.85, 32, 32]}>
        <meshBasicMaterial color={"#7a5cff"} wireframe transparent opacity={0.12} />
      </Sphere>
      <Connections />
    </group>
  );
}

function Connections() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.62;
      arr.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
      );
    }
    return arr;
  }, []);
  return (
    <>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#b388ff" : "#5ee4ff"} />
        </mesh>
      ))}
    </>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 600;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3 + Math.random() * 3;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.018} color={"#9bdcff"} transparent opacity={0.7} />
    </points>
  );
}

export function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color={"#5ee4ff"} />
      <pointLight position={[-5, -3, -2]} intensity={1.5} color={"#b388ff"} />
      <Stars radius={40} depth={30} count={1500} factor={3} fade speed={0.5} />
      <Particles />
      <Wireframe />
    </Canvas>
  );
}
