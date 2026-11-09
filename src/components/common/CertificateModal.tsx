"use client";

import React from "react";
import { Award, X, Printer, ShieldCheck, Download } from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  courseTitleKm: string;
  issueDate?: string;
  certId?: string;
}

export function CertificateModal({
  isOpen,
  onClose,
  studentName,
  courseTitle,
  courseTitleKm,
  issueDate = "November 9, 2026",
  certId = "LK-2026-CERT-9482",
}: CertificateModalProps) {
  const { language } = useApp();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Course Completion Certificate
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Styled for printing and viewing) */}
        <div className="mt-4 p-8 sm:p-12 border-8 border-double border-indigo-200 dark:border-indigo-900/60 rounded-xl bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-center relative overflow-hidden">
          {/* Watermark badge */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
            <Award className="w-80 h-80 text-indigo-900 dark:text-white" />
          </div>

          {/* Platform Seal */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/20 mb-4">
            LK
          </div>

          <h2 className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400">
            LingoKhmer Educational Academy
          </h2>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
            Certificate of Course Completion
          </h1>
          <p className="text-xs text-slate-500 font-khmer mt-1">
            វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សារបស់វេទិកា
          </p>

          <p className="mt-6 text-xs text-slate-500 uppercase tracking-wider">
            This is proudly awarded to
          </p>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 underline decoration-indigo-300 underline-offset-8">
            {studentName}
          </div>

          <p className="mt-6 text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            for successfully completing the comprehensive learning curriculum and verified practice examinations for:
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
            {courseTitle}
          </p>
          <p className="text-xs text-slate-500 font-khmer">
            {courseTitleKm}
          </p>

          {/* Signatures & Verification Row */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                LingoKhmer Academic Board
              </p>
              <p className="text-[11px]">Director of Language Curriculum</p>
              <p className="text-[10px] text-slate-400 mt-1">Date: {issueDate}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Verification ID: {certId}
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Authenticated Online
              </p>
            </div>
          </div>

          {/* Prominent Official Disclaimer Box */}
          <div className="mt-6 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[10px] text-amber-800 dark:text-amber-300 font-medium">
            ⚠️ OFFICIAL NOTICE: This document is an internal institutional course completion certificate issued by LingoKhmer Academy. It does NOT constitute or claim to replace an official standardized examination certificate issued by Chinese Testing International (CTI/HSK), British Council, IDP, ETS, or Cambridge Assessment English.
          </div>
        </div>
      </div>
    </div>
  );
}

