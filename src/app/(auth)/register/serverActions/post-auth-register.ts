"use server";

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

export async function postAuthRegister(body: PostAuthRegisterBody) {
  const pathname = "/api/v2/auth/register";
  const url = process.env.HOST + pathname;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const res = { ...(await response.json()), pathname, ok: response.ok };
  return res;
}
