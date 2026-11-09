"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Sparkles,
  Volume2,
  RotateCcw,
  BookOpen,
  Languages,
  CheckCircle2,
  Copy,
  PenTool
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { AuthGuard } from "@/components/common/AuthGuard";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AiTutorPage() {
  const { t, language } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text:
        language === "km"
          ? "ជំរាបសួរ! ខ្ញុំគឺជាគ្រូជំនួយភាសា AI របស់អ្នក។ អ្នកអាចសួរខ្ញុំអំពីវេយ្យាករណ៍ចិន HSK 1–6 ឬភាសាអង់គ្លេស IELTS/TOEFL ហើយខ្ញុំនឹងពន្យល់អ្នកជាភាសាខ្មែរយ៉ាងច្បាស់លាស់។ តើអ្នកចង់ឱ្យខ្ញុំជួយអ្វីនៅថ្ងៃនេះ?"
          : "Hello! I am your bilingual AI Language Tutor. You can ask me grammar questions in Khmer, practice Chinese HSK or English IELTS, and receive step-by-step corrections. What would you like to explore today?",
      timestamp: "Just now",
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, language }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "I am here to guide your Chinese and English learning.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: "Could not connect to AI service. Please check your internet connection.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and hash symbols for clean speech
      const cleaned = text.replace(/[*#_`]/g, "");
      const u = new SpeechSynthesisUtterance(cleaned.slice(0, 200));
      u.lang = text.includes("把") || text.includes("好") ? "zh-CN" : "en-US";
      window.speechSynthesis.speak(u);
    }
  };

  const quickPrompts = [
    { label: "ពន្យល់ទម្រង់ 把 (bǎ) ក្នុងភាសាចិន", prompt: "How do I use the 把 (bǎ) structure in Chinese? Explain in Khmer." },
    { label: "IELTS Writing Task 2 Structure", prompt: "Explain the best 4-paragraph structure for IELTS Academic Writing Task 2." },
    { label: "Mandarin 4 Tones Guide", prompt: "Explain the 4 Chinese tones in Khmer with pronunciation examples." },
    { label: "Translate: 很高兴认识你", prompt: "Translate '很高兴认识你' into Khmer and English with Pinyin." },
  ];

  return (
    <AuthGuard requiredFeatureTitle="AI Language Tutor" requiredFeatureTitleKm="គ្រូជំនួយភាសា AI ឆ្លាតវៃ">
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>24/7 AI-Powered Language Mentor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.ai_tutor_title}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 font-khmer mt-1">
            {t.ai_tutor_desc}
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: "msg-reset",
                sender: "ai",
                text: "Chat refreshed. How can I help you today?",
                timestamp: "Just now",
              },
            ]);
          }}
          className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-md self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-3 max-w-2xl",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-xs",
                  msg.sender === "user"
                    ? "bg-blue-600"
                    : "bg-gradient-to-tr from-purple-600 to-indigo-600"
                )}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={cn(
                  "p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs space-y-2",
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none font-medium"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/80"
                )}
              >
                <div>{msg.text}</div>

                <div
                  className={cn(
                    "flex items-center justify-between pt-1 text-[10px]",
                    msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                  )}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === "ai" && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      title="Read Aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 mr-auto max-w-md">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                <span>AI Tutor is preparing explanation in Khmer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Suggested:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt)}
              className="px-3 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-purple-300 hover:text-purple-600 shrink-0 transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={t.ask_placeholder}
              className="flex-1 p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

