"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src?: string;
  textToSpeak?: string;
  language?: "zh" | "en";
  title?: string;
  className?: string;
}

export function AudioPlayer({
  src,
  textToSpeak,
  language = "en",
  title,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Speech API fallback
  const speakText = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === "zh" ? "zh-CN" : "en-US";
    utterance.rate = playbackRate;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
    };
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (textToSpeak && (!src || src.includes("placeholder"))) {
      speakText();
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback to textToSpeak if audio failed
        if (textToSpeak) speakText();
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const toggleSpeed = () => {
    const nextRate = playbackRate === 1 ? 0.8 : playbackRate === 0.8 ? 1.2 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs",
        className
      )}
    >
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
        />
      )}

      {/* Title & Speech Status */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 transition-transform active:scale-95"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="truncate">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
            {title || (textToSpeak ? `Pronounce: "${textToSpeak}"` : "Audio Recording")}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-500" />
            {language === "zh" ? "Chinese Voice (中文)" : "English Native Audio"}
          </span>
        </div>
      </div>

      {/* Progress & Speed Controls */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {/* Progress indicator */}
        <div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Speed toggle button */}
        <button
          onClick={toggleSpeed}
          className="px-2 py-1 rounded text-[11px] font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
          title="Playback speed"
        >
          {playbackRate}x
        </button>

        {/* Replay */}
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
              setIsPlaying(true);
            } else if (textToSpeak) {
              speakText();
            }
          }}
          className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white"
          title="Replay from start"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

