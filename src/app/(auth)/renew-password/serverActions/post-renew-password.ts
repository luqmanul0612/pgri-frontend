"use server";

import { cookies } from "next/headers";

export interface PostUpdatePasswordBody {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface PostUpdatePasswordResponse {}

export async function postUpdatePassword(body: PostUpdatePasswordBody) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname = "/api/v2/auth/password/change";
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(body),
  });
  cookies().delete("renew_password");
  cookies().delete("token");
  const res = { ...(await response.json()), pathname, ok: response.ok };
  return res;
}
