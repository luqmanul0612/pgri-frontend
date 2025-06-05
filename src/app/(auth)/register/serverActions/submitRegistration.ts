"use server";

import { IFormData } from "@/store/use-registration-form";

export async function submitRegistration(registrationData: IFormData) {
  const url = process.env.HOST + "/api/v1/auth/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...registrationData,
        relegion: registrationData.religion,
      }),
    });
    const res = await response.json();
    // console.log('response register', res)
    return res;

    // simpan token dan auth
    // const user = res.data;
    // const token = res.data.token;

    // cookies().set("auth", JSON.stringify(user), {})

    // cookies().set("token", token, {})

    // return {success: true};
  } catch (error) {
    console.error("Error during password setup:", error);
  }
}
