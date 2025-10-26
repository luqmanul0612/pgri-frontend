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

export interface BodyLogin {
  npa: string;
  password: string;
  push_token: string;
  id_device: string;
  phone: string;
}

export async function postLogin(body: BodyLogin) {
  const pathname = "/api/v2/auth/login";
  const url = process.env.HOST + pathname;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    const user = result.data;
    const token = result.data.token;
    const tokenValue = decodeJwt<TokenValue>(token as string);

    cookies().set("auth", JSON.stringify(user), {
      path: "/",
    });

    cookies().set("token", token, {
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
        createdAt: user.created_at,
        address: user?.address,
        birthPlace: user?.birth_place,
        bloodType: user?.blood_type,
        dob: user?.dob,
        gender: user?.gender,
        latestEducation: user?.latest_education,
        nik: user?.nik,
        npaNumber: user?.npa_number,
        postalCode: user?.postal_code,
        religion: user?.religion,
      },
      pathname,
      ok: response.ok,
    };
  } catch (error) {
    throw error;
  }
}
