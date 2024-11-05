"use server";

import { cookies } from "next/headers";

export async function setCookies(cookiesName: string, data: any) {
  data = typeof data == "string" ? data : JSON.stringify(data);
  cookies().set(cookiesName, data, {
    path: "/",
  });
}
