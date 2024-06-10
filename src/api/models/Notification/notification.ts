export interface PaginationModel<T> {
  content: T[];
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: number;
  number: number;
  size: number;
  empty: boolean;
}

export interface NotificationItem {
  createdDate: string;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  userId: number;
  topic: string;
  title: string;
  message: string;
  videoId: null | string;
  channelId: number;
  communityId: number;
  isRead: boolean;
  type: string;
  profileId: string;
}

export interface FCMTokenReq {
  notificationId: string;
  appVersion: string;
  appOS: string;
}
