"use server";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { IMemberResponse } from "@/interfaces/IMemberResponse";
import { cookies } from "next/headers";
import { IAdministrativeRegions, IApiResponse } from "@/interfaces/IAdministrativeRegions";

export const getMembers = async (page: number, show: number) => {
  const token = cookies().get("token")?.value;

  const headers: Record<string, any> = {
    Authorization: token,
  };

  const response = await fetch(
    `${process.env.HOST}/api/v1/member/list?page=${page}&show=${show}`,
    {
      headers,
      cache: "no-cache",
    },
  );
  const result: IMemberResponse = await response.json();
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
