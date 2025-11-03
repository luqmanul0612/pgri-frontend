"use server";

import { cookies } from "next/headers";

export interface PostUpdateUserBody {
  name: string;
  nik: string;
  email: string;
  birth_place: string;
  birth_date: string;
  phone_number: string;
  gender?: string;
  religion_id?: number;
  blood_type_id?: number;
  address?: string;
  postal_code?: string;
  latest_education_id?: number;
}

export interface PostUpdateInstitutionBody {
  name: string;
  subdistrict_id?: number;
  address: string;
  job_id?: number;
  stage_id?: number;
  employment_status_id?: number;
  has_certification?: boolean;
  grade?: string;
  subject_id?: number;
}

export interface PostAuthRegisterResponse {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  nik: string;
  npa: string;
  birth_place: string;
  birth_date: string;
  gender: string;
  blood_type: string;
  religion: string;
  latest_education: string;
  address: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  employee_status: string;
  member_photo: string;
  profile: string;
  membership_status: string;
  has_paid: boolean;
  is_verified: boolean;
  is_validated: boolean;
  is_printed: boolean;
  expired: number;
  level_id: number;
  token: string;
  token_ppob: string;
  created_at: string;
}

export async function postUpdateUser(body: PostUpdateUserBody) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname = "/api/v2/users/update";
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(body),
  });
  const res = { ...(await response.json()), pathname, ok: response.ok };
  return res;
}


export async function postUpdateUserInstitution(body: PostUpdateInstitutionBody) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname = "/api/v2/users/institution/update";
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(body),
  });
  const res = { ...(await response.json()), pathname, ok: response.ok };
  return res;
}
