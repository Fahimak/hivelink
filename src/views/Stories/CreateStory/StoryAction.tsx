import StoryImgSVG from "assets/svg/story_image.svg";
import StoryVidSVG from "assets/svg/story_video.svg";
import StoryAddSVG from "assets/svg/story_add.svg";
import StoryRemoveSVG from "assets/svg/story_remove.svg";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { TwitterPicker } from "react-color";
import { org_uuid } from "constants/constants";
import { SegmentItem } from "api/models/Story/story";
import StoryDropzone from "../components/StoryDropzone";
import Image from "next/image";
import AddLinkDrop from "./AddLinkDrop";
import {
  addStorySegmentApi,
  editSegmentApi,
  removeSegmentsApi,
} from "api/routes/Stories/stories";
import { useTriggerAlert } from "hooks/useTriggerAlert";

interface Props {
  storyUuid: string;
  storyIdx: number;
  storySegments: SegmentItem[];
  title: string;
  description: string;
  actionLink: string;
  setActionLink: Dispatch<SetStateAction<string>>;
  getStorySegments: any;
  setStoryIndex: Dispatch<SetStateAction<number>>;
}

const StoryActions = ({
  storyUuid,
  storyIdx,
  storySegments,
  title,
  description,
  actionLink,
  setActionLink,
  getStorySegments,
  setStoryIndex,
}: Props) => {
  const [openDrop, setOpenDrop] = useState(false);

  const [file, setFile] = useState("img");

  const hiveUuid = org_uuid;

  const [colorCode, setColorCode] = useState("");

  const { toastError, toastSuccess, toastInfo } = useTriggerAlert();

  const [imageFile, setImageFile] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null);
  const [contentType, setContentType] = useState("");
  const [storyBlob, setStoryBlob] = useState<File | Blob | null>(null);

  useEffect(() => {
    setColorCode("#B4CEBE");
  }, [storyIdx]);

  const handleImageUpload = () => {
    setFile("img");
    setOpenDrop(true);
  };

  const handleVideoUpload = () => {
    setFile("video");
    setOpenDrop(true);
  };

  const handleAddSegment = async () => {
    const resp = await addStorySegmentApi({
      description: "",
      isActive: false,
      storyUrl: "",
      storyUuid: storyUuid,
      title: "",
      isImage: false,
      isVideo: false,
      colorCode: "#B4CEBE",
      communityUuid: hiveUuid,
      contentType: "",
      order: storySegments[storyIdx].segmentOrder + 1,
    });

    if (resp) {
      getStorySegments();
    }
  };

  const handleRemoveSegment = async () => {
    if (storySegments.length > 1) {
      await removeSegmentsApi({
        storyUuid: storyUuid,
        id: storySegments[storyIdx].id,
      });
      getStorySegments();
      setStoryIndex(0);
    } else {
      toastError("Sorry, a story must have atleast one frame");
    }
  };

  const handleColorChange = async (color: any) => {
    setColorCode(color.hex);
    await editSegmentApi({
      description: description,
      isActive: false,
      storyUrl: "",
      storyUuid: storyUuid,
      title: title,
      isImage: false,
      isVideo: false,
      colorCode: color.hex,
      communityUuid: hiveUuid,
      contentType: "",
      isMediaChanged: false,
      storyId: storySegments[storyIdx].id,
      thumbnail: "",
      actionLink: storySegments[storyIdx].actionLink,
      order: storySegments[storyIdx].segmentOrder,
    });

    getStorySegments();
  };

  const [openColor, setOpenColor] = useState(false);

  const handleColorClick = async () => {
    // if (openColor) {
    //   await editSegmentApi({
    //     description: description,
    //     isActive: false,
    //     storyUrl: "",
    //     storyUuid: storyUuid,
    //     title: title,
    //     isImage: false,
    //     isVideo: false,
    //     colorCode: colorCode,
    //     communityUuid: hiveUuid,
    //     contentType: "",
    //     isMediaChanged: false,
    //     storyId: storySegments[storyIdx].id,
    //     thumbnail: "",
    //     actionLink: storySegments[storyIdx].actionLink,
    //     order: storySegments[storyIdx].segmentOrder,
    //   });

    //   getStorySegments();
    // }
    setOpenColor(!openColor);
  };

  return (
    <>
      {openColor && <TwitterPicker onChange={handleColorChange} />}
      <div className="story_actions_container">
        <div className="pointer story_action_item" onClick={handleColorClick}>
          <div className="action_item_icon">
            <div
              style={{ backgroundColor: colorCode }}
              className="bg_color_story"
            ></div>
          </div>
          <p className="text_xs">BG color</p>
        </div>
        <div className="pointer story_action_item" onClick={handleImageUpload}>
          <div className="action_item_icon">
            <Image src={StoryImgSVG} alt="sotry_img" />
          </div>
          <p className="text_xs">Image</p>
        </div>
        <div onClick={handleVideoUpload} className="pointer story_action_item">
          <div className="action_item_icon">
            <Image src={StoryVidSVG} alt="sotry_img" />
          </div>
          <p className="text_xs">Video</p>
        </div>
        {/* <StoryTextSVG /> */}
        <div onClick={handleAddSegment} className="pointer story_action_item">
          <div className="action_item_icon">
            <Image src={StoryAddSVG} alt="sotry_img" />
          </div>
          <p className="text_xs">Add</p>
        </div>
        <div
          onClick={handleRemoveSegment}
          className="pointer story_action_item"
        >
          <div className="action_item_icon">
            <Image src={StoryRemoveSVG} alt="sotry_img" />
          </div>
          <p className="text_xs">Remove</p>
        </div>
        <div
          // onClick={handleRemoveSegment}
          className="pointer story_action_item"
        >
          <div className="action_item_icon">
            {
              <AddLinkDrop
                storyUuid={storyUuid}
                storyIdx={storyIdx}
                storySegments={storySegments}
                title={title}
                description={description}
                actionLink={actionLink}
                setActionLink={setActionLink}
                getStorySegments={getStorySegments}
              />
            }
          </div>
          <p className="text_xs">Add Link</p>
        </div>
      </div>
      {openDrop && (
        <StoryDropzone
          openDrop={openDrop}
          setOpenDrop={setOpenDrop}
          file={file}
          imageFile={imageFile}
          setImageFile={setImageFile}
          imageUploaded={imageUploaded}
          setImageUploaded={setImageUploaded}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          uploadedVideoFile={uploadedVideoFile}
          setUploadedVideoFile={setUploadedVideoFile}
          title={title}
          desc={description}
          storySegments={storySegments}
          contentType={contentType}
          setContentType={setContentType}
          storyUuid={storyUuid}
          storyIdx={storyIdx}
          setStoryBlob={setStoryBlob}
          getStorySegments={getStorySegments}
          storyBlob={storyBlob}
        />
      )}
    </>
  );
};

export default StoryActions;
