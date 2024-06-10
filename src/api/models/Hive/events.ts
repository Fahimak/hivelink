export interface EventsRequestModel {
  eventName: string;
  eventDescription: string;
  eventVideo: string;
  eventThumbnail: string;
  eventBanner: string;
  eventStartDate: Date | null;
  eventEndDate: Date | null;
  eventDurationInMinutes: number;
  eventMedium: string;
  eventLocation: string;
  eventAddress: string;
  eventColor: string;
  organizationUuid: string;
  formDetails: AttendeeFormDetails[];
  isPaidEvent: boolean;
  eventAmount: number;
  eventCurrency: string;
}

export interface AttendeeFormDetails {
  fieldName: string;
  isMandatory: boolean;
  type: string;
  options: string[];
}

export interface AttendeeFormDetailsReq {
  fieldName: string;
  fieldValue: string;
  type: string;
  options: string[];
}

export interface EventsEditRequestModel {
  eventName?: string;
  eventDescription?: string;
  eventVideo?: string;
  eventThumbnail?: string | null;
  eventBanner?: string | null;
  eventStartDate?: Date | null;
  eventEndDate?: Date | null;
  eventDurationInMinutes?: number;
  eventMedium?: string;
  eventLocation?: string;
  eventAddress?: string;
  eventColor?: string;
  organizationUuid: string;
  eventUuid: string;
  formDetails?: AttendeeFormDetails[];
  isPaidEvent?: boolean;
  eventAmount?: number;
  eventCurrency?: string;
}

export interface EventsContentUploadModel {
  eventUuid: string;
  contentType: string;
  organizationUuid: string;
}

export interface EventsModel {
  event: EventsItem;
  hasAccess: number;
  hostDetails: {
    userName: string;
    email: string;
    phone: string;
    phoneExt: number;
    profilePhoto: null | string;
  };
  organizationDetail: {
    organizationName: string;
    organizationDesc: string;
  };
  formDetails: AttendeeFormDetails[];
  isFormFilled: boolean;
  qrCodeLink: string;
}

export interface EventsItem {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  ipAddress: null | string;
  id: number;
  eventUuid: string;
  eventIdentifier: string;
  organizationId: number;
  organizationUuid: string;
  isActive: boolean;
  eventName: string;
  eventDescription: string;
  eventVideo: string;
  eventThumbnail: string;
  eventBanner: string;
  eventStartDate: any;
  eventEndDate: any;
  eventDurationInMinutes: null | number;
  eventMedium: string;
  eventLocation: string;
  eventAddress: string;
  eventColor: string;
  eventLink: null | string;
  eventAmount: number;
  isPaidEvent: boolean;
  eventCurrency: string;
}

export interface EventUserItem {
  userName: string;
  email: string;
  phone: string;
  profileId: string;
  phoneExt: number;
  profilePhoto: string;
  eventForm: AttendeeFormDetailsReq[];
}

export interface EventPromoModel {
  newAmount: number;
  promoCode: string;
  flatOrPercent: string;
  promoAmount: number;
  promoPercent: null;
}

export interface EventPromoReq {
  promoCode: string;
  eventUuid: string;
  organizationUuid: string;
}

export interface EventPresignedResponse {
  headers: {
    "Content-Type": string[];
    "Transfer-Encoding": string[];
    Date: string[];
    "Keep-Alive": string[];
    Connection: string[];
  };
  body: {
    data: {
      url: string;
      fields: {
        "Content-Type": string;
        "x-amz-meta-userid": string;
        key: string;
        bucket: string;
        "X-Amz-Algorithm": string;
        "X-Amz-Credential": string;
        "X-Amz-Date": string;
        "X-Amz-Security-Token": string;
        Policy: string;
        "X-Amz-Signature": string;
      };
    };
  };
  statusCodeValue: number;
  statusCode: string;
}

export interface EventsListModel {
  title: string;
  start: number;
  end: number;
}

export interface GalleryItem {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  ipAddress: string | null;
  id: number;
  eventUuid: string;
  eventId: number;
  isActive: boolean;
  galleryUrl: string;
  thumbnailUrl: string;
}

export interface QRUserSummary {
  userName: string;
  email: string;
  phone: string;
  phoneExt: number;
  profilePhoto: string | null;
  profileId: string;
}
export interface QRFormDetail {
  type: string;
  options: string[];
  fieldName: string;
  fieldValue: string;
}

export interface UserQRData {
  userSummary: QRUserSummary;
  formDetails: QRFormDetail[];
}
