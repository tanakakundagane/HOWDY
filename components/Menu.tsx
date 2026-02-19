"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Top", href: "/", sub: "トップ" },
  { name: "Concept", href: "/#concept", sub: "コンセプト" },
  { name: "Staff", href: "/#staff", sub: "スタッフ" },
  { name: "Recruit", href: "/recruit", sub: "採用情報" },
  { name: "Access", href: "/#access", sub: "アクセス" },
  { name: "Contact", href: "/#contact", sub: "お問い合わせ" },
];

const menuVariants = {
  initial: { opacity: 0, x: "100%" },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: 50 },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.1 + i * 0.1,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // Only handle hash links on the current page
    if (href.startsWith("/#") || href.startsWith("#")) {
      // Check if we are on the home page for hash links
      if (typeof window !== 'undefined' && (window.location.pathname === "/" || href.startsWith("#"))) {
        const targetId = href.replace(/^(\/)?#/, "");
        const elem = document.getElementById(targetId);
        if (elem) {
          e.preventDefault();
          setIsOpen(false);
          elem.scrollIntoView({ behavior: "smooth" });
        } else {
           setIsOpen(false);
        }
      } else {
        // If on another page, let the default link behavior happen (navigate to home + hash)
        setIsOpen(false);
      }
    } else {
      // Normal navigation
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[60] group flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/40"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="h-px w-6 bg-zinc-800 transition-colors group-hover:bg-amber-900"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="h-px w-6 bg-zinc-800 transition-colors group-hover:bg-amber-900"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="h-px w-6 bg-zinc-800 transition-colors group-hover:bg-amber-900"
        />
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[55] flex items-center justify-center bg-white/90 backdrop-blur-3xl"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 h-[60vh] w-[60vh] -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-[60vh] w-[60vh] translate-y-1/2 -translate-x-1/2 rounded-full bg-zinc-100/40 blur-3xl pointer-events-none" />

            <nav className="relative z-10 flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={itemVariants}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleScroll(e as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>, item.href)}
                    className="group flex flex-col items-center"
                  >
                    <span className="font-serif text-5xl md:text-7xl text-zinc-800 transition-colors duration-300 group-hover:text-amber-800/80">
                      {item.name}
                    </span>
                    <span className="mt-2 text-xs font-medium tracking-[0.2em] text-zinc-400 transition-colors duration-300 group-hover:text-amber-600/60 uppercase">
                      {item.sub}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Bottom info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8, duration: 1 } }}
              className="absolute bottom-12 text-center"
            >
               <p className="text-[10px] tracking-widest text-zinc-400 uppercase">Howdy Beauty Salon</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
