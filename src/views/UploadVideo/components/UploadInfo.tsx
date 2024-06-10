"use client";
import LineBreak from "components/LineBreak";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import ReactQuill from "react-quill";
import TokenInput from "react-customize-token-input";
import "./small_token_input.scss";
import "./react-quill.scss";
import ChannelDropdown from "components/ChannelDropdown";
import ShoppableLinkEdit from "components/ShoppableLinkEdit/ShoppableLinkEdit";
import ImageDropzone from "components/ImageDropzone";
import SpotDropzone from "components/SpotDropzone";
import { useUploadVideo } from "../useUploadVideo";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import Link from "next/link";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { Dialog, CircularProgress } from "@mui/material";
import { org_uuid } from "constants/constants";

interface Props {
  hiveDetails: HiveDetails;
  channelList: ChannelListModel[];
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
  selectedTab: number;
  handleVideoUpload: any;
  isLoading: boolean;
}

const UploadInfo = ({
  hiveDetails,
  channelList,
  thumbnail,
  setThumbnail,
  selectedTab,
  handleVideoUpload,
  isLoading,
}: Props) => {
  const { toastError } = useTriggerAlert();
  const [channelUuid, setChannelUuid] = useState("");

  const hiveUuid = org_uuid;

  //   useEffect(() => {
  //     if (s3Done) {
  //       dispatch(setIsUploading(true));
  //       dispatch(getChannelDetails(activeChannel?.channelUuid!));
  //       navigate(`/channels/${channelUuid}`);
  //       dispatch(setVideosTab(1));
  //       dispatch(setIsUploading(false));
  //     }
  //   }, [s3Done]);

  const handleUpload = () => {
    handleVideoUpload(
      channelUuid,
      videoTitle,
      data,
      values,
      productUrl,
      base64Url,
      fileType
    );
  };

  const [data, setData] = useState("");

  function handleTextBox(event: string) {
    setData(event);
  }

  const [videoTitle, setVideoTitle] = useState("");
  const [titleRemaining, setTitleRemaining] = useState(20);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value.slice(0, 20));
    setTitleRemaining(20 - e.target.value.slice(0, 20).length);
  };

  const [productUrl, setProductUrl] = useState("");

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductUrl(e.target.value.slice(0, 180));
  };

  const [values, setValues] = useState([]);

  const handleError = () => {
    if (videoTitle.length < 1) {
      toastError("Please enter video title");
    }
  };

  const [changeThumbnail, setChangeThumbnail] = useState(false);

  const handleThumbnailChange = () => {
    setChangeThumbnail((prevState) => !prevState);
  };

  const [base64Url, setBase64Url] = useState("");
  const handlePitchClick = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  const [removeFile, setRemoveFile] = useState(false);

  const [fileType, setFileType] = useState("");

  return (
    <div className="upload_info_container">
      <div className="upload_info_margins">
        <h3 className="font-bold text-2xl">Upload Video</h3>
        <p className="text-sm">Post a video to this channel</p>
      </div>
      <div className="thumbnail_edit_container">
        <h5 className="upload_headings">Cover photo</h5>
        {changeThumbnail ? (
          <ImageDropzone file="story" setLogoFile={setThumbnail} />
        ) : thumbnail ? (
          <img
            className="thumbnail_photo"
            src={`data:image/jpeg;base64,${thumbnail}`}
          />
        ) : (
          <ImageDropzone file="story" setLogoFile={setThumbnail} />
        )}
        {thumbnail && (
          <p onClick={handleThumbnailChange} className="link text-sm">
            {changeThumbnail ? "Cancel" : "Edit Thumbnail"}
          </p>
        )}
      </div>
      {/* <div> */}
      <div className="upload_info__content_spacing">
        <ChannelDropdown
          channelList={channelList}
          channelUuid={channelUuid}
          setChannelUuid={setChannelUuid}
        />
      </div>
      <h5 className="upload_headings">Title</h5>
      <div className="upload_info_margins upload_title_input">
        <input
          className={`${
            videoTitle.length > 0 ? "video_upload_title" : "video_title_empty"
          }`}
          value={videoTitle}
          onInput={handleTitleChange}
          placeholder="Untitled"
        />
        <div className="character_limit text-sm">{videoTitle.length}/20</div>
      </div>
      <div className="upload_info_margins">
        <div className="title_and_limit">
          <h4 className="upload_headings">Tags</h4>
          <div className="character_limit text-sm">*max 5 tags</div>
        </div>{" "}
        <TokenInput
          separators={[" ", ",", ";"]}
          tokenValues={values.slice(0, 5)}
          onTokenValuesChange={setValues}
          className=""
          placeholder={`Tags separated by commas`}
        />
      </div>
      <div className="">
        <h4 className="upload_headings">Description</h4>
        <LineBreak />
        <div className="react-quill-text-container">
          <ReactQuill
            className="text_box"
            theme="snow"
            value={data}
            onChange={(e) => handleTextBox(e)}
          />
          {/* <div className="react-quill-text-limit character_limit text-sm">
            {removeHtmlTags(data).length}/3000
          </div> */}
        </div>
      </div>

      <div className="">
        <div className="title_and_limit">
          <h4 className="upload_headings">Attachment</h4>
          {base64Url && (
            <p
              className="link text_xs"
              onClick={() => {
                setBase64Url("");
                setRemoveFile(false);
              }}
            >
              Cancel
            </p>
          )}
        </div>
        <LineBreak />
        {!removeFile && base64Url ? (
          <div
            onClick={() => handlePitchClick(productUrl)}
            className="view_pitch_deck_wrapper"
          >
            <img
              src="https://images.veehive.ai/webApp/forms.png"
              width="30px"
            />
            <h4>View Attachment</h4>
          </div>
        ) : (
          <SpotDropzone
            base64Url={base64Url}
            setBase64Url={setBase64Url}
            setFileType={setFileType}
          />
        )}
      </div>

      <LineBreak />

      <ShoppableLinkEdit
        productUrl={productUrl}
        handleUrlChange={handleUrlChange}
      />

      {/* </div> */}
      <div className="button_rows-edit_video">
        <Link href=".." className="secondaryBtn half_width">
          Discard
        </Link>
        {isLoading ? (
          <div className="primaryBtn half_width">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <>
            {(thumbnail || selectedTab === 1) &&
            videoTitle.length > 1 &&
            !!channelUuid ? (
              <div onClick={handleUpload} className="primaryBtn half_width">
                Post
              </div>
            ) : (
              <div onClick={handleError} className="disabledBtn half_width">
                Post
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadInfo;
