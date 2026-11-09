"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  FileCheck2,
  Trophy,
  Bot,
  BarChart3,
  Languages,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
  Flame,
  Crown,
  LogIn,
  LogOut,
  Lock,
  ChevronDown
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const {
    language,
    setLanguage,
    t,
    currentUser,
    isAuthenticated,
    logout,
    quickDemoLogin,
    currentRole,
    theme,
    toggleTheme,
    streak,
    totalXp,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: t.nav_home, href: "/", icon: BookOpen },
    { name: t.nav_chinese, href: "/learn-chinese", icon: GraduationCap, badge: "HSK 1-6" },
    { name: t.nav_english, href: "/learn-english", icon: Languages, badge: "IELTS" },
    { name: t.nav_practice, href: "/practice-tests", icon: FileCheck2 },
    { name: t.nav_mock_exams, href: "/mock-exams", icon: Trophy, highlight: true },
    { name: t.nav_progress, href: "/dashboard", icon: BarChart3 },
    { name: t.nav_vocabulary, href: "/vocabulary", icon: BookOpen },
    { name: t.nav_ai_tutor, href: "/ai-tutor", icon: Bot, isAi: true },
    { name: t.nav_leaderboard, href: "/leaderboard", icon: Trophy },
    { name: t.nav_profile, href: "/profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      {/* Top micro-bar: Live status, Streak, XP, Role Indicator */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-gradient-to-r from-blue-50/70 via-purple-50/70 to-indigo-50/70 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 text-xs">
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                <Flame className="w-4 h-4 fill-amber-500 animate-bounce" />
                <span>{streak} {t.daily_streak}</span>
              </div>
              <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{totalXp.toLocaleString()} {t.xp_points}</span>
              </div>
              <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700" />
              <Link
                href="/subscription"
                className="flex items-center gap-1 text-purple-700 dark:text-purple-300 font-semibold hover:underline"
              >
                <Crown className="w-3.5 h-3.5 text-purple-600" />
                <span>{t.nav_subscribe}</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{language === "km" ? "សូមចូលគណនីដើម្បីកត់ត្រាវឌ្ឍនភាពសិក្សា" : "Sign in to record your learning streak and test scores"}</span>
            </div>
          )}
        </div>

        {/* Auth Fast Switcher & Demo Access */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Role:</span>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                currentUser?.role === "admin"
                  ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  : currentUser?.role === "teacher"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
              )}>
                {currentUser?.role}
              </span>
              {currentUser?.role === "admin" && (
                <Link href="/admin" className="text-xs text-rose-600 font-bold hover:underline">
                  Admin Panel
                </Link>
              )}
              {currentUser?.role === "teacher" && (
                <Link href="/teacher" className="text-xs text-purple-600 font-bold hover:underline">
                  Teacher Portal
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-500">{t.auth_quick_demo}:</span>
              <button
                onClick={() => quickDemoLogin("student")}
                className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200"
              >
                Student
              </button>
              <button
                onClick={() => quickDemoLogin("teacher")}
                className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-200"
              >
                Teacher
              </button>
              <button
                onClick={() => quickDemoLogin("admin")}
                className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold hover:bg-rose-200"
              >
                Admin
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg font-mono">LK</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
                  LingoKhmer
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  Edu
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Chinese (HSK) & English (IELTS)
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5", link.isAi ? "text-purple-600 dark:text-purple-400" : "")} />
                  <span>{link.name}</span>
                  {!isAuthenticated && (
                    <Lock className="w-2.5 h-2.5 text-slate-400" />
                  )}
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {link.badge}
                    </span>
                  )}
                  {link.isAi && (
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side controls: Auth, Language, Theme */}
          <div className="flex items-center gap-2.5">
            {/* Auth Buttons */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover border border-indigo-200"
                  />
                  <div className="hidden md:block text-left text-xs">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[100px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{t.nav_profile}</span>
                    </Link>

                    {currentUser.role === "teacher" && (
                      <Link
                        href="/teacher"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 font-semibold"
                      >
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        <span>Teacher Portal</span>
                      </Link>
                    )}

                    {currentUser.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold"
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.auth_logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.auth_login}</span>
                </Link>
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  {t.auth_register}
                </Link>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage("km")}
                className={cn(
                  "px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all",
                  language === "km"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                )}
                title="Khmer"
              >
                <span>🇰🇭</span>
                <span>ខ្មែរ</span>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all",
                  language === "en"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                )}
                title="English"
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 max-h-[85vh] overflow-y-auto">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center justify-between p-3 mb-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-lg" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 rounded bg-rose-100 text-rose-700 text-xs font-bold"
              >
                {t.auth_logout}
              </button>
            </div>
          ) : (
            <div className="p-3 mb-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-xs space-y-2">
              <p className="text-indigo-900 dark:text-indigo-200 font-semibold">{t.auth_login_required}</p>
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center rounded-lg bg-indigo-600 text-white font-bold"
                >
                  {t.auth_login} / {t.auth_register}
                </Link>
              </div>
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{link.name}</span>
                </div>
                {!isAuthenticated && (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
