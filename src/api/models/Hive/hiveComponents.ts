export interface HiveComponents {
  data: RawComponents[];
}

export interface RawComponents {
  createdDate: number;
  lastModifiedDate: number;
  createdBy: number;
  lastModifiedBy: number;
  id: number;
  organizationId: number;
  organizationUuid: string;
  isActive: boolean;
  componentType: string;
  componentCode: string;
  componentName: string;
  componentDescription: string;
  componentIcon: string;
  componentRoute: string;
  accessType: string;
}

export interface Components {
  componentType: string;
  componentCode: string;
  componentName: string;
  componentDescription: string;
  componentIcon: string;
  componentRoute: string;
  accessType: string;
}

export interface ChildComponent {
  parentComponentCode: string;
  componentType: string;
  componentCode: string;
  componentName: string;
  componentDescription: string;
  componentIcon: string;
  componentRoute: string;
  accessType: string;
}
