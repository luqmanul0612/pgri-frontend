"use server";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { IMemberResponse } from "@/interfaces/IMemberResponse";
import { cookies } from "next/headers";

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
