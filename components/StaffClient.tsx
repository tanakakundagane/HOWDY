"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { X } from "lucide-react";
import * as THREE from "three";

// 1. 型定義（microCMSの構造に合わせる）
export interface Staff {
  id: string;
  name: string;
  introduction: string; // descriptionではなくintroduction
  image: {
    url: string;
  };
  // roleなどはmicroCMS側にまだ無いようなので、一旦オプション(?)にするか削除
  role?: string;
}

// 2. ★ここが足りなかった定義です！★
// microCMSから渡されるデータ形式に合わせて修正しています
const StaffCard = ({
  staff,
  onClick,
}: {
  staff: Staff;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layoutId={`card-container-${staff.id}`}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#FAF9F6] shadow-md"
    >
      <div className="relative aspect-[3/4] w-full max-w-[85%] mx-auto mt-4 overflow-hidden rounded-sm">
        <Image
          src={staff.image.url}
          alt={staff.name}
          fill
          unoptimized={true} // ★これを追加
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw" // これを入れるとさらに最適化されます
        />
      </div>

      <div className="p-4 md:p-6">
        <span className="mb-1 block text-xs font-medium text-amber-600 uppercase">
          {/* roleがない場合は仮の文字を入れるか空にする */}
          {staff.role || "Stylist"}
        </span>
        <h3 className="mb-2 font-serif text-xl text-zinc-900">{staff.name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">
          {staff.introduction} {/* introductionに変更！ */}
        </p>
      </div>
    </motion.div>
  );
};

// --- Shader Definitions ---

// ゆらゆら動く液体のような背景の計算式
const LiquidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("bg-[#FAF9F6]"), // 薄いグレー（背景色に馴染む色）
    uColor2: new THREE.Color("bg-[#FAF9F6]"), // 薄いアンバー（アクセント色）
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
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float noise = sin(p.x * 2.0 + uTime * 0.5) * cos(p.y * 2.0 + uTime * 0.3);
    vec3 color = mix(uColor1, uColor2, noise * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
  `
);

extend({ LiquidShaderMaterial });

// Canvas内で動く背景本体
const LiquidBackground = () => {
  const meshRef = useRef<any>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[3, 3, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      {/* @ts-ignore */}
      <liquidShaderMaterial ref={meshRef} transparent />
    </mesh>
  );
};

function BackgroundTypography() {
  const { scrollYProgress } = useScroll();

  // Parallax effect based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const xReverse = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

  return (
    <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.05] select-none">
      {/* Top Line */}
      <motion.div
        style={{ x }}
        className="whitespace-nowrap font-serif text-[15vw] leading-none text-zinc-900 font-bold"
      >
        CREATIVE TEAM CREATIVE TEAM CREATIVE TEAM
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        style={{ x: xReverse }}
        className="whitespace-nowrap font-serif text-[15vw] leading-none text-zinc-900 font-bold ml-[-20%]"
      >
        PROFESSIONAL STYLISTS PROFESSIONAL STYLISTS
      </motion.div>
    </div>
  );
}

// --- (ここから下に LiquidShaderMaterial や LiquidBackground の定義が続く) ---

export default function StaffClient({ staffs }: { staffs: Staff[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStaff = staffs.find((s) => s.id === selectedId);

  // モーダル表示中のスクロール制御
  useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedId]);

  return (
    <section className="relative w-full bg-[#FAF9F6] py-24 md:py-32 px-6 overflow-hidden">
      {/* 背景のCanvas */}
      <div className="absolute inset-0 z-0 opacity-100">
        {" "}
        {/* opacityで色の強さを調整できます */}
        <Canvas camera={{ position: [0, 0, 1] }}>
          <LiquidBackground />
        </Canvas>
      </div>

      <BackgroundTypography />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-amber-600/80 tracking-[0.4em] text-sm uppercase font-medium mb-4">
            Our Staff
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-zinc-900">
            Creative Team
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {staffs.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onClick={() => setSelectedId(staff.id)}
            />
          ))}
        </div>
      </div>

      {/* モーダルの中身（AnimatePresence）も selectedStaff.image.url に修正してここに入れる */}
      <AnimatePresence>
        {selectedId && selectedStaff && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* 背景のオーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />

            {/* モーダル本体 */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:flex h-[80vh] md:h-auto"
            >
              {/* 画像エリア */}
              <div className="relative h-64 w-full md:h-[600px] md:w-1/2">
                <Image
                  src={selectedStaff.image.url}
                  alt={selectedStaff.name}
                  fill
                  unoptimized={true}
                  className="object-cover"
                />
              </div>

              {/* テキストエリア */}
              <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="mb-2 block text-xs font-medium tracking-widest text-amber-600 uppercase">
                    {selectedStaff.role || "Stylist"}
                  </span>
                  <h2 className="mb-6 font-serif text-3xl md:text-5xl text-zinc-900">
                    {selectedStaff.name}
                  </h2>
                  <div className="mb-8 h-px w-12 bg-amber-200" />
                  <p className="text-lg leading-relaxed text-zinc-600 whitespace-pre-wrap">
                    {selectedStaff.introduction}
                  </p>
                </motion.div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ★ ここまで ★ */}
      {/* ... (略) ... */}
    </section>
  );
}
