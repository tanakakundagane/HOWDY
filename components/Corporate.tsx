"use client";

import React, { useRef } from "react";
import Hero from "./Hero";
import Concept from "./Concept";
import Style from "./Style";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Placeholder Section Component ---
const SectionPlaceholder = ({ 
  id, 
  title, 
  subtitle, 
  bgColor = "bg-white", 
  textColor = "text-zinc-900" 
}: { 
  id: string, 
  title: string, 
  subtitle: string, 
  bgColor?: string, 
  textColor?: string 
}) => {
  return (
    <section id={id} className={`relative flex min-h-screen w-full items-center justify-center ${bgColor} px-6 py-24`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <h2 className={`mb-6 font-serif text-4xl md:text-6xl ${textColor}`}>{title}</h2>
          <p className={`max-w-xl text-lg font-light leading-relaxed opacity-70 ${textColor}`}>{subtitle}</p>
          
          <div className="mt-12 h-px w-24 bg-current opacity-20" />
        </motion.div>
      </div>
    </section>
  );
};

export default function Corporate() {
  // Smooth scroll wrapper could go here (e.g., Lenis), 
  // but for now we'll stick to native scroll with motion effects.

  return (
    <div className="bg-zinc-50 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden w-full">
      {/* Hero Section */}
      <Hero />

      {/* Concept Section */}
      <Concept />

      {/* Style Section */}
      <Style />

      {/* Gallery/Work Placeholder - Maybe rename or remove if Style covers this */}

      {/* Gallery/Work Placeholder */}
      <SectionPlaceholder 
        id="gallery" 
        title="The Collection" 
        subtitle="A showcase of our finest work, where texture, color, and form converge to create timeless styles."
      />

      {/* Contact Placeholder */}
      <SectionPlaceholder 
        id="contact" 
        title="Begin Your Journey" 
        subtitle="Visit our sanctuary in the heart of the city. Book your appointment today and experience the difference."
        bgColor="bg-zinc-200"
      />

      {/* Simple Footer */}
      <footer className="w-full bg-zinc-950 py-12 text-center text-zinc-500">
        <p className="font-serif text-sm">&copy; 2024 Salon Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
