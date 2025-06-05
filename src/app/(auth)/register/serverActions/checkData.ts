"use server";

import { IFormData } from "@/store/use-registration-form";

interface ApiResponse {
  status: number;
  data: boolean;
  errors: string;
}

export async function checkRegistrationData(
  body: IFormData,
): Promise<ApiResponse> {
  const url = process.env.HOST + "/api/v1/auth/check";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ ...body, relegion: body.religion }); // Use the typed body

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, { ...requestOptions, cache: "no-store" });
  const result: ApiResponse = await response.json();
  return result;
}
