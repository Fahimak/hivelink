export interface MembersItemModel {
  dateJoined: string;
  isModerator: boolean;
  isSuperAdmin: boolean;
  createdAt: string | null;
  userId: number;
  userName: string;
  userContactDetails: string;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface MembersModel {
  content: MembersItemModel[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
