import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeJwt<T>(token: string): T | null {
  try {
    const [, payload] = token.split(".");
    const decoded = atob(payload);
    const parsed = JSON.parse(decoded);
    return parsed as T;
  } catch (e) {
    return null;
  }
}

export function userAccess(): {
  isVerified: boolean;
  levelId: number;
} | null {
  try {
    const token = Cookies.get("token") || "";
    const [, payload] = token.split(".");
    const decoded = atob(payload);
    const parsed = JSON.parse(decoded);
    return {
      isVerified: parsed.is_verified,
      levelId: parsed.level_id,
    };
  } catch (e) {
    return null;
  }
}
