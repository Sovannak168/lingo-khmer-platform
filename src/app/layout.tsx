import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/i18n/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LingoKhmer | Professional Chinese & English Exam Preparation Platform",
  description:
    "Empowering Cambodian students to master Chinese (HSK 1-6) and English (IELTS, TOEFL, TOEIC, Cambridge) with Khmer explanations, realistic mock exams, and AI tutoring.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

