"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Languages,
  Trophy,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle2,
  FileText,
  Mic,
  Bot,
  ShieldCheck,
  Star,
  Users,
  Compass,
  Lock,
  LogIn
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { HSK_LEVELS } from "@/lib/mock-data/hsk-data";
import { ENGLISH_LEVELS } from "@/lib/mock-data/english-data";

export default function HomePage() {
  const { t, language, targetLanguage, setTargetLanguage, isAuthenticated } = useApp();

  return (
    <div className="space-y-12 pb-12">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.hero_badge}</span>
            </div>

            {!isAuthenticated && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300">
                <Lock className="w-3 h-3" />
                <span>{language === "km" ? "ប្រព័ន្ធសុវត្ថិភាព៖ តម្រូវឱ្យមានគណនីដើម្បីចូលរៀន" : "Security: Account Required"}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-snug">
            {t.hero_title}
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            {t.hero_subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-sm shadow-xl shadow-amber-500/30 transition-all duration-200 hover:scale-102"
              >
                <LogIn className="w-4 h-4" />
                <span>{language === "km" ? "ចូលគណនី / ចុះឈ្មោះជាមុនសិន" : "Sign In / Register First"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : null}

            <Link
              href="/learn-chinese"
              onClick={() => setTargetLanguage("zh")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-red-500/30 transition-all duration-200 hover:scale-102"
            >
              <span>🇨🇳 {t.hero_cta_chinese}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/learn-english"
              onClick={() => setTargetLanguage("en")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-102"
            >
              <span>🇬🇧 {t.hero_cta_english}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/mock-exams"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{t.nav_mock_exams}</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-2xl font-bold text-white">HSK 1–6</p>
              <p className="text-blue-200/80 font-medium">Standard Chinese Track</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">IELTS & TOEFL</p>
              <p className="text-blue-200/80 font-medium">Exam Simulation Engine</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100% Khmer</p>
              <p className="text-blue-200/80 font-medium">Clear Grammar Explanations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">AI Powered</p>
              <p className="text-blue-200/80 font-medium">Real-time Speaking & Essays</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Language Tracks Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Compass className="w-4 h-4" />
              <span>Bilingual Pathways</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {language === "km" ? "ជ្រើសរើសផ្លូវសិក្សារបស់អ្នក" : "Choose Your Learning Pathway"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chinese Track Card */}
          <div className="group rounded-3xl border border-red-200 dark:border-red-950/60 bg-gradient-to-b from-red-50/40 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-7 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                中文
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                HSK 1–6 Standard
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-5">
              {t.nav_chinese} (Mandarin Chinese)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {language === "km"
                ? "រៀនអក្សរចិន (汉字) ភីនអ៊ីន (Pinyin) វេយ្យាករណ៍ចិនពន្យល់ជាភាសាខ្មែរ ៤ សំឡេង និងលំដាប់គំនូសអក្សរ។ ត្រៀមប្រឡង HSK 1 ដល់ HSK 6 ដោយទំនុកចិត្ត។"
                : "Master Chinese characters (Hanzi), Pinyin pronunciation, the 4 tones, and HSK 1–6 vocabulary with comprehensive Khmer grammar breakdowns and mock exams."}
            </p>

            {/* Level Pills */}
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              {HSK_LEVELS.slice(0, 6).map((lvl) => (
                <Link
                  key={lvl.level}
                  href={`/learn-chinese/${lvl.level.toLowerCase().replace(" ", "-")}`}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 hover:text-red-600 transition-colors"
                >
                  <p className="font-bold">{lvl.level}</p>
                  <p className="text-[10px] text-slate-500">{lvl.words} Words</p>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/learn-chinese"
                className="text-xs font-bold text-red-600 dark:text-red-400 inline-flex items-center gap-1.5 hover:underline"
              >
                <span>{language === "km" ? "ចូលរៀនភាសាចិន" : "Explore Chinese Curriculum"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/learn-chinese/practice"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 hover:bg-red-200 transition-colors"
              >
                Character Stroke Practice
              </Link>
            </div>
          </div>

          {/* English Track Card */}
          <div className="group rounded-3xl border border-blue-200 dark:border-blue-950/60 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-7 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                EN
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                IELTS & TOEFL Track
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-5">
              {t.nav_english} (English for Exams)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {language === "km"
                ? "ពង្រឹងជំនាញទាំង ៤៖ ស្តាប់ (Listening), អាន (Reading), សរសេរ (Writing) និងនិយាយ (Speaking) សម្រាប់ IELTS Academic & General, TOEFL iBT និង TOEIC។"
                : "Comprehensive preparation across all 4 skills for IELTS Academic/General, TOEFL iBT, and TOEIC with AI-assisted essay grading and interactive speaking practice."}
            </p>

            {/* Level Pills */}
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              {ENGLISH_LEVELS.map((lvl) => (
                <Link
                  key={lvl.level}
                  href={`/learn-english/${lvl.level.includes("Beginner") ? "beginner" : lvl.level.includes("Intermediate") ? "intermediate" : "advanced"}`}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <p className="font-bold">{lvl.level.split(" ")[0]}</p>
                  <p className="text-[10px] text-slate-500">{lvl.cefr}</p>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/learn-english"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1.5 hover:underline"
              >
                <span>{language === "km" ? "ចូលរៀនភាសាអង់គ្លេស" : "Explore English Curriculum"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/mock-exams"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors"
              >
                IELTS Mock Tests
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Highlights */}
      <section className="rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Smart Educational Tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {language === "km" ? "ឧបករណ៍សិក្សាឆ្លាតវៃសម្រាប់សិស្សកម្ពុជា" : "State-of-the-Art Language Technologies"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Engineered specifically to solve pronunciation, tone accuracy, and exam anxiety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI Tutor */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-purple-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Tutor with Khmer Explanations
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ask any Chinese or English grammar question and receive instant, easy-to-understand explanations in Khmer, complete with corrective feedback.
            </p>
            <Link
              href="/ai-tutor"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline pt-2"
            >
              <span>{t.nav_ai_tutor}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Exam Simulation Engine */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Standardized Mock Exam Engine
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Realistic countdown timer, auto-saving answer sheets, question navigation, audio prompts, and detailed band score diagnostic estimation.
            </p>
            <Link
              href="/mock-exams"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2"
            >
              <span>{t.nav_mock_exams}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Speech & Tone Trainer */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Web Speech & Pitch Contour
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Practice Mandarin 4-tones with visual pitch curves and test your spoken English with real-time speech recognition and scoring.
            </p>
            <Link
              href="/learn-chinese/practice"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>Tone Trainer & Voice Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action: Upgrade or Start Learning */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            {language === "km" ? "ត្រៀមខ្លួនរួចរាល់ដើម្បីទទួលជោគជ័យក្នុងការប្រឡង?" : "Ready to Excel in Your Next Language Exam?"}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Join thousands of Cambodian students preparing for HSK, IELTS, and TOEFL. Track your streaks, build strong vocabulary, and test your skills.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs shadow-md transition-all duration-150"
          >
            {t.nav_progress}
          </Link>
          <Link
            href="/subscription"
            className="px-6 py-3 rounded-xl bg-purple-900/60 hover:bg-purple-900/80 border border-purple-300/40 text-white font-bold text-xs transition-all duration-150"
          >
            {t.nav_subscribe} (ABA PayWay / KHQR)
          </Link>
        </div>
      </section>
    </div>
  );
}

