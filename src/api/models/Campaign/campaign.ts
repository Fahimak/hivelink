export interface CreateCampaignReq {
  campaignName: string;
  organizationUuid: string;
  campaignType: string;
}

export interface EditSMSCampaignReq {
  campaignUuid: string;
  campaignName: string;
  smsMessage?: string;
  heading?: string;
  qrCode?: string;
  greetingMessage?: string;
  para1?: string;
  para2?: string;
  para3?: string;
  signOff?: string;
  signatureName?: string;
  signatureDesignation?: string;
  subject?: string;
  campaignType: string;
  ctaEnabled?: boolean;
  ctaName?: string;
  ctaLink?: string;
  headerImage?: string;
  storyCta?: string;
  facebookLink?: string;
  whatsappLink?: string;
  instagramLink?: string;
  template?: number;
  copyrightName?: string;
}

export interface UploadCampaignResourceModel {
  s3Url: string;
}

export interface UploadCampaignResourceReq {
  type: string;
  imageBase64: string;
  organizationUuid: string;
}

export interface LinkedServiceModel {
  serviceName: string;
  serviceType: string;
  serviceUuid: string;
}

export interface CampaignEmailListModel {
  emailId: string;
}

export interface EmailDataModel {
  heading: string;
  qrCode: string;
  greetingMessage: string;
  para1: string;
  para2: string;
  para3: string;
  signOff: string;
  signatureName: string;
  signatureDesignation: string;
  subject: string;
}

export interface AddCampaignNosReq {
  smsNumbersList: string[];
  campaignUuid: string;
}

export interface AddCampaignEmailsReq {
  emailList: string[];
  campaignUuid: string;
}

export interface CampaignModel {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  ipAddress: null | string;
  id: number;
  organizationId: number;
  organizationUuid: string;
  isActive: boolean;
  campaignUuid: string;
  campaignName: string;
  campaignType: string;
  campaignStatus: null | string;
  smsMessage: null | string;
  usersCount: null | number;
}

export interface CampaignNumbersModel {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  isActive: boolean;
  campaignId: number;
  campaignUuid: string;
  phoneNumber: string;
  smsMessage: string;
  country: string;
  status: string;
}
