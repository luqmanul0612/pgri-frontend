// Enhanced types for Member Verification screen
export interface IMemberVerificationResponse {
  status: number;
  message: string;
  data: IMemberVerificationData;
}

export interface IMemberVerificationData {
  member: IMember;
  verification: IVerificationInfo;
}

export interface IMember {
  id: number;
  npa: string;
  nik: string;
  name: string;
  photo: string | null;
  birthInfo: IBirthInfo;
  contactInfo: IContactInfo;
  address: IAddress;
  professionalInfo: IProfessionalInfo;
  statistics: IMemberStatistics;
  qrCode: string;
  membershipStatus: string;
  createdAt: string;
}

export interface IBirthInfo {
  birthPlace: string;
  birthDate: string;
  age?: number;
}

export interface IContactInfo {
  email: string;
  phone: string;
  religion: string;
  bloodType: string;
  gender: "L" | "P";
}

export interface IAddress {
  street: string;
  postalCode: string;
  administrativeInfo: IAdministrativeInfo;
}

export interface IAdministrativeInfo {
  province: string;
  regency: string;
  district: string;
  subDistrict: string;
  village?: string;
}

export interface IProfessionalInfo {
  institution: IInstitution;
  employmentInfo: IEmploymentInfo;
}

export interface IInstitution {
  name: string;
  level: string;
  type: string;
  address: string;
  administrativeInfo: IAdministrativeInfo;
}

export interface IEmploymentInfo {
  position: string;
  rank: string;
  status: string;
  employmentType: string;
  certifiedEducator: boolean;
  subjects: string;
  startYear?: string;
}

export interface IMemberStatistics {
  trainings: number;
  works: number;
  aspirations: number;
  achievements?: number;
  participations?: number;
}

export interface IVerificationInfo {
  verificationTime: string;
  verificationMethod: "qr" | "manual" | "biometric";
  activityType: string;
  verifiedBy?: string;
  location?: string;
}

// UI State types
export type VerificationStatus = "loading" | "success" | "error" | "not_found";

export interface IVerificationState {
  status: VerificationStatus;
  memberData: IMemberVerificationData | null;
  error: string | null;
  isLoading: boolean;
}

// Form types for manual input
export interface IManualVerificationForm {
  npa: string;
  activityType: string;
}

// Minimal interface for QR verification - only includes data actually used in UI
export interface IMinimalMemberData {
  name: string;
  npa: string;
  photo: string | null;
  createdAt: string;
}

export interface IMinimalVerificationData {
  member: IMinimalMemberData;
  verification: {
    verificationTime: string;
    verificationMethod: "qr" | "manual" | "biometric";
    activityType: string;
  };
}

export interface IMinimalVerificationState {
  status: VerificationStatus;
  memberData: IMinimalVerificationData | null;
  error: string | null;
  isLoading: boolean;
}
