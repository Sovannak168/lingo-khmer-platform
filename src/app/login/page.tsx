"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { UserRole } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { t, language, currentUser, isAuthenticated, login, register, quickDemoLogin } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (isAuthenticated && currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Currently Signed In
          </h2>
          <p className="text-xs text-slate-500">
            Logged in as <span className="font-bold text-slate-900 dark:text-white">{currentUser.name}</span> ({currentUser.email})
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href={currentUser.role === "admin" ? "/admin" : currentUser.role === "teacher" ? "/teacher" : "/dashboard"}
              className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = login({ email, password });
    if (!res.success) {
      setErrorMsg(res.error || "Authentication failed.");
    } else {
      router.push("/dashboard");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim()) {
      setErrorMsg(language === "km" ? "សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក។" : "Please enter your full name.");
      return;
    }
    const res = register({ name, email, password, role });
    if (!res.success) {
      setErrorMsg(res.error || "Registration failed.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-2xl p-6 sm:p-10 space-y-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            🛡️ {language === "km" ? "ច្រកចូលប្រព័ន្ធសុវត្ថិភាព" : "Secure System Portal"}
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isRegister ? t.auth_register : t.auth_login}
          </h1>

          <p className="text-xs text-slate-500 font-khmer leading-relaxed">
            {t.auth_login_desc}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => {
              setIsRegister(false);
              setErrorMsg(null);
            }}
            className={cn(
              "flex-1 py-2 rounded-xl transition-all",
              !isRegister
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            {t.auth_login}
          </button>
          <button
            onClick={() => {
              setIsRegister(true);
              setErrorMsg(null);
            }}
            className={cn(
              "flex-1 py-2 rounded-xl transition-all",
              isRegister
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            {t.auth_register}
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-900">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!isRegister ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.auth_email}:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@lingo.edu.kh"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.auth_password}:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.auth_login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.auth_name}:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vannak Roth (វណ្ណៈ)"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.auth_email}:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.auth_password} (Min 6 characters):
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.auth_role}:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="student">Student (សិស្សភាសា)</option>
                <option value="teacher">Teacher (លោកគ្រូ-អ្នកគ្រូ)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t.auth_register}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 1-Click Fast Demo Login for instant testing */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
            ⚡ {t.auth_quick_demo}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <button
              type="button"
              onClick={() => {
                quickDemoLogin("student");
                router.push("/dashboard");
              }}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 transition-colors"
            >
              Student (វណ្ណៈ)
            </button>
            <button
              type="button"
              onClick={() => {
                quickDemoLogin("teacher");
                router.push("/teacher");
              }}
              className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800 transition-colors"
            >
              Teacher (គ្រូ)
            </button>
            <button
              type="button"
              onClick={() => {
                quickDemoLogin("admin");
                router.push("/admin");
              }}
              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

