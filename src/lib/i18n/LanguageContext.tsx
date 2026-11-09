"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "./translations";

export type UserRole = "student" | "teacher" | "admin";
export type TargetLanguage = "zh" | "en";
export type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  targetLanguage: TargetLanguage;
  setTargetLanguage: (lang: TargetLanguage) => void;
  theme: Theme;
  toggleTheme: () => void;
  // User progress persistence
  streak: number;
  totalXp: number;
  incrementXp: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("km");
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>("zh");
  const [theme, setTheme] = useState<Theme>("light");
  const [streak, setStreak] = useState<number>(14);
  const [totalXp, setTotalXp] = useState<number>(2450);

  useEffect(() => {
    // Load persisted preferences
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "km")) {
      setLanguageState(savedLang);
    }
    const savedTheme = localStorage.getItem("app_theme") as Theme;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    const savedRole = localStorage.getItem("current_role") as UserRole;
    if (savedRole && ["student", "teacher", "admin"].includes(savedRole)) {
      setCurrentRole(savedRole);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_lang", lang);
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app_theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const incrementXp = (amount: number) => {
    setTotalXp((prev) => prev + amount);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        currentRole,
        setCurrentRole: (role) => {
          setCurrentRole(role);
          localStorage.setItem("current_role", role);
        },
        targetLanguage,
        setTargetLanguage,
        theme,
        toggleTheme,
        streak,
        totalXp,
        incrementXp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

