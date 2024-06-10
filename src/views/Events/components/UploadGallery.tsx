import { EventsItem } from "api/models/Hive/events";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchClientPresignedUrl } from "api/routes/Events/client";
import { uploadGalleryEvent } from "api/routes/Events/events";
import { uploadToS3 } from "api/routes/Hive/client";
import CircularProgressWithLabel from "components/CircularProgressWithLabel";
import UploadImageSVG from "assets/svg/upload_image.svg";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getVideoThumbnail } from "utils/getVideoThumbnail";
import { populateFormDataWithType } from "utils/populateForm";
import revalidateTags from "utils/revalidate";
import Image from "next/image";

type Props = {
  hiveDetails: HiveDetails;
  currentEvent: EventsItem;
};

type UploadedFile = {
  file: File;
  sourceUrl: string;
};

const UploadGallery = ({ hiveDetails, currentEvent }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentUploading, setCurrentUploading] = useState(-1);

  const handleDrop = async (acceptedFiles: File[]) => {
    var count = 0;
    setUploadingFiles((prevState) => [...prevState, ...acceptedFiles]);
    // setCurrentUploading(-1);

    acceptedFiles.map(async (file, idx) => {
      setProgress(0);
      setCurrentUploading(count);
      // Dispatch an action to get the pre-signed URL
      const data = await fetchClientPresignedUrl({
        type: "eventGallery",
        communityId: hiveDetails?.communityId || 0,
        file: file,
        fileType: file.type,
      });

      setProgress(100);
      if (data) {
        const formData = new FormData();
        populateFormDataWithType(formData, data.preSigned.data, file);
        await uploadToS3(data.preSigned.data.url, formData);
        if (file.type === "video/mp4") {
          await getVideoThumbnail(file).then((thumbnail) => {
            uploadGalleryEvent({
              eventUuid: currentEvent?.eventUuid || "",
              galleryUrl: data?.sourceUrl || "",
              eventThumbnail: thumbnail as string,
            });
          });
        } else {
          uploadGalleryEvent({
            eventUuid: currentEvent?.eventUuid || "",
            galleryUrl: data?.sourceUrl || "",
            eventThumbnail: "",
          });
        }
        await revalidateTags("gallery");
      }
      uploadedFiles.push({ file: file, sourceUrl: data?.sourceUrl || "" });

      count += 1;
      setCurrentUploading(count);
      setProgress(0);
    });
  };

  const onDropAccepted = useCallback(handleDrop, []);
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
    <div
      {...getRootProps()}
      className={`pointer upload_wrapper dropzone ${
        isDragActive ? "dropzone--isActive border-blue-600" : ""
      } ${isDragAccept ? "dropzone--isAccept border-blue-600" : ""} ${
        isDragReject ? "dropzone--isReject border-red-600" : ""
      }`}
    >
      <input accept="*" {...getInputProps()} />
      {
        <div key={progress} className="upload_content_banner_wrapper">
          <div className="gallery_items_container">
            {uploadingFiles ? (
              uploadingFiles.map((file, idx) => {
                return (
                  <div className="gallery_item_uploading" key={idx}>
                    <img
                      loading="lazy"
                      className="gallery_image_uploading"
                      src={
                        uploadedFiles[idx]?.sourceUrl ||
                        "https://veehivestage-images.s3.us-east-2.amazonaws.com/webApp/uplaoding.png"
                      }
                    />

                    <div className="gallery_loader">
                      {uploadedFiles[idx] ? (
                        <CircularProgressWithLabel
                          color="secondary"
                          variant="determinate"
                          value={100}
                        />
                      ) : idx === currentUploading ? (
                        <CircularProgressWithLabel
                          color="secondary"
                          variant="determinate"
                          value={progress}
                        />
                      ) : (
                        <CircularProgressWithLabel
                          color="secondary"
                          variant="determinate"
                          value={0}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <Image alt="svg" src={UploadImageSVG} />
            )}
          </div>
          <div className="upload_text_wrapper">
            <div>
              <h4 className="">{`Drag and drop media here or click to ${
                uploadedFiles?.length === uploadedFiles?.length
                  ? "change"
                  : "upload"
              }`}</h4>
              <p className="text-gray-400 font-semibold text-sm">
                Recommended size: 500kb
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default UploadGallery;
