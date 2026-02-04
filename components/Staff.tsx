"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import * as THREE from "three";

// --- Sample Data ---
const STAFF_DATA = [
  {
    id: 1,
    name: "Sakura Tanaka",
    role: "Top Stylist",
    description:
      "骨格を見極めた「スカルプチュア・カット」で、360度美しいシルエットを。",
    fullDescription:
      "パリでの研修を経て、独自のカット技術「スカルプチュア・カット」を確立。骨格や髪質を徹底的に分析し、360度どこから見ても美しいシルエットを作り出します。毎日のスタイリングが楽になる再現性の高さも魅力です。",
    image: "/staff1.png",
  },
  {
    id: 2,
    name: "Ren Ito",
    role: "Senior Stylist",
    description: "肌色に合わせた透明感カラーのスペシャリスト。",
    fullDescription:
      "カラーリストとしての経験も豊富で、お客様の肌色や瞳の色に合わせたパーソナルカラー提案が得意。ブリーチなしでも透明感のある外国人風カラーや、デザインカラーならお任せください。",
    image: "/staff2.png",
  },
  {
    id: 3,
    name: "Yuna Sato",
    role: "Stylist",
    description: "トレンドのボブ・ショートが得意。",
    fullDescription:
      "トレンドを取り入れたボブ・ショートスタイルが得意。毎日のスタイリングが楽しくなるような、抜け感のあるヘアを提案します。アレンジ方法なども丁寧にレクチャーします。",
    image: "/staff1.png",
  },
  {
    id: 4,
    name: "Kaito Yamamoto",
    role: "Assistant",
    description: "至福のヘッドスパでリラックスタイムを。",
    fullDescription:
      "丁寧なシャンプーと極上のヘッドスパで、至福のリラックスタイムを提供します。頭皮のコリをほぐし、髪の土台から美しく整えます。お客様の髪の悩みに寄り添ったケアアドバイスも好評。",
    image: "/staff2.png",
  },
  {
    id: 5,
    name: "Mei Suzuki",
    role: "Assistant",
    description: "ヘアに合わせたトータルビューティーを提案。",
    fullDescription:
      "笑顔での接客を心がけています。メイクアップの知識も豊富なので、ヘアスタイルや季節のトレンドに合わせたポイントメイクのアドバイスも可能です。",
    image: "/staff1.png",
  },
];

// --- Shader Definition ---
const LiquidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uColor1: new THREE.Color("#ffffff"), // white
    uColor2: new THREE.Color("#f8fafc"), // slate-50
    uColor3: new THREE.Color("#fdf4ff"), // subtle warm white
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
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Mouse interaction distortion
      float dist = distance(uv, uMouse);
      float strength = smoothstep(0.5, 0.0, dist);
      
      // Dynamic noise
      float n = snoise(uv * 3.0 + uTime * 0.1);
      float n2 = snoise(uv * 6.0 - uTime * 0.15 + strength * 0.5);
      
      // Mix colors based on noise
      vec3 color = mix(uColor1, uColor2, n * 0.5 + 0.5);
      color = mix(color, uColor3, n2 * 0.3 * strength + n2 * 0.1);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LiquidShaderMaterial });

// --- R3F Background Component ---
const LiquidBackground = () => {
  const materialRef = useRef<any>(null!);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to 0..1 relative to window,
      // but in shader we might want UV coordinates (0..1)
      // Map window coordinates to UV space (approximation for full screen)
      const x = event.clientX / window.innerWidth;
      const y = 1.0 - event.clientY / window.innerHeight; // Flip Y for shader UV
      mouse.current.set(x, y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      // Smoothly interpolate mouse position
      materialRef.current.uMouse.lerp(mouse.current, 0.1);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <liquidShaderMaterial ref={materialRef} />
    </mesh>
  );
};

// --- Components ---

const StaffCard = ({
  staff,
  onClick,
}: {
  staff: (typeof STAFF_DATA)[0];
  onClick: () => void;
}) => {
  return (
    <motion.div
      layoutId={`card-container-${staff.id}`}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all"
      whileHover={{ y: -5 }}
    >
      <motion.div
        layoutId={`image-container-${staff.id}`}
        className="relative aspect-[3/4] w-full max-w-[85%] mx-auto mt-4 overflow-hidden rounded-sm"
      >
        <Image
          src={staff.image}
          alt={staff.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </motion.div>

      <motion.div
        layoutId={`content-container-${staff.id}`}
        className="absolute bottom-0 left-0 w-full p-4 md:p-6"
      >
        <span className="mb-1 block text-xs font-medium tracking-widest text-amber-600 uppercase">
          {staff.role}
        </span>
        <h3 className="mb-2 font-serif text-xl md:text-2xl text-zinc-900">
          {staff.name}
        </h3>
        <p className="line-clamp-1 text-sm text-zinc-600">
          {staff.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function Staff() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedStaff = STAFF_DATA.find((s) => s.id === selectedId);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  return (
    <section className="relative w-full bg-zinc-50 py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <LiquidBackground />
        </Canvas>
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-amber-600/80 tracking-[0.4em] text-sm uppercase font-medium mb-4">
            Our Staff
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-zinc-900">
            Creative Team
          </h3>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {STAFF_DATA.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onClick={() => setSelectedId(staff.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedStaff.id}`}
              className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <motion.div
                layoutId={`image-container-${selectedStaff.id}`}
                className="relative w-full md:w-1/2 aspect-square md:aspect-auto p-4 md:p-8"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedStaff.image}
                    alt={selectedStaff.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                layoutId={`content-container-${selectedStaff.id}`}
                className="flex w-full md:w-1/2 flex-col justify-center p-8 md:p-12 overflow-y-auto"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="mb-2 block text-sm font-medium tracking-[0.2em] text-amber-600 uppercase">
                    {selectedStaff.role}
                  </span>
                  <h3 className="mb-6 font-serif text-3xl md:text-5xl text-zinc-900">
                    {selectedStaff.name}
                  </h3>
                  <div className="w-12 h-px bg-zinc-300 mb-6" />
                  <p className="text-zinc-600 leading-loose text-base md:text-lg font-light">
                    {selectedStaff.fullDescription}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
