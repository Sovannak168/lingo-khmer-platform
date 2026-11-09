"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Clock,
  Sparkles,
  ArrowRight,
  Headphones,
  BookOpen,
  Mic,
  PenTool,
  CheckCircle2
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

export default function PracticeTestsPage() {
  const { t, language } = useApp();
  const [activeCategory, setActiveCategory] = useState<"all" | "chinese" | "english">("all");

  const practiceSets = [
    {
      id: "pt-1",
      title: "HSK 1-2 Listening Drill (30 Audio Prompts)",
      titleKm: "លំហាត់ហ្វឹកហាត់ស្តាប់ HSK 1-2 (៣០ សំណួរ)",
      language: "zh",
      category: "listening",
      questionsCount: 30,
      duration: "25 mins",
      difficulty: "Beginner",
      badge: "HSK 1-2",
      link: "/mock-exams/exam-hsk-1-mock",
    },
    {
      id: "pt-2",
      title: "IELTS Academic Reading Sprint (True/False/Not Given)",
      titleKm: "លំហាត់អាន IELTS Academic (សំណួរ True/False/Not Given)",
      language: "en",
      category: "reading",
      questionsCount: 20,
      duration: "30 mins",
      difficulty: "Intermediate",
      badge: "IELTS Band 6.5",
      link: "/mock-exams/exam-ielts-ac-1",
    },
    {
      id: "pt-3",
      title: "Chinese Grammar Structures (把 & 比 Sentences)",
      titleKm: "លំហាត់វេយ្យាករណ៍ចិនពិសេស (ទម្រង់ 把 & 比)",
      language: "zh",
      category: "grammar",
      questionsCount: 15,
      duration: "15 mins",
      difficulty: "Intermediate",
      badge: "HSK 3",
      link: "/learn-chinese",
    },
    {
      id: "pt-4",
      title: "TOEIC Business Vocabulary & Prepositions Check",
      titleKm: "លំហាត់វាក្យសព្ទពាណិជ្ជកម្ម និងធ្នាក់ TOEIC",
      language: "en",
      category: "reading",
      questionsCount: 25,
      duration: "20 mins",
      difficulty: "Advanced",
      badge: "TOEIC 750+",
      link: "/mock-exams/exam-toeic-mock",
    },
    {
      id: "pt-5",
      title: "IELTS Speaking Part 2 Monologue & Voice Scoring",
      titleKm: "អនុវត្តការនិយាយ IELTS Speaking Part 2 ជាមួយ AI",
      language: "en",
      category: "speaking",
      questionsCount: 5,
      duration: "15 mins",
      difficulty: "Intermediate",
      badge: "IELTS Speaking",
      link: "/learn-english",
    },
    {
      id: "pt-6",
      title: "Mandarin 4-Tone Pitch Distinction Drill",
      titleKm: "លំហាត់វាស់ស្ទង់សូរសំឡេងចិនទាំង ៤",
      language: "zh",
      category: "pronunciation",
      questionsCount: 20,
      duration: "12 mins",
      difficulty: "All Levels",
      badge: "Tones",
      link: "/learn-chinese/practice",
    },
  ];

  const filtered = practiceSets.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "chinese") return item.language === "zh";
    if (activeCategory === "english") return item.language === "en";
    return true;
  });

  return (
    <AuthGuard requiredFeatureTitle="Practice Test Drills" requiredFeatureTitleKm="លំហាត់អនុវត្តរហ័ស">
    <div className="space-y-8 pb-12">
      <DisclaimerBanner />

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t.nav_practice}
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-1 font-khmer">
          {language === "km"
            ? "លំហាត់អនុវត្តរហ័សតាមជំនាញនីមួយៗ (ស្តាប់, អាន, វេយ្យាករណ៍, សូរសំឡេង) ដើម្បីពង្រឹងចំណុចខ្សោយ"
            : "Targeted skill-by-skill drills to sharpen listening, reading, grammar, and tonal accuracy."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeCategory === "all"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          All Practice Drills
        </button>
        <button
          onClick={() => setActiveCategory("chinese")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeCategory === "chinese"
              ? "bg-red-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          🇨🇳 Chinese Drills
        </button>
        <button
          onClick={() => setActiveCategory("english")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeCategory === "english"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          🇬🇧 English Drills
        </button>
      </div>

      {/* Drills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                    item.language === "zh"
                      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  )}
                >
                  {item.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {item.difficulty}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-khmer">
                {item.titleKm}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{item.questionsCount} Questions</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.duration}</span>
              </div>

              <Link
                href={item.link}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <span>Start Practice Drill</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AuthGuard>
  );
}

