"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "./translations";
import { AuthUser, LoginCredentials, RegisterPayload, UserRole } from "@/lib/auth/types";

export type TargetLanguage = "zh" | "en";
export type Theme = "light" | "dark";

export const DEFAULT_USERS: (AuthUser & { passwordHash: string })[] = [
  {
    id: "usr-student-01",
    name: "Vannak Roth",
    nameKm: "រ័ត្ន វណ្ណៈ",
    email: "student@lingo.edu.kh",
    passwordHash: "Student@123",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    city: "Phnom Penh",
    currentLevelZh: "HSK 2",
    currentLevelEn: "IELTS 6.0",
    streakDays: 14,
    totalHours: 48.5,
    vocabLearned: 435,
    completedLessons: 42,
    totalXp: 3820,
    createdAt: "2026-09-01T08:00:00Z",
  },
  {
    id: "usr-teacher-01",
    name: "Dr. Sokha Meng",
    nameKm: "បណ្ឌិត ម៉េង សុខា",
    email: "teacher@lingo.edu.kh",
    passwordHash: "Teacher@123",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    city: "Phnom Penh",
    currentLevelZh: "Senior HSK Instructor",
    currentLevelEn: "IELTS Lead Examiner",
    streakDays: 45,
    totalHours: 180.0,
    vocabLearned: 2500,
    completedLessons: 120,
    totalXp: 15400,
    createdAt: "2026-05-15T08:00:00Z",
  },
  {
    id: "usr-admin-01",
    name: "System Administrator",
    nameKm: "អ្នកគ្រប់គ្រងជាន់ខ្ពស់",
    email: "admin@lingo.edu.kh",
    passwordHash: "Admin@123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    city: "Phnom Penh",
    currentLevelZh: "Administrator",
    currentLevelEn: "Administrator",
    streakDays: 60,
    totalHours: 320.0,
    vocabLearned: 5000,
    completedLessons: 200,
    totalXp: 28900,
    createdAt: "2026-01-01T08:00:00Z",
  },
];

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  // Auth state & operations
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  register: (payload: RegisterPayload) => { success: boolean; error?: string };
  logout: () => void;
  quickDemoLogin: (role: UserRole) => void;
  currentRole: UserRole;
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
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>("zh");
  const [theme, setTheme] = useState<Theme>("light");
  const [streak, setStreak] = useState<number>(14);
  const [totalXp, setTotalXp] = useState<number>(2450);

  // Initialize stored users and session
  useEffect(() => {
    // 1. Load language preference
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "km")) {
      setLanguageState(savedLang);
    }

    // 2. Load theme
    const savedTheme = localStorage.getItem("app_theme") as Theme;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // 3. Initialize custom registered users list in localStorage if absent
    const storedUsers = localStorage.getItem("lingo_users_db");
    if (!storedUsers) {
      localStorage.setItem("lingo_users_db", JSON.stringify(DEFAULT_USERS));
    }

    // 4. Load persisted session user
    const sessionUser = localStorage.getItem("lingo_session_user");
    if (sessionUser) {
      try {
        const parsed = JSON.parse(sessionUser) as AuthUser;
        setCurrentUser(parsed);
        setStreak(parsed.streakDays || 14);
        setTotalXp(parsed.totalXp || 2450);
      } catch {
        localStorage.removeItem("lingo_session_user");
      }
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
    setTotalXp((prev) => {
      const next = prev + amount;
      if (currentUser) {
        const updatedUser = { ...currentUser, totalXp: next };
        setCurrentUser(updatedUser);
        localStorage.setItem("lingo_session_user", JSON.stringify(updatedUser));
      }
      return next;
    });
  };

  // Login handler
  const login = ({ email, password }: LoginCredentials): { success: boolean; error?: string } => {
    const stored = localStorage.getItem("lingo_users_db");
    const users: (AuthUser & { passwordHash: string })[] = stored ? JSON.parse(stored) : DEFAULT_USERS;

    const trimmedEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!found) {
      return {
        success: false,
        error: language === "km" ? "រកមិនឃើញគណនីអ៊ីមែលនេះឡើយ។ សូមពិនិត្យឡើងវិញ ឬចុះឈ្មោះថ្មី។" : "Account with this email does not exist. Please check or register.",
      };
    }

    if (found.passwordHash !== password) {
      return {
        success: false,
        error: language === "km" ? "ពាក្យសម្ងាត់មិនត្រឹមត្រូវឡើយ។ សូមព្យាយាមម្តងទៀត។" : "Incorrect password. Please verify and try again.",
      };
    }

    // Auth succeeded: persist session
    const { passwordHash, ...userClean } = found;
    setCurrentUser(userClean);
    setStreak(userClean.streakDays);
    setTotalXp(userClean.totalXp);
    localStorage.setItem("lingo_session_user", JSON.stringify(userClean));

    return { success: true };
  };

  // Register handler
  const register = ({ name, email, password, role, city = "Phnom Penh" }: RegisterPayload): { success: boolean; error?: string } => {
    const stored = localStorage.getItem("lingo_users_db");
    const users: (AuthUser & { passwordHash: string })[] = stored ? JSON.parse(stored) : DEFAULT_USERS;

    const trimmedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return {
        success: false,
        error: language === "km" ? "អ៊ីមែលនេះមានគណនីរួចហើយ។ សូមចូលគណនី (Sign In)។" : "An account with this email already exists. Please sign in.",
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        error: language === "km" ? "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។" : "Password must be at least 6 characters.",
      };
    }

    const newUser: AuthUser & { passwordHash: string } = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      passwordHash: password,
      role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      city,
      currentLevelZh: "HSK 1",
      currentLevelEn: "Beginner",
      streakDays: 1,
      totalHours: 0.5,
      vocabLearned: 5,
      completedLessons: 1,
      totalXp: 50,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("lingo_users_db", JSON.stringify(users));

    // Sign in automatically
    const { passwordHash, ...cleanUser } = newUser;
    setCurrentUser(cleanUser);
    setStreak(cleanUser.streakDays);
    setTotalXp(cleanUser.totalXp);
    localStorage.setItem("lingo_session_user", JSON.stringify(cleanUser));

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("lingo_session_user");
  };

  const quickDemoLogin = (role: UserRole) => {
    const target = DEFAULT_USERS.find((u) => u.role === role) || DEFAULT_USERS[0];
    const { passwordHash, ...userClean } = target;
    setCurrentUser(userClean);
    setStreak(userClean.streakDays);
    setTotalXp(userClean.totalXp);
    localStorage.setItem("lingo_session_user", JSON.stringify(userClean));
  };

  const currentRole: UserRole = currentUser ? currentUser.role : "student";

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        quickDemoLogin,
        currentRole,
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
