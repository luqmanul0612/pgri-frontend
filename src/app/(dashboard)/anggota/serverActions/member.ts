"use server";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { IMemberResponse } from "@/interfaces/IMemberResponse";
import { cookies } from "next/headers";
import {
  IAdministrativeRegions,
  IApiResponse,
} from "@/interfaces/IAdministrativeRegions";
import { cache } from "sharp";
import { GetUserInstitution } from "@/app/(auth)/account-verification/serverActions/get-form-data";

export const getMembers = async (
  page: number,
  show: number,
  querySearch?: string,
  filterRegions?: any,
  filterByStatus?: string | null | undefined,
  filterGender?: any,
) => {
  const token = cookies().get("token")?.value;
  console.log(filterByStatus, "Server");
  const headers: Record<string, any> = {
    Authorization: token,
  };
  const url = new URL(
    `${process.env.HOST}/api/v1/member/list?page=${page}&show=${show}`,
  );
  if (querySearch?.trim()) url.searchParams.append("q", querySearch.trim());
  if (filterRegions?.provinsi?.trim())
    url.searchParams.append("province", filterRegions.provinsi.trim());
  if (filterRegions?.kota?.trim())
    url.searchParams.append("city", filterRegions.kota.trim());
  if (filterRegions?.status?.trim())
    url.searchParams.append("employee_status", filterRegions.status.trim());
  if (filterByStatus?.trim())
    url.searchParams.append("status", filterByStatus.trim());
  if (filterGender?.trim())
    url.searchParams.append("gender", filterGender.trim());
  const response = await fetch(url, {
    headers,
    cache: "no-cache",
  });

  const result: any = await response.json();
  return result;
};

export interface GetMembersParams {
  q: string;
  page: number;
  limit: number;
  province_id: string;
  city_id: string;
  district_id: string;
  employment_status_id: string;
  membership_status_id: string;
  gender: string;
  sort_by: string;
  order: string;
}

export type MemberItem = {
  birth_date: string;
  birth_place: string;
  blood_type: string;
  city: string;
  created_at: string;
  district: string;
  email: string;
  employee_status: string;
  gender: string;
  id: string;
  is_printed: boolean;
  is_validated: boolean;
  is_verified: boolean;
  latest_education: string;
  member_photo: string;
  membership_status: string;
  name: string;
  nik: string;
  npa: string;
  phone_number: string;
  profile: string;
  province: string;
  qr: string;
  subdistrict: string;
};
export interface GetMembersResponse {
  data: {
    counter: { M: number; F: number; total: number };
    data: MemberItem[];
    pagination: {
      limit: number;
      next_page: number;
      page: number;
      prev_page: number;
      total_items: number;
      total_page: number;
    };
  };
  status: number;
}

export const getMembersV2 = async (params: Partial<GetMembersParams>) => {
  const token = cookies().get("token")?.value;
  const headers: Record<string, any> = {
    Authorization: token,
  };
  const pathname = "/api/v2/members";
  const url = new URL(`${process.env.HOST}` + pathname);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value as string);
  });

  const response = await fetch(url, {
    headers,
    cache: "no-cache",
  });

  const result = (await response.json()) as GetMembersResponse;
  return { ...result, pathname, ok: response.ok };
};

export async function getInstitution() {
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
  const result = {
    ...((await response.json()) as GetUserInstitution),
    pathname,
    ok: response.ok,
  };
  return result;
}

// GET BY ID
export const getMemberById = async (id: string) => {
  const token = cookies().get("token")?.value;

  const headers: Record<string, any> = {
    Authorization: token,
  };
  const response = await fetch(`${process.env.HOST}/api/v2/members/${id}`, {
    headers,
    cache: "no-cache",
  });
  const result: IMemberByIdResponse = await response.json();
  return result;
};

// GET PROVINCES
export const getProvinces = async () => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/province`,
    {
      cache: "no-cache",
    },
  );
  const result: IApiResponse = await response.json();
  return result;
};

// GET CITY
export const getCity = async (id: string) => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/city/${id}`,
    {
      cache: "no-cache",
    },
  );
  const result: IApiResponse = await response.json();
  return result;
};

// GET DISTRICT
export const getDistrict = async (id: string) => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/district/${id}`,
    {
      cache: "no-cache",
    },
  );
  const result: IApiResponse = await response.json();
  return result;
};

// GET SUB DISTRICT
export const getSubDistrict = async (id: string) => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/subdistrict/${id}`,
    {
      cache: "no-cache",
    },
  );
  const result: IApiResponse = await response.json();
  return result;
};
