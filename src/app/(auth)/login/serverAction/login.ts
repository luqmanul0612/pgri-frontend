/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { decodeJwt } from "@/lib/utils";
import { cookies } from "next/headers";

export type TokenValue = {
  exp: number;
  sub: string;
  level_id: number;
  is_verified: boolean;
};

export async function handleLogin(
  email: string,
  password: string,
  remember?: boolean,
) {
  const url = process.env.HOST + "/api/v1/auth/login";
  const dummy = { push_token: "string", id_device: "string", phone: "string" };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, ...dummy }),
    });
    const result = await response.json();
    if (result.status !== 200) {
      throw new Error(result?.errors ?? result?.errors[0]);
    }

    const user = result.data;
    const token = result.data.token;
    const tokenValue = decodeJwt<TokenValue>(token as string);

    cookies().set("auth", JSON.stringify(user), {
      expires: remember ? 30 : undefined,
      path: "/",
    });

    cookies().set("token", token, {
      expires: remember ? 30 : undefined,
      path: "/",
    });

    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
        isVerified: !!tokenValue?.is_verified,
        levelId: (user.level_id ?? 3) as number,
      },
    };
  } catch (error) {
    throw error;
  }
}
