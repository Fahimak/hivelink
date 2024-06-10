export interface CreateChannelRequest {
  channelName: string;
  category: string;
  channelTier: string;
  uploadFlag: boolean;
  amount: number;
  paymentType: string;
  organizationId: number;
  description: string;
  channelType: string;
  channelLogo: string;
  channelWebLogo: string;
  channelBanner: string;
  duration: number;
  advFrequency: number;
  advertisement: boolean;
  orderByDesc: boolean;
  channelTabs: ChannelTabs[];
}
interface ChannelTabs {
  tabType: string;
  tabName: string;
  activeFlag: boolean;
}
