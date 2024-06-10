export interface HiveDetailsModel {
  data: HiveDetails;
}

export interface Metadata {
  title: string;
  description: string;
  image: string;
}
export interface HiveGuidelinesModel {
  title: string;
  answer: string;
  id: number;
}

export interface HiveDetails {
  communityId: number;
  communityGuidelines: null;
  communityPolicy: string;
  communityGuide: string;
  communityFlier: string;
  videoUploadGuide: string;
  monetizationPlan: string;
  introVideo: string;
  communityName: string;
  communityTier: string;
  communityLogo: string;
  communityWebLogo: string;
  communityBanner: string;
  marketPlace: string;
  description: string;
  communityUuid: string;
  communitySubDomain: string;
  communityBio: string;
  longDescription: string;
  communityGuidelinesFlag: null;
  communityPolicyFlag: null;
  communityGuideFlag: null;
  communityFlierFlag: null;
  videoUploadGuideFlag: null;
  monetizationPlanFlag: null;
  introVideoFlag: null;
  communityNameFlag: null;
  communityTierFlag: null;
  marketPlaceFlag: null;
  descriptionFlag: null;
  communitySubDomainFlag: null;
  communityBioFlag: null;
  longDescriptionFlag: null;
  communityLogoFlag: null;
  communityWebLogoFlag: null;
  communityBannerFlag: null;
  showSuggested: boolean;
  chatSupportEnabled: boolean;
}

export interface ChannelUser {
  profilePhoto: string;
  createdDate: string;
  user: string;
  userName: string;
  userId: number;
  channelId: number;
  status: string;
}

export interface SocialLinksModel {
  data: SocialLinksItem[];
}

export interface SocialLinksItem {
  isActive: boolean;
  componentCode: string;
  componentName: string;
  route: string;
  icon: string;
}

export interface PublicHivesModel {
  data: PublicHivesItem[];
}

export interface PublicHivesItem {
  id: number;
  organizationName: string;
  organizationTier: string;
  organizationLogo: string;
  organizationBanner: null;
  marketPlace: string;
  description: string;
  communityUuid: string;
  communityId: number;
  communitySubDomain: string;
  userCount: string;
}

export interface ContactInfoModel {
  isActive: boolean;
  email: string;
  address: string;
}

export interface ContextDetailsModel {
  date_modified: string;
  organization_context: string;
  organization_persona: string;
  organization_domain: string;
  organization_id: number;
  organization_name: string;
  product_links: ProductLinks[];
}

export interface ProductLinks {
  id: string;
  link: string;
  product_name: string;
}
