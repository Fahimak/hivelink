import {
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { YTUploadContent, uploadContent } from "api/routes/Videos/upload";
import { populateFormData } from "utils/populateForm";
import { uploadToS3 } from "api/routes/Hive/client";
import revalidateTags from "utils/revalidate";
import { useRouter } from "next/navigation";
import { org_uuid } from "constants/constants";

interface UseVideoUploadReturn {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
  contentType: string;
  setContentType: Dispatch<SetStateAction<string>>;
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
  youtubeUrl: string;
  setYoutubeUrl: Dispatch<SetStateAction<string>>;
  handleVideoUpload: any;
  isLoading: boolean;
}

export const useUploadVideo = (hive: HiveDetails): UseVideoUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [contentType, setContentType] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toastSuccess, toastError } = useTriggerAlert();

  const router = useRouter();

  const handleContentUpload = async (
    channelUuid: string,
    videoTitle: string,
    attr3: string,
    values: string[],
    productUrl: string,
    pitchDeckFile: string,
    pitchDeckFileType: string
  ) => {
    setIsLoading(true);

    const contentUploaded = await uploadContent({
      organisationID: org_uuid,
      channelID: channelUuid || "",
      thumbNailBase64: thumbnail,
      previewImage: thumbnail,
      userId: "1324",
      name: videoTitle,
      channelType: "VIDEO",
      attribute5: [],
      attribute4: [],
      attribute3: [attr3],
      attribute2: [],
      attribute1: [],
      receipeName: videoTitle,
      itemDescription: null,
      tags: values.slice(0, 5),
      productUrl: productUrl,
      communityId: hive.communityId || 0,
      pitchDeckFile: pitchDeckFile,
      pitchDeckFileType: pitchDeckFileType,
    });

    const formData = new FormData();
    populateFormData(formData, contentUploaded.data, file!);
    const uploaded = await uploadToS3(contentUploaded.data.url, formData);
    if (uploaded) {
      await revalidateTags("videos");
      toastSuccess("Video Uploaded!");
      router.push(`/channels/${channelUuid}`);
    } else {
      setIsLoading(false);

      toastError("Failed to upload video");
    }
  };

  const handleYoutubeVideoUpload = async (
    channelUuid: string,
    attr3: string,
    videoTitle: string,
    values: string[]
  ) => {
    setIsLoading(true);

    const ytUploaded = await YTUploadContent({
      channelID: channelUuid || "",
      previewImage: thumbnail,
      channelType: "YOUTUBE",
      attribute3: [attr3],
      attribute2: [],
      attribute1: [],
      receipeName: videoTitle,
      itemDescription: null,
      tags: values.slice(0, 5),
      productUrl: youtubeUrl,
      thumbnail: thumbnail,
      name: videoTitle,
      sourceURL: "",
      communityId: hive?.communityId || 0,
    });

    if (ytUploaded) {
      toastSuccess("Youtube Video Uploaded Successfully");
      setYoutubeUrl("");
      setSelectedTab(0);
      setFile(null);
      router.push(`/channels/${channelUuid}`);
      revalidateTags("videos");
    } else {
      setIsLoading(false);

      toastError("Failed to upload youtube video");
    }
  };

  const handleVideoUpload = async (
    channelUuid: string,
    videoTitle: string,
    attr3: string,
    values: string[],
    productUrl: string,
    pitchDeckFile: string,
    pitchDeckFileType: string
  ) => {
    selectedTab === 1
      ? handleYoutubeVideoUpload(channelUuid, attr3, videoTitle, values)
      : handleContentUpload(
          channelUuid,
          videoTitle,
          attr3,
          values,
          productUrl,
          pitchDeckFile,
          pitchDeckFileType
        );
  };

  return {
    file,
    setFile,
    selectedTab,
    setSelectedTab,
    contentType,
    setContentType,
    thumbnail,
    setThumbnail,
    youtubeUrl,
    setYoutubeUrl,
    handleVideoUpload,
    isLoading,
  };
};
