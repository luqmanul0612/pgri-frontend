export interface IAdministrativeRegions {
  code: string,
  name: string,
}

export interface IAdministrativeRegionValue {
  value: string,
  label: string,
}

export interface IApiResponse {
  data: IAdministrativeRegions[],
  status: number,
}
