/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { cookies } from "next/headers";

export async function getIdentity() {
  const url = process.env.HOST + "/api/v1/auth/me";
  const token = cookies().get("token")?.value;

  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    authorization: token,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-cache",
  });

  const result: { status: number; data: any; errors: string } =
    await response.json();

  return result;
}
