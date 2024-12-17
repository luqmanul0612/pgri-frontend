"use server";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { IMemberResponse } from "@/interfaces/IMemberResponse";
import { cookies } from "next/headers";
import { IAdministrativeRegions, IApiResponse } from "@/interfaces/IAdministrativeRegions";
import { cache } from "sharp";

export const getMembers = async (page: number, show: number, querySearch: string, filterRegions: any, filterByStatus: string | null | undefined, filterGender: any ) => {
  const token = cookies().get("token")?.value;
  console.log(filterByStatus, "Server");
  const headers: Record<string, any> = {
    Authorization: token,
  };

  const url = new URL(`${process.env.HOST}/api/v1/member/list?page=${page}&show=${show}`);
  if (querySearch?.trim()) url.searchParams.append("q", querySearch.trim());
  if (filterRegions?.provinsi?.trim()) url.searchParams.append("province", filterRegions.provinsi.trim());
  if (filterRegions?.kota?.trim()) url.searchParams.append("city", filterRegions.kota.trim());
  if(filterRegions?.status?.trim()) url.searchParams.append("employee_status", filterRegions.status.trim());
  if(filterByStatus?.trim()) url.searchParams.append("status", filterByStatus.trim());
  if(filterGender?.trim()) url.searchParams.append("gender", filterGender.trim());
  const response = await fetch(url, {
      headers,
      cache: "no-cache",
    },
  );

  const result: any = await response.json();
  return result;
};

// GET BY ID
export const getMemberById = async (id:string) => {
  const token = cookies().get("token")?.value;

  const headers: Record<string, any> = {
    Authorization: token,
  };
  const response = await fetch(
    `${process.env.HOST}/api/v1/member/detail/${id}`,
    {
      headers,
      cache: "no-cache",
    },
  );
  const result: IMemberByIdResponse = await response.json();
  return result;
}

// GET PROVINCES
export const getProvinces = async () => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/province`,
    {
      cache: "no-cache",
    }
  );
  const result: IApiResponse = await response.json();
  return result;
}

// GET CITY
export const getCity = async (id: string) => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/city/${id}`,
    {
      cache: "no-cache",
    }
  );
  const result: IApiResponse = await response.json();
  return result;
}

// GET DISTRICT
export const getDistrict = async (id: string) => {
  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/address/district/${id}`,
    {
      cache: "no-cache",
    }
  );
  const result: IApiResponse = await response.json();
  return result;
}

// GET SUB DISTRICT
export const getSubDistrict = async (id: string) => {
  const response: Response = await  fetch(
    `${process.env.HOST}/api/v1/address/subdistrict/${id}`,
    {
      cache: "no-cache",
    }
  )
  const result: IApiResponse = await response.json();
  return result;
}
