"use server";

import { cookies } from "next/headers";

export async function getInstitution() {
  const url = `${process.env.HOST}/api/v1/user/institution`;
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw error for handling in the calling component
  }
}
