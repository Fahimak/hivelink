export interface EditHiveRequest {
  communityName: string;
  communityTier: string;
  communityLogo: string;
  communityBanner: string | null;
  marketPlace: string;
  description: string;
  communityUuid: string;
  communitySubDomain: string;
  communityId: number;
  communityBio: string;
  communityNameFlag: boolean;
  communityTierFlag: boolean;
  marketPlaceFlag: boolean;
  descriptionFlag: boolean;
  communitySubDomainFlag: boolean;
  communityBioFlag: boolean;
  communityLogoFlag: boolean;
  communityBannerFlag: boolean;
  longDescription: string;
  communityWebLogo: string;
  communityWebLogoFlag: boolean;
  longDescriptionFlag: boolean;
  introVideo: string;
  introVideoFlag: boolean;
  showSuggested: boolean;
  showSuggestedFlag: boolean;
  chatSupportEnabledFlag: boolean;
  chatSupportEnabled: boolean;
  customDomain: string;
  customDomainFlag: boolean;
  introVideoThumbnail: string;
  introVideoThumbnailType: string;
  introVideoThumbnailFlag: boolean;
}

export interface ContextRequest {
  organizationId: number;
  organizationUuid: string;
  organizationContext: string;
  organizationName: string;
  organizationPersona: string;
}
