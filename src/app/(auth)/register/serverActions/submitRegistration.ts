"use server";

import { TPayloadRegister } from "@/store/use-registration-form";

export async function submitRegistration(registrationData: TPayloadRegister) {
  const url = process.env.HOST + "/api/v1/auth/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...registrationData,
        religion: registrationData.religion,
      }),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error during password setup:", error);
  }
}
