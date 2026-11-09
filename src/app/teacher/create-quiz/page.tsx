"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PlusCircle,
  CheckCircle2,
  Trash2,
  HelpCircle,
  Upload,
  Volume2,
  Save
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { AuthGuard } from "@/components/common/AuthGuard";

export default function CreateQuizPage() {
  const { t, language } = useApp();

  const [quizTitle, setQuizTitle] = useState("");
  const [examCategory, setExamCategory] = useState("HSK");
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [promptKm, setPromptKm] = useState("");
  const [explanationKm, setExplanationKm] = useState("");
  const [points, setPoints] = useState("1");
  const [options, setOptions] = useState([
    { id: "A", text: "", isCorrect: true },
    { id: "B", text: "", isCorrect: false },
    { id: "C", text: "", isCorrect: false },
    { id: "D", text: "", isCorrect: false },
  ]);
  const [createdNotice, setCreatedNotice] = useState(false);

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedNotice(true);
    setTimeout(() => setCreatedNotice(false), 2500);
    // Reset form
    setQuestionPrompt("");
    setPromptKm("");
    setExplanationKm("");
  };

  return (
    <AuthGuard allowedRoles={["teacher", "admin"]} requiredFeatureTitle="Quiz & Exam Builder" requiredFeatureTitleKm="កម្មវិធីបង្កើតកម្រងសំណួរ">
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/teacher"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Dashboard</span>
        </Link>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
          Question & Exam Creator
        </span>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Create Standardized Question Set
          </h2>
          <p className="text-xs text-slate-500 font-khmer mt-0.5">
            បញ្ចូលសំណួរថ្មីសម្រាប់ប្រព័ន្ធប្រឡង HSK, IELTS, TOEFL ឬ TOEIC រួមទាំងការពន្យល់ជាភាសាខ្មែរ។
          </p>
        </div>

        <form onSubmit={handleSaveQuestion} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Examination Target:
              </label>
              <select
                value={examCategory}
                onChange={(e) => setExamCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="HSK">HSK Chinese (HSK 1–6)</option>
                <option value="IELTS_AC">IELTS Academic</option>
                <option value="IELTS_GT">IELTS General Training</option>
                <option value="TOEFL_IBT">TOEFL iBT</option>
                <option value="TOEIC">TOEIC Listening & Reading</option>
                <option value="CAMBRIDGE">Cambridge English</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Points Awarded:
              </label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                min="1"
                max="50"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Primary Question Prompt (English or Chinese):
            </label>
            <textarea
              value={questionPrompt}
              onChange={(e) => setQuestionPrompt(e.target.value)}
              placeholder="e.g. Choose the word that best completes the sentence..."
              rows={2}
              required
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>

          {/* Khmer Prompt Translation */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Khmer Prompt Guidance (សំណួរជាភាសាខ្មែរ):
            </label>
            <input
              type="text"
              value={promptKm}
              onChange={(e) => setPromptKm(e.target.value)}
              placeholder="ឧទាហរណ៍៖ ចូរជ្រើសរើសចម្លើយដែលបំពេញប្រយោគបានត្រឹមត្រូវ..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-khmer"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Multiple Choice Answer Options:
            </label>
            {options.map((opt, idx) => (
              <div key={opt.id} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                  {opt.id}
                </span>
                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setOptions((prev) =>
                      prev.map((o, i) => (i === idx ? { ...o, text: newText } : o))
                    );
                  }}
                  placeholder={`Option ${opt.id} text...`}
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    setOptions((prev) =>
                      prev.map((o, i) => ({ ...o, isCorrect: i === idx }))
                    );
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    opt.isCorrect
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {opt.isCorrect ? "✓ Correct Key" : "Mark Correct"}
                </button>
              </div>
            ))}
          </div>

          {/* Khmer Explanation for Diagnostic Feedback */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Khmer Explanation of Correct Answer (ការពន្យល់ជាភាសាខ្មែរ):
            </label>
            <textarea
              value={explanationKm}
              onChange={(e) => setExplanationKm(e.target.value)}
              placeholder="ពន្យល់ពីមូលហេតុដែលចម្លើយនេះត្រឹមត្រូវ និងច្បាប់វេយ្យាករណ៍ពាក់ព័ន្ធ..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-khmer"
            />
          </div>

          {createdNotice && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Question successfully added to question bank!</span>
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Question to Bank</span>
          </button>
        </form>
      </div>
    </div>
    </AuthGuard>
  );
}

