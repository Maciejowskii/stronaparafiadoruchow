export interface MassScheduleItem {
  location?: string;
  label: string;
  times: string[];
}

export interface OfficeHourItem {
  day: string;
  hours: string;
}

export interface OfficeVacationInfo {
  enabled: boolean;
  title: string;
  message: string;
  period: string;
}

export interface PriestInfo {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}
