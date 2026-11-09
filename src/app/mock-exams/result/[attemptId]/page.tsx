"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Printer,
  RotateCcw,
  Bot,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  BarChart3
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { MOCK_EXAMS_DATABASE, MockExam } from "@/lib/mock-data/exam-data";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

export default function ExamResultReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const attemptId = params?.attemptId as string;
  const examId = searchParams.get("examId") || "exam-ielts-ac-1";

  const { t, language } = useApp();

  const exam: MockExam =
    MOCK_EXAMS_DATABASE.find((e) => e.id === examId) || MOCK_EXAMS_DATABASE[0];

  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`exam_attempt_${attemptId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.answers) {
            setStudentAnswers(parsed.answers);
          }
        } catch {
          // ignore
        }
      }
    }
  }, [attemptId]);

  // Evaluate performance
  const allQuestions = exam.sections.flatMap((s) => s.questions);

  let totalScore = 0;
  let earnedScore = 0;
  const detailedBreakdown = allQuestions.map((q) => {
    totalScore += q.points;
    const studentAns = studentAnswers[q.id];
    let isCorrect = false;

    if (q.type === "multiple_choice" || q.type === "audio_choice" || q.type === "true_false") {
      isCorrect = studentAns === q.correctAnswer;
    } else if (q.type === "fill_blank" || q.type === "sentence_ordering") {
      isCorrect = Boolean(
        studentAns &&
        q.correctAnswer &&
        studentAns.trim().toLowerCase() === (q.correctAnswer as string).trim().toLowerCase()
      );
    } else {
      // Essay or Speaking: assigned estimated passing credit in mock simulation
      isCorrect = Boolean(studentAns);
    }

    if (isCorrect) {
      earnedScore += q.points;
    }

    return {
      question: q,
      studentAnswer: studentAns || "(No answer)",
      isCorrect,
    };
  });

  const percentage = Math.round((earnedScore / (totalScore || 1)) * 100);

  // Scaled Score Calculation
  let estimatedBand = "HSK Passed (180/200)";
  if (exam.examType.startsWith("IELTS")) {
    if (percentage >= 85) estimatedBand = "IELTS Band 7.5 (Good User)";
    else if (percentage >= 70) estimatedBand = "IELTS Band 6.5 (Competent User)";
    else if (percentage >= 55) estimatedBand = "IELTS Band 5.5 (Modest User)";
    else estimatedBand = "IELTS Band 4.5 (Borderline)";
  } else if (exam.examType === "TOEIC") {
    estimatedBand = `${Math.round((percentage / 100) * 990)} / 990 (TOEIC Working Proficiency)`;
  } else if (exam.examType === "HSK") {
    estimatedBand = `${Math.round((percentage / 100) * 200)} / 200 (HSK Level Qualified)`;
  }

  return (
    <AuthGuard requiredFeatureTitle="Standardized Exam Diagnostic Report" requiredFeatureTitleKm="របាយការណ៍លទ្ធផលប្រឡងផ្លូវការ">
    <div className="space-y-8 pb-16">
      <DisclaimerBanner />

      {/* Score Header Card */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Standardized Practice Examination Diagnostic Report</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold">
              {language === "km" ? exam.titleKm : exam.title}
            </h1>
            <p className="text-xs text-blue-100 mt-1">
              Attempt Reference ID: <span className="font-mono font-bold">{attemptId}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs backdrop-blur-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
            <Link
              href={`/mock-exams/${exam.id}`}
              className="px-4 py-2 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 transition-colors shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </Link>
          </div>
        </div>

        {/* Scaled Band Highlight Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
          <div>
            <p className="text-xs uppercase font-bold text-blue-200">Raw Points</p>
            <p className="text-3xl font-extrabold mt-1">
              {earnedScore} / {totalScore}
            </p>
            <p className="text-[11px] text-blue-200 mt-0.5">{percentage}% Accuracy</p>
          </div>

          <div className="sm:border-x sm:border-white/20">
            <p className="text-xs uppercase font-bold text-amber-300">{t.estimated_band}</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
              {estimatedBand}
            </p>
            <p className="text-[11px] text-blue-200 mt-0.5">Estimated Practice Score</p>
          </div>

          <div>
            <p className="text-xs uppercase font-bold text-blue-200">Outcome Status</p>
            <p className="text-2xl font-bold mt-1 text-emerald-300 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-6 h-6" />
              {percentage >= 60 ? "Ready for Official Exam" : "Revision Needed"}
            </p>
            <p className="text-[11px] text-blue-200 mt-0.5">Passing benchmark: 60%</p>
          </div>
        </div>
      </div>

      {/* Section by Section Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {exam.sections.map((sec) => (
          <div
            key={sec.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
          >
            <span className="text-[10px] font-bold uppercase text-slate-400">
              Skill Section
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white capitalize">
              {sec.type} Comprehension
            </h4>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${Math.min(100, percentage + 5)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Performance: <span className="font-bold text-slate-800 dark:text-slate-200">High Competency</span>
            </p>
          </div>
        ))}
      </div>

      {/* Question-by-Question Detailed Review with Khmer Explanations */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Itemized Question Analysis & Answer Key
            </h3>
            <p className="text-xs text-slate-500 font-khmer">
              ពិនិត្យមើលចម្លើយលម្អិត រួមជាមួយការពន្យល់ជាភាសាខ្មែរ និងអង់គ្លេស។
            </p>
          </div>
          <Link
            href="/ai-tutor"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold text-xs border border-purple-200 dark:border-purple-800 hover:bg-purple-100"
          >
            <Bot className="w-4 h-4 text-purple-600" />
            <span>Ask AI Tutor to Explain Mistakes</span>
          </Link>
        </div>

        <div className="space-y-4">
          {detailedBreakdown.map((item, idx) => (
            <div
              key={item.question.id}
              className={cn(
                "p-5 rounded-2xl border transition-colors space-y-3",
                item.isCorrect
                  ? "bg-emerald-50/30 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40"
                  : "bg-rose-50/30 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                      item.isCorrect ? "bg-emerald-600" : "bg-rose-600"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.question.prompt}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                    item.isCorrect
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300"
                  )}
                >
                  {item.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{item.question.points})
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Incorrect (0/{item.question.points})
                    </>
                  )}
                </span>
              </div>

              {item.question.promptKm && (
                <p className="text-xs text-slate-500 font-khmer pl-8">
                  {item.question.promptKm}
                </p>
              )}

              {/* Answers comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Your Submitted Answer:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 font-mono">
                    {item.studentAnswer}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Expected Correct Answer:</span>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 font-mono">
                    {Array.isArray(item.question.correctAnswer)
                      ? item.question.correctAnswer.join(" / ")
                      : item.question.correctAnswer || "Evaluated by Rubric Criteria"}
                  </p>
                </div>
              </div>

              {/* Educational Explanation in Khmer */}
              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-1 pl-8">
                <p className="font-semibold text-slate-900 dark:text-white font-khmer">
                  💡 ការពន្យល់ (Khmer Explanation): {item.question.explanationKm}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  🇬🇧 English: {item.question.explanationEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
