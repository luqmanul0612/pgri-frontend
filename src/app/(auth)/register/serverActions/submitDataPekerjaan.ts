"use server";

import { cookies } from "next/headers";

interface DataPekerjaanType {
  subdistrict_id: string;
  stage: string;
  job_title: string;
  name: string;
  address: string;
  employee_status: string;
  educator_certificate?: boolean; // optional, default false
  grade: string;
  study_subjects: string;
}

export async function submitDataPekerjaan(registrationData: DataPekerjaanType) {
  const url = process.env.HOST + "/api/v1/verify/institution";
  const token = cookies().get("token")?.value;
  try {
    // Set educator_certificate default to false if undefined
    const dataToSend = {
      ...registrationData,
      educator_certificate: registrationData.educator_certificate ?? false,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    console.log(response.status);
    const res = await response.json();

    if (response.ok) {
      return { success: true, status: response.status, data: res };
    } else {
      return { success: false, status: response.status, error: res };
    }
  } catch (error) {
    console.error("Error during password setup:", error);
  }
}
