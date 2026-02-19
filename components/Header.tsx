"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-6 left-6 z-50 pointer-events-none mix-blend-difference text-white">
      <Link href="/" onClick={handleScrollTop} className="pointer-events-auto group block">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-2xl md:text-3xl font-bold tracking-tighter transition-colors group-hover:text-amber-200"
        >
          HOWDY
        </motion.h1>
      </Link>
    </header>
  );
}
