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
  RotateCcw,
  Layers,
  ChevronRight,
  Flame,
  Award
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { HSK_VOCABULARY, HSK_GRAMMAR, ChineseVocab } from "@/lib/mock-data/hsk-data";
import { HanziStrokeViewer } from "@/components/common/HanziStrokeViewer";
import { cn } from "@/lib/utils";

export default function HskLevelDetailPage() {
  const params = useParams();
  const levelSlug = (params?.level as string) || "hsk-1";
  const formattedLevel = levelSlug.replace("-", " ").toUpperCase(); // e.g. HSK 1

  const { t, language, incrementXp } = useApp();

  const [activeTab, setActiveTab] = useState<"vocab" | "stroke" | "flashcards" | "quiz">("vocab");
  const [selectedVocab, setSelectedVocab] = useState<ChineseVocab>(HSK_VOCABULARY[0]);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const levelVocabList = HSK_VOCABULARY.filter(
    (v) => v.level === formattedLevel || formattedLevel === "HSK 1"
  );

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const handleNextFlashcard = (known: boolean) => {
    if (known) {
      incrementXp(10);
    }
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % levelVocabList.length);
  };

  const currentFlashcard = levelVocabList[flashcardIndex] || HSK_VOCABULARY[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Back to Chinese Overview */}
      <div className="flex items-center justify-between">
        <Link
          href="/learn-chinese"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All HSK Levels</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
            {formattedLevel} Curriculum
          </span>
        </div>
      </div>

      {/* Level Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {formattedLevel} Standard Course Mastery
        </h1>
        <p className="text-xs sm:text-sm text-red-100 mt-1 font-khmer">
          {language === "km"
            ? `ស្វែងយល់វាក្យសព្ទគ្រឹះ វេយ្យាករណ៍ចិន ភីនអ៊ីន និងលំដាប់គំនូសអក្សរសម្រាប់កម្រិត ${formattedLevel}`
            : `Core vocabulary, stroke orders, grammar structures and spaced-repetition flashcards for ${formattedLevel}.`}
        </p>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("vocab")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "vocab"
              ? "bg-red-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>Vocabulary List</span>
        </button>

        <button
          onClick={() => setActiveTab("stroke")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "stroke"
              ? "bg-red-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Layers className="w-4 h-4" />
          <span>Character Stroke Practice</span>
        </button>

        <button
          onClick={() => setActiveTab("flashcards")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "flashcards"
              ? "bg-red-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>Smart Flashcards</span>
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
            activeTab === "quiz"
              ? "bg-red-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Award className="w-4 h-4" />
          <span>Lesson Quiz</span>
        </button>
      </div>

      {/* Tab 1: Vocabulary List with Audio */}
      {activeTab === "vocab" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levelVocabList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-red-300 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-chinese">
                      {item.hanzi}
                    </span>
                    <button
                      onClick={() => speakText(item.hanzi)}
                      className="p-1.5 rounded-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400 mt-0.5">
                    {item.pinyin} (Tone {item.tone})
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedVocab(item);
                    setActiveTab("stroke");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Write Character
                </button>
              </div>

              {/* Definitions */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white font-khmer">
                  🇰🇭 ខ្មែរ៖ <span className="text-blue-600 dark:text-blue-400">{item.meaningKm}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  🇬🇧 English: {item.meaningEn} ({item.partOfSpeech})
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Example Sentence:
                </span>
                {item.examples.slice(0, 1).map((ex, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-800 dark:text-slate-200 font-chinese">
                      {ex.zh}
                    </p>
                    <p className="text-red-500 dark:text-red-400 text-[11px]">{ex.pinyin}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-khmer text-[11px]">🇰🇭 {ex.km}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Interactive Character Stroke Practice */}
      {activeTab === "stroke" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Character Stroke Order & Writing Studio
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Select character:</span>
              <div className="flex items-center gap-1">
                {levelVocabList.slice(0, 5).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVocab(v)}
                    className={cn(
                      "w-8 h-8 rounded-lg font-bold text-sm transition-colors",
                      selectedVocab.id === v.id
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    {v.hanzi[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <HanziStrokeViewer
            hanzi={selectedVocab.hanzi}
            pinyin={selectedVocab.pinyin}
            meaningKm={selectedVocab.meaningKm}
            meaningEn={selectedVocab.meaningEn}
            strokeCount={selectedVocab.strokeCount}
            radicals={selectedVocab.radicals}
          />
        </div>
      )}

      {/* Tab 3: Spaced Repetition Flashcards */}
      {activeTab === "flashcards" && (
        <div className="max-w-xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Card {flashcardIndex + 1} of {levelVocabList.length}</span>
            <span>Spaced Repetition (Leitner Box 1)</span>
          </div>

          {/* Flashcard Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[260px] rounded-3xl bg-white dark:bg-slate-900 border-2 border-red-200 dark:border-red-900/60 p-8 shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-101"
          >
            {!isFlipped ? (
              <div className="space-y-4">
                <span className="text-6xl font-extrabold text-slate-900 dark:text-white font-chinese">
                  {currentFlashcard.hanzi}
                </span>
                <p className="text-sm font-semibold text-red-500">
                  Click anywhere to reveal Pinyin & Meaning
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-chinese">
                  {currentFlashcard.hanzi}
                </span>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {currentFlashcard.pinyin}
                </p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <p className="font-bold text-blue-600 dark:text-blue-400 font-khmer">
                    🇰🇭 {currentFlashcard.meaningKm}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    🇬🇧 {currentFlashcard.meaningEn}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Response Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleNextFlashcard(false)}
              className="px-6 py-2.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
            >
              Need Practice (Box 1)
            </button>
            <button
              onClick={() => handleNextFlashcard(true)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>I Know This (+10 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Quick Quiz */}
      {activeTab === "quiz" && (
        <div className="max-w-xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {formattedLevel} Comprehension Quick Quiz
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              50 XP Reward
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Question 1: What is the correct meaning of &quot;学习&quot; (xuéxí)?
            </p>
            <p className="text-xs text-slate-500 font-khmer">
              សំណួរ៖ តើពាក្យ &quot;学习&quot; (xuéxí) មានន័យដូចម្តេចក្នុងភាសាខ្មែរ?
            </p>

            <div className="space-y-2">
              {[
                { id: "a", text: "Water (ទឹក)" },
                { id: "b", text: "To study / to learn (រៀន, សិក្សា)", correct: true },
                { id: "c", text: "Doctor (គ្រូពេទ្យ)" },
                { id: "d", text: "Friend (មិត្តភក្តិ)" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuizAnswer(opt.id)}
                  disabled={quizSubmitted}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between",
                    quizAnswer === opt.id
                      ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/60 dark:text-red-200 font-bold"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800",
                    quizSubmitted && opt.correct
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold"
                      : ""
                  )}
                >
                  <span>{opt.text}</span>
                  {quizAnswer === opt.id && <CheckCircle className="w-4 h-4 text-red-600" />}
                </button>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={() => {
                  if (!quizAnswer) return;
                  setQuizSubmitted(true);
                  if (quizAnswer === "b") {
                    incrementXp(50);
                  }
                }}
                disabled={!quizAnswer}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-2">
                <p className="font-bold">
                  {quizAnswer === "b" ? "🎉 Correct! +50 XP awarded." : "Incorrect. The correct answer is B."}
                </p>
                <p>
                  学习 (xuéxí) means &quot;to study&quot; or &quot;to learn&quot; (រៀន, សិក្សា). For example: 学习汉语 (xuéxí hànyǔ - រៀនភាសាចិន)។
                </p>
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswer(null);
                  }}
                  className="mt-2 text-xs font-bold text-emerald-700 underline"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

