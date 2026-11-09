"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Volume2,
  PenTool,
  ArrowRight,
  Flame,
  CheckCircle,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { HSK_LEVELS, HSK_VOCABULARY, HSK_GRAMMAR } from "@/lib/mock-data/hsk-data";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { TonePracticeWidget } from "@/components/common/TonePracticeWidget";
import { cn } from "@/lib/utils";

export default function LearnChinesePage() {
  const { t, language } = useApp();
  const [selectedTab, setSelectedTab] = useState<"levels" | "tones" | "grammar">("levels");

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <span>🇨🇳</span>
            <span>汉语水平考试 (HSK) 1–6 Standard System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.nav_chinese}
          </h1>
          <p className="text-xs sm:text-sm text-red-50 leading-relaxed font-khmer">
            {language === "km"
              ? "រៀនភាសាចិនតាមប្រព័ន្ធស្តង់ដារ HSK ពីកម្រិតដំបូងដល់កម្រិតខ្ពស់។ គ្រប់មេរៀនទាំងអស់មានការពន្យល់វេយ្យាករណ៍ជាភាសាខ្មែរ ហាត់សូរសំឡេង ៤ សំឡេង និងរៀនគូសអក្សរចិនតាមលំដាប់គំនូសត្រឹមត្រូវ។"
              : "Comprehensive Chinese learning curriculum designed for Cambodian students. Master Hanzi characters, Pinyin, tonal contours, and grammar with Khmer explanations."}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/learn-chinese/hsk-1"
              className="px-5 py-2.5 rounded-xl bg-white text-red-600 font-bold text-xs hover:bg-red-50 shadow-md transition-colors"
            >
              Start HSK 1 (Beginner)
            </Link>
            <Link
              href="/learn-chinese/practice"
              className="px-5 py-2.5 rounded-xl bg-red-800/60 hover:bg-red-800/80 border border-white/20 text-white font-semibold text-xs transition-colors"
            >
              Character Stroke Practice
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setSelectedTab("levels")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            selectedTab === "levels"
              ? "bg-red-600 text-white shadow-md shadow-red-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Layers className="w-4 h-4" />
          <span>{t.hsk_levels}</span>
        </button>

        <button
          onClick={() => setSelectedTab("tones")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            selectedTab === "tones"
              ? "bg-red-600 text-white shadow-md shadow-red-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Volume2 className="w-4 h-4" />
          <span>{t.tone_practice}</span>
        </button>

        <button
          onClick={() => setSelectedTab("grammar")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            selectedTab === "grammar"
              ? "bg-red-600 text-white shadow-md shadow-red-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === "km" ? "វេយ្យាករណ៍សំខាន់ៗ" : "Core Grammar in Khmer"}</span>
        </button>
      </div>

      {/* Tab Content: Levels */}
      {selectedTab === "levels" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HSK_LEVELS.map((lvl, index) => (
              <div
                key={lvl.level}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg hover:border-red-300 dark:hover:border-red-900/60 transition-all duration-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-500 to-rose-600 text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                    {lvl.level.replace("HSK ", "H")}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {lvl.words} 词 (Words)
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {lvl.level}
                  </h3>
                  <p className="text-xs text-slate-500 font-khmer mt-1">
                    {language === "km" ? lvl.descKm : lvl.descEn}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span>Study Hours:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{lvl.hours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Exam:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">Official HSK {index + 1}</span>
                  </div>
                </div>

                <Link
                  href={`/learn-chinese/${lvl.level.toLowerCase().replace(" ", "-")}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span>{t.start_learning}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Tones */}
      {selectedTab === "tones" && (
        <div className="space-y-6">
          <TonePracticeWidget />
        </div>
      )}

      {/* Tab Content: Grammar in Khmer */}
      {selectedTab === "grammar" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-800 dark:text-blue-300">
            ℹ️ រាល់ចំណុចវេយ្យាករណ៍ត្រូវបានពន្យល់លម្អិតជាភាសាខ្មែរ ដោយមានរូបមន្តទម្រង់ប្រយោគ ឧទាហរណ៍ជាក់ស្តែង និងការប្រៀបធៀបជាមួយភាសាខ្មែរ ដើម្បីជួយឱ្យសិស្សងាយយល់និងឆាប់ចេះ។
          </div>

          <div className="space-y-6">
            {HSK_GRAMMAR.map((gr) => (
              <div
                key={gr.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
                      {gr.level}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {gr.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-khmer mt-0.5">
                      {gr.titleKm}
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {gr.formula}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
                  <p className="font-semibold text-slate-900 dark:text-white font-khmer leading-relaxed">
                    🇰🇭 ការពន្យល់៖ {gr.explanationKm}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    🇬🇧 In English: {gr.explanationEn}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    ឧទាហរណ៍ជាក់ស្តែង (Practical Sentence Examples):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {gr.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
                      >
                        <p className="text-sm font-bold text-slate-900 dark:text-white font-chinese">
                          {ex.zh}
                        </p>
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                          {ex.pinyin}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-khmer pt-1">
                          🇰🇭 {ex.km}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          🇬🇧 {ex.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

