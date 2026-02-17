"use server";

import { cookies } from "next/headers";

export async function checkHasPaid() {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth")?.value;
  const token = cookieStore.get("token")?.value;
  const hasPaid = JSON.parse(auth || "{}")?.has_paid;
  return !!hasPaid || !token;
}
