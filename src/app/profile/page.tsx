"use client";

import React, { useState } from "react";
import {
  User,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Settings,
  Bell,
  Download,
  ExternalLink,
  Target,
  MessageSquare
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { CURRENT_STUDENT } from "@/lib/mock-data/student-data";
import { CertificateModal } from "@/components/common/CertificateModal";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { t, language, streak, totalXp } = useApp();
  const student = CURRENT_STUDENT;

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedCourseCert, setSelectedCourseCert] = useState({
    title: "HSK 1 Chinese Elementary Curriculum",
    titleKm: "វគ្គសិក្សាភាសាចិនមូលដ្ឋាន HSK កម្រិត ១",
  });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const achievements = [
    { code: "first_step", title: "First Step", titleKm: "ជំហានដំបូង", desc: "Completed your first lesson", unlocked: true, icon: "🎯" },
    { code: "streak_7", title: "7-Day Warrior", titleKm: "អ្នកតស៊ូ ៧ ថ្ងៃ", desc: "Maintained a 7-day study streak", unlocked: true, icon: "🔥" },
    { code: "hsk_master", title: "Hanzi Explorer", titleKm: "អ្នករុករកអក្សរចិន", desc: "Mastered 50 Chinese characters", unlocked: true, icon: "🏮" },
    { code: "ielts_challenger", title: "IELTS Challenger", titleKm: "អ្នកត្រៀម IELTS", desc: "Completed full IELTS mock exam", unlocked: true, icon: "🏆" },
    { code: "tone_master", title: "Tone Master", titleKm: "ម្ចាស់សូរសំឡេង", desc: "Scored 90%+ in 4-tone speech test", unlocked: false, icon: "🎵" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <DisclaimerBanner />

      {/* Profile Header */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-200 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {student.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Active Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {student.email} • {student.city}, Cambodia
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs font-semibold">
              <span className="text-amber-600 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500" /> {streak} {t.daily_streak}
              </span>
              <span>•</span>
              <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {totalXp.toLocaleString()} Total XP
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCourseCert({
                title: "HSK 1 Chinese Elementary Curriculum",
                titleKm: "វគ្គសិក្សាភាសាចិនមូលដ្ឋាន HSK កម្រិត ១",
              });
              setIsCertModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>View Course Certificate</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Badges & Learning Goals */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Goals */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Daily Learning Goal (30 mins / day)
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Today&apos;s Progress: 25 / 30 mins</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">83%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full" style={{ width: "83%" }} />
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Achievement Badges & Milestones
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((a) => (
                <div
                  key={a.code}
                  className={cn(
                    "p-4 rounded-2xl border flex items-center gap-3.5 transition-all",
                    a.unlocked
                      ? "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                      : "opacity-50 bg-slate-50/50 border-dashed border-slate-200 dark:border-slate-800"
                  )}
                >
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {language === "km" ? a.titleKm : a.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{a.desc}</p>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                      {a.unlocked ? "✓ Unlocked" : "Locked"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Feedback System (Section 14 Requirement) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Student Feedback & Curriculum Suggestions
            </h3>
            <p className="text-xs text-slate-500 font-khmer">
              សូមផ្ញើមតិយោបល់ ឬសំណើបន្ថែមមេរៀនមកកាន់ក្រុមការងារដើម្បីជួយអភិវឌ្ឍវេទិកាឱ្យកាន់តែប្រសើរឡើង។
            </p>

            {!feedbackSent ? (
              <div className="space-y-3">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your learning experience, request specific grammar topics, or report questions..."
                  rows={3}
                  className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => {
                    if (feedbackText.trim()) setFeedbackSent(true);
                  }}
                  disabled={!feedbackText.trim()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md"
                >
                  Submit Student Feedback
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your feedback has been forwarded to the curriculum committee.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Issued Certificates & Settings */}
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Course Completion Certificates
            </h3>
            <p className="text-[11px] text-slate-500">
              Institutional certificates issued by LingoKhmer upon curriculum mastery.
            </p>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                <p className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  HSK 1 Chinese Elementary Curriculum
                </p>
                <p className="text-[11px] text-slate-500">Issued: Nov 2026 • Verified</p>
                <button
                  onClick={() => {
                    setSelectedCourseCert({
                      title: "HSK 1 Chinese Elementary Curriculum",
                      titleKm: "វគ្គសិក្សាភាសាចិនមូលដ្ឋាន HSK កម្រិត ១",
                    });
                    setIsCertModalOpen(true);
                  }}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print Certificate</span>
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <p className="text-xs font-bold text-blue-950 dark:text-blue-200">
                  IELTS Academic Reading & Writing Prep
                </p>
                <p className="text-[11px] text-slate-500">Issued: Oct 2026 • Verified</p>
                <button
                  onClick={() => {
                    setSelectedCourseCert({
                      title: "IELTS Academic Reading & Writing Preparation",
                      titleKm: "វគ្គត្រៀមប្រឡង IELTS Academic Reading & Writing",
                    });
                    setIsCertModalOpen(true);
                  }}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        studentName={student.name}
        courseTitle={selectedCourseCert.title}
        courseTitleKm={selectedCourseCert.titleKm}
      />
    </div>
  );
}

