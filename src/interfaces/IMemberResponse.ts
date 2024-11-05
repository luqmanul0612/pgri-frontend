export interface IMemberResponse {
  status: number;
  data: Data;
}

export interface Data {
  data: IMember[];
  active_page: number;
  next_page: number;
  prev_page: boolean;
  total_page: number;
  show: number;
}

export interface IMember {
  id: number;
  email: string;
  npa_number?: string;
  profile: any;
  nik: string;
  name: string;
  gender: string;
  birth_place: string;
  province?: string;
  dob: string;
  blood_type: string;
  latest_education: string;
  level_id: number;
  status: number;
  created_at: string;
  qr: string;
}
