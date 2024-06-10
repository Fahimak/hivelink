export interface HiveChannelsModel {
  data: ChannelListModel[];
}

export interface ChannelListModel {
  webLogo: string;

  channelDesc: string;
  hasAccess: boolean;
  isModerator: boolean;
  isDefault: boolean;
  channelId: number;
  channelName: string;
  channelUuid: string;
  channelLogo: string;
  channelTier: string;
  amount: number;
  channelStatus: string;
  duration: number;
  checked: boolean | null;
}
