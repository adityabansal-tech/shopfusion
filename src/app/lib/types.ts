export type PaymentMethod = "razorpay";

export interface PaymentRequestData {
  amount: string;
  productName: string;
  transactionId: string;
  method: PaymentMethod;
}

export interface RazorpayOrderResponse {
  razorpayOrderId: string;
  razorpayKeyId: string;
  amount: number;
  currency: string;
}

export interface DummyDataResponse {
  amount: string;
  productName: string;
  transactionId: string;
}