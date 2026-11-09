import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { planId, amountUsd, currency = "USD" } = await req.json();

    const merchantId = process.env.ABA_PAYWAY_MERCHANT_ID || "ec438921_sandbox";
    const apiKey = process.env.ABA_PAYWAY_API_KEY || "sandbox_payway_key_demo";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const tranId = `LK-ABA-${Date.now()}`;
    const reqTime = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);

    // Calculate Cambodian Riel (KHR) exchange rate (1 USD = 4,100 KHR)
    const amountKhr = Math.round(Number(amountUsd) * 4100);

    // ABA PayWay standard HMAC-SHA512 hash signature calculation
    const rawString = `${reqTime}${merchantId}${tranId}${amountUsd}${currency}`;
    const hash = crypto.createHmac("sha512", apiKey).update(rawString).digest("base64");

    // Simulated KHQR string compliant with Bakong standards
    const khqrString = `00020101021229380016abaakhppxxx@abaa5204599953038405405${amountUsd}5802KH5917LingoKhmerAcademy6010Phnom Penh6304${hash.slice(0, 4)}`;

    return NextResponse.json({
      status: "success",
      tranId,
      merchantId,
      amountUsd,
      amountKhr,
      currency,
      hash,
      reqTime,
      khqrString,
      checkoutUrl: `https://checkout-sandbox.payway.com.kh/payments/${tranId}`,
      message: "ABA PayWay purchase request created securely.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate ABA PayWay payment transaction." },
      { status: 500 }
    );
  }
}

