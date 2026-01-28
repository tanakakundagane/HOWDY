"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Concept() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-zinc-50 px-6 py-24 overflow-hidden">
      {/* Background Decor (Subtle Blur/Gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-radial from-amber-50/40 to-transparent opacity-60 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          
          {/* Main Copy - Wear Your Identity */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 font-serif text-5xl font-medium tracking-tight text-zinc-900 md:text-7xl lg:text-8xl"
          >
            Wear Your Identity.
          </motion.h2>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="mb-16 h-px w-24 bg-zinc-900/20"
          />

          {/* Body Copy - Japanese */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col gap-8 font-serif text-lg leading-loose text-zinc-600 md:text-xl md:leading-[2.5]"
          >
            <p>
              髪は、体の一部であり、
              <br className="md:hidden" />
              最も饒舌なファッションである。
            </p>
            <p>
              HOWDYが提案するのは、
              <br className="md:hidden" />
              トレンドの先にある
              <br className="hidden md:block" />
              「あなた自身のシグネチャー」。
            </p>
            <p>
              厳選されたプロダクトと、
              <br className="md:hidden" />
              研ぎ澄まされた感性が交差する場所で、
              <br />
              鏡を見るたびに心が昂る、
              <br className="md:hidden" />
              そんな日常をデザインします。
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
