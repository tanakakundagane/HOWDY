"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Recruit() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-transparent flex items-center justify-center">
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
          className="object-cover opacity-80"
          priority
        />
      </motion.div>

      {/* Light Overlay */}
      <div className="absolute inset-0 z-10  backdrop-blur-[2px]" />

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
          <h2 className="font-serif text-[10vw] font-bold text-black tracking-tighter leading-none">
            RECRUIT
          </h2>
        </motion.div>

        {/* 2. Main Content (Appears after Intro) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center text-zinc-800 max-w-4xl bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl border border-white/50"
        >
          <span className="mb-4 text-amber-600 tracking-[0.3em] text-sm uppercase font-medium">
            Join Our Team
          </span>
          <h3 className="mb-8 font-serif text-4xl md:text-5xl font-medium leading-tight text-amber-900">
            Design Your Future
          </h3>
          <p className="mb-10 text-zinc-600 text-base md:text-lg leading-relaxed max-w-2xl">
            私たちは、常識にとらわれないクリエイティブな才能を探しています。
            <br className="hidden md:block" />
            あなたの感性と技術で、新しい美のスタンダードを共に創り上げませんか？
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <Link 
              href="/recruit" 
              className="inline-block bg-zinc-900 text-white px-12 py-4 font-serif hover:bg-amber-900 transition-colors duration-300 rounded-sm"
            >
              View Recruit Page
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
