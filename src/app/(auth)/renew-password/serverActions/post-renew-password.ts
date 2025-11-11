"use server";

import { cookies } from "next/headers";

export interface PostUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface PostUpdatePasswordResponse {}

export async function postUpdatePassword(body: PostUpdatePasswordBody) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname = "/api/v2/users/update/password";
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(body),
  });
  const res = { ...(await response.json()), pathname, ok: response.ok };
  return res;
}
