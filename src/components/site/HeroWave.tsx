import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * WaveField — animated 3D dot mesh that flows like the Strat reference.
 * Renders a high-density plane as gl_POINTS with a shader-driven sine wave.
 */
function WaveField() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(80, 50, 300, 180),
    []
  );

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points
      geometry={geometry}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -3.0, 0]}
    >
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          uniform float uTime;
          varying float vElev;
          varying float vDist;

          void main() {
            vec3 pos = position;

            // Big rolling swells + cross-current ripples
            float w1 = sin(pos.x * 0.38 + uTime * 0.45) * 1.0;
            float w2 = cos(pos.y * 0.32 + uTime * 0.35) * 0.8;
            float w3 = sin((pos.x * 0.55 + pos.y * 0.40) + uTime * 0.60) * 0.4;
            float w4 = sin(length(pos.xy) * 0.22 - uTime * 0.40) * 0.25;
            float wave = w1 + w2 + w3 + w4;

            pos.z = wave;
            vElev = wave;

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            vDist = -mv.z;
            gl_Position = projectionMatrix * mv;

            // Finer, smaller dots
            float size = 100.0 / max(-mv.z, 0.001);
            gl_PointSize = clamp(size, 0.5, 4.0);
          }
        `}
        fragmentShader={`
          varying float vElev;
          varying float vDist;

          void main() {
            // Soft round dot
            vec2 c = gl_PointCoord - vec2(0.5);
            float d = length(c);
            if (d > 0.5) discard;
            float core = smoothstep(0.5, 0.0, d);

            // Fade with depth so far points feel atmospheric
            float fog = clamp(1.1 - vDist / 35.0, 0.0, 1.0);

            // Brighten on wave crests (dimmer overall)
            float crest = smoothstep(-0.4, 1.6, vElev);
            vec3 col = mix(vec3(0.25, 0.25, 0.3), vec3(0.5, 0.5, 0.55), crest);

            gl_FragColor = vec4(col, core * fog * 0.45);
          }
        `}
      />
    </points>
  );
}

/**
 * Static SVG fallback
 */
function StaticWaveFallback() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="dotFade" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="60%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sine-warped band of dots */}
      {[0, 1, 2].map((row) => {
        const amp = 30 - row * 5;
        const yBase = 400 + row * 40;
        const phase = row * 1.2;
        const pts: string[] = [];
        for (let x = 0; x <= 1200; x += 16) {
          const y =
            yBase +
            Math.sin((x / 80) + phase) * amp +
            Math.cos((x / 130) + phase * 0.7) * (amp * 0.5);
          pts.push(`${x},${y}`);
        }
        return (
          <polyline
            key={row}
            points={pts.join(" ")}
            stroke="white"
            strokeOpacity={0.15 - row * 0.04}
            strokeWidth={1}
            strokeDasharray="1 6"
            fill="none"
          />
        );
      })}

      <rect width="1200" height="600" fill="url(#dotFade)" opacity="0.1" />
    </svg>
  );
}

export function HeroWave({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* SVG fallback always visible */}
      <StaticWaveFallback />

      {/* R3F 3D wave on top */}
      {mounted && !reduced && (
        <Canvas
          camera={{ position: [0, 4.0, 10.0], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        >
          <WaveField />
        </Canvas>
      )}
    </div>
  );
}
