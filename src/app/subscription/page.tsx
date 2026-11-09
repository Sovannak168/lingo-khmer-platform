"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Crown,
  Check,
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  ExternalLink
} from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from "@/lib/mock-data/payment-data";
import { DisclaimerBanner } from "@/components/common/DisclaimerBanner";
import { cn } from "@/lib/utils";

export default function SubscriptionPricingPage() {
  const { t, language } = useApp();
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "KHR">("USD");
  const [activeCheckoutPlan, setActiveCheckoutPlan] = useState<SubscriptionPlan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"method" | "qr" | "success">("method");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any | null>(null);

  const handleStartCheckout = async (plan: SubscriptionPlan) => {
    setActiveCheckoutPlan(plan);
    setCheckoutStep("method");
    setPaymentLoading(true);

    try {
      const res = await fetch("/api/payment/aba-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          amountUsd: plan.priceUsd,
          currency: selectedCurrency,
        }),
      });
      const data = await res.json();
      setPaymentData(data);
    } catch {
      // Fallback local mock data
      setPaymentData({
        tranId: `LK-ABA-${Date.now()}`,
        amountUsd: plan.priceUsd,
        amountKhr: plan.priceKhr,
        merchantId: "ec438921_khmer_lingo",
        hash: "a4f891b2c3d4e5f67890abcdef...",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleConfirmScanPayment = () => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setCheckoutStep("success");
    }, 1500);
  };

  return (
    <div className="space-y-10 pb-16">
      <DisclaimerBanner />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold">
          <Crown className="w-4 h-4 text-purple-600" />
          <span>Flexible Plans for Students in Cambodia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Upgrade to LingoKhmer Pro
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-khmer">
          {language === "km"
            ? "ចូលរៀនគ្រប់វគ្គសិក្សាចិន HSK 1–6 និងអង់គ្លេស IELTS គ្មានដែនកំណត់ ជាមួយការកែលម្អតែងសេចក្តីដោយ AI និងការទូទាត់ងាយស្រួលតាម ABA PayWay & KHQR"
            : "Unlock unlimited HSK 1–6 courses, IELTS mock simulations, and 24/7 AI tutor access. Paid securely via ABA PayWay and KHQR."}
        </p>

        {/* Currency Switcher */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Currency Display:</span>
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSelectedCurrency("USD")}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                selectedCurrency === "USD"
                  ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs"
                  : "text-slate-500"
              )}
            >
              USD ($)
            </button>
            <button
              onClick={() => setSelectedCurrency("KHR")}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                selectedCurrency === "KHR"
                  ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs"
                  : "text-slate-500"
              )}
            >
              KHR (៛ ខ្មែរ)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrentFree = plan.billingPeriod === "free";
          return (
            <div
              key={plan.id}
              className={cn(
                "rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 space-y-6 relative",
                plan.popular
                  ? "bg-white dark:bg-slate-900 border-2 border-purple-600 shadow-xl scale-102"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-[11px] shadow-md uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === "km" ? plan.nameKm : plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {selectedCurrency === "USD"
                        ? plan.priceUsd === 0
                          ? "Free"
                          : `$${plan.priceUsd}`
                        : plan.priceKhr === 0
                        ? "ឥតគិតថ្លៃ"
                        : `${plan.priceKhr.toLocaleString()} ៛`}
                    </span>
                    {plan.priceUsd > 0 && (
                      <span className="text-xs text-slate-500 font-medium">
                        /{plan.billingPeriod === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <p className="text-[11px] uppercase font-bold text-slate-400">
                    What is included:
                  </p>
                  {plan.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      {f.included ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          f.included
                            ? "text-slate-700 dark:text-slate-200 font-medium"
                            : "text-slate-400 line-through"
                        )}
                      >
                        {language === "km" ? f.km : f.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {isCurrentFree ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 font-bold text-xs"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartCheckout(plan)}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Checkout with ABA PayWay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ABA PayWay Checkout Modal */}
      {activeCheckoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-950 text-blue-300 font-bold text-xs flex items-center justify-center">
                  ABA
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  ABA PayWay & KHQR Checkout
                </h3>
              </div>
              <button
                onClick={() => setActiveCheckoutPlan(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Method selection & transaction preview */}
            {checkoutStep === "method" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plan Selected:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {activeCheckoutPlan.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount (USD):</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      ${activeCheckoutPlan.priceUsd}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount (KHR):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {activeCheckoutPlan.priceKhr.toLocaleString()} KHR
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span>Merchant: LingoKhmer Academy</span>
                    <span>ID: {paymentData?.merchantId || "ec438921_kh"}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Select Payment Method:
                  </p>
                  <button
                    onClick={() => setCheckoutStep("qr")}
                    className="w-full p-3.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-50 text-left flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          KHQR (ABA Mobile & Any Cambodian Bank App)
                        </p>
                        <p className="text-[11px] text-slate-500">Instant scan & pay via Bakong network</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setCheckoutStep("qr")}
                    className="w-full p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 text-left flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Credit / Debit Card (Visa, Mastercard, UnionPay)
                        </p>
                        <p className="text-[11px] text-slate-500">Processed by ABA PayWay Gateway</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: KHQR Scan Simulator */}
            {checkoutStep === "qr" && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-slate-600 dark:text-slate-300 font-khmer">
                  សូមស្កេន KHQR ដោយប្រើ ABA Mobile ឬកម្មវិធីធនាគារណាមួយនៅក្នុងប្រទេសកម្ពុជា
                </p>

                {/* Simulated KHQR Visual box */}
                <div className="p-4 rounded-2xl bg-white border-2 border-red-600 max-w-[220px] mx-auto shadow-md space-y-2">
                  <div className="bg-red-600 text-white font-bold text-xs py-1 rounded">
                    KHQR
                  </div>
                  {/* QR Graphic */}
                  <div className="w-40 h-40 mx-auto bg-slate-900 rounded-lg p-2 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                  <div className="text-[10px] text-slate-600 font-bold">
                    ${activeCheckoutPlan.priceUsd} / {activeCheckoutPlan.priceKhr.toLocaleString()} KHR
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Ref: {paymentData?.tranId || "LK-ABA-984712"}
                </div>

                <button
                  onClick={handleConfirmScanPayment}
                  disabled={paymentLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying ABA Transaction Hash...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simulate Successful Bank Scan</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Payment Verified & Receipt */}
            {checkoutStep === "success" && (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Payment Verified Successfully!
                </h3>
                <p className="text-xs text-slate-500 font-khmer">
                  ការទូទាត់ត្រូវបានបញ្ជាក់ជោគជ័យ។ គណនីរបស់អ្នកត្រូវបានដំឡើងទៅ Premium រួចរាល់!
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left text-xs space-y-1 font-mono">
                  <p>Transaction: <span className="font-bold">{paymentData?.tranId}</span></p>
                  <p>Provider: ABA PayWay & KHQR</p>
                  <p>Status: 200 Settled (Active)</p>
                </div>

                <button
                  onClick={() => setActiveCheckoutPlan(null)}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
                >
                  Start Premium Learning
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

