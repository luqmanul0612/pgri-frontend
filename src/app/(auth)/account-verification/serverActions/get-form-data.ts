"use server";

import { TokenValue } from "@/app/(auth)/login/serverAction/post-login";
import { decodeJwt } from "@/lib/utils";
import { cookies } from "next/headers";

interface GetUsersMeResponse {
  status: number;
  data: {
    address: string;
    birth_date: string;
    birth_place: string;
    blood_type: string;
    blood_type_id: number;
    created_at: string;
    data: {
      training_count: number;
      opus_count: number;
      aspiration_count: number;
    };
    email: string;
    gender: string;
    has_paid: boolean;
    id: string;
    is_printed: boolean;
    is_validated: boolean;
    is_verified: boolean;
    latest_education: string;
    latest_education_id: number;
    major_id?: number;
    membership_status_id: number;
    name: string;
    nik: string;
    npa: string;
    phone_number: string;
    postal_code: string;
    profile: string;
    qr: string;
    rank_id?: number;
    religion: string;
    religion_id: number;
  };
}

export async function getUsersMe(): Promise<GetUsersMeResponse> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname = "/api/v2/users/me";
  const url = process.env.HOST + pathname;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    authorization: token,
  };

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const response = await fetch(url, { ...requestOptions, cache: "no-store" });
  const result = { ...(await response.json()), pathname, ok: response.ok };
  return result;
}

export interface GetUserInstitution {
  status: number;
  data: {
    address: string;
    city: string;
    city_code: string;
    city_id: number;
    created_at: string;
    district: string;
    district_code: string;
    district_id: number;
    educator_certificate: string;
    employment_status: string;
    employment_status_id: number;
    grade: string;
    institution_id: number;
    is_private: boolean;
    is_teacher: boolean;
    is_validated: boolean;
    job_id: number;
    job_title: string;
    name: string;
    province: string;
    province_code: string;
    province_id: number;
    stage: string;
    stage_id: number;
    start_date: string;
    subdistrict: string;
    subdistrict_code: string;
    subdistrict_id: number;
    subject_id: number;
    subjects: string;
    updated_at: string;
    user_id: string;
  };
}

export async function getUsersInstitution(): Promise<GetUserInstitution> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname = "/api/v2/users/institution";
  const url = process.env.HOST + pathname;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    authorization: token,
  };

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const response = await fetch(url, { ...requestOptions, cache: "no-store" });
  const result = { ...(await response.json()), pathname, ok: response.ok };
  return result;
}

export interface GetUserFormData {
  status: number;
  data: {
    user: GetUsersMeResponse["data"];
    institution: GetUserInstitution["data"];
  };
}

export async function getUsersFormData(): Promise<GetUserFormData> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const pathname1 = "/api/v2/users/me";
  const pathname2 = "/api/v2/users/institution";
  const url1 = process.env.HOST + pathname1;
  const url2 = process.env.HOST + pathname2;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    authorization: token,
  };

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const user = await fetch(url1, { ...requestOptions, cache: "no-store" });
  const institution = await fetch(url2, {
    ...requestOptions,
    cache: "no-store",
  });
  const result = {
    data: {
      user: (await user.json()).data as GetUsersMeResponse["data"],
      institution: (await institution.json()).data as GetUserInstitution["data"],
    },
    status: user.status,
    pathname: `${pathname1} + ${pathname2}`,
    ok: user.ok && institution.ok,
  };
  return result;
}
