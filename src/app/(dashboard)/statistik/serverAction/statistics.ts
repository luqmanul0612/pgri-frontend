"use server";

import { cookies } from "next/headers";

// GET STATISTICS AGE
export const getStatisticsAge = async () => {
  const token = cookies().get("token")?.value;
  // console.log(token);
  const headers: Record<string, any> = {
    Authorization: token,
  };

  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/statistic/age`, {
    headers,
    cache: "no-cache",
  });

  const result = await response.json();
  return result;
}

// GET EDUCATION
export const getStatisticsEducation = async () => {
  const token = cookies().get("token")?.value;
  const headers: Record<string, any> = {
    Authorization: token,
  }

  const response: Response = await fetch(
    `${process.env.HOST}/api/v1/statistic/education`, {
      headers,
      cache: "no-cache",
    }
  );

  const result = await response.json();
  return result;
}

// GET STAGE / Tempat Mengajar
export const getStage = async () => {
  const token: string | undefined = cookies().get('token')?.value;
  const headers: Record<string, any> = {
    Authorization: token,
  }

  const response = await fetch(
    `${process.env.HOST}/api/v1/statistic/stage`,{
      headers,
      cache: "no-cache",
    }
  );

  const result = await response.json();
  return result;
}

export const getCertificate = async () => {
  const token: string | undefined = cookies().get('token')?.value;
  const headers: Record<string, any> = {
    Authorization: token,
  }

  const response = await fetch(
    `${process.env.HOST}/api/v1/statistic/certificate`, {
      headers,
      cache: "no-cache",
    }
  )

  const result = await response.json();
  return result;
}
