"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  BookOpen,
  Award,
  DollarSign,
  TrendingUp,
  BarChart3,
  Layers,
  Settings,
  AlertCircle,
  FileText,
  CreditCard,
  Bell,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";

export default function AdminDashboardPage() {
  const { t, language } = useApp();

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-purple-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-rose-300 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Super Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.nav_admin}
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 font-khmer mt-1">
            {language === "km"
              ? "ផ្ទាំងគ្រប់គ្រងប្រព័ន្ធទូទៅ៖ សិស្ស គ្រូបង្រៀន វគ្គសិក្សា កម្រងសំណួរ ធនាគារសំណួរ ការជាវកញ្ចប់ Premium និងស្ថិតិប្រឡង"
              : "System administration: user roles, exam engine rubrics, course management, subscriptions, and security analytics."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/subscription"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Manage Plans
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Total Registered Users</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">12,480</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">85% Active Learners</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Monthly Revenue (ABA)</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">$4,820 USD</p>
          <p className="text-[11px] text-slate-500 mt-0.5">~19,762,000 KHR</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Questions in Bank</p>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">1,850</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Across HSK & IELTS</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-slate-400">Exams Completed</p>
          <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">28,940</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Mock Simulations</p>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: User & Role Management */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              User & Role Management
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Manage student accounts, teacher accreditations, and role permissions (student, teacher, admin).
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>• Students: 12,390</p>
            <p>• Verified Teachers: 84</p>
            <p>• Administrators: 6</p>
          </div>
        </div>

        {/* Module 2: Exam & Scoring Configurations */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Exam Rubrics & Configurations
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Maintain separate scoring rubrics and time allocations for HSK, IELTS Academic/General, TOEFL, and TOEIC.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>• HSK 1-6 Score Scales: 200/300 pts</p>
            <p>• IELTS 9-Band Rubric Active</p>
            <p>• TOEIC 990-Point Mapping Active</p>
          </div>
        </div>

        {/* Module 3: ABA PayWay & Subscriptions */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ABA PayWay & KHQR Transactions
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Monitor incoming subscription settlements, verify transaction hashes, and inspect merchant webhooks.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>• Active Merchant: ec438921_khmer</p>
            <p>• Rate: 1 USD = 4,100 KHR</p>
            <p>• Webhook Status: 200 OK (Live)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

