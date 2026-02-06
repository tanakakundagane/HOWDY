"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Recruit() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
      {/* Background Image - Slow Zoom */}
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/recruit.jpg"
          alt="Recruit Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Sequence Container */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col items-center justify-center">
        {/* 1. Huge RECRUIT Text (Intro) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{
            opacity: [0, 1, 1, 0],
            scale: [0.9, 1, 1, 1.1],
            filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"],
          }}
          transition={{
            duration: 3,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="font-serif text-[15vw] font-bold text-white/90 tracking-tighter leading-none">
            RECRUIT
          </h2>
        </motion.div>

        {/* 2. Main Content (Appears after Intro) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center text-white max-w-4xl bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/10"
        >
          <span className="mb-4 text-amber-500 tracking-[0.3em] text-sm uppercase font-medium">
            Join Our Team
          </span>
          <h3 className="mb-8 font-serif text-4xl md:text-5xl font-medium leading-tight">
            Design Your Future
          </h3>
          <p className="mb-10 text-zinc-200 text-base md:text-lg leading-relaxed max-w-2xl">
            私たちは、常識にとらわれないクリエイティブな才能を探しています。
            <br className="hidden md:block" />
            あなたの感性と技術で、新しい美のスタンダードを共に創り上げませんか？
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            {/* Job Card 1 */}
            <div className="group border border-white/30 bg-white/5 p-6 rounded-sm hover:bg-white/10 transition-colors cursor-pointer min-w-[200px]">
              <h4 className="text-xl font-serif mb-2">Stylist</h4>
              <p className="text-zinc-400 text-xs mb-4">
                経験者優遇 / 業務委託可
              </p>
              <span className="text-xs tracking-widest uppercase text-amber-500 group-hover:text-amber-400 transition-colors">
                View Details &rarr;
              </span>
            </div>

            {/* Job Card 2 */}
            <div className="group border border-white/30 bg-white/5 p-6 rounded-sm hover:bg-white/10 transition-colors cursor-pointer min-w-[200px]">
              <h4 className="text-xl font-serif mb-2">Assistant</h4>
              <p className="text-zinc-400 text-xs mb-4">
                新卒 / 中途 / 未経験可
              </p>
              <span className="text-xs tracking-widest uppercase text-amber-500 group-hover:text-amber-400 transition-colors">
                View Details &rarr;
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
