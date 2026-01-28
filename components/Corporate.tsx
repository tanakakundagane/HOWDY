"use client";

import React, { useRef } from "react";
import Hero from "./Hero";
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
    <div className="bg-zinc-50 selection:bg-amber-100 selection:text-amber-900">
      {/* Hero Section */}
      <Hero />

      {/* About Us Placeholder */}
      <SectionPlaceholder 
        id="about" 
        title="Our Philosophy" 
        subtitle="We believe in the transformative power of beauty. Our approach combines art, science, and intuitive care to reveal your authentic self."
        bgColor="bg-zinc-100"
      />

      {/* Services Placeholder */}
      <div className="relative">
        <div className="absolute inset-0 bg-zinc-900 skew-y-3 transform origin-top-left -z-10 h-full w-full scale-110" />
        <SectionPlaceholder 
          id="services" 
          title="Exquisite Services" 
          subtitle="From precision cuts to restorative treatments, our menu is curated to provide a sanctuary for your hair and mind."
          bgColor="bg-zinc-900"
          textColor="text-zinc-50"
        />
      </div>

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
