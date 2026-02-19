import React from "react";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StylistRecruitPage() {
  return (
    <div className="bg-[#FAF9F6] selection:bg-amber-100 selection:text-amber-900 min-h-screen">
      <Header />
      <Menu />
      
      <Link href="/recruit" className="fixed top-24 left-6 z-40 text-sm tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2">
        <ArrowLeft size={16} /> BACK TO LIST
      </Link>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-900 mb-8 text-center">Stylist Recruit</h1>
          <p className="text-center text-zinc-500 uppercase tracking-widest mb-16">スタイリスト募集要項</p>

          <div className="bg-white p-8 md:p-16 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl text-zinc-800 mb-8 border-b border-amber-200/50 pb-4">Job Description</h2>
            <p className="text-zinc-600 leading-loose mb-12">
              お客様一人ひとりのライフスタイルに合わせたヘアスタイルを提案・施術します。
              技術だけでなく、接客や空間作りにもこだわり、お客様にとって特別な時間を提供してください。
            </p>

            <h2 className="font-serif text-2xl text-zinc-800 mb-8 border-b border-amber-200/50 pb-4">Requirements</h2>
            <dl className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-6 gap-x-8 text-zinc-600">
              <dt className="font-bold text-zinc-800">資格</dt>
              <dd>美容師免許</dd>

              <dt className="font-bold text-zinc-800">給与</dt>
              <dd>月給 25万円〜 + 歩合給（経験・能力を考慮）</dd>

              <dt className="font-bold text-zinc-800">勤務時間</dt>
              <dd>9:00 - 19:00（実働8時間・シフト制）</dd>

              <dt className="font-bold text-zinc-800">休日</dt>
              <dd>月8日（毎週月曜、第1・3火曜定休 + 他シフト休）<br/>夏季・冬季休暇、有給休暇あり</dd>

              <dt className="font-bold text-zinc-800">福利厚生</dt>
              <dd>社会保険完備、交通費支給、講習費補助</dd>
            </dl>

            <div className="mt-16 text-center">
              <Link href="#entry" className="inline-block bg-zinc-900 text-white px-12 py-4 font-serif hover:bg-amber-900 transition-colors duration-300">
                Entry Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
