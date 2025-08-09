"use server";

import { cookies } from "next/headers";
import { decodeJwt } from "@/lib/utils";

interface PaymentBody {
  payment_method: string;
  channel: string;
}

export type TokenValue = {
  exp: number;
  sub: string;
  level_id: number;
  is_verified: boolean;
};

export async function submitPayment(body: PaymentBody) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";

  // Get user ID from JWT token
  const tokenValue = decodeJwt<TokenValue>(token);

  const userId = tokenValue?.sub;

  if (!userId) {
    throw new Error("User ID not found. Please login again.");
  }

  const url = process.env.HOST + `/api/v1/payments/${userId}/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export interface IPaymentStatusResponse {
  status: number;
  data: {
    expiry_date: string;
    payment_page: string;
    status: "pending" | "succeeded" | "failed";
    total_amount: string;
    transaction_id: string;
    virtual_account_name: string;
    virtual_account_no: string;
  };
}

export const checkStatusPayment = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";

  // Get user ID from JWT token
  const tokenValue = decodeJwt<TokenValue>(token);

  const userId = tokenValue?.sub;

  if (!userId) {
    throw new Error("User ID not found. Please login again.");
  }

  const url = process.env.HOST + `/api/v1/payments/${userId}/register`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res as IPaymentStatusResponse;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
