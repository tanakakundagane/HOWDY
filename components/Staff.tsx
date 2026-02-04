"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// --- Sample Data ---
const STAFF_DATA = [
  {
    id: 1,
    name: "Sakura Tanaka",
    role: "Top Stylist",
    description:
      "骨格を見極めた「スカルプチュア・カット」で、360度美しいシルエットを。",
    fullDescription:
      "パリでの研修を経て、独自のカット技術「スカルプチュア・カット」を確立。骨格や髪質を徹底的に分析し、360度どこから見ても美しいシルエットを作り出します。毎日のスタイリングが楽になる再現性の高さも魅力です。",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    name: "Ren Ito",
    role: "Senior Stylist",
    description: "肌色に合わせた透明感カラーのスペシャリスト。",
    fullDescription:
      "カラーリストとしての経験も豊富で、お客様の肌色や瞳の色に合わせたパーソナルカラー提案が得意。ブリーチなしでも透明感のある外国人風カラーや、デザインカラーならお任せください。",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    name: "Yuna Sato",
    role: "Stylist",
    description: "トレンドのボブ・ショートが得意。",
    fullDescription:
      "トレンドを取り入れたボブ・ショートスタイルが得意。毎日のスタイリングが楽しくなるような、抜け感のあるヘアを提案します。アレンジ方法なども丁寧にレクチャーします。",
    image: "/hero3.jpg",
  },
  {
    id: 4,
    name: "Kaito Yamamoto",
    role: "Assistant",
    description: "至福のヘッドスパでリラックスタイムを。",
    fullDescription:
      "丁寧なシャンプーと極上のヘッドスパで、至福のリラックスタイムを提供します。頭皮のコリをほぐし、髪の土台から美しく整えます。お客様の髪の悩みに寄り添ったケアアドバイスも好評。",
    image: "/hero1.jpg",
  },
  {
    id: 5,
    name: "Mei Suzuki",
    role: "Assistant",
    description: "ヘアに合わせたトータルビューティーを提案。",
    fullDescription:
      "笑顔での接客を心がけています。メイクアップの知識も豊富なので、ヘアスタイルや季節のトレンドに合わせたポイントメイクのアドバイスも可能です。",
    image: "/hero2.jpg",
  },
];

// --- Components ---

const StaffCard = ({
  staff,
  onClick,
}: {
  staff: (typeof STAFF_DATA)[0];
  onClick: () => void;
}) => {
  return (
    <motion.div
      layoutId={`card-container-${staff.id}`}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-zinc-900 shadow-md hover:shadow-xl transition-all"
      whileHover={{ y: -5 }}
    >
      <motion.div
        layoutId={`image-container-${staff.id}`}
        className="relative aspect-[3/4] w-full overflow-hidden"
      >
        <Image
          src={staff.image}
          alt={staff.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </motion.div>

      <motion.div
        layoutId={`content-container-${staff.id}`}
        className="absolute bottom-0 left-0 w-full p-4 md:p-6"
      >
        <span className="mb-1 block text-xs font-medium tracking-widest text-amber-500 uppercase">
          {staff.role}
        </span>
        <h3 className="mb-2 font-serif text-xl md:text-2xl text-zinc-100">
          {staff.name}
        </h3>
        <p className="line-clamp-1 text-sm text-zinc-400">
          {staff.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function Staff() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedStaff = STAFF_DATA.find((s) => s.id === selectedId);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  return (
    <section className="relative w-full bg-zinc-950 py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-amber-500/80 tracking-[0.4em] text-sm uppercase font-medium mb-4">
            Our Staff
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white">
            Creative Team
          </h3>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {STAFF_DATA.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onClick={() => setSelectedId(staff.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedStaff.id}`}
              className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-zinc-900 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <motion.div
                layoutId={`image-container-${selectedStaff.id}`}
                className="relative w-full md:w-1/2 aspect-square md:aspect-auto"
              >
                <Image
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Content Side */}
              <motion.div
                layoutId={`content-container-${selectedStaff.id}`}
                className="flex w-full md:w-1/2 flex-col justify-center p-8 md:p-12 overflow-y-auto"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="mb-2 block text-sm font-medium tracking-[0.2em] text-amber-500 uppercase">
                    {selectedStaff.role}
                  </span>
                  <h3 className="mb-6 font-serif text-3xl md:text-5xl text-zinc-100">
                    {selectedStaff.name}
                  </h3>
                  <div className="w-12 h-px bg-zinc-700 mb-6" />
                  <p className="text-zinc-300 leading-loose text-base md:text-lg font-light">
                    {selectedStaff.fullDescription}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
