import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { VideoListItem, VideoListModel } from "api/models/Videos/videoList";
import { fetchVideoList } from "api/routes/Videos/videos";

interface Props {
  videoTabs: ChildComponent[];
  channelUuid: string;
  activeTab: number;
  pageNo: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setVideoList: Dispatch<SetStateAction<VideoListModel | undefined>>;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
}

const VideoTabs = ({
  videoTabs,
  channelUuid,
  activeTab,
  pageNo,
  setActiveTab,
  setVideoList,
  setIsFetching,
}: Props) => {
  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setIsFetching(true);
    setActiveTab(newValue);
    const videosResp = await fetchVideoList({
      channelUuid: channelUuid!,
      page: pageNo,
      noOfRecords: 12,
      status:
        videoTabs[newValue].componentName === "Videos"
          ? "Ready"
          : videoTabs[newValue].componentName,
    });

    if (videosResp) {
      setVideoList(videosResp);
    } else {
      setVideoList(undefined);
    }
    setIsFetching(false);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Tabs value={activeTab} onChange={handleChange} aria-label="video tabs">
          {!!videoTabs &&
            videoTabs[0] &&
            videoTabs.map((tab, idx) => {
              return (
                <Tab
                  style={{
                    width: "25%",
                    height: "20px",
                    fontFamily: "IBM Plex Sans Condensed",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "140%",
                    textAlign: "center",
                    letterSpacing: "0.02em",
                    color: "#1C1B1F",
                  }}
                  key={idx}
                  label={
                    <div className="vid_tab_display">
                      {tab.componentName}
                      {/* {tab.componentName === "Pending" && !!pendingVideos && (
                      <span className="readed_tab_badge" />
                    )} */}
                    </div>
                  }
                />
              );
            })}
        </Tabs>
      )}
    </>
  );
};

export default VideoTabs;
