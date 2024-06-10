export interface CreateStoryModel {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  organizationId: number;
  organizationUuid: string;
  isActive: boolean;
  storyUuid: string;
  storyUrl: string;
  storyTitle: string;
  storyType: string;
  storyDescription: string;
}

export interface AddSegmentRequest {
  description: string;
  isActive: boolean;
  storyUrl: string;
  storyUuid: string;
  title: string;
  isImage: boolean;
  isVideo: boolean;
  colorCode: string;
  communityUuid: string;
  contentType: string;
  order: number;
}

export interface EditSegmentRequest {
  description: string;
  isActive: boolean;
  storyUrl: string;
  storyUuid: string;
  title: string;
  isImage: boolean;
  isVideo: boolean;
  colorCode: string;
  communityUuid: string;
  contentType: string;
  storyId: number;
  isMediaChanged: boolean;
  thumbnail: string | null;
  actionLink: string | null;
  order: number;
}

export interface EditStoryRequest {
  organizationUuid: string;
  storyUuid: string;
  thumbnail: string | null;
  title: string;
  description: string;
}

export interface SegmentItem {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  isActive: boolean;
  storyUuid: string;
  storyUrl: string | null;
  title: string;
  type: string | null;
  actionLink: string | null;
  description: string;
  isRemoved: boolean | null;
  colorCode: string | null;
  storyUrlPath: string;
  thumbnailUrl: string;
  segmentOrder: number;
  selectedEmoji: string;
}

export interface StoryItemModel {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  organizationId: number;
  organizationUuid: string;
  isActive: boolean;
  storyUuid: string;
  storyUrl: string | null;
  storyTitle: string;
  storyType: string | null;
  storyDescription: string;
  thumbnailUrl: string | null;
  colorCode: string;
  storyPublishedUrl: string;
}

export interface StorySocialCountItem {
  originCount: number;
  origin: string;
}

export interface AddSegmentModel {
  objStoryDetailsTable: SegmentItem;
  objPreSignedResponse: any;
}

export interface CreateStoryRequest {
  title: string;
  description: string;
  organizationId: number;
  organizationUuid: string;
}

export interface StoryLocationModel {
  locationCount: number;
  location: string;
}

export interface ReactionModel {
  reactionCount: number;
  reactionType: string;
  reactionId: number;
}

export interface StoriesRequest {
  storyUuid: string;
}

export interface OrganizationStory {
  id: number;
  storyUuid: string;
  storyUrl: string;
  title: string;
  type: string;
  description: string;
  actionLink: string;
  colorCode: string;
  longDescriptionList: [];
  textColorCode: string;
}

export interface OrganizationStoryObject {
  storyItemId: number;
  storyUuid: string;
  url: string;
  title: string;
  type: string;
  description: string;
  selectedEmoji: string;
  actionLink: string;
  colorCode: string;
  longDescriptionList: [];
  textColorCode: string;
}

export interface OrganizationStoryItem {
  id: number;
  organizationId: number;
  organizationUuid: string;
  storyItemId: number;
  storyUuid: string;
  storyUrl: string;
  storyTitle: string;
  storyType: string;
  storyDescription: string;
  thumbnailUrl: string;
  colorCode: string;
}

export interface StoriesReactionRequest {
  storyUuid: string;
  reactionId: number;
  reactionType: string;
  storySegmentId: number;
  sessionId: string;
}

export interface StoryOrderRequest {
  order: number;
  storyUuid: string;
  storySegmentId: number;
}

export interface SegmentItemReactRequest {
  storyUuid: string;
  storySegmentId: number;
  sessionId: string;
}

export interface StoryDayWiseReq {
  storyUuid: string;
  fromDate: Date | null;
  toDate: Date | null;
}

export interface SegmentItemReactModel {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  ipAddress: string;
  id: number;
  isActive: boolean;
  storyUuid: string;
  storySegmentId: number;
  reactionType: string;
  reactionId: string;
  sessionId: string;
  userId: number;
}

export interface StoryDaywiseAnalytics {
  interactionDate: string;
  countInteractions: number;
  count: number;
}
