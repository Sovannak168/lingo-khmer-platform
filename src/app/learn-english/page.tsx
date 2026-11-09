"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Languages,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  ArrowRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  FileCheck2
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { ENGLISH_LEVELS, ENGLISH_VOCABULARY, ENGLISH_GRAMMAR, LISTENING_PRACTICE_SAMPLE } from "@/lib/mock-data/english-data";
import { AudioPlayer } from "@/components/common/AudioPlayer";
import { VoiceRecorder } from "@/components/common/VoiceRecorder";
import { cn } from "@/lib/utils";

export default function LearnEnglishPage() {
  const { t, language } = useApp();
  const [selectedTab, setSelectedTab] = useState<"levels" | "listening" | "speaking" | "writing">("levels");

  // Writing essay state
  const [essayText, setEssayText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [essayFeedback, setEssayFeedback] = useState<any | null>(null);

  const handleEvaluateEssay = () => {
    if (!essayText.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEssayFeedback({
        estimatedBand: "Band 6.5",
        wordCount: essayText.trim().split(/\s+/).length,
        taskAchievement: "Clear stance presented with relevant ideas.",
        coherenceCohesion: "Good paragraph sequencing; recommend using varied cohesive linkers.",
        lexicalResource: "Appropriate academic words used, e.g., 'substantial', 'ubiquitous'.",
        grammaticalRange: "Accurate complex sentences; check conditional verb tense consistency.",
        suggestedImprovements: [
          "Replace repetitive 'important' with 'paramount' or 'indispensable'.",
          "Ensure conditional type 2 clauses use 'would' rather than 'will'."
        ]
      });
    }, 1200);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <span>🇬🇧</span>
            <span>IELTS, TOEFL, TOEIC & Cambridge English Prep</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.nav_english}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-khmer">
            {language === "km"
              ? "រៀនភាសាអង់គ្លេសគ្រប់កម្រិត (A1 ដល់ C2) ជាមួយការពន្យល់ជាភាសាខ្មែរ សូរស័ព្ទ IPA អនុវត្តការស្តាប់ និយាយ សរសេរតែងសេចក្តី និងទទួលបានការកែលម្អភ្លាមៗពី AI។"
              : "Comprehensive English modules covering vocabulary with IPA, Khmer explanations, listening comprehension, speech analysis, and AI essay grading."}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/learn-english/intermediate"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 shadow-md transition-colors"
            >
              Start Intermediate (B1–B2)
            </Link>
            <Link
              href="/mock-exams/exam-ielts-ac-1"
              className="px-5 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900/80 border border-white/20 text-white font-semibold text-xs transition-colors"
            >
              Take IELTS Mock Exam
            </Link>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setSelectedTab("levels")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0",
            selectedTab === "levels"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>CEFR Levels (A1–C2)</span>
        </button>

        <button
          onClick={() => setSelectedTab("listening")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0",
            selectedTab === "listening"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Headphones className="w-4 h-4" />
          <span>Listening Lab & Transcript</span>
        </button>

        <button
          onClick={() => setSelectedTab("speaking")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0",
            selectedTab === "speaking"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Mic className="w-4 h-4" />
          <span>Speaking & Pronunciation AI</span>
        </button>

        <button
          onClick={() => setSelectedTab("writing")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0",
            selectedTab === "writing"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <PenTool className="w-4 h-4" />
          <span>Writing Essay Evaluator</span>
        </button>
      </div>

      {/* Tab 1: CEFR Level Cards */}
      {selectedTab === "levels" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENGLISH_LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-blue-300 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {lvl.cefr}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {lvl.hours} Hours
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

              <Link
                href={`/learn-english/${lvl.level.includes("Beginner") ? "beginner" : lvl.level.includes("Intermediate") ? "intermediate" : "advanced"}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <span>Enter Level Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Listening Lab with Audio Player & Transcript */}
      {selectedTab === "listening" && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Listening Comprehension
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {LISTENING_PRACTICE_SAMPLE.title}
              </h3>
              <p className="text-xs text-slate-500 font-khmer mt-0.5">
                {LISTENING_PRACTICE_SAMPLE.titleKm}
              </p>
            </div>

            {/* Audio Player */}
            <AudioPlayer
              src={LISTENING_PRACTICE_SAMPLE.audioUrl}
              title="Official British English Conversation"
              language="en"
            />

            {/* Interactive Questions */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Comprehension Questions (Listen and Answer):
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LISTENING_PRACTICE_SAMPLE.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-[11px] text-slate-500 font-khmer">
                      {q.questionKm}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={cn(
                            "p-2 rounded-lg text-xs border font-medium flex items-center justify-between",
                            oIdx === q.correctIndex
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold"
                              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          )}
                        >
                          <span>{opt}</span>
                          {oIdx === q.correctIndex && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-submission Full Transcript */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Audioscript / Transcript:
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                {LISTENING_PRACTICE_SAMPLE.transcript}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Speaking Practice & AI Feedback */}
      {selectedTab === "speaking" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                IELTS Speaking Part 2 Prompt
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Describe a memorable book or article that greatly influenced your perspective.
              </h3>
              <p className="text-xs text-slate-500 font-khmer">
                ចូររៀបរាប់អំពីសៀវភៅ ឬអត្ថបទមួយដែលបានជះឥទ្ធិពលយ៉ាងខ្លាំងលើការគិតរបស់អ្នក។ ត្រូវរៀបរាប់៖ អ្វីជាសៀវភៅនោះ អ្នកអានវានៅពេលណា មាតិកាសំខាន់ និងមូលហេតុដែលវាសំខាន់។
              </p>

              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-300 space-y-1">
                <p className="font-bold">Key Vocabulary to incorporate:</p>
                <p>• substantial insight • ubiquitous theme • profound impact • articulate ideas</p>
              </div>

              <VoiceRecorder
                language="en"
                expectedText="A memorable book that greatly influenced my perspective"
              />
            </div>

            {/* Sample Band 8.0 Response Analysis */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Examiner Band 8.0 Model Response
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                &quot;One publication that left an indelible impression on me is &apos;Thinking, Fast and Slow&apos;. What captivated me most was how the author articulates human cognitive biases in daily decision making. It made me recognize how ubiquitous impulsive judgments are, and urged me to cultivate deeper critical reflection.&quot;
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1 text-slate-500">
                <p>• Fluency & Coherence: 8.5</p>
                <p>• Lexical Resource: 8.5 (indelible impression, captivated, ubiquitous)</p>
                <p>• Grammatical Range: 8.0</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Writing Essay Evaluator */}
      {selectedTab === "writing" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                IELTS Academic & General Writing Task 2
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                Topic: &quot;Governments should prioritize funding for environmental preservation over space exploration. To what extent do you agree or disagree?&quot;
              </h3>
              <p className="text-xs text-slate-500 font-khmer mt-0.5">
                ប្រធានបទ៖ &quot;រដ្ឋាភិបាលគួរតែផ្តល់អាទិភាពថវិកាដល់ការការពារបរិស្ថាន ជាជាងការរុករកទីអវកាស។ តើអ្នកយល់ស្រប ឬមិនយល់ស្របកម្រិតណា?&quot; (សរសេរយ៉ាងតិច ២៥០ ពាក្យ)
              </p>
            </div>

            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Paste or write your English essay here to receive instant AI evaluation on Task Achievement, Coherence, Lexical Resource, and Grammatical Range..."
              rows={8}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Word Count: <span className="font-bold text-slate-800 dark:text-white">{essayText.trim() ? essayText.trim().split(/\s+/).length : 0}</span> words (Minimum 250 words recommended)
              </span>

              <button
                onClick={handleEvaluateEssay}
                disabled={isEvaluating || !essayText.trim()}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Band Criteria...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Evaluate Essay with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Feedback Report */}
            {essayFeedback && (
              <div className="mt-6 p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    AI Diagnostic Evaluation Report
                  </h4>
                  <span className="text-sm font-extrabold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                    Estimated {essayFeedback.estimatedBand}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-800 dark:text-slate-200">1. Task Achievement:</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{essayFeedback.taskAchievement}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-800 dark:text-slate-200">2. Coherence & Cohesion:</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{essayFeedback.coherenceCohesion}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-800 dark:text-slate-200">3. Lexical Resource:</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{essayFeedback.lexicalResource}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-800 dark:text-slate-200">4. Grammatical Range & Accuracy:</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{essayFeedback.grammaticalRange}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 text-xs space-y-2">
                  <p className="font-bold text-indigo-700 dark:text-indigo-400">
                    💡 Concrete Recommendations for Band 7.5+:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    {essayFeedback.suggestedImprovements.map((s: string, idx: number) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

