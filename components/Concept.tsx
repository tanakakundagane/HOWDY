"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function BackgroundTypography() {
  const { scrollYProgress } = useScroll();

  // Parallax effect based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const xReverse = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Vertical parallax for background

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none"
    >
      {/* Top Line */}
      <motion.div
        style={{ x }}
        className="whitespace-nowrap font-serif text-[20vw] leading-none text-zinc-900 font-bold"
      >
        HOWDY BEAUTY SALON HOWDY BEAUTY SALON
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        style={{ x: xReverse }}
        className="whitespace-nowrap font-serif text-[20vw] leading-none text-zinc-900 font-bold ml-[-20%]"
      >
        WEAR YOUR IDENTITY WEAR YOUR IDENTITY
      </motion.div>
    </motion.div>
  );
}

// Content Blocks Data
const CONCEPT_BLOCKS = [
  {
    id: 1,
    title: "Wear Your Identity.",
    text: "髪は、体の一部であり、\n最も饒舌なファッションである。",
    image: "/concept1.jpg",
    align: "right", // Image on right, Text overlaps on left
    styles: {
      imageAspect: "aspect-[3/4]",
      imageWidth: "w-[80%] md:w-6/12 ml-auto",
      textOverlap: "md:-mr-32 -mt-16 md:mt-0 z-20",
      containerHeight: "pb-32",
    },
  },
  {
    id: 2,
    title: "Signature Style",
    text: "HOWDYが提案するのは、\nトレンドの先にある\n「あなた自身のシグネチャー」。",
    image: "/concept2.jpg",
    align: "left",
    styles: {
      imageAspect: "aspect-[4/5]", // Vertical
      imageWidth: "w-[70%] md:w-5/12 mr-auto -mt-20 md:-mt-32",
      textOverlap: "md:-ml-24 -mt-12 md:mt-24 z-20",
      containerHeight: "pb-24",
    },
  },
  {
    id: 3,
    title: "Sensibility",
    text: "厳選されたプロダクトと、\n研ぎ澄まされた感性が交差する場所で、",
    image: "/concept3.jpg",
    align: "right", // Center-ish
    styles: {
      imageAspect: "aspect-square", // Square
      imageWidth: "w-[60%] md:w-4/12 mx-auto md:ml-auto md:mr-24 -mt-12",
      textOverlap: "md:mr-auto md:-ml-12 -mt-8 md:mt-0 z-20",
      containerHeight: "pb-40",
    },
  },
  {
    id: 4,
    title: "Elevate Your Daily",
    text: "鏡を見るたびに心が昂る、\nそんな日常をデザインします。",
    image: "/concept4.jpg",
    align: "left",
    styles: {
      imageAspect: "aspect-[16/9]", // Cinematic
      imageWidth: "w-full md:w-10/12 mx-auto -mt-24",
      textOverlap: "mx-auto -mt-20 md:-mt-32 z-20",
      containerHeight: "pb-24",
    },
  },
];

const ConceptBlock = ({
  block,
  index,
}: {
  block: (typeof CONCEPT_BLOCKS)[0];
  index: number;
}) => {
  const isRight = block.align === "right";
  const { styles } = block;
  const blockRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  // Parallax for image inside the container
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={blockRef}
      className={`flex flex-col md:flex-row items-center justify-center w-full relative ${
        isRight ? "md:flex-row-reverse" : ""
      } ${styles.containerHeight}`}
    >
      {/* Background Image Area */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // smooth easeOutCubic-like
        className={`relative ${styles.imageWidth} ${styles.imageAspect} z-0`}
      >
        <div className="relative w-full h-full shadow-2xl overflow-hidden">
          <motion.div
            className="w-full h-[120%] relative -top-[10%]" // Increase height for parallax movement
            style={{ y: imageY }}
          >
            <img
              src={block.image}
              alt={block.title}
              className="object-cover w-full h-full"
            />
          </motion.div>
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </motion.div>

      {/* Text Area - Overlapping */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className={`relative flex flex-col justify-center p-8 md:p-16 bg-white/10 backdrop-blur-md shadow-lg max-w-md w-[90%] md:w-auto border border-white/20 ${
          styles.textOverlap
        } ${isRight ? "md:text-right items-end" : "md:text-left items-start"}`}
      >
        <span className="text-amber-600/80 text-xs tracking-[0.3em] uppercase mb-6 font-medium block">
          0{index + 1} Concept
        </span>
        <h3 className="font-serif text-3xl md:text-5xl text-zinc-900 mb-8 leading-tight">
          {block.title}
        </h3>
        <p className="font-serif text-zinc-600 leading-loose text-sm md:text-base whitespace-pre-wrap tracking-wide">
          {block.text}
        </p>
      </motion.div>
    </div>
  );
};

export default function Concept() {
  const containerRef = React.useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] px-6 py-24 overflow-hidden"
    >
      {/* Typography Watermark Background */}
      <BackgroundTypography />

      {/* Background Decor (Subtle Blur/Gradient) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-radial from-amber-100/60 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center">
          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 font-serif text-5xl md:text-7xl text-zinc-900 text-center"
          >
            Concept
          </motion.h2>

          {/* Blocks */}
          <div className="flex flex-col w-full">
            {CONCEPT_BLOCKS.map((block, index) => (
              <ConceptBlock key={block.id} block={block} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
