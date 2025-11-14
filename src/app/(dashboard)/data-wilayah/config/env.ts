// Environment configuration for wilayah API
export const WILAYAH_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_WILAYAH_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.example.com",
  DEFAULT_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Endpoint paths
export const WILAYAH_ENDPOINTS = {
  PROVINCES: "/provinces",
  CITIES: "/cities",
  DISTRICTS: "/districts",
  SUBDISTRICTS: "/subdistricts",
} as const;

// Default parent codes (can be overridden)
export const DEFAULT_PARENT_CODES = {
  PROVINCE_FOR_CITIES: "11", // Default province code for cities
  CITY_FOR_DISTRICTS: "159", // Default city code for districts
  DISTRICT_FOR_SUBDISTRICTS: "1991", // Default district code for subdistricts
} as const;
