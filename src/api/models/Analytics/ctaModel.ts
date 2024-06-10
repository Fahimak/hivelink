export interface AnalyticsRequest {
  video?: string;
  userId?: string;
  eventname?: string;
}

export type NameCTAType = "changeChannel" | "changePage";

export interface VisitorsModel {
  date: string;
  newUsers: number;
  existingUsers: number;
}

export interface RevenueGraphModel {
  date: string;
  transactionsAmount: number;
}

export interface ProductCountModel {
  data: ProductCountItem[];
}

export interface ProductCountItem {
  appName: string;
  appDisplayName: string;
  count: number;
}

export interface VisitorsRequest {
  organizationUuid: string;
  fromDate: Date | string | null;
  toDate: Date | string | null;
}

export interface RevenueGraphRequest {
  organizationId: number;
  fromDate: Date | string | null;
  toDate: Date | string | null;
}

export interface ProductDetailsRequest {
  appName: string;
  organizationUuid: string;
  fromDate: Date | string | null;
  toDate: Date | string | null;
  pageNo: number;
  pageSize: number;
}

export interface UserActionsRequest {
  sessionId: string;
  pageNo: number;
  pageSize: number;
}

export interface CtaPageReq {
  webPath: string;
  mobilePath: string;
}

export interface CtaNameReq {
  webPath: string;
  mobilePath: string;
  ctaName: string;
}

export interface AnalyticsCTARequestData {
  ctaName: NameCTAType | string;
  pageName: string;
  sessionId: string;
  appName?: string;
  request?: any;
  ipAddress?: string;
  domain: string;
  app?: string;
  organizationUuid?: string;
  ref?: string | undefined;
}

export interface DefaultCTAModel {
  data: number;
}

export interface RedirectLinksItem {
  redirectName: string;
}

export interface RedirectOriginItem {
  originCount: number;
  origin: string;
}

export interface RedirectLocationItem {
  countryCount: number;
  ipCity: string;
  cityCount: number;
  stateCount: number;
  ipState: string;
  ipCountry: string;
}

export interface RedirectDayWiseItem {
  interactionDate: string;
  sessionCount: number;
}
