"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Volume2,
  Bookmark,
  Sparkles,
  Layers,
  CheckCircle,
  Filter
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { HSK_VOCABULARY } from "@/lib/mock-data/hsk-data";
import { ENGLISH_VOCABULARY } from "@/lib/mock-data/english-data";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

export default function VocabularyPage() {
  const { t, language } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "zh" | "en">("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const speakText = (text: string, lang: "zh" | "en") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "zh" ? "zh-CN" : "en-US";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  // Combine words
  const allVocab = [
    ...HSK_VOCABULARY.map((v) => ({
      id: v.id,
      word: v.hanzi,
      phonetic: `${v.pinyin} (Tone ${v.tone})`,
      meaningKm: v.meaningKm,
      meaningEn: v.meaningEn,
      level: v.level,
      lang: "zh" as const,
      pos: v.partOfSpeech,
      examples: v.examples.map((e) => ({ target: e.zh, km: e.km })),
    })),
    ...ENGLISH_VOCABULARY.map((v) => ({
      id: v.id,
      word: v.word,
      phonetic: v.ipa,
      meaningKm: v.meaningKm,
      meaningEn: v.meaningEn,
      level: v.level,
      lang: "en" as const,
      pos: v.partOfSpeech,
      examples: v.examples.map((e) => ({ target: e.en, km: e.km })),
    })),
  ];

  const filtered = allVocab.filter((item) => {
    if (selectedLanguage !== "all" && item.lang !== selectedLanguage) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.word.toLowerCase().includes(term) ||
      item.phonetic.toLowerCase().includes(term) ||
      item.meaningKm.includes(term) ||
      item.meaningEn.toLowerCase().includes(term)
    );
  });

  return (
    <AuthGuard requiredFeatureTitle="Vocabulary Dictionary & Word Bank" requiredFeatureTitleKm="វចនានុក្រមវាក្យសព្ទ">
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t.nav_vocabulary} Dictionary & Word Bank
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-1 font-khmer">
          {language === "km"
            ? "ស្វែងរកវាក្យសព្ទចិន HSK និងអង់គ្លេស IELTS រួមជាមួយការបញ្ចេញសំឡេង សូរស័ព្ទ IPA ភីនអ៊ីន និងអត្ថន័យជាភាសាខ្មែរ"
            : "Search and explore comprehensive bilingual vocabulary with native audio pronunciations and Khmer translations."}
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words, Pinyin, IPA, Khmer meanings..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSelectedLanguage("all")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all",
              selectedLanguage === "all"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            )}
          >
            All ({allVocab.length})
          </button>
          <button
            onClick={() => setSelectedLanguage("zh")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all",
              selectedLanguage === "zh"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            )}
          >
            🇨🇳 Chinese
          </button>
          <button
            onClick={() => setSelectedLanguage("en")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all",
              selectedLanguage === "en"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            )}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-blue-300 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-2xl font-extrabold text-slate-900 dark:text-white",
                        item.lang === "zh" ? "font-chinese text-3xl" : ""
                      )}
                    >
                      {item.word}
                    </span>
                    <button
                      onClick={() => speakText(item.word, item.lang)}
                      className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      title="Pronounce"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 font-mono mt-0.5">
                    {item.phonetic}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      item.lang === "zh"
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    )}
                  >
                    {item.level}
                  </span>
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500"
                  >
                    <Bookmark
                      className={cn(
                        "w-4 h-4",
                        bookmarkedIds[item.id] ? "fill-amber-400 text-amber-400" : ""
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Definitions */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white font-khmer">
                  🇰🇭 ខ្មែរ៖ <span className="text-blue-600 dark:text-blue-400">{item.meaningKm}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  🇬🇧 Definition: {item.meaningEn} ({item.pos})
                </p>
              </div>

              {/* Example sentences */}
              {item.examples.slice(0, 1).map((ex, i) => (
                <div key={i} className="text-xs space-y-0.5 pt-1">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    &quot;{ex.target}&quot;
                  </p>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-khmer">
                    🇰🇭 {ex.km}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </AuthGuard>
  );
}

