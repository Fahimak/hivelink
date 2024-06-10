export interface Attribute2 {
  title: string;
  description: string;
}

export interface UploadContentModel {
  data: UploadContentItem;
}

export interface UploadContentItem {
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
}

export interface YoutubeVideoData {
  channelID: string; // Required. Channel UUID
  sourceURL: string; // Required. Used to set the S3_Path and sourceUrl of the video.
  attribute1?: []; // Optional. Used to set corresponding attribute of the video if provided.
  attribute2?: []; // Optional. Used to set corresponding attribute of the video if provided.
  attribute3: string[]; // Optional. Used to set corresponding attribute of the video if provided.
  tags: string[]; // Optional. If provided, used to set the tags of the video.
  productUrl: string; // Optional. If provided, used to set the horizontal video URL.
  name: string; // Required. Used to set the actual file name.
  receipeName: string; // Required. Used to set the video title.
  channelType: string; // Required. Used to set the channel type of the video.
  itemDescription: string | null; // Required. Used to set the video description.
  previewImage: string; // Required. Used to set the preview image of the video.
  thumbnail: string; // Required. Used to set the thumbnail of the video.
  communityId: number;
}

export interface ReUploadUrlRequest {
  organisationID: string;
  channelID: string;
  userId: string;
  videoId: string;
  thumbnail: string;
}

export interface ContentUploadRequest {
  organisationID: string;
  channelID: string;
  thumbNailBase64: string;
  previewImage: string;
  userId: string;
  name: string;
  channelType: string;
  attribute5: [];
  attribute4: [];
  attribute3: string[];
  attribute2: {
    description: string;
    title: string;
  }[];
  attribute1: string[];
  receipeName: string;
  itemDescription: null;
  tags: string[];
  productUrl?: string;
  pitchDeckFile?: string;
  pitchDeckFileType?: string;
  ctaName?: string;
  communityId: number;
}

export interface SpotlightModel {
  data: SpotlightItem[];
}

export interface SpotlightItem {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  isActive: boolean;
  communityId: number;
  spotlightType: string;
  spotlightName: string;
  spotlightImage: string;
  channelId: number;
  channelUuid: string;
  eventIdentifier: string;
}

export interface SpotlightVidsModel {
  data: SpotlightVidsItem[];
}

export interface SpotlightVidsItem {
  createdDate: number;
  uploadby: string;
  previewImage: string;
  attribute1: string[];
  attribute2: Attribute2[];
  attribute3: string[];
  status: string;
  profilePic: string;
  S3_Path: string;
  name: string;
  actualFileName: string;
  active: boolean;
  uploaduser: string;
  thumbnail: string;
  description: string;
  id: string;
  tags: string[];
  sourceURL: string;
}
