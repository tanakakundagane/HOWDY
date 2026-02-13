"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalTypography() {
  const { scrollYProgress } = useScroll();

  // Parallax effect based on scroll
  // Move horizontally as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const xReverse = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center">
        {/* Top Line */}
        <motion.div
          style={{ x }}
          className="whitespace-nowrap font-serif text-[20vw] leading-none text-zinc-900 font-bold opacity-[0.03] select-none"
        >
          HOWDY BEAUTY SALON HOWDY BEAUTY SALON
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          style={{ x: xReverse }}
          className="whitespace-nowrap font-serif text-[20vw] leading-none text-zinc-900 font-bold ml-[-20%] opacity-[0.03] select-none"
        >
          WEAR YOUR IDENTITY WEAR YOUR IDENTITY
        </motion.div>
      </div>
    </div>
  );
}
