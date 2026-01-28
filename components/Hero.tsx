"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";

// --- Shader Definition ---

const SliderMaterial = shaderMaterial(
  {
    uTexture1: new THREE.Texture(),
    uTexture2: new THREE.Texture(),
    uDisp: new THREE.Texture(),
    uProgress: 0,
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Simple wave distortion based on progress
      float wave = sin(uv.y * 10.0 + uTime) * 0.02 * sin(uProgress * 3.14);
      
      // Displacement
      vec2 distortedUv1 = uv + vec2(wave, 0.0) + (uProgress * 0.5); // Slide out
      vec2 distortedUv2 = uv + vec2(wave, 0.0) - ((1.0 - uProgress) * 0.5); // Slide in

      vec4 t1 = texture2D(uTexture1, vec2(uv.x - uProgress * 0.2 + wave, uv.y));
      vec4 t2 = texture2D(uTexture2, vec2(uv.x + (1.0 - uProgress) * 0.2 + wave, uv.y));

      // Crossfade with distortion
      float intensity = 0.3;
      vec2 disp = vec2(0.0, 0.0);

      vec4 color1 = texture2D(uTexture1, uv + disp * intensity * uProgress);
      vec4 color2 = texture2D(uTexture2, uv + disp * intensity * (1.0 - uProgress));
      
      // Liquid transition logic
      float p = uProgress;
      
      // Directional warp
      vec2 uv1 = uv + vec2(p * 0.2 * sin(uv.y * 5.0), 0.0);
      vec2 uv2 = uv - vec2((1.0 - p) * 0.2 * sin(uv.y * 5.0), 0.0);

      vec4 tex1 = texture2D(uTexture1, uv1);
      vec4 tex2 = texture2D(uTexture2, uv2);

      // Mix based on progress
      gl_FragColor = mix(tex1, tex2, p);
    }
  `
);

extend({ SliderMaterial });

// --- R3F Components ---

const IMAGES = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

function SliderScene({ activeIndex }: { activeIndex: number }) {
  const { viewport } = useThree();
  const materialRef = useRef<any>(null!);
  
  // Load textures
  const textures = useTexture(IMAGES);
  
  // Adjust textures to cover
  textures.forEach((tex) => {
    tex.wrapS = THREE.MirroredRepeatWrapping;
    tex.wrapT = THREE.MirroredRepeatWrapping;
  });

  // State for animation
  const progress = useRef(0);
  const targetProgress = useRef(0);
  const lastIndex = useRef(activeIndex);
  
  useFrame((state, delta) => {
    // Simplification: We only animate when index changes
    if (activeIndex !== lastIndex.current) {
      targetProgress.current = 1;
    }

    if (materialRef.current) {
      // Lerp progress
      const speed = 2.0;
      progress.current = THREE.MathUtils.lerp(progress.current, targetProgress.current, delta * speed);
      
      // Reset logic when transition completes
      if (progress.current > 0.99 && targetProgress.current === 1) {
        lastIndex.current = activeIndex;
        progress.current = 0;
        targetProgress.current = 0;
      }

      // Pass uniforms
      materialRef.current.uTime = state.clock.getElapsedTime();
      
      // Manage "current" and "next" textures
      if (targetProgress.current === 1) {
        materialRef.current.uTexture1 = textures[lastIndex.current];
        materialRef.current.uTexture2 = textures[activeIndex];
        materialRef.current.uProgress = progress.current;
      } else {
        materialRef.current.uTexture1 = textures[activeIndex];
        materialRef.current.uTexture2 = textures[activeIndex];
        materialRef.current.uProgress = 0;
      }
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore - custom shader material type */}
      <sliderMaterial ref={materialRef} transparent />
    </mesh>
  );
}

// --- UI Components ---

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      className="relative overflow-hidden rounded-full bg-white/10 px-8 py-4 text-white backdrop-blur-md transition-colors hover:bg-white/20 border border-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 font-medium tracking-wide">{children}</span>
    </motion.button>
  );
};

// --- Main Hero Component ---

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const slideTexts = [
    { title: "Elegance in Every Detail", subtitle: "Redefining Beauty" },
    { title: "Sanctuary for the Soul", subtitle: "Relax & Rejuvenate" },
    { title: "Artistry in Motion", subtitle: "Timeless Styles" },
  ];

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-zinc-900">
      {/* 3D Background (Slider) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <SliderScene activeIndex={activeIndex} />
        </Canvas>
      </div>

      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 md:justify-start md:px-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="mb-4 font-serif text-6xl font-bold leading-tight text-white md:text-8xl lg:text-9xl drop-shadow-lg tracking-tighter">
              HOWDY
            </h1>
            <p className="mb-8 font-serif text-2xl font-light text-white/90 md:text-3xl tracking-widest uppercase">
              beauty salon
            </p>
            <p className="mb-4 font-serif text-lg text-amber-400/90 md:text-xl">
              Redefining Beauty
            </p>

            <div className="flex flex-col gap-6 sm:flex-row text-xl">
               <MagneticButton>
                  お問い合わせ
               </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1 transition-all duration-500 ${
              i === activeIndex ? "w-12 bg-white" : "w-6 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-6 w-6 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
