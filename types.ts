export enum AppView {
  HOME = 'HOME',
  COMPLAINT_FORM = 'COMPLAINT_FORM',
  TRACK_STATUS = 'TRACK_STATUS',
  LEGAL_INFO = 'LEGAL_INFO',
  POLICE_DASHBOARD = 'POLICE_DASHBOARD',
  DATA_ARCHIVE = 'DATA_ARCHIVE'
}

export interface ComplaintData {
  isAnonymous: boolean;
  victimName?: string;
  victimPhone?: string;
  relationToVictim: string;
  incidentDate: string;
  state: string;
  district: string;
  pincode: string;
  accusedName: string;
  accusedRelation: string;
  dowryType: string[];
  description: string;
  evidenceFiles: File[];
  severityScore?: number; // AI generated
}

export enum DowryType {
  CASH = 'Cash Demand',
  VEHICLE = 'Vehicle Demand',
  PROPERTY = 'Property/Land',
  JEWELRY = 'Jewelry/Valuables',
  WEDDING_EXPENSES = 'Wedding Expenses Coercion',
  DOMESTIC_VIOLENCE = 'Physical Abuse/Violence',
  MENTAL_HARASSMENT = 'Mental Harassment'
}

export interface TrackingResult {
  id: string;
  status: 'RECEIVED' | 'UNDER_REVIEW' | 'ASSIGNED' | 'ACTION_TAKEN' | 'CLOSED';
  policeStation: string;
  officerAssigned?: string;
  lastUpdate: string;
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
];