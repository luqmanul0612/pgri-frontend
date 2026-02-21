/* eslint-disable react-hooks/rules-of-hooks */
"use server";

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

export interface PostLoginResponse {
  status: number;
  data: {
    id: string;
    npa: string;
    name: string;
    birth_place: string;
    birth_date: string;
    gender: string;
    blood_type: string;
    religion: string;
    phone_number: string;
    email: string;
    nik: string;
    address: string;
    postal_code: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    employee_status: string;
    membership_status: string;
    latest_education: string;
    member_photo: string;
    has_paid: boolean;
    is_verified: boolean;
    is_printed: boolean;
    is_validated: boolean;
    created_at: string;
    level_id: number;
    profile: string;
    token: string;
    token_ppob: string;
    expired: number;
    change_token: string;
  };
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
    const { token, change_token, token_ppob, ...user } = (result.data ||
      {}) as PostLoginResponse["data"];
    const renew_password = !!change_token;
    if (renew_password) {
      cookies().set("renew_password", "1", { path: "/" });
      cookies().set("token", change_token, { path: "/" });
    } else {
      cookies().set("auth", JSON.stringify(user), { path: "/" });
      cookies().set("token", token, { path: "/" });
      cookies().delete("renew_password");
    }

    return { data: { user, renew_password }, pathname, ok: response.ok };
  } catch (error) {
    throw error;
  }
}
