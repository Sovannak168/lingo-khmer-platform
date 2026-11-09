"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Award, PlusCircle, Settings, CheckCircle2, Clock } from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { MOCK_EXAMS_DATABASE } from "@/lib/mock-data/exam-data";
import { AuthGuard } from "@/components/common/AuthGuard";

export default function AdminExamsManagementPage() {
  const { t, language } = useApp();

  return (
    <AuthGuard allowedRoles={["admin"]} requiredFeatureTitle="Exam Configurations" requiredFeatureTitleKm="ការកំណត់ប្រឡង">
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Overview</span>
        </Link>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
          Standardized Examination Configurations
        </span>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Standardized Examination Configurations & Scoring Rubrics
          </h2>
          <p className="text-xs text-slate-500 font-khmer mt-0.5">
            គ្រប់គ្រងការកំណត់រយៈពេលប្រឡង រូបមន្តគណនាពិន្ទុ Band និងលក្ខខណ្ឌវិនិច្ឆ័យតាមស្តង់ដារអន្តរជាតិ។
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EXAMS_DATABASE.map((exam) => (
            <div
              key={exam.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {exam.examType}
                </span>
                <span className="text-xs font-bold text-slate-500">{exam.levelCode}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {exam.title}
              </h4>

              <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-200 dark:border-slate-700">
                <p>• Duration: {exam.totalDurationMinutes} minutes</p>
                <p>• Max Score: {exam.maxScore} points</p>
                <p>• Passing Cutoff: {exam.passingScore} points</p>
                <p>• Sections: {exam.sections.map((s) => s.type).join(", ")}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">
                  Rubric Specification:
                </span>
                <p className="line-clamp-2">{exam.scoringRubricEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

