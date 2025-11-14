"use server";

import { cookies } from "next/headers";

export async function checkRenewPassword() {
  const renew_password = cookies().get("renew_password")?.value;
  const res = { renew_password: renew_password === "1" };
  return res;
}
