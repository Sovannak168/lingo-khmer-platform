"use client";

import React, { useState, useRef, useEffect } from "react";
import { PenTool, RotateCcw, Eye, Sparkles, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HanziStrokeViewerProps {
  hanzi: string;
  pinyin: string;
  meaningKm: string;
  meaningEn: string;
  strokeCount: number;
  radicals?: string;
  className?: string;
}

export function HanziStrokeViewer({
  hanzi,
  pinyin,
  meaningKm,
  meaningEn,
  strokeCount,
  radicals,
  className,
}: HanziStrokeViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    drawGrid();
  }, [showGuide, hanzi]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines (米字格 Mizige)
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Diagonal lines
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();

    ctx.setLineDash([]); // Reset dash

    // Draw guide character in faint red/gray if enabled
    if (showGuide) {
      ctx.font = "bold 130px 'Noto Sans SC', 'KaiTi', sans-serif";
      ctx.fillStyle = "rgba(239, 68, 68, 0.18)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(hanzi[0] || "", width / 2, height / 2 + 10);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1e293b";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    drawGrid();
    setHasDrawn(false);
  };

  const speakHanzi = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(hanzi);
      u.lang = "zh-CN";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-chinese">
              {hanzi}
            </span>
            <button
              onClick={speakHanzi}
              className="p-1.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
              title="Listen Pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mt-0.5">
            {pinyin}
          </p>
        </div>

        <div className="text-right text-xs space-y-1">
          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            {strokeCount} គំនូស (Strokes)
          </span>
          {radicals && (
            <p className="text-slate-500 dark:text-slate-400">
              ឫសពាក្យ (Radical): <span className="font-bold text-slate-700 dark:text-slate-300">{radicals}</span>
            </p>
          )}
        </div>
      </div>

      {/* Translations */}
      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 border border-slate-100 dark:border-slate-700/60">
        <p className="text-slate-900 dark:text-white font-medium">
          🇰🇭 ខ្មែរ៖ <span className="font-semibold text-blue-600 dark:text-blue-400">{meaningKm}</span>
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          🇬🇧 English: {meaningEn}
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="flex flex-col items-center space-y-2">
        <div className="relative border-2 border-red-200 dark:border-red-900/60 rounded-xl overflow-hidden bg-white shadow-inner">
          <canvas
            ref={canvasRef}
            width={220}
            height={220}
            className="cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <p className="text-[11px] text-slate-400">
          Trace with mouse or touch along the stroke guide grid
        </p>
      </div>

      {/* Canvas Toolbar */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className={cn(
            "text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border",
            showGuide
              ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-300 font-medium"
              : "text-slate-600 border-slate-200 dark:text-slate-400 dark:border-slate-700"
          )}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showGuide ? "Hide Guide" : "Show Stroke Guide"}</span>
        </button>

        <button
          onClick={clearCanvas}
          className="text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Canvas</span>
        </button>
      </div>
    </div>
  );
}

