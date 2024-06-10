export interface UniqueSessionsRequest {
  fromDate: null;
  toDate: null;
  organizationUuid: string;
  pageNo: number;
  pageSize: number;
}

export interface SessionsModel {
  content: CtaContents[];
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

export interface ProductDetailsItem {
  appName: string;
  date: string;
  ipAddress: string;
  ipCountry: string;
  ipState: string;
  sessionId: string;
  userDetail: string;
  userId: number;
  userName: string;
}

export interface ProductDetailsModel {
  content: ProductDetailsItem[];
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

export interface UserActionsItem {
  ctaName: string;
  pageName: string;
  date: string;
}

export interface UserActionsModel {
  content: UserActionsItem[];
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

export interface CtaContents {
  userDetail: string;
  sessionId: string;
  userName: string;
  date: string;
  ipState: string;
  ipCountry: string;
  userId: number;
  appName: string;
  ipAddress: string;
}
