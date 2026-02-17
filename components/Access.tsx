"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Access() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-250 max-h-250 rounded-full bg-gradient-radial from-amber-50/60 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600/60 tracking-[0.4em] text-xs uppercase font-medium mb-3"
          >
            Location
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-zinc-900/90"
          >
            Access
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Information Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center p-8 md:p-12 bg-white/40 backdrop-blur-md shadow-lg border border-white/40 rounded-sm"
          >
            <h4 className="font-serif text-2xl text-zinc-800 mb-8 border-b border-amber-200/50 pb-4 inline-block">
              Salon Information
            </h4>
            
            <div className="space-y-6 font-sans text-zinc-600">
              <div>
                <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1">Address</span>
                <p className="text-lg">〒503-0803<br/>岐阜県大垣市鶴見町藤沢２２６</p>
              </div>
              
              <div>
                <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1">Open</span>
                <p>9:00 - 19:00</p>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1">Close</span>
                <p>Monday, 1st & 3rd Tuesday</p>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-widest text-amber-600 mb-1">Tel</span>
                <p className="text-lg tracking-wide">0584-XX-XXXX</p>
              </div>
            </div>
          </motion.div>

          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-100 md:h-auto overflow-hidden shadow-xl border border-white/20 rounded-sm group"
          >
            <iframe
              src="https://maps.google.com/maps?q=岐阜県大垣市鶴見町藤沢２２６&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay that fades out on hover */}
            <div className="absolute inset-0 bg-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
