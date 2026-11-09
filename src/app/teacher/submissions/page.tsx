"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PenTool,
  Mic,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Volume2,
  User
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { AudioPlayer } from "@/components/common/AudioPlayer";
import { cn } from "@/lib/utils";

interface SubmissionItem {
  id: string;
  studentName: string;
  studentNameKm: string;
  type: "writing" | "speaking";
  title: string;
  prompt: string;
  submittedContent: string;
  audioUrl?: string;
  submittedAt: string;
  aiSuggestedScore: string;
  status: "pending" | "graded";
  teacherScore?: string;
  teacherNotes?: string;
}

export default function TeacherSubmissionsPage() {
  const { t, language } = useApp();

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([
    {
      id: "sub-1",
      studentName: "Vannak Roth",
      studentNameKm: "រ័ត្ន វណ្ណៈ",
      type: "writing",
      title: "IELTS Academic Writing Task 2 (AI in Education)",
      prompt: "Some people believe that rapid AI development will benefit education, while others argue it will diminish critical thinking. Discuss both views.",
      submittedContent: `Artificial intelligence has undeniably revolutionized pedagogical practices across the globe. Proponents rightly argue that AI adaptive platforms can tailor learning materials to individual student paces, thereby fostering greater academic outcomes. For instance, intelligent tutoring systems in Cambodia can explain complex grammar in Khmer. Conversely, critics caution that excessive reliance on automated problem-solving might impair independent analytical faculties. In conclusion, while AI provides immense utility, educational institutions must ensure students retain rigorous critical inquiry.`,
      submittedAt: "Today, 10:45 AM",
      aiSuggestedScore: "Band 7.0",
      status: "pending",
    },
    {
      id: "sub-2",
      studentName: "Chanthou Seng",
      studentNameKm: "សេង ច័ន្ទធូ",
      type: "speaking",
      title: "IELTS Speaking Part 2: Cultural Festival in Cambodia",
      prompt: "Describe an international event or cultural festival that you attended or learned about.",
      submittedContent: `I would like to talk about the Water Festival (Bon Om Touk) in Phnom Penh. It is celebrated annually to mark the reversal of the Tonle Sap river flow...`,
      audioUrl: "https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3",
      submittedAt: "Yesterday, 4:20 PM",
      aiSuggestedScore: "Band 7.5 (Fluency 7.5, Pronunciation 8.0)",
      status: "pending",
    },
    {
      id: "sub-3",
      studentName: "Bopha Pich",
      studentNameKm: "ពេជ្រ បុប្ផា",
      type: "writing",
      title: "HSK 3 Chinese Short Composition",
      prompt: "写一篇短文介绍你最好的朋友 (Write a short essay introducing your best friend).",
      submittedContent: `我的好朋友叫小丽。她是柬埔寨人。我们在学校一起学习汉语。小丽比我高一点儿，她学习非常努力。我们经常去图书馆看书。我很高兴有这样的好朋友。`,
      submittedAt: "2 days ago",
      aiSuggestedScore: "95 / 100 (Accurate grammar & comparison)",
      status: "pending",
    },
  ]);

  const [selectedSubId, setSelectedSubId] = useState<string>("sub-1");
  const [scoreInput, setScoreInput] = useState("Band 7.0");
  const [notesInput, setNotesInput] = useState("");
  const [successNotice, setSuccessNotice] = useState(false);

  const selectedSub = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const handleSaveGrade = () => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSub.id
          ? { ...s, status: "graded", teacherScore: scoreInput, teacherNotes: notesInput }
          : s
      )
    );
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/teacher"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Dashboard</span>
        </Link>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
          Instructor Submission Grading Desk
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Submission Queue list */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Submission Queue ({submissions.filter((s) => s.status === "pending").length} Pending)
          </h3>

          <div className="space-y-2">
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubId(sub.id);
                  setScoreInput(sub.teacherScore || sub.aiSuggestedScore.split(" ")[0]);
                  setNotesInput(sub.teacherNotes || "");
                }}
                className={cn(
                  "w-full text-left p-3.5 rounded-2xl border transition-all space-y-1.5",
                  selectedSub.id === sub.id
                    ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40"
                    : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {sub.type === "writing" ? (
                      <PenTool className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <Mic className="w-3.5 h-3.5 text-purple-600" />
                    )}
                    {language === "km" ? sub.studentNameKm : sub.studentName}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      sub.status === "graded"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    )}
                  >
                    {sub.status === "graded" ? "Graded" : "Needs Review"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                  {sub.title}
                </p>
                <p className="text-[10px] text-slate-400">{sub.submittedAt}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Submission Detail & Teacher Feedback input */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600">
                  {selectedSub.type.toUpperCase()} SUBMISSION
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedSub.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Student: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSub.studentName}</span> ({selectedSub.submittedAt})
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  AI Pre-Evaluation
                </span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {selectedSub.aiSuggestedScore}
                </span>
              </div>
            </div>

            {/* Prompt details */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Prompt:</span>
              <p className="text-slate-600 dark:text-slate-400 italic">{selectedSub.prompt}</p>
            </div>

            {/* Audio player if speaking */}
            {selectedSub.audioUrl && (
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 space-y-2">
                <p className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-purple-600" />
                  Student Audio Recording Playback:
                </p>
                <AudioPlayer src={selectedSub.audioUrl} title="Student Oral Monologue" />
              </div>
            )}

            {/* Submitted text */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {selectedSub.type === "writing" ? "Student Essay:" : "Transcript:"}
              </span>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-sans border border-slate-200 dark:border-slate-700">
                {selectedSub.submittedContent}
              </div>
            </div>

            {/* Teacher Grading & Feedback Form */}
            <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
              <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-indigo-600" />
                Teacher Grading & Actionable Student Feedback
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Assigned Final Score:
                  </label>
                  <input
                    type="text"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    placeholder="e.g. Band 7.5 or 92/100"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Teacher Feedback & Grammar Comments (Sent directly to student):
                </label>
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Provide praise on strong points, explain specific grammatical or tonal areas needing revision, and suggest next steps..."
                  rows={4}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {successNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Grade and feedback published successfully to student!</span>
                </div>
              )}

              <button
                onClick={handleSaveGrade}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save & Deliver Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

