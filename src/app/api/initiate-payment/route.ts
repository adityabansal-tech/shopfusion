import { PaymentMethod, PaymentRequestData } from "@/app/lib/types";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function validateEnvironmentVariables() {
  const requiredEnvVars = ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  }
}

export async function POST(req: Request) {
  try {
    validateEnvironmentVariables();
    const paymentData: PaymentRequestData = await req.json();
    const { amount, productName, transactionId, method } = paymentData;

    if (!amount || !productName || !transactionId || !method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    switch (method as PaymentMethod) {
      case "razorpay": {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID!,
          key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: transactionId,
          notes: { productName },
        });

        return NextResponse.json({
          razorpayOrderId: order.id,
          razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amountInPaise,
          currency: "INR",
        });
      }
      default:
        return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }
  } catch (err) {
    console.error("Payment API Error:", err);
    return NextResponse.json(
      { error: "Error creating payment session", details: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}