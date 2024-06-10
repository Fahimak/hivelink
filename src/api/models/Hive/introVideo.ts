export interface ResourcePreSignedModel {
  preSigned: PresignedData;
  sourceUrl: string;
}

export interface PresignedData {
  data: PreSigned;
}

interface PreSigned {
  url: string;
  fields: Fields;
}

interface Fields {
  "Content-Type": string;
  "x-amz-meta-userid": string;
  key: string;
  bucket: string;
  "X-Amz-Algorithm": string;
  "X-Amz-Credential": string;
  "X-Amz-Data": string;
  "X-Amz-Security-Token": string;
  "X-Amz-Signature": string;
  Policy: string;
  "X-Amz-Date": string;
}
