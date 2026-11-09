"use client";

import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Sparkles,
  Award,
  Medal,
  Users,
  MapPin,
  Star
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { LEADERBOARD_STUDENTS } from "@/lib/mock-data/student-data";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const { t, language, streak, totalXp } = useApp();
  const [timeframe, setTimeframe] = useState<"weekly" | "all_time">("weekly");

  return (
    <AuthGuard requiredFeatureTitle="National Student Leaderboard" requiredFeatureTitleKm="តារាងពិន្ទុឆ្នើមទូទាំងប្រទេស">
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-200" />
            <span>National Student Leaderboard 🇰🇭</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.nav_leaderboard}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 font-khmer mt-1">
            {language === "km"
              ? "តារាងកិត្តិយសសិស្សឆ្នើមប្រចាំសប្តាហ៍ទូទាំងប្រទេសកម្ពុជា រួមទាំងពិន្ទុ XP និងថ្ងៃរៀនជាប់គ្នា"
              : "Compete and learn together with fellow students across Cambodia. Climb ranks by maintaining study streaks and passing exams."}
          </p>
        </div>

        <div className="flex items-center bg-white/20 backdrop-blur-md rounded-2xl p-1 self-start sm:self-auto">
          <button
            onClick={() => setTimeframe("weekly")}
            className={cn(
              "px-4 py-1.5 rounded-xl text-xs font-bold transition-all",
              timeframe === "weekly" ? "bg-white text-amber-900 shadow-sm" : "text-white"
            )}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe("all_time")}
            className={cn(
              "px-4 py-1.5 rounded-xl text-xs font-bold transition-all",
              timeframe === "all_time" ? "bg-white text-amber-900 shadow-sm" : "text-white"
            )}
          >
            All-Time XP
          </button>
        </div>
      </div>

      {/* Top 3 Podium Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs text-center space-y-3 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-lg flex items-center justify-center">
            2
          </div>
          <img
            src={LEADERBOARD_STUDENTS[1].avatar}
            alt={LEADERBOARD_STUDENTS[1].name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 shadow-md"
          />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {language === "km" ? LEADERBOARD_STUDENTS[1].nameKm : LEADERBOARD_STUDENTS[1].name}
            </h3>
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {LEADERBOARD_STUDENTS[1].city}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {LEADERBOARD_STUDENTS[1].xp.toLocaleString()} XP
          </span>
        </div>

        {/* Rank 1 (Podium Center) */}
        <div className="order-1 md:order-2 rounded-3xl bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-400 p-6 shadow-md text-center space-y-3 flex flex-col items-center justify-center scale-103">
          <div className="w-14 h-14 rounded-full bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-amber-500/30">
            👑 1
          </div>
          <img
            src={LEADERBOARD_STUDENTS[0].avatar}
            alt={LEADERBOARD_STUDENTS[0].name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
          />
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              {language === "km" ? LEADERBOARD_STUDENTS[0].nameKm : LEADERBOARD_STUDENTS[0].name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-500" /> {LEADERBOARD_STUDENTS[0].city}
            </p>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-xs">
            {LEADERBOARD_STUDENTS[0].xp.toLocaleString()} XP • {LEADERBOARD_STUDENTS[0].streak}d Streak
          </span>
        </div>

        {/* Rank 3 */}
        <div className="order-3 md:order-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs text-center space-y-3 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-300 font-black text-lg flex items-center justify-center">
            3
          </div>
          <img
            src={LEADERBOARD_STUDENTS[2].avatar}
            alt={LEADERBOARD_STUDENTS[2].name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-700/30 shadow-md"
          />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {language === "km" ? LEADERBOARD_STUDENTS[2].nameKm : LEADERBOARD_STUDENTS[2].name}
            </h3>
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {LEADERBOARD_STUDENTS[2].city}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            {totalXp.toLocaleString()} XP (You)
          </span>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Complete National Standings
        </h3>

        <div className="space-y-2">
          {LEADERBOARD_STUDENTS.map((item) => (
            <div
              key={item.rank}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-colors",
                item.rank === 3
                  ? "bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900 font-semibold"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="w-7 text-center font-bold text-sm text-slate-500">
                  #{item.rank}
                </span>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl object-cover shadow-xs"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {language === "km" ? item.nameKm : item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{item.city}</span>
                    <span>•</span>
                    <span className="text-amber-600 flex items-center gap-0.5">
                      <Flame className="w-3 h-3 fill-amber-500" /> {item.streak} days
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                  {item.rank === 3 ? totalXp.toLocaleString() : item.xp.toLocaleString()} XP
                </span>
                <p className="text-[10px] text-slate-400">{item.badge}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

