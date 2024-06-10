import { AttendeeFormDetails, AttendeeFormDetailsReq } from "../Hive/events";

export interface CreateFormReq {
  formList: AttendeeFormDetails[];
  organizationUuid: string;
  formName: string;
  downloadLink: string;
  emailEnabled: boolean;
  notifyEmails: string[];
}

export interface EditFormReq {
  formList: AttendeeFormDetails[];
  organizationUuid: string;
  formName: string;
  downloadLink: string;
  formUuid: string;
  emailEnabled: boolean;
  notifyEmails: string[];
}

export interface BasicFormReq {
  organizationUuid?: string;
  formUuid: string;
}

export interface FormResponseModel {
  formList: FormResponseItem[];
  createdDate: number;
  ipAddress: string;
  formUuid: string;
  userId: number;
  profileId: string;
  userName: string;
  emailId: string;
  mobileNumber: string;
}

export interface FormResponseItem {
  fieldName: string;
  fieldValue: string;
  isMandatory: boolean;
  options: string[];
  type: string;
}

export interface FormModel {
  id: number;
  organizationUuid: string;
  organizationId: number;
  isActive: boolean;
  formUuid: string;
  formName: string;
  formDetails: AttendeeFormDetailsReq[];
  downloadLink: string;
  createdDate: Date;
  lastModifiedDate: Date;
  createdBy: number;
  lastModifiedBy: number;
  formList: AttendeeFormDetails[];
  responsesCount: number;
  emailEnabled: boolean;
  notifyEmails: string[];
}
