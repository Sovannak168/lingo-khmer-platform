"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Award
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { ENGLISH_VOCABULARY, ENGLISH_GRAMMAR } from "@/lib/mock-data/english-data";
import { cn } from "@/lib/utils";

export default function EnglishLevelDetailPage() {
  const params = useParams();
  const levelSlug = (params?.level as string) || "intermediate";
  const { t, language, incrementXp } = useApp();

  const [activeTab, setActiveTab] = useState<"vocab" | "grammar" | "quiz">("vocab");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const speakWord = (word: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/learn-english"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to English Levels</span>
        </Link>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 capitalize">
          {levelSlug} Curriculum
        </span>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
          {levelSlug} English Modules & Vocabulary
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-1 font-khmer">
          {language === "km"
            ? "រៀនវាក្យសព្ទកម្រិតខ្ពស់ សូរស័ព្ទ IPA ការពន្យល់ជាភាសាខ្មែរ និងវេយ្យាករណ៍ត្រៀមប្រឡង IELTS / TOEFL"
            : "Academic vocabulary with IPA phonetics, Khmer translations, and exam grammar exercises."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("vocab")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "vocab"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>Vocabulary & IPA</span>
        </button>

        <button
          onClick={() => setActiveTab("grammar")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "grammar"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>Grammar in Khmer</span>
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "quiz"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Award className="w-4 h-4" />
          <span>Level Quiz</span>
        </button>
      </div>

      {/* Tab 1: Vocabulary */}
      {activeTab === "vocab" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ENGLISH_VOCABULARY.map((v) => (
            <div
              key={v.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {v.word}
                    </span>
                    <button
                      onClick={() => speakWord(v.word)}
                      className="p-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
                      title="Pronounce"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                    {v.ipa} ({v.partOfSpeech})
                  </p>
                </div>
                <div className="flex gap-1">
                  {v.examFocus.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meanings */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white font-khmer">
                  🇰🇭 ខ្មែរ៖ <span className="text-blue-600 dark:text-blue-400">{v.meaningKm}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  🇬🇧 Definition: {v.meaningEn}
                </p>
              </div>

              {/* Collocations & Examples */}
              <div className="space-y-1 pt-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Collocations: {v.collocations?.join(" • ")}
                </span>
                {v.examples.map((ex, i) => (
                  <div key={i} className="text-xs space-y-0.5 pt-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200">&quot;{ex.en}&quot;</p>
                    <p className="text-blue-600 dark:text-blue-400 font-khmer text-[11px]">🇰🇭 {ex.km}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Grammar in Khmer */}
      {activeTab === "grammar" && (
        <div className="space-y-6">
          {ENGLISH_GRAMMAR.map((egr) => (
            <div
              key={egr.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    {egr.level}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {egr.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-khmer mt-0.5">
                    {egr.titleKm}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  {egr.ruleFormula}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
                <p className="font-semibold text-slate-900 dark:text-white font-khmer leading-relaxed">
                  🇰🇭 ការពន្យល់៖ {egr.explanationKm}
                </p>
                <p className="text-amber-700 dark:text-amber-400 font-khmer">
                  ⚠️ {egr.commonMistakesKm}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Sentence Examples:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {egr.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
                    >
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {ex.en}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-khmer pt-1">
                        🇰🇭 {ex.km}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Level Quiz */}
      {activeTab === "quiz" && (
        <div className="max-w-xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Grammar & Vocabulary Check
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              50 XP Reward
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Question: &quot;If the municipal committee ________ more funding, the pollution levels would drop.&quot;
            </p>
            <p className="text-xs text-slate-500 font-khmer">
              ចូរជ្រើសរើសទម្រង់កិរិយាសព្ទត្រឹមត្រូវសម្រាប់ Conditional Type 2៖
            </p>

            <div className="space-y-2">
              {[
                { id: "a", text: "allocated (Past Simple)", correct: true },
                { id: "b", text: "allocates (Present Simple)" },
                { id: "c", text: "will allocate (Future)" },
                { id: "d", text: "has allocated (Present Perfect)" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuizAnswer(opt.id)}
                  disabled={quizSubmitted}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between",
                    quizAnswer === opt.id
                      ? "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200 font-bold"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800",
                    quizSubmitted && opt.correct
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold"
                      : ""
                  )}
                >
                  <span>{opt.text}</span>
                  {quizAnswer === opt.id && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={() => {
                  if (!quizAnswer) return;
                  setQuizSubmitted(true);
                  if (quizAnswer === "a") {
                    incrementXp(50);
                  }
                }}
                disabled={!quizAnswer}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-2">
                <p className="font-bold">
                  {quizAnswer === "a" ? "🎉 Excellent! +50 XP added to your progress." : "Incorrect. The correct answer is A (allocated)."}
                </p>
                <p>
                  Rule: In Conditional Type 2 (hypothetical situations), the if-clause uses the Past Simple tense: If + Subject + Past Simple, would + base verb.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

