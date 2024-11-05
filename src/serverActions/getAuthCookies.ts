"use server";
import { IUser } from "@/interfaces/Iauth";
import { cookies } from "next/headers";

export async function getAuthCookies() {
  const userCookies = cookies().get("auth")?.value;
  const user: IUser = userCookies ? JSON.parse(userCookies) : undefined;
  return user;
}
