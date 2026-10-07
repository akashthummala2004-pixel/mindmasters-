import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { canRenderWebGL } from '@/lib/webgl';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points[];
    animationId: number;
    count: number;
  } | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Skip WebGL entirely on unsupported / very low-end devices.
    if (!canRenderWebGL()) {
      setWebglFailed(true);
      return;
    }

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    camera.position.set(0, 355, 1220);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('DottedSurface: WebGL context creation failed, using fallback.', err);
      }
      setWebglFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // We want the renderer to fill its relative container, not necessarily the window
    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    renderer.setClearColor(scene.fog.color, 0);
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Create particles
    const particles: THREE.Points[] = [];
    const positions: number[] = [];
    const colors: number[] = [];

    // Create geometry for all particles
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0; // Will be animated
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);
        // Always pure white for maximum visibility
        colors.push(255, 255, 255);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create material
    const material = new THREE.PointsMaterial({
      size: 11,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
    });

    // Create points object
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId = 0;
    let running = false;
    let inView = false;

    updateSize();

    // One frame of particle simulation + render.
    const renderFrame = () => {
      const positionAttribute = geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;

          // Animate Y position with sine waves
          positions[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          i++;
        }
      }

      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.1;
    };

    const animate = () => {
      try {
        renderFrame();
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn('DottedSurface: render error, falling back.', err);
        }
        stop();
        setWebglFailed(true);
        return;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Run the loop only while mounted area is on-screen and the tab is visible.
    const start = () => {
      if (running) return;
      running = true;
      animationId = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animationId);
    };
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(container);
    document.addEventListener('visibilitychange', sync);

    // Handle window resize
    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: [points],
      animationId,
      count,
    };

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', sync);
      io.disconnect();
      stop();

      // Clean up Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      {...props}
    >
      {webglFailed && (
        // Static dotted texture stand-in for the animated particle field.
        <div aria-hidden className="absolute inset-0 bg-dot opacity-[0.15]" />
      )}
    </div>
  );
}
