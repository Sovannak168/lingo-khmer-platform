"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Save,
  Volume2,
  Mic,
  PenTool,
  Send,
  X
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { MOCK_EXAMS_DATABASE, MockExam, ExamQuestion } from "@/lib/mock-data/exam-data";
import { AudioPlayer } from "@/components/common/AudioPlayer";
import { VoiceRecorder } from "@/components/common/VoiceRecorder";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn, formatTime } from "@/lib/utils";

export default function ExamEngineRoomPage() {
  const params = useParams();
  const router = useRouter();
  const examId = (params?.examId as string) || "exam-ielts-ac-1";

  const { t, language, incrementXp } = useApp();

  const exam: MockExam =
    MOCK_EXAMS_DATABASE.find((e) => e.id === examId) || MOCK_EXAMS_DATABASE[0];

  // Flatten all questions across sections with their section info
  const allQuestions = exam.sections.flatMap((section) =>
    section.questions.map((q) => ({
      ...q,
      sectionTitle: section.title,
      sectionTitleKm: section.titleKm,
      sectionType: section.type,
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(exam.totalDurationMinutes * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [autoSaveNotice, setAutoSaveNotice] = useState(false);

  const currentQ = allQuestions[currentIndex] || allQuestions[0];

  // Real-time countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectAnswer = (questionId: string, answerValue: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: answerValue };
      // Simulate auto-save feedback
      setAutoSaveNotice(true);
      setTimeout(() => setAutoSaveNotice(false), 1000);
      return updated;
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmitExam = () => {
    setIsSubmitModalOpen(false);
    incrementXp(150);

    // Save attempt answers to localStorage for report generator
    const attemptId = `att-${Date.now()}`;
    const payload = {
      attemptId,
      examId: exam.id,
      examTitle: exam.title,
      examTitleKm: exam.titleKm,
      examType: exam.examType,
      answers,
      submittedAt: new Date().toISOString(),
      timeSpent: exam.totalDurationMinutes * 60 - timeRemaining,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(`exam_attempt_${attemptId}`, JSON.stringify(payload));
    }

    router.push(`/mock-exams/result/${attemptId}?examId=${exam.id}`);
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  return (
    <AuthGuard requiredFeatureTitle="Timed Examination Engine" requiredFeatureTitleKm="បន្ទប់ប្រឡងសាកល្បងជាក់ស្តែង">
    <div className="space-y-6 pb-16">
      {/* Top Test Control Header */}
      <div className="sticky top-16 z-30 flex items-center justify-between p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/mock-exams"
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            title="Exit Exam"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
              {language === "km" ? exam.titleKm : exam.title}
            </h2>
            <p className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>Section: {currentQ?.sectionTitle}</span>
              {autoSaveNotice && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 animate-pulse">
                  <Save className="w-3 h-3" /> Auto-saved
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Real-time countdown timer */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold flex items-center gap-1.5 shadow-xs",
              timeRemaining < 300
                ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse"
                : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            )}
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </div>

      {/* Main Testing Area: 2 Columns (Question Workspace + Navigation Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Columns: Active Question Card */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Question Meta Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {t.question_of} {currentIndex + 1} / {allQuestions.length}
                </span>
                <span className="text-xs text-slate-500 capitalize">
                  Type: {currentQ.type.replace("_", " ")} ({currentQ.points} pt)
                </span>
              </div>

              {/* Mark for review toggle */}
              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border",
                  flagged[currentQ.id]
                    ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300"
                    : "border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <Flag className={cn("w-3.5 h-3.5", flagged[currentQ.id] ? "fill-amber-500 text-amber-500" : "")} />
                <span>{flagged[currentQ.id] ? "Flagged for Review" : "Mark for Review"}</span>
              </button>
            </div>

            {/* Audio question player if audio is attached */}
            {currentQ.audioUrl && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <p className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  Section Audio Recording (Click to listen once):
                </p>
                <AudioPlayer src={currentQ.audioUrl} title="Examination Listening Excerpt" />
              </div>
            )}

            {/* Question Prompt */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.prompt}
              </h3>
              {currentQ.promptKm && (
                <p className="text-xs text-slate-600 dark:text-slate-300 font-khmer leading-relaxed">
                  {currentQ.promptKm}
                </p>
              )}
            </div>

            {/* Interactive Inputs according to Question Type */}
            {/* 1. Multiple Choice & Audio Choice & True/False */}
            {(currentQ.type === "multiple_choice" ||
              currentQ.type === "audio_choice" ||
              currentQ.type === "true_false") &&
              currentQ.options && (
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt) => {
                    const isSelected = answers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectAnswer(currentQ.id, opt.id)}
                        className={cn(
                          "w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                          isSelected
                            ? "border-blue-600 bg-blue-50/80 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200 shadow-xs font-semibold"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs uppercase",
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                            )}
                          >
                            {opt.id.slice(0, 2).replace("-", "")}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

            {/* 2. Fill in the Blank / Short Answer */}
            {(currentQ.type === "fill_blank" || currentQ.type === "short_answer") && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
                  placeholder="Type your exact response here..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            )}

            {/* 3. Essay Writing Task */}
            {currentQ.type === "essay" && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Essay Response Editor:
                  </span>
                  <span>
                    Word Count:{" "}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {answers[currentQ.id]?.trim()
                        ? answers[currentQ.id].trim().split(/\s+/).length
                        : 0}
                    </span>
                  </span>
                </div>
                <textarea
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
                  placeholder="Draft your essay here. Structure your arguments with introduction, body paragraphs, and conclusion..."
                  rows={10}
                  className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
                />
              </div>
            )}

            {/* 4. Speaking Recording Task */}
            {currentQ.type === "speaking_record" && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-500">
                  Record your oral monologue. The exam engine will capture your audio and evaluate articulation, fluency, and tone:
                </p>
                <VoiceRecorder
                  language={exam.language}
                  onRecordingComplete={(audioUrl, transcript) => {
                    handleSelectAnswer(currentQ.id, transcript || "Audio recording submitted");
                  }}
                />
              </div>
            )}

            {/* 5. Sentence Ordering */}
            {currentQ.type === "sentence_ordering" && currentQ.orderItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-500">
                  Arrange the Chinese phrase tiles in correct grammatical order:
                </p>
                <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {currentQ.orderItems.map((word, wIdx) => (
                    <button
                      key={wIdx}
                      onClick={() => {
                        const currentVal = answers[currentQ.id] || "";
                        handleSelectAnswer(currentQ.id, currentVal ? `${currentVal}${word}` : word);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-chinese text-sm font-bold hover:bg-red-50 hover:border-red-300 transition-colors shadow-xs"
                    >
                      {word}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono">
                    Constructed: <span className="font-bold text-red-600 font-chinese text-sm">{answers[currentQ.id] || "(None)"}</span>
                  </p>
                  <button
                    onClick={() => handleSelectAnswer(currentQ.id, "")}
                    className="text-[11px] text-slate-500 underline hover:text-slate-900"
                  >
                    Clear constructed order
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Nav Controls (Prev / Next) */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.previous}</span>
              </button>

              <button
                onClick={() =>
                  setCurrentIndex((prev) => Math.min(allQuestions.length - 1, prev + 1))
                }
                disabled={currentIndex === allQuestions.length - 1}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Question Navigation Grid (Section 8 Requirement) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Question Navigator
            </h4>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600" /> Answered ({answeredCount})
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" /> Flagged ({flaggedCount})
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border border-slate-300 dark:border-slate-600" /> Unanswered ({allQuestions.length - answeredCount})
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded ring-2 ring-blue-500" /> Current
              </div>
            </div>

            {/* Number Tiles */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {allQuestions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isFlagged = !!flagged[q.id];
                const isCurrent = currentIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "h-9 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center",
                      isCurrent ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900" : "",
                      isAnswered
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200",
                      isFlagged ? "border-2 border-amber-500" : ""
                    )}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Finish & View Score</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Practice Examination?
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-bold">{allQuestions.length}</span>
              </div>
              <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold">
                <span>Answered:</span>
                <span>{answeredCount}</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400 font-semibold">
                <span>Flagged for Review:</span>
                <span>{flaggedCount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Unanswered:</span>
                <span>{allQuestions.length - answeredCount}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-khmer">
              {language === "km"
                ? "តើអ្នកប្រាកដជាចង់បញ្ចប់ការប្រឡងសាកល្បងនេះមែនទេ? ប្រព័ន្ធនឹងកែពិន្ទុភ្លាមៗ និងបង្ហាញរបាយការណ៍វិភាគសមត្ថភាពលម្អិត។"
                : "Are you sure you want to finalize and submit? Objective questions will be auto-graded immediately."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Keep Reviewing
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AuthGuard>
  );
}

