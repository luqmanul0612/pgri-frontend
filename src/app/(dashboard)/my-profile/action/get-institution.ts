"use server";

import { cookies } from "next/headers";

interface GetUserInstitutionResponse {
  status: number;
  data: {
    address: string;
    city: string;
    city_code: string;
    created_at: string;
    district: string;
    district_code: string;
    educator_certificate: string;
    employment_status: string;
    grade: string;
    is_private: boolean | string;
    is_teacher: boolean | string;
    is_validated: boolean;
    job_title: string;
    name: string;
    province: string;
    province_code: string;
    stage: string;
    start_date: string;
    subdistrict: string;
    subdistrict_code: string;
    subjects: string;
    updated_at: string;
  };
}

export async function getUserInstitution(): Promise<GetUserInstitutionResponse> {
  const pathname = "/api/v2/users/institution";
  const url = process.env.HOST + pathname;
  const token = cookies().get("token")?.value;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = { ...(await response.json()), pathname, ok: response.ok };
  return result;
}
