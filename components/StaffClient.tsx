"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { X } from "lucide-react";

// 1. 型定義（microCMSの構造に合わせる）
export interface Staff {
  id: string;
  name: string;
  introduction: string;
  image: {
    url: string;
  };
  role?: string;
}

const StaffCard = ({
  staff,
  onClick,
  index,
}: {
  staff: Staff;
  onClick: () => void;
  index: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      layoutId={`card-container-${staff.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      whileHover={{ y: -8 }}
      transition={{ 
        duration: 1.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.4 
      }}
      className="group cursor-pointer flex flex-col items-center gap-0"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden shadow-xl shadow-zinc-200/50 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-zinc-300/50 z-0">
        <motion.div
          className="w-full h-[120%] relative -top-[10%]"
          style={{ y }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={staff.image.url}
            alt={staff.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>

      <div className="relative z-10 -mt-12 w-[90%] p-6 text-center backdrop-blur-md bg-white/60 border border-white/50 shadow-xl rounded-sm transition-transform duration-500 group-hover:-translate-y-2 left-10">
        <h3 className="font-serif text-2xl text-zinc-800 group-hover:text-amber-800 transition-colors duration-300 tracking-wide">
          {staff.name}
        </h3>
        <div className="w-8 h-px bg-amber-400 mx-auto my-3 group-hover:w-16 transition-all duration-300" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium">
          {staff.role || "Stylist"}
        </p>
      </div>
    </motion.div>
  );
};

export default function StaffClient({ staffs }: { staffs: Staff[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStaff = staffs.find((s) => s.id === selectedId);

  // モーダル表示中のスクロール制御
  useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedId]);

  return (
    <section className="relative w-full min-h-screen bg-transparent overflow-hidden py-24">
      {/* Background Decor (Similar to Concept.tsx) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-radial from-amber-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Static Overlay Title */}
      <div className="w-full flex justify-center mb-20">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600/60 tracking-[0.4em] text-xs uppercase font-medium mb-3"
          >
            Our Staff
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-zinc-900/90"
          >
            Creative Team
          </motion.h3>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="container mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {staffs.map((staff, index) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              index={index}
              onClick={() => setSelectedId(staff.id)}
            />
          ))}
        </div>
      </div>

      {/* モーダル (Modal) */}
      <AnimatePresence>
        {selectedId && selectedStaff && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* 背景のオーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />

            {/* モーダル本体 */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-5xl overflow-hidden bg-white/95 backdrop-blur-xl shadow-2xl md:flex max-h-[90vh] md:h-auto border border-white/20"
            >
              {/* 画像エリア */}
              <div className="relative h-64 w-full md:h-[600px] md:w-5/12 shrink-0">
                <Image
                  src={selectedStaff.image.url}
                  alt={selectedStaff.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
              </div>

              {/* テキストエリア */}
              <div className="flex w-full flex-col p-8 md:w-7/12 md:p-16 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex flex-col h-full justify-center"
                >
                  <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-amber-600 uppercase">
                    {selectedStaff.role || "Stylist"}
                  </span>
                  <h2 className="mb-8 font-serif text-4xl md:text-5xl text-zinc-900 leading-tight">
                    {selectedStaff.name}
                  </h2>
                  <div className="mb-8 h-px w-24 bg-gradient-to-r from-amber-300 to-transparent" />
                  <p className="text-base leading-[2.2] text-zinc-600 whitespace-pre-wrap font-sans tracking-wide">
                    {selectedStaff.introduction}
                  </p>
                </motion.div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900 transition-colors z-10 hover:rotate-90 duration-500"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
