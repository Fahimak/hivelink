export interface HiveActivitiesModel {
  data: HiveActivitiesItem;
}

export interface HiveActivitiesItem {
  content: HiveContentItem[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface HiveContentItem {
  id: number;
  user_id: number;
  is_active: boolean;
  profile_photo: string | null;
  community_id: number;
  ip_address: string;
  activity_Type: string;
  created_by: string;
  last_modified_by: string;
  last_modified_date: string;
  channel_id: number;
  activity: string;
  created_date: string;
}

export interface OnlineMembersModel {
  userName: string;
  organizationUuid: string;
  sessionId: string;
  profilePhoto: string;
}
