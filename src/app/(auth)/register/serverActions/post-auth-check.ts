"use server";

export interface PostAuthCheckBody {
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
}

type Response = Promise<boolean>;

export async function postAuthCheck(values: PostAuthCheckBody): Response {
  const pathname = "/api/v2/auth/check";
  const url = process.env.HOST + pathname;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(values);

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };
  const response = await fetch(url, { ...requestOptions, cache: "no-store" });
  const result = { ...(await response.json()), pathname, ok: response.ok };
  return result;
}
