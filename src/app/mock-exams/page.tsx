"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Filter,
  CheckCircle,
  HelpCircle,
  Flame,
  Star
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { MOCK_EXAMS_DATABASE, MockExam } from "@/lib/mock-data/exam-data";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

export default function MockExamsCatalogPage() {
  const { t, language } = useApp();
  const [filterType, setFilterType] = useState<string>("ALL");

  const filteredExams = MOCK_EXAMS_DATABASE.filter((e) => {
    if (filterType === "ALL") return true;
    if (filterType === "CHINESE") return e.examType === "HSK";
    if (filterType === "IELTS") return e.examType.startsWith("IELTS");
    if (filterType === "TOEFL") return e.examType === "TOEFL_IBT";
    if (filterType === "TOEIC") return e.examType === "TOEIC";
    return true;
  });

  return (
    <AuthGuard requiredFeatureTitle="Standardized Mock Examinations" requiredFeatureTitleKm="ការប្រឡងសាកល្បងស្តង់ដារ">
    <div className="space-y-10 pb-12">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-950 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300">
            <Trophy className="w-3.5 h-3.5" />
            <span>{t.exam_simulation}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.nav_mock_exams}
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 font-khmer leading-relaxed">
            {language === "km"
              ? "ការប្រឡងសាកល្បងស្ដង់ដារអន្តរជាតិពេញម៉ោង និងលក្ខខណ្ឌជាក់ស្តែងដូចការប្រឡងពិតប្រាកដ។ រួមមាន HSK 1–6, IELTS Academic/General, TOEFL iBT និង TOEIC ជាមួយការវាស់ស្ទង់ពិន្ទុ Band និងរបាយការណ៍វិភាគលម្អិត។"
              : "Experience authentic standardized exam simulations with countdown timers, audio playback, speaking recording, essay writing, and automated scoring reports."}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: "ALL", label: "All Examinations" },
          { id: "CHINESE", label: "🇨🇳 HSK Chinese (1–6)" },
          { id: "IELTS", label: "🇬🇧 IELTS Academic & General" },
          { id: "TOEFL", label: "🇺🇸 TOEFL iBT" },
          { id: "TOEIC", label: "💼 TOEIC Business" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0",
              filterType === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                    exam.examType === "HSK"
                      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  )}
                >
                  {exam.examType.replace("_", " ")}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {exam.levelCode}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {language === "km" ? exam.titleKm : exam.title}
                </h3>
                <p className="text-xs text-slate-500 font-khmer mt-1 line-clamp-2">
                  {exam.scoringRubricKm}
                </p>
              </div>

              {/* Sections Breakdown */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Sections Included:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {exam.sections.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium capitalize"
                    >
                      {s.type} ({s.durationMinutes}m)
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {exam.totalDurationMinutes} mins
                </span>
                <span>Max: {exam.maxScore} pts</span>
              </div>

              <Link
                href={`/mock-exams/${exam.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-101"
              >
                <span>{t.take_exam}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AuthGuard>
  );
}

