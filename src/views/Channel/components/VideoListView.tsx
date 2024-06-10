"use client";
import { CircularProgress } from "@mui/material";
import { ChannelItemModel } from "api/models/Channels/channels";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { VideoListItem, VideoListModel } from "api/models/Videos/videoList";
import { fetchVideoList } from "api/routes/Videos/videos";
import PageNumbers from "components/PageNumbers";
import VideoTabs from "components/VideoTabs";
import React, { useEffect, useState } from "react";
import VideoItem from "components/VideoItem";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import Loading from "app/loading";

type Props = {
  channel: ChannelItemModel;
  serverVideos: VideoListModel | undefined;
  childComponents: ChildComponent[];
  hiveDetails: HiveDetails;
};

const VideoListView = ({
  channel,
  serverVideos,
  childComponents,
  hiveDetails,
}: Props) => {
  const videoTabs =
    !!childComponents &&
    childComponents[0] &&
    childComponents.filter(
      (component) => component.componentType === "video_tabs"
    );

  const [isFetching, setIsFetching] = useState(false);
  const [videoList, setVideoList] = useState(serverVideos);
  const [pageNo, setPageNo] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = async (passedPageNo: number) => {
    setIsFetching(true);
    setPageNo(passedPageNo);
    if (
      !!videoTabs &&
      videoTabs.length > 0 &&
      videoTabs[activeTab] &&
      videoTabs[activeTab].componentName
    ) {
      const videosResp = await fetchVideoList({
        channelUuid: channel.objChannel.channelUUID,
        page: passedPageNo,
        noOfRecords: 12,
        status:
          videoTabs[activeTab].componentName === "Videos"
            ? "Ready"
            : videoTabs[activeTab].componentName,
      });

      if (videosResp) {
        setVideoList(videosResp);
      }
    }
    setIsFetching(false);
  };

  const handleUpdate = async () => {
    setIsFetching(true);
    if (
      !!videoTabs &&
      videoTabs.length > 0 &&
      videoTabs[activeTab] &&
      videoTabs[activeTab].componentName
    ) {
      const videosResp = await fetchVideoList({
        channelUuid: channel.objChannel.channelUUID,
        page: pageNo,
        noOfRecords: 12,
        status:
          videoTabs[activeTab].componentName === "Videos"
            ? "Ready"
            : videoTabs[activeTab].componentName,
      });

      if (videosResp) {
        setVideoList(videosResp);
      } else {
        setVideoList(undefined);
      }
    }
    setIsFetching(false);
  };

  return (
    <div className="channel_content">
      <VideoTabs
        videoTabs={videoTabs}
        channelUuid={channel.objChannel.channelUUID}
        activeTab={activeTab}
        pageNo={pageNo}
        setActiveTab={setActiveTab}
        setVideoList={setVideoList}
        setIsFetching={setIsFetching}
      />
      {isFetching ? (
        <div className="flex justify-center items-center w-full py-3">
          <CircularProgress size={30} color="inherit" />
        </div>
      ) : (
        <>
          {videoList && videoList.noOfElements > 0 ? (
            <>
              <div className="title_and_limit video_content_header">
                <h3 className="font-bold text-lg">
                  {videoList.noOfElements || 0}{" "}
                  {videoList.noOfElements === 1 ? "Video" : "Videos"}
                </h3>
                {/* {!!videoTabs[1] && <SortVideo />} */}
              </div>
              {isClient ? (
                <div className="channel_videos">
                  {videoList.videoList.map((video, idx) => {
                    return (
                      <VideoItem
                        key={idx}
                        videoItem={video}
                        videoTabs={videoTabs}
                        hiveDetails={hiveDetails}
                        channelUuid={channel.objChannel.channelUUID}
                        handleUpdate={handleUpdate}
                        activeTab={activeTab}
                      />
                    );
                  })}
                  {videoList?.totalPages && videoList?.totalPages > 1 && (
                    <div className="pagination_container">
                      <PageNumbers
                        totalPages={videoList.totalPages || 0}
                        initialPage={pageNo}
                        handleChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Loading />
              )}
            </>
          ) : (
            <div className="no_videos_container">
              {videoTabs.length > 0 && (
                <>
                  <h3 className="font-bold text-lg">No Videos found</h3>
                  <p className="">
                    {"Here's where you'll find all the videos that have been"}{" "}
                    {videoTabs[activeTab].componentName === "Videos"
                      ? `approved`
                      : videoTabs[activeTab].componentName.toLowerCase()}
                    {". Take a look and make sure everything's in order."}
                  </p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoListView;
