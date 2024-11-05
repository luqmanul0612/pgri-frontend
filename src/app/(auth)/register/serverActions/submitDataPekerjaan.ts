"use server";

import { cookies } from "next/headers";

interface DataPekerjaanType {
  subdistrict_id: string;
  stage: string;
  job_title: string;
  name: string;
  address: string;
  employee_status: string;
  educator_certificate: boolean;
  grade: string;
  study_subjects: string;
}

export async function submitDataPekerjaan(registrationData: DataPekerjaanType) {
  const url = process.env.HOST + "/api/v1/verify/institution";
  const token = cookies().get("token")?.value;
  console.log(token);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(registrationData),
    });
    const res = await response.json();
    console.log(
      "data pekerjaan res ==> ",
      res,
      "user data ==> ",
      registrationData,
    );
    return res;
  } catch (error) {
    console.error("Error during password setup:", error);
  }
}
