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
    const user = result.data;
    const token = result.data.token;

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
        isVerified: !!user?.is_verified,
        isValidated: !!user?.is_validated,
        levelId: user.level_id,
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
