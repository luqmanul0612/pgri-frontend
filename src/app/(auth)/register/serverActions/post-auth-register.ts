"use server";

import { cookies } from "next/headers";

export interface PostAuthRegisterBody {
  password: string;
  name: string;
  birth_place: string;
  birth_date: string;
  gender?: string;
  blood_type_id?: number;
  religion_id?: number;
  phone_number: string;
  email: string;
  nik: string;
  address?: string;
  postal_code?: string;
  latest_education_id?: number;
  user_institution: {
    name: string;
    subdistrict_id: number;
    address: string;
    stage_id?: number;
    job_id?: number;
    employment_status_id?: number;
    has_certification?: boolean;
    grade?: string;
    subject_id?: number;
  };
}

export interface PostAuthRegisterResponse {
  address: string;
  birth_date: string;
  birth_place: string;
  blood_type: string;
  city: string;
  created_at: string;
  district: string;
  email: string;
  employee_status: string;
  expired: number;
  gender: string;
  has_paid: boolean;
  id: string;
  is_printed: boolean;
  is_validated: boolean;
  is_verified: boolean;
  latest_education: string;
  level_id: number;
  member_photo: string;
  membership_status: string;
  name: string;
  nik: string;
  npa: string;
  phone_number: string;
  postal_code: string;
  profile: string;
  province: string;
  religion: string;
  subdistrict: string;
  token: string;
  token_ppob: string;
}

export async function postAuthRegister(body: PostAuthRegisterBody) {
  const pathname = "/api/v2/auth/register";
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  const { token, token_ppob, ...data } = (result.data ||
    {}) as PostAuthRegisterResponse;
  cookies().set("auth", JSON.stringify(data), { path: "/" });
  cookies().set("token", token, { path: "/" });
  const res = { data, pathname, ok: response.ok };
  return res;
}
