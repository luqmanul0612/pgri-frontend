"use server";

import { getIdentity } from "@/app/(auth)/login/serverAction/getIdentity";
import { TokenValue } from "@/app/(auth)/register/serverActions/payment";
import { decodeJwt } from "@/lib/utils";
import { cookies } from "next/headers";

export async function getUserIdentity() {
  try {
    const result = await getIdentity();

    if (result.status !== 200) {
      throw new Error(result.errors || "Failed to get user identity");
    }

    const userData = result.data;

    return {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phone_number,
    };
  } catch (error) {
    console.error("Error getting user identity:", error);
    throw error;
  }
}
