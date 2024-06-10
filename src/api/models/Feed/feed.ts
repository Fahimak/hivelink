import { VideoListItem } from "../Videos/videoList";

export interface FeedItem {
  createdDate: number;
  description: string;
  name: string;
  organisationId: string;
  previewImage: string;
  profilePhoto: string;
  sourceUrl: string;
  tags: string[];
  thumbnailUrl: string | null;
  totalRecords: number;
  userId: string;
  userName: string;
  videoId: string;
  videoUuid: string;
}

export interface FeedModel {
  totalCount: number;
  videos: VideoListItem[];
}

export interface FeedRequestModel {
  organizationUuid: string;
  pageNo: number;
  contentLimit: number;
  searchQuery: string | null;
}
