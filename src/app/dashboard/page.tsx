"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar,
  Languages,
  ChevronRight,
  Trophy,
  Target
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from "recharts";
import { useApp } from "@/lib/i18n/LanguageContext";
import { CURRENT_STUDENT } from "@/lib/mock-data/student-data";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

export default function StudentDashboardPage() {
  const { t, language, targetLanguage, setTargetLanguage, streak, totalXp, currentUser } = useApp();
  const student = currentUser ? {
    ...CURRENT_STUDENT,
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
    streakDays: currentUser.streakDays || streak,
    totalXp: currentUser.totalXp || totalXp,
  } : CURRENT_STUDENT;

  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "weaknesses">("overview");

  return (
    <AuthGuard requiredFeatureTitle="Student Learning Dashboard" requiredFeatureTitleKm="ផ្ទាំងគ្រប់គ្រងការសិក្សារបស់សិស្ស">
      <div className="space-y-8 pb-12">
      {/* Top Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold">{student.name}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                  🇰🇭 {student.city}
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                {language === "km" ? "សូមស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងការសិក្សាផ្ទាល់ខ្លួនរបស់អ្នក" : "Welcome back to your personalized learning dashboard"}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
                <span className="text-amber-300 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-400" /> {streak} {t.daily_streak}
                </span>
                <span>•</span>
                <span className="text-purple-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {totalXp.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>

          {/* Active Target Language Switcher */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 space-y-2">
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
              {language === "km" ? "ភាសាកំពុងផ្តោតការរៀន៖" : "Current Active Focus:"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTargetLanguage("zh")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  targetLanguage === "zh"
                    ? "bg-white text-blue-900 shadow-md"
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                <span>🇨🇳 中文</span>
                <span className="text-[10px] opacity-80">({student.currentLevelZh})</span>
              </button>
              <button
                onClick={() => setTargetLanguage("en")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  targetLanguage === "en"
                    ? "bg-white text-blue-900 shadow-md"
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                <span>🇬🇧 English</span>
                <span className="text-[10px] opacity-80">({student.currentLevelEn})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.daily_streak}
            </p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {streak} Days
            </p>
          </div>
        </div>

        {/* Total Hours */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.hours_learned}
            </p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {student.totalHours} hrs
            </p>
          </div>
        </div>

        {/* Vocabulary */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.words_mastered}
            </p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {student.vocabLearned}
            </p>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {t.completed}
            </p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {student.completedLessons} Lessons
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Section: Recharts Analytics & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Activity Charts & Weak Skills */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  {language === "km" ? "ម៉ោងសិក្សានិងវាក្យសព្ទប្រចាំសប្តាហ៍" : "Weekly Study Hours & Vocabulary Velocity"}
                </h3>
                <p className="text-xs text-slate-500">
                  Daily active learning duration and new words logged
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Hours
                </span>
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <span className="w-3 h-3 rounded bg-purple-600 inline-block" /> Words
                </span>
              </div>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={student.weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey={language === "km" ? "dayKm" : "day"} stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="hours" name="Study Hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="vocabCount" name="Words" fill="#a855f7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weak Skills Requiring Improvement (Section 5 Requirement) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  {language === "km" ? "ជំនាញខ្សោយដែលត្រូវពង្រឹង (Weak Skills)" : "Weak Skills Requiring Improvement"}
                </h3>
                <p className="text-xs text-slate-500">
                  Detected by AI diagnostics based on your recent quiz and mock exam errors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {student.weakSkills.map((ws, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                        {ws.category} • {ws.language === "zh" ? "🇨🇳 Chinese" : "🇬🇧 English"}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">
                        {language === "km" ? ws.skillKm : ws.skill}
                      </h4>
                    </div>
                    <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">
                      {ws.accuracy}% Acc
                    </span>
                  </div>

                  {/* Accuracy Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${ws.accuracy}%` }}
                    />
                  </div>

                  <Link
                    href={ws.language === "zh" ? "/learn-chinese/practice" : "/learn-english"}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
                  >
                    <span>Practice Recommended Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mock Exam Scores */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  {language === "km" ? "ប្រវត្តិនៃការប្រឡងសាកល្បងថ្មីៗ" : "Recent Examination Scores"}
                </h3>
                <p className="text-xs text-slate-500">
                  Estimated scores calculated according to official rubrics.
                </p>
              </div>
              <Link href="/mock-exams" className="text-xs font-bold text-blue-600 hover:underline">
                {t.view_all}
              </Link>
            </div>

            <div className="space-y-3 pt-2">
              {student.recentExams.map((ex) => (
                <div
                  key={ex.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {language === "km" ? ex.titleKm : ex.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Completed on {ex.date} • Estimated: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{ex.bandEstimated}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {ex.score}
                    </span>
                    <Link
                      href="/mock-exams/exam-ielts-ac-1"
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Skill Radar & Recommended Action */}
        <div className="space-y-8">
          {/* Radar Chart: 6-Core Skill Balance */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              {language === "km" ? "សមត្ថភាពជំនាញទាំង ៦" : "Proficiency Competency Radar"}
            </h3>
            <p className="text-[11px] text-slate-500">
              Diagnostic balance across reading, listening, writing, speaking, and vocabulary.
            </p>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={student.skillRadar}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis
                    dataKey={language === "km" ? "subjectKm" : "subject"}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar
                    name="Student Proficiency"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Recommended Lessons */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {language === "km" ? "មេរៀនដែលណែនាំសម្រាប់ថ្ងៃនេះ" : "Recommended Daily Modules"}
            </h3>

            <div className="space-y-3">
              <Link
                href="/learn-chinese/hsk-2"
                className="group block p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-red-200 hover:bg-red-50/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-600 uppercase">
                    HSK 2 Vocabulary
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  Time & Scheduling: 时间 (shíjiān) & 准备 (zhǔnbèi)
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  15 min • +50 XP
                </p>
              </Link>

              <Link
                href="/learn-english/intermediate"
                className="group block p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">
                    IELTS Writing Band 7.0
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  Mastering Conditional Type 2 & 3 in Arguments
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  20 min • +75 XP
                </p>
              </Link>

              <Link
                href="/mock-exams/exam-ielts-ac-1"
                className="group block p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-purple-200 hover:bg-purple-50/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-600 uppercase">
                    Full Simulation
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  IELTS Academic Mock Exam (Test 1)
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Full 4-skill timed test • Diagnostic Band
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

