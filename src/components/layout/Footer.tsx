"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Mail, Phone, MapPin, ExternalLink, Award } from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t, language } = useApp();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Disclaimer Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {language === "km"
                ? "វេទិកានេះផ្តល់នូវការប្រឡងសាកល្បង និងការប៉ាន់ស្មានពិន្ទុប៉ុណ្ណោះ — មិនចេញវិញ្ញាបនបត្រផ្លូវការជំនួស HSK, IELTS, TOEFL, TOEIC ឬ Cambridge ឡើយ។"
                : "Notice: This platform provides exam preparation and estimated practice scores only. It does not issue official HSK, IELTS, TOEFL, TOEIC, or Cambridge certificates."}
            </span>
          </div>
          <div className="shrink-0 font-medium text-slate-400">
            Cambodia EdTech Initiative 🇰🇭
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold font-mono">
                LK
              </div>
              <span className="font-bold text-white text-lg">LingoKhmer Academy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {language === "km"
                ? "វេទិកាសិក្សាភាសាចិន និងអង់គ្លេសទ្វេភាសាដំបូងគេនៅកម្ពុជា ដែលរួមបញ្ចូលការពន្យល់វេយ្យាករណ៍ជាភាសាខ្មែរ ប្រព័ន្ធប្រឡងសាកល្បងស្តង់ដារអន្តរជាតិ និងគ្រូបង្រៀន AI ឆ្លាតវៃ។"
                : "Empowering Cambodian students with structured bilingual learning, authentic exam simulations (HSK & IELTS), and 24/7 AI-powered tutoring with step-by-step Khmer explanations."}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Phnom Penh, Cambodia</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-purple-400" /> support@lingokhmer.edu.kh</span>
            </div>
            {/* Payment provider badges */}
            <div className="pt-2">
              <p className="text-[11px] text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                Accepted Cambodian & International Payments:
              </p>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-2.5 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 font-bold">
                  ABA PAYWAY
                </span>
                <span className="px-2.5 py-1 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
                  KHQR (Bakong)
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
                  Visa / Mastercard
                </span>
              </div>
            </div>
          </div>

          {/* Chinese Module Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              {t.nav_chinese} (HSK)
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/learn-chinese/hsk-1" className="hover:text-white transition-colors">HSK 1 (Beginner)</Link></li>
              <li><Link href="/learn-chinese/hsk-2" className="hover:text-white transition-colors">HSK 2 (Elementary)</Link></li>
              <li><Link href="/learn-chinese/hsk-3" className="hover:text-white transition-colors">HSK 3 (Intermediate)</Link></li>
              <li><Link href="/learn-chinese/hsk-4" className="hover:text-white transition-colors">HSK 4 (Upper Intermediate)</Link></li>
              <li><Link href="/learn-chinese/hsk-5" className="hover:text-white transition-colors">HSK 5 & 6 (Advanced)</Link></li>
              <li><Link href="/learn-chinese/practice" className="hover:text-white transition-colors">Character Stroke Practice</Link></li>
            </ul>
          </div>

          {/* English Module Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              {t.nav_english}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/learn-english/beginner" className="hover:text-white transition-colors">A1–A2 Fundamentals</Link></li>
              <li><Link href="/learn-english/intermediate" className="hover:text-white transition-colors">B1–B2 Upper Level</Link></li>
              <li><Link href="/learn-english/advanced" className="hover:text-white transition-colors">C1–C2 Advanced Mastery</Link></li>
              <li><Link href="/mock-exams" className="hover:text-white transition-colors">IELTS Academic Mock</Link></li>
              <li><Link href="/mock-exams" className="hover:text-white transition-colors">TOEFL iBT Simulation</Link></li>
              <li><Link href="/mock-exams" className="hover:text-white transition-colors">TOEIC Practice Tests</Link></li>
            </ul>
          </div>

          {/* Portals & Legal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Platform & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/ai-tutor" className="hover:text-white transition-colors flex items-center gap-1"><span className="text-purple-400">✨</span> AI Language Tutor</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">{t.nav_progress}</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">{t.nav_leaderboard}</Link></li>
              <li><Link href="/teacher" className="hover:text-white transition-colors">{t.nav_teacher}</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">{t.nav_admin}</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors text-purple-400 font-medium">Pro Subscription</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} LingoKhmer Academy. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center justify-center gap-1">
            Built with modern Next.js, Supabase & Web Speech API for students in Cambodia
          </p>
        </div>
      </div>
    </footer>
  );
}

