import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ status: "Failed", error: "Missing payment verification fields" }, { status: 400 });
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json({ status: "Failed", error: "Invalid payment signature" }, { status: 400 });
  }

  return NextResponse.json({
    status: "Completed",
    transaction_id: razorpay_payment_id,
    order_id: razorpay_order_id,
  });
}