"use client";
import { UploadContentItem } from "api/models/Videos/uploadContent";

export const populateFormData = (
  formData: FormData,
  contentUploadResp: UploadContentItem,
  file: File
) => {
  formData.append(
    "x-amz-meta-userid",
    contentUploadResp?.fields["x-amz-meta-userid"]!
  );
  formData.append("Content-Type", "video/mp4");
  formData.append("key", contentUploadResp?.fields.key!);
  formData.append("bucket", contentUploadResp?.fields.bucket!);
  formData.append(
    "X-Amz-Algorithm",
    contentUploadResp?.fields["X-Amz-Algorithm"]!
  );
  formData.append(
    "X-Amz-Credential",
    contentUploadResp?.fields["X-Amz-Credential"]!
  );
  formData.append("X-Amz-Date", contentUploadResp?.fields["X-Amz-Date"]!);
  formData.append(
    "X-Amz-Security-Token",
    contentUploadResp?.fields["X-Amz-Security-Token"]!
  );
  formData.append(
    "X-Amz-Signature",
    contentUploadResp?.fields["X-Amz-Signature"]!
  );
  formData.append("Policy", contentUploadResp?.fields.Policy!);
  formData.append("file", file!);
};

export const populateFormDataWithType = (
  formData: FormData,
  contentUploadResp: UploadContentItem,
  file: File
) => {
  formData.append(
    "x-amz-meta-userid",
    contentUploadResp?.fields["x-amz-meta-userid"]!
  );
  formData.append("Content-Type", file.type);
  formData.append("key", contentUploadResp?.fields.key!);
  formData.append("bucket", contentUploadResp?.fields.bucket!);
  formData.append(
    "X-Amz-Algorithm",
    contentUploadResp?.fields["X-Amz-Algorithm"]!
  );
  formData.append(
    "X-Amz-Credential",
    contentUploadResp?.fields["X-Amz-Credential"]!
  );
  formData.append("X-Amz-Date", contentUploadResp?.fields["X-Amz-Date"]!);
  formData.append(
    "X-Amz-Security-Token",
    contentUploadResp?.fields["X-Amz-Security-Token"]!
  );
  formData.append(
    "X-Amz-Signature",
    contentUploadResp?.fields["X-Amz-Signature"]!
  );
  formData.append("Policy", contentUploadResp?.fields.Policy!);
  formData.append("file", file!);
};
