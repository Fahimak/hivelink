import { Box, Modal } from "@mui/material";
import { SegmentItem } from "api/models/Story/story";
import FileDrop from "components/FileDrop/FileDrop";
import CloseBlackSVG from "assets/svg/close_black.svg";
import UploadAiSVG from "assets/svg/uploadAi.svg";

import { org_uuid } from "constants/constants";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import React, {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useDropzone } from "react-dropzone";
import StoryCropzone from "./StoryCropzone";
import Image from "next/image";
import { editSegmentApi } from "api/routes/Stories/stories";
import { uploadToS3 } from "api/routes/Hive/client";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 522,
  height: 630,
  bgcolor: "#fff",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2,
};

interface Props {
  openDrop: boolean;
  setOpenDrop: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
  imageFile: string;
  setImageFile: Dispatch<SetStateAction<string>>;
  imageUploaded: boolean;
  setImageUploaded: Dispatch<SetStateAction<boolean>>;
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
  uploadedVideoFile: File | null;
  setUploadedVideoFile: Dispatch<SetStateAction<File | null>>;
  title: string;
  desc: string;
  storySegments: SegmentItem[];
  contentType: string;
  setContentType: Dispatch<SetStateAction<string>>;
  storyUuid: string;
  storyIdx: number;
  setStoryBlob: Dispatch<SetStateAction<File | Blob | null>>;
  getStorySegments: any;
  storyBlob: File | Blob | null;
}

const StoryDropzone = ({
  file,
  openDrop,
  setOpenDrop,
  uploadedVideoFile,
  imageUploaded,
  setImageFile,
  setImageUploaded,
  thumbnail,
  setThumbnail,
  setUploadedVideoFile,
  imageFile,
  title,
  desc,
  storySegments,
  contentType,
  setContentType,
  storyUuid,
  storyIdx,
  setStoryBlob,
  getStorySegments,
  storyBlob,
}: Props) => {
  const { toastInfo, toastError } = useTriggerAlert();

  useEffect(() => {
    setImageFile("");
    setImageUploaded(false);
  }, []);

  const [image, setImage] = useState<string | ArrayBuffer>("");
  const handleDrop = (acceptedFiles: File[]) => {
    setImage("");
    handleCropClose();
    setSubmitClick(false);
    /// Get the first file
    const file = acceptedFiles[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      if (file.size > 100000000) {
        toastInfo("Please upload images less than 80 mb");
      } else {
        setContentType(file.type);
        // Create a new FileReader
        const reader = new FileReader();

        // Set the image state when the file has loaded
        reader.onload = (e) => {
          setImage(e.target?.result!);
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
        handleCropOpen();
      }
    } else {
      toastError("Invalid file type, please pass an image file .jpg or .png");
    }
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

  const [openCrop, setOpenCrop] = useState(false);
  const handleCropClose = () => {
    setOpenCrop(false);
  };
  const handleCropOpen = () => {
    setOpenCrop(true);
  };

  const idx = storyIdx;

  const storyId = storySegments[idx].id;

  const hiveUuid = org_uuid;

  const [onSubmitClick, setSubmitClick] = useState(false);

  const handleEditSegment = async () => {
    file === "video" && setStoryBlob(uploadedVideoFile);
    const data = await editSegmentApi({
      description: desc,
      isActive: false,
      storyUrl: "",
      storyUuid: storyUuid,
      title: title,
      isImage: file !== "video",
      isVideo: file === "video",
      colorCode: "",
      communityUuid: hiveUuid,
      contentType: contentType,
      storyId: storyId,
      isMediaChanged: true,
      thumbnail: file === "video" ? thumbnail : "",
      actionLink: storySegments[idx].actionLink,
      order: storySegments[idx].segmentOrder,
    });

    const formData = new FormData();

    formData.append(
      "x-amz-meta-userid",
      data.objPreSignedResponse.body.data.fields["x-amz-meta-userid"]!
    );
    formData.append(
      "Content-Type",
      data.objPreSignedResponse.body.data.fields["Content-Type"]
    );
    formData.append("key", data.objPreSignedResponse.body.data.fields.key!);
    formData.append(
      "bucket",
      data.objPreSignedResponse.body.data.fields.bucket!
    );
    formData.append(
      "X-Amz-Algorithm",
      data.objPreSignedResponse.body.data.fields["X-Amz-Algorithm"]!
    );
    formData.append(
      "X-Amz-Credential",
      data.objPreSignedResponse.body.data.fields["X-Amz-Credential"]!
    );
    formData.append(
      "X-Amz-Date",
      data.objPreSignedResponse.body.data.fields["X-Amz-Date"]!
    );
    formData.append(
      "X-Amz-Security-Token",
      data.objPreSignedResponse.body.data.fields["X-Amz-Security-Token"]!
    );
    formData.append(
      "X-Amz-Signature",
      data.objPreSignedResponse.body.data.fields["X-Amz-Signature"]!
    );
    formData.append(
      "Policy",
      data.objPreSignedResponse.body.data.fields.Policy!
    );
    formData.append("file", file === "video" ? uploadedVideoFile! : storyBlob!);

    await uploadToS3(data.objPreSignedResponse.body.data.url, formData);

    clearVideo();
    getStorySegments();
    setOpenDrop(false);
  };

  const clearVideo = () => {
    setUploadedVideoFile(null);
    setStoryBlob(null);
  };

  return (
    <Modal
      open={openDrop}
      onClose={() => setOpenDrop(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="" sx={style}>
        {file === "video" ? (
          <>
            <div className="title_and_limit story_drop_header">
              <h3 className="font-bold text-md">Add Video</h3>
              <div className="pointer" onClick={() => setOpenDrop(false)}>
                <Image src={CloseBlackSVG} width={15} alt="close_svg" />
              </div>
            </div>
            {!!thumbnail && !!uploadedVideoFile ? (
              <>
                <div className="story_video_view_wrapper">
                  <p
                    className="link story_video_change_title"
                    onClick={clearVideo}
                  >
                    Change
                  </p>
                  <video
                    width="256.5px"
                    height="456px"
                    src={URL.createObjectURL(uploadedVideoFile)}
                    controls
                    style={{
                      overflow: "hidden",
                      borderRadius: "15px",
                      background: "black",
                    }}
                  />
                  <p
                    className="story_createBtn w_full primaryBtn"
                    onClick={handleEditSegment}
                  >
                    Add Video
                  </p>
                </div>
              </>
            ) : (
              <FileDrop
                setThumbnail={setThumbnail}
                setContentType={setContentType}
                setVideoFile={setUploadedVideoFile}
              />
            )}
          </>
        ) : (
          <>
            <div className="title_and_limit story_drop_header">
              <h3 className="font-bold text-md">Add Image</h3>
              <div className="pointer" onClick={() => setOpenDrop(false)}>
                <Image src={CloseBlackSVG} alt="close_svg" width={15} />
              </div>
            </div>
            <div className="cursor-pointer">
              <div
                {...getRootProps()}
                className={`upload_wrapper dropzone ${
                  isDragActive ? "dropzone--isActive border-blue-600" : ""
                } ${isDragAccept ? "dropzone--isAccept border-blue-600" : ""} ${
                  isDragReject ? "dropzone--isReject border-red-600" : ""
                }`}
              >
                <input accept="image/*" {...getInputProps()} />

                <div className="upload_story_content_wrapper">
                  {imageUploaded ? (
                    <img
                      className="uploaded_story_image"
                      src={`data:image/jpeg;base64,${imageFile}`}
                    />
                  ) : (
                    <Image src={UploadAiSVG} alt="upload_ai" />
                  )}
                  <div className="upload_text_wrapper">
                    <div>
                      <h4 className="">{`Drag and drop image here or click to ${
                        imageUploaded ? "change" : "upload"
                      }`}</h4>
                      <p className="text-gray-400 font-semibold text-sm">
                        Recommended size: 300kb
                      </p>
                      <p className="text-gray-400 text-sm">
                        Recommended dimensions: 173px x 221px
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {image && !onSubmitClick && (
                <StoryCropzone
                  file={file}
                  openCrop={openCrop}
                  handleCropClose={handleCropClose}
                  image={image}
                  setSubmitClick={setSubmitClick}
                  setStoryBlob={setStoryBlob}
                  setImageFile={setImageFile}
                  setImageUploaded={setImageUploaded}
                />
              )}
            </div>
            {imageUploaded && (
              <div
                onClick={handleEditSegment}
                className="story_createBtn w_full primaryBtn"
              >
                Add Image
              </div>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default StoryDropzone;
