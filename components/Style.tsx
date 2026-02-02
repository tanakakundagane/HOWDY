"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pointer } from "lucide-react";

// Sample Data
const STYLES = [
  {
    id: 1,
    image: "/hero1.jpg",
    title: "Natural Flow",
    description: "風になびくような自然な毛流れと、透明感のあるカラーリング。日常に溶け込む上質なスタイル。",
    tags: ["Cut", "Color", "Treatment"]
  },
  {
    id: 2,
    image: "/hero2.jpg",
    title: "Urban Mode",
    description: "洗練された都会的なシルエット。計算されたカットラインが、あなたの個性を際立たせます。",
    tags: ["Cut", "Perm"]
  },
  {
    id: 3,
    image: "/hero3.jpg",
    title: "Classic Elegance",
    description: "時代を超えて愛されるクラシックな美しさ。特別な日のための、華やかで気品あるスタイリング。",
    tags: ["Set", "Make-up"]
  }
];

const StyleItem = ({ item, index }: { item: typeof STYLES[0], index: number }) => {
  return (
    <section className="h-screen w-screen min-w-full snap-start snap-always overflow-hidden bg-amber-50 text-zinc-900 shrink-0 relative">
      <div className="flex h-full w-full flex-col md:flex-row">
        
        {/* Left: Image Area */}
        <div className="relative h-[60%] w-full md:h-full md:w-1/2 flex items-center justify-center px-8 pb-8 pt-32 md:p-16">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full aspect-3/4 rounded-sm overflow-hidden shadow-2xl max-w-lg"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </motion.div>
        </div>

        {/* Right: Text Area */}
        <div className="flex h-[40%] w-full flex-col justify-center px-8 md:h-full md:w-1/2 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 text-xs font-medium tracking-widest text-amber-600 uppercase">
              <span>0{index + 1}</span>
              <span className="h-px w-8 bg-amber-600/50" />
              <span>Collection</span>
            </div>

            <h3 className="font-serif text-4xl md:text-6xl font-light text-zinc-900">{item.title}</h3>
            
            <p className="text-zinc-600 leading-loose text-sm md:text-base max-w-md">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 border border-zinc-300 rounded-full text-xs text-zinc-500 tracking-wide bg-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// --- Swipe/Scroll Hint Component ---
const SwipeHint = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-[45%] md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          {/* Mobile Swipe Hint */}
          <div className="flex flex-col items-center md:hidden">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Pointer className="w-8 h-8 text-zinc-800 drop-shadow-sm" />
              </motion.div>
            </div>
            <p className="text-zinc-800/80 text-xs tracking-widest font-medium drop-shadow-sm">SWIPE</p>
          </div>

          {/* Desktop Scroll Hint */}
          <motion.div 
            className="hidden md:flex flex-col items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-200 shadow-lg"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-zinc-800 text-sm tracking-[0.2em] font-medium uppercase">SCROLL &rarr;</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Style() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Check scroll position to toggle arrow visibility
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding safety
      
      // Hide hint once user starts scrolling
      if (scrollLeft > 50) {
        setShowSwipeHint(false);
      }
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
      
      // Auto hide hint after 5 seconds if no interaction
      const timer = setTimeout(() => setShowSwipeHint(false), 5000);

      return () => {
        el.removeEventListener("scroll", checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  const scrollByItem = (direction: "left" | "right") => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      containerRef.current.scrollBy({
        left: direction === "left" ? -width : width,
        behavior: "smooth",
      });
      // Also hide hint on button click
      setShowSwipeHint(false);
    }
  };

  return (
    <div className="relative w-full bg-amber-50 h-screen overflow-hidden group">
      {/* Title */}
      <div className="absolute top-1 md:top-12 left-0 w-full z-10 flex justify-center pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-2xl md:text-4xl tracking-[0.3em] text-amber-900/80"
        >
          Styling
        </motion.h2>
      </div>

      {/* Horizontal Scroll Snap Container */}
      <div 
        ref={containerRef}
        className="flex h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {STYLES.map((item, index) => (
          <StyleItem key={item.id} item={item} index={index} />
        ))}
      </div>
      
      {/* Swipe/Scroll Hint */}
      <SwipeHint isVisible={showSwipeHint} />

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-24 z-20 flex items-center justify-center opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 pointer-events-none">
        {canScrollLeft && (
          <button 
            onClick={() => scrollByItem("left")}
            className="p-3 md:p-4 rounded-full bg-white/60 backdrop-blur-sm text-zinc-800 hover:bg-white/90 transition-all pointer-events-auto border border-zinc-200 shadow-md"
            aria-label="Previous Style"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
      </div>

      <div className="absolute inset-y-0 right-0 w-16 md:w-24 z-20 flex items-center justify-center opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 pointer-events-none">
        {canScrollRight && (
          <button 
            onClick={() => scrollByItem("right")}
            className="p-3 md:p-4 rounded-full bg-white/60 backdrop-blur-sm text-zinc-800 hover:bg-white/90 transition-all pointer-events-auto border border-zinc-200 shadow-md"
            aria-label="Next Style"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
      </div>

      {/* Optional: Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-amber-600 origin-left z-20"
        style={{ scaleX: scrollYProgress }} 
      />
    </div>
  );
}
