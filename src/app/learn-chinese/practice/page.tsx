"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, PenTool, RefreshCw } from "lucide-react";
import { HanziStrokeViewer } from "@/components/common/HanziStrokeViewer";
import { TonePracticeWidget } from "@/components/common/TonePracticeWidget";
import { HSK_VOCABULARY } from "@/lib/mock-data/hsk-data";
import { useApp } from "@/lib/i18n/LanguageContext";

export default function ChinesePracticeStudioPage() {
  const { t, language } = useApp();
  const [selectedWord, setSelectedWord] = useState(HSK_VOCABULARY[0]);

  return (
    <div className="space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/learn-chinese"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chinese Module</span>
        </Link>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Chinese Character & Tone Interactive Studio
        </h1>
        <p className="text-xs sm:text-sm text-red-100 mt-1 font-khmer">
          {language === "km"
            ? "ហាត់សរសេរអក្សរចិនក្នុងក្រឡា 田字格 / 米字格 និងវាស់ស្ទង់សូរសំឡេង ៤ សំឡេងដោយប្រើមីក្រូហ្វូន"
            : "Practice writing Hanzi on calligraphy grids and master Mandarin tonal contours with speech recognition."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character Selector sidebar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Select Practice Character
          </h3>
          <p className="text-xs text-slate-500">
            Choose any HSK vocabulary to practice writing strokes:
          </p>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {HSK_VOCABULARY.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedWord(v)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedWord.id === v.id
                    ? "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-bold"
                    : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div>
                  <span className="text-xl font-bold font-chinese mr-2">{v.hanzi}</span>
                  <span className="text-xs text-red-600 dark:text-red-400 font-mono">{v.pinyin}</span>
                  <p className="text-[11px] text-slate-500 font-khmer">{v.meaningKm}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {v.level}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Writing Canvas */}
        <div className="lg:col-span-2 space-y-8">
          <HanziStrokeViewer
            hanzi={selectedWord.hanzi}
            pinyin={selectedWord.pinyin}
            meaningKm={selectedWord.meaningKm}
            meaningEn={selectedWord.meaningEn}
            strokeCount={selectedWord.strokeCount}
            radicals={selectedWord.radicals}
          />

          {/* Tone Practice Component */}
          <TonePracticeWidget />
        </div>
      </div>
    </div>
  );
}

