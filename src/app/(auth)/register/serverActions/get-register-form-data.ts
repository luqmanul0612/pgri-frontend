"use server";

interface Response {
  status: number;
  data: { id: number; name: string }[];
}

export type ServiceOptionKey =
  | "blood-types"
  | "educations"
  | "religions"
  | "employment-statuses"
  | "jobs"
  | "majors"
  | "membership-statuses"
  | "ranks"
  | "stages"
  | "subjects";

export async function getServiceOptions(
  key: ServiceOptionKey,
): Promise<Response> {
  const pathname = `/api/v2/${key}`;
  const url = process.env.HOST + pathname;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const response = await fetch(url, { ...requestOptions, cache: "no-store" });
  const result = { ...(await response.json()), pathname, ok: response.ok };
  return result;
}

export type GetLocationProps = {
  type: "provinces" | "cities" | "districts" | "subdistricts";
  id?: string;
};

export async function getLocation({
  type,
  id,
}: GetLocationProps): Promise<Response> {
  const pathname = `/api/v2/${type}${id ? `/${id}` : ""}`;
  const url = process.env.HOST + pathname;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const response = await fetch(url, { ...requestOptions, cache: "no-store" });
  const result = { ...(await response.json()), pathname, ok: response.ok };
  return result;
}
