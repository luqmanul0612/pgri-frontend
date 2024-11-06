export interface IMemberByIdResponse {
    status: number;
    data: UserData;
  }
  
export interface UserData {
    user: User;
    institution: Institution;
    photo: Photo;
  }
  
export interface User {
    id: number;
    nik: string;
    npa_number: string;
    phone_number: string;
    name: string;
    profile: string | null;
    religion: string;
    birth_place: string;
    dob: string;
    address: string;
    postal_code: string;
    blood_type: string;
    gender: string;
    email: string;
    latest_education: string;
    created_at: string;
    qr: string;
    data: UserStatistics;
  }
  
 export interface UserStatistics {
    pelatihan: number;
    karya: number;
    aspirasi: number;
  }
  
export  interface Institution {
    stage: string;
    province: string;
    province_code: string;
    city: string;
    city_code: string;
    district: string;
    district_code: string;
    sub_district: string;
    sub_district_code: string;
    name: string;
    job_title: string;
    address: string;
    grade: string;
    employee_status: string;
    educator_certificate: boolean;
    study_subjects: string;
    created_at: string;
    updated_at: string | null;
  }
  
 export interface Photo {
    ktp: string[];
    profile: string[];
  }
  