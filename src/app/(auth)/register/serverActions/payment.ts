"use server";

import { cookies } from "next/headers";

interface PaymentBody {
  payment_method: string;
  channel: string;
}

export async function submitPayment(userId: string, body: PaymentBody) {
  const url = process.env.HOST + `/api/v1/payments/${userId}/register`;
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error", error);
  }
}
