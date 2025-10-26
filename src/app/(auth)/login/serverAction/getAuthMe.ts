/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { cookies } from "next/headers";

export async function getAuthMe(): Promise<any> {
  const url = process.env.HOST + "/api/v2/auth/me";
  const token = cookies().get("token")?.value;
  console.log("first", token);

  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    authorization: token,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-cache",
  });
  console.log("first", response)
  return await response.json();
}
