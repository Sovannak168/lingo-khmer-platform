"use client";

import React, { useState } from "react";
import { Volume2, Mic, CheckCircle, Sparkles } from "lucide-react";
import { CHINESE_TONES } from "@/lib/mock-data/hsk-data";
import { VoiceRecorder } from "./VoiceRecorder";
import { cn } from "@/lib/utils";

export function TonePracticeWidget() {
  const [selectedToneIndex, setSelectedToneIndex] = useState(0);
  const currentTone = CHINESE_TONES[selectedToneIndex];

  const playToneAudio = (syllable: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(syllable);
      u.lang = "zh-CN";
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
              🇨🇳
            </span>
            Mandarin Tonal Practice (សូរសំឡេងចិនទាំង ៤)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tone shapes meaning in Chinese. Listen, inspect the pitch contour curve, and practice speaking.
          </p>
        </div>
      </div>

      {/* Tone Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CHINESE_TONES.map((t, idx) => (
          <button
            key={t.tone}
            onClick={() => setSelectedToneIndex(idx)}
            className={cn(
              "p-3 rounded-xl border text-center transition-all duration-150 flex flex-col items-center justify-center gap-1",
              selectedToneIndex === idx
                ? "bg-gradient-to-b from-red-500 to-rose-600 text-white border-transparent shadow-md shadow-red-500/20 scale-102"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            )}
          >
            <span className="text-xl font-bold font-mono">{t.mark}</span>
            <span className="text-xs font-semibold">{t.name.split(" ")[0]}</span>
            <span className={cn("text-[10px]", selectedToneIndex === idx ? "text-red-100" : "text-slate-400")}>
              {t.pitch}
            </span>
          </button>
        ))}
      </div>

      {/* Active Tone Detailed Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
        {/* Left: Pitch Contour Graphic */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentTone.name} ({currentTone.pitch})
            </h4>
            <button
              onClick={() => playToneAudio(currentTone.example.split(" ")[0])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Native ({currentTone.example.split(" ")[0]})</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-khmer">
            {currentTone.descKm}
          </p>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-400">Example Word:</span>
            <p className="text-base font-bold text-slate-800 dark:text-slate-100">
              {currentTone.example}
            </p>
          </div>

          {/* SVG Pitch Curve Diagram */}
          <div className="h-28 w-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 relative flex items-center justify-center">
            {/* 5-line pitch grid (1 to 5) */}
            <div className="absolute inset-x-4 inset-y-3 flex flex-col justify-between text-[9px] text-slate-300 dark:text-slate-600 pointer-events-none">
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span>5 (High)</span>
              </div>
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span>4</span>
              </div>
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span>3 (Mid)</span>
              </div>
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span>2</span>
              </div>
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span>1 (Low)</span>
              </div>
            </div>

            {/* SVG Tone Curves */}
            <svg className="w-full h-full relative z-10" viewBox="0 0 200 80">
              {currentTone.tone === 1 && (
                <path d="M 30 15 L 170 15" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              )}
              {currentTone.tone === 2 && (
                <path d="M 30 50 Q 100 40 170 15" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              )}
              {currentTone.tone === 3 && (
                <path d="M 30 40 Q 90 75 120 70 Q 140 50 170 25" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              )}
              {currentTone.tone === 4 && (
                <path d="M 30 15 L 170 70" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              )}
              {currentTone.tone === 5 && (
                <circle cx="100" cy="45" r="5" fill="#ef4444" />
              )}
            </svg>
          </div>
        </div>

        {/* Right: User Voice Recording & Scoring */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-blue-600" />
            Your Pronunciation Attempt
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click record and speak &quot;{currentTone.example.split(" ")[0]}&quot; into your microphone to verify your tonal contour.
          </p>

          <VoiceRecorder
            language="zh"
            expectedText={currentTone.example.split(" ")[0]}
          />
        </div>
      </div>
    </div>
  );
}

