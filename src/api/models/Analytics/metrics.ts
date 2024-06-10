export interface VideoCountModel {
  data: VideoCountItem;
}

export interface VideoCountItem {
  noOfVideos: number;
}

export interface UsersCountModel {
  data: UsersCountItem;
}

export interface UsersCountItem {
  noOfUsers: number;
}

export interface RevenueModel {
  transactionsCount: number;
  transactionsAmount: number;
}

export interface RedirectLinkReq {
  organizationUuid: string;
  redirect?: string;
  origin?: string;
}

export interface RevenueCountModel {
  data: RevenueCountItem;
}

export interface ChannelMetricsModel {
  channelId: number;
  channelName: string;
  channelTier: string;
  channelAmount: number;
  totalMembers: number;
  totalVideos: number;
  totalRevenue: number;
}

export interface RevenueCountItem {
  totalRevenue: number;
}

export interface StoryViewModel {
  countInteractions: number;
  storyUuid: string;
  count: number;
}

export interface AllStoryViewsModel {
  storyUuid: string;
  storyViews: number;
  storyInteractions: number;
}

export interface PurchaseDetailModel {
  createdDate: number;
  transactionAmount: number;
  cartId: number;
  transactionStatus: string;
  userName: string;
}

export interface PurchaseChannelModel {
  channelId: number;
  channelName: string;
  channelTier: string;
  channelAmount: number;
  totalMembers: number;
  totalVideos: number;
}

export interface ChannelsCountModel {
  data: ChannelsCountItem;
}

export interface ChannelsCountItem {
  noOfChannels: number;
}

export interface MetricsRequestModel {
  hiveId: number;
}
export interface UsageRequestModel {
  organizationId: number;
}

export interface UsageRespModel {
  bytesStreamed: number;
  bytesStored: number;
}

export interface SentimentAnalysisModel {
  Negative: number;
  Neutral: number;
  Positive: number;
}
export interface WordCloudModel {
  text: string;
  value: number;
}
