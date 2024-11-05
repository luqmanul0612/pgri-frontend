/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { cookies } from "next/headers";

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
      return {
        success: false,
        error: {
          name: "LoginError",
          message: result?.errors ?? result?.errors[0],
        },
      };
    }

    const user = result.data;
    const token = result.data.token;

    cookies().set("auth", JSON.stringify(user), {
      expires: remember ? 30 : undefined,
      path: "/",
    });

    cookies().set("token", token, {
      expires: remember ? 30 : undefined,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error: ", error);
  }
}
