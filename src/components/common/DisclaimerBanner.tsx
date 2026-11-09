"use client";

import React from "react";
import { AlertTriangle, Info } from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  const { t } = useApp();

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-medium">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>{t.disclaimer_desc}</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-4 shadow-sm">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            {t.disclaimer_title}
          </h4>
          <p className="mt-1 text-xs text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
            {t.disclaimer_desc}
          </p>
        </div>
      </div>
    </div>
  );
}

