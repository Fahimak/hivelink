"use client";
import IslandLayout from "components/IslandLayout";
import React, { useEffect, useState } from "react";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useUploadVideo } from "./useUploadVideo";
import { CircularProgress, Dialog } from "@mui/material";
import BackButton from "components/BackButton";
import { org_uuid } from "constants/constants";
import UploadInfo from "./components/UploadInfo";
import VideoSelect from "./components/VideoSelect";
import Loading from "app/loading";

interface Props {
  channelList: ChannelListModel[];
  hiveDetails: HiveDetails;
}

const UploadVideo = ({ hiveDetails, channelList }: Props) => {
  const hiveUuid = org_uuid;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    file,
    setFile,
    selectedTab,
    setSelectedTab,
    setContentType,
    setThumbnail,
    youtubeUrl,
    setYoutubeUrl,
    thumbnail,
    handleVideoUpload,
    isLoading,
  } = useUploadVideo(hiveDetails);

  return (
    <>
      {isClient ? (
        <div className="upload_container">
          <div className="upload_section">
            <IslandLayout>
              <div className="upload_info">
                <BackButton to=".." />
                <UploadInfo
                  hiveDetails={hiveDetails}
                  channelList={channelList}
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                  selectedTab={selectedTab}
                  handleVideoUpload={handleVideoUpload}
                  isLoading={isLoading}
                />
              </div>
            </IslandLayout>
          </div>
          <div className="upload_section">
            <IslandLayout>
              <VideoSelect
                hiveDetails={hiveDetails}
                file={file}
                setFile={setFile}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}
                setContentType={setContentType}
              />
            </IslandLayout>
          </div>
          <Dialog open={isLoading}>
            <div className="loader_padding">
              <CircularProgress size={30} color="inherit" />
            </div>
          </Dialog>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UploadVideo;
