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

export async function postPaymentRegister(body: PaymentBody) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const tokenValue = decodeJwt<TokenValue>(token);
  const userId = tokenValue?.sub;

  if (!userId) {
    return {
      status: 401,
      message: "User ID not found. Please login again.",
      data: null,
    };
  }
  const pathname = `/api/v2/payments/${userId}/register`;
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const res = {
    ...(await response.json()),
    pathname,
    ok: response.ok,
  };
  return res;
}

export interface PaymentStatusResponse {
  status: number;
  message: string;
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

export const getPaymentRegister = async (): Promise<PaymentStatusResponse> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const tokenValue = decodeJwt<TokenValue>(token);
  const userId = tokenValue?.sub;

  if (!userId) {
    return {
      status: 401,
      message: "User ID not found. Please login again.",
      data: {} as PaymentStatusResponse["data"],
    };
  }

  const url = process.env.HOST + `/api/v2/payments/${userId}/register`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = {
      ...(await response.json()),
      pathname: url,
      ok: response.ok,
    };
    return res;
  } catch (error) {
    throw error;
  }
};

export interface VaChannelsResponse {
  status: 200;
  data: Record<string, { name: string }>;
}

export const getVaChannels = async (): Promise<VaChannelsResponse> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const url = process.env.HOST + "/api/v1/payments/va/channels";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = {
    ...(await response.json()),
    pathname: url,
    ok: response.ok,
  };
  return res;
};
