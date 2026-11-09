"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  FileCheck2,
  PenTool,
  Mic,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";

export default function TeacherDashboardPage() {
  const { t, language } = useApp();

  return (
    <div className="space-y-8 pb-12">
      {/* Teacher Welcome Header */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <GraduationCap className="w-4 h-4 text-purple-200" />
            <span>Faculty & Instructor Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Teacher Management Studio
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 font-khmer mt-1">
            {language === "km"
              ? "ផ្ទាំងគ្រប់គ្រងសម្រាប់លោកគ្រូ-អ្នកគ្រូ៖ កែសំណេរតែងសេចក្តី វាយតម្លៃសំឡេងនិយាយ បង្កើតកម្រងសំណួរ និងតាមដានការរីកចម្រើនរបស់សិស្ស"
              : "Review student writing and speaking submissions, author quizzes, and monitor learning outcomes."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/teacher/create-quiz"
            className="px-4 py-2.5 rounded-xl bg-white text-purple-800 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 shadow-md transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Quiz</span>
          </Link>
          <Link
            href="/teacher/submissions"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
          >
            <PenTool className="w-4 h-4" />
            <span>Grade Submissions (3 Pending)</span>
          </Link>
        </div>
      </div>

      {/* KPI metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Active Students</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">1,248</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+14% this month</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Pending Reviews</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">3</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Essays & Monologues</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Total Courses</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">18</p>
          <p className="text-[11px] text-slate-500 mt-0.5">HSK 1-6 & IELTS A1-C2</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Avg. Student Score</p>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">78.4%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Mock Diagnostic Exams</p>
        </div>
      </div>

      {/* Teacher Action Workspaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workspace 1: Grading Submissions */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PenTool className="w-5 h-5 text-purple-600" />
              Writing & Speaking Submission Queue
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              3 Pending
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-khmer">
            សិស្សបានបញ្ជូនសំណេរតែងសេចក្តី IELTS និងសំឡេងនិយាយឆ្លើយសំណួរ។ សូមចុចចូលដើម្បីស្តាប់ អាន និងដាក់ពិន្ទុរួមជាមួយការផ្តល់មតិយោបល់។
          </p>

          <Link
            href="/teacher/submissions"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>Open Grading Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Workspace 2: Quiz & Question Authoring */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              Quiz & Mock Exam Builder
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Exam Studio
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-khmer">
            បង្កើតសំណួរប្រឡងថ្មីៗ៖ សំណួរពហុជ្រើសរើស ស្ដាប់សំឡេង បំពេញចន្លោះ រៀបលំដាប់ពាក្យចិន និងសំណេរតែងសេចក្តី IELTS/HSK។
          </p>

          <Link
            href="/teacher/create-quiz"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>Author New Question Set</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

