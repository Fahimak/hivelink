import { HiveDetails } from "api/models/Hive/hiveDetails";
import LineBreak from "components/LineBreak";
import { org_uuid } from "constants/constants";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getVideoThumbnail } from "utils/getVideoThumbnail";

const MAX_FILE_SIZE = 1024 * 1024 * 1024;

interface Props {
  duration?: string;
  uploadWhenFinished?: boolean;
  hiveDetails?: HiveDetails;
  currentEvent?: any;
  setThumbnail: Dispatch<SetStateAction<any>>;
  setVideoFile: Dispatch<SetStateAction<File | null>>;
  setContentType: Dispatch<SetStateAction<string>>;
}

const FileDrop = ({
  duration,
  uploadWhenFinished,
  hiveDetails,
  setContentType,
  setThumbnail,
  setVideoFile,
}: Props) => {
  const { toastError } = useTriggerAlert();

  const hiveUuid = org_uuid;

  const handleDrop = (acceptedFiles: File[]) => {
    /// Get the first file
    const file = acceptedFiles[0];

    if (file.size > MAX_FILE_SIZE) {
      toastError("File size exceeds 1GB limit.");
      return;
    }

    if (file.type === "video/mp4" || file.type === "video/quicktime") {
      // Create a new FileReader
      const reader = new FileReader();

      // Read the file as a data URL
      reader.readAsDataURL(file);

      getVideoThumbnail(file).then((thumbnail) => {
        setThumbnail(thumbnail);
        setVideoFile(acceptedFiles[0]);
        !!setContentType && setContentType(file.type);
        // uploadWhenFinished &&
        //   dispatch(
        //     uploadEventVideo({
        //       eventUuid: currentEvent?.eventUuid || "",
        //       organizationUuid: hiveUuid,
        //       contentType: "video/mp4",
        //     })
        //   );
      });
    } else {
      toastError(`Please upload a video instead of ${file.type}`);
    }
  };

  const onDropAccepted = useCallback(
    handleDrop,
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDropAccepted,
  });

  return (
    <div className="dropzone">
      <div
        {...getRootProps()}
        className={`dropzone-wrapper ${
          isDragActive ? "dropzone--isActive" : ""
        } ${isDragAccept ? "dropzone--isAccept" : ""} ${
          isDragReject ? "dropzone--isReject" : ""
        }`}
      >
        <input accept="video/*" {...getInputProps()} />
        <svg
          width="41"
          height="29"
          viewBox="0 0 41 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.0001 29H31C36.2467 29 40.5 24.7467 40.5 19.5C40.5 14.7115 36.9571 10.7504 32.3497 10.0951C31.437 4.37297 26.4792 0 20.5 0C13.8726 0 8.5 5.37258 8.5 12L8.50001 12.0145C4.03831 12.2733 0.5 15.9734 0.5 20.5C0.5 25.1944 4.30558 29 9 29H19.0001V17.1213L16.4143 19.7071C16.2191 19.9024 15.9025 19.9024 15.7072 19.7071L14.293 18.2929C14.0977 18.0976 14.0977 17.781 14.293 17.5858L19.4395 12.4393C20.0252 11.8536 20.975 11.8536 21.5608 12.4393L26.7072 17.5858C26.9025 17.781 26.9025 18.0976 26.7072 18.2929L25.293 19.7071C25.0977 19.9024 24.7812 19.9024 24.5859 19.7071L22.0001 17.1213V29Z"
            fill="#161823"
            fillOpacity="0.34"
          />
        </svg>

        <LineBreak />
        <h1 className="font-bold text-lg">Select video to upload</h1>
        <p>or drag and drop a file</p>
        <LineBreak />
        <p>MP4 or WebM</p>
        <p>720x1280 resolution or higher</p>
        <p>Up to {duration || "30 minutes"}</p>
        <p>Less than 1 GB</p>
        <LineBreak />
        <div className="primaryBtn half_width">Upload</div>
      </div>
    </div>
  );
};

export default FileDrop;
