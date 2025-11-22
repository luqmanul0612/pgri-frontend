"use server";

import { WILAYAH_ENDPOINTS } from "../config/env";

// Base URL dari environment
const BASE_URL = process.env.HOST + "/api/v2";

interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: number;
  error?: string;
}

// Generic server action untuk API calls
async function makeApiRequest<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Tambahkan headers lain jika diperlukan (auth, dll)
      },
      cache: "no-store", // Disable cache untuk real-time data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();

    // Handle different response formats
    if (result.data && Array.isArray(result.data)) {
      return result.data;
    } else if (Array.isArray(result)) {
      return result as T[];
    } else if (result.data) {
      return [result.data];
    } else {
      console.warn("Unexpected API response format:", result);
      return [];
    }
  } catch (error) {
    console.error(`Server Action Error for ${endpoint}:`, error);
    throw new Error(
      `Failed to fetch data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

// Server Actions untuk setiap endpoint
export async function getProvinces() {
  return makeApiRequest(WILAYAH_ENDPOINTS.PROVINCES);
}

export async function getCities(provinceId: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.CITIES}/${provinceId}`);
}

export async function getDistricts(cityId: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.DISTRICTS}/${cityId}`);
}

export async function getSubdistricts(districtId: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.SUBDISTRICTS}/${districtId}`);
}

// Server action untuk single item (jika diperlukan)
export async function getProvinceByCode(code: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.PROVINCES}/${code}`);
}

export async function getCityByCode(code: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.CITIES}/${code}`);
}

export async function getDistrictByCode(code: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.DISTRICTS}/${code}`);
}

export async function getSubdistrictByCode(code: string) {
  return makeApiRequest(`${WILAYAH_ENDPOINTS.SUBDISTRICTS}/${code}`);
}
