import React from "react";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Recruit from "@/components/Recruit"; // Re-using for now, will be updated to be the "top" recruit page content

export default function RecruitPage() {
  return (
    <div className="bg-[#FAF9F6] selection:bg-amber-100 selection:text-amber-900 min-h-screen">
      <Header />
      <Menu />
      
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-serif text-5xl md:text-7xl text-zinc-900 mb-12 text-center">
            Recruit
          </h1>
          <p className="text-center text-zinc-600 mb-20 max-w-2xl mx-auto leading-relaxed">
            HOWDYでは、共に働き、共に成長できる仲間を募集しています。<br/>
            あなたの情熱と才能を、私たちは待っています。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Stylist Card */}
            <a href="/recruit/stylist" className="group block relative overflow-hidden bg-white shadow-lg rounded-sm aspect-[3/4]">
               <div className="absolute inset-0 bg-zinc-200 transition-transform duration-500 group-hover:scale-105">
                 {/* Placeholder for image */}
                 <div className="w-full h-full bg-zinc-100" />
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/10 group-hover:bg-black/20 transition-colors">
                 <h2 className="font-serif text-3xl text-zinc-900 mb-4 group-hover:text-amber-800 transition-colors z-10">Stylist</h2>
                 <p className="text-sm text-zinc-600 uppercase tracking-widest z-10">スタイリスト募集</p>
               </div>
            </a>

            {/* Assistant Card */}
            <a href="/recruit/assistant" className="group block relative overflow-hidden bg-white shadow-lg rounded-sm aspect-[3/4]">
               <div className="absolute inset-0 bg-zinc-200 transition-transform duration-500 group-hover:scale-105">
                 <div className="w-full h-full bg-zinc-100" />
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/10 group-hover:bg-black/20 transition-colors">
                 <h2 className="font-serif text-3xl text-zinc-900 mb-4 group-hover:text-amber-800 transition-colors z-10">Assistant</h2>
                 <p className="text-sm text-zinc-600 uppercase tracking-widest z-10">アシスタント募集</p>
               </div>
            </a>

            {/* New Grad Card */}
            <a href="/recruit/new-grad" className="group block relative overflow-hidden bg-white shadow-lg rounded-sm aspect-[3/4]">
               <div className="absolute inset-0 bg-zinc-200 transition-transform duration-500 group-hover:scale-105">
                 <div className="w-full h-full bg-zinc-100" />
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/10 group-hover:bg-black/20 transition-colors">
                 <h2 className="font-serif text-3xl text-zinc-900 mb-4 group-hover:text-amber-800 transition-colors z-10">New Grad</h2>
                 <p className="text-sm text-zinc-600 uppercase tracking-widest z-10">新卒採用</p>
               </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
