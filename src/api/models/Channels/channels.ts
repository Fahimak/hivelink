export interface ChannelDetailsModel {
  data: ChannelItemModel;
}

export interface ChannelItemModel {
  objChannel: ChannelObject;
  objChannelProperties: ChannelProperties;
  objChannelPayment: {
    createdAt: number;
    updatedAt: number;
    id: number;
    paymentType: string;
    amount: number;
    channel_id: number;
  };
  objChannelCustomTabs: [
    {
      createdAt: number;
      updatedAt: number;
      id: string;
      columnName: string;
      columnType: string;
      active: boolean;
      channel_id: number;
    }
  ];
  objAccessList: string[];
}

export interface ChannelProperties {
  createdAt: number;
  updatedAt: number;
  id: number;
  channelTier: string;
  contentUpload: boolean;
  category: string;
  logo: string;
  webLogo: string;
  channelType: string;
  defaultChannel: boolean;
  seconds: number;
  advertisment: boolean;
  orderby: string;
  advFrequency: number;
  channel_id: number;
  ctaName: string;
}

export interface ChannelObject {
  createdAt: number;
  updatedAt: number;
  id: number;
  channelName: string;
  banner: string;
  description: string;
  channelUUID: string;
  status: string;
  channelOrder: number;
  reviewedNote: string;
  ownerProfileId: string;
  active: boolean;
  organization_id: {
    createdAt: number;
    updatedAt: number;
    id: number;
    activeFlag: boolean;
    banner: string;
    description: string;
    logo: string;
    webLogo: string;
    marketPlace: string;
    organizationName: string;
    organizationTier: string;
    organizationuuid: string;
    ownerProfileId: string;
    reviewedNote: string;
    status: string;
    communityBio: string;
    communityGuidelines: string;
    communityPolicy: string;
    communityGuide: string;
    communityFlier: string;
    videoUploadGuide: string;
    monetizationPlan: string;
    introVideo: string;
    communitySubDomain: string;
    communityCategory: null;
    isCommunitySubscription: boolean;
    communityLongDesc: string;
    hibernateLazyInitializer: {};
  };
}
