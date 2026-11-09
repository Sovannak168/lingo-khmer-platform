export type UserRole = "student" | "teacher" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  nameKm?: string;
  email: string;
  role: UserRole;
  avatar: string;
  city: string;
  currentLevelZh: string;
  currentLevelEn: string;
  streakDays: number;
  totalHours: number;
  vocabLearned: number;
  completedLessons: number;
  totalXp: number;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  city?: string;
}

