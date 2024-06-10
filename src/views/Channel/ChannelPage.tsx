import { CircularProgress } from "@mui/material";
import { ChannelItemModel } from "api/models/Channels/channels";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import Buttons from "components/Buttons";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import PageNumbers from "components/PageNumbers";
import UsersSVG from "assets/svg/users.svg";
import VideosSVG from "assets/svg/videos.svg";
import Image from "next/image";

// import SortVideo from "components/SortVideo/SortVideo";
// import VideoItem from "components/VideoItem/VideoItem";
// import VideoTabs from "components/VideoTabs/VideoTabs";
import React, { useEffect } from "react";
import VideoListView from "./components/VideoListView";
import { VideoListModel } from "api/models/Videos/videoList";

interface Props {
  channel: ChannelItemModel;
  hiveDetails: HiveDetails;
  childComponents: ChildComponent[];
  videoList: VideoListModel;
}

const ChannelPage = ({
  channel,
  hiveDetails,
  childComponents,
  videoList,
}: Props) => {
  const channelObj = channel.objChannel;
  const channelProps = channel.objChannelProperties;
  const channelBtns = childComponents;
  const channelUuid = channel.objChannel.channelUUID;

  const amount = channel.objChannelPayment.amount;

  //   const isFetching = useAppSelector(videoListLoadingSelector);
  //   const videoListResp = useAppSelector(videoListSelector);
  //   const videoList = useAppSelector(reducedVideoListSelector);
  //   const videoTabs = useAppSelector(getVideoTabs);
  //   const currentVideoTab = useAppSelector(videosTabSelector);

  //   const pageNo = useAppSelector(getVideosCurrentPageSelector);

  //   useEffect(() => {
  //     dispatch(
  //       getPendingVideoList({
  //         channelUuid: channelUuid!,
  //         page: 0,
  //         noOfRecords: 10,
  //         status: "Pending",
  //       })
  //     );
  //   }, [dispatch, channelUuid]);

  //   useEffect(() => {
  //     dispatch(setS3Done(false));
  //     dispatch(setContentUploadResp(undefined));
  //     dispatch(
  //       getVideoList({
  //         channelUuid: channelUuid!,
  //         page: pageNo,
  //         noOfRecords: 12,
  //         status:
  //           !!videoTabs &&
  //           videoTabs[currentVideoTab] &&
  //           videoTabs[currentVideoTab].componentName
  //             ? videoTabs[currentVideoTab].componentName === "Videos"
  //               ? "Ready"
  //               : videoTabs[currentVideoTab].componentName
  //             : "Ready",
  //       })
  //     );
  //   }, [channelUuid, dispatch]);

  //   const videoStatusUpdated = useAppSelector(videoUpdatedSelector);

  //   const channelMetrics = useAppSelector(getChannelDetailsMetricsSelector);

  //   useEffect(() => {
  //     videoStatusUpdated &&
  //       !!videoTabs &&
  //       videoTabs.length > 0 &&
  //       videoTabs[currentVideoTab] &&
  //       videoTabs[currentVideoTab].componentName &&
  //       dispatch(
  //         getVideoList({
  //           channelUuid: channelUuid!,
  //           page: pageNo,
  //           noOfRecords: 12,
  //           status:
  //             videoTabs[currentVideoTab].componentName === "Videos"
  //               ? "Ready"
  //               : videoTabs[currentVideoTab].componentName,
  //         })
  //       );
  //   }, [videoStatusUpdated, videoTabs]);

  const handleChange = (passedPageNo: number) => {
    // dispatch(setCurrentVideosPage(passedPageNo));
    // !!videoTabs &&
    //   videoTabs.length > 0 &&
    //   videoTabs[currentVideoTab] &&
    //   videoTabs[currentVideoTab].componentName &&
    //   dispatch(
    //     getVideoList({
    //       channelUuid: channelUuid!,
    //       page: passedPageNo,
    //       noOfRecords: 12,
    //       status:
    //         videoTabs[currentVideoTab].componentName === "Videos"
    //           ? "Ready"
    //           : videoTabs[currentVideoTab].componentName,
    //     })
    //   );
  };

  const channelId = channel.objChannel.id;

  //   useEffect(() => {
  //     dispatch(
  //       getAnalyticsChannelMetrics({
  //         channelId: channelId,
  //       })
  //     );
  //   }, [dispatch, channelId]);

  //   const totalVideos = useAppSelector(getTotalVideosSelector);

  return (
    <div className="channel_page_container">
      <IslandLayout>
        <div className="channel_content">
          <div className="channel_header">
            <img
              className="channel_page_logo"
              src={
                channelProps?.webLogo ||
                "https://veehivestage-images.s3.us-east-2.amazonaws.com/channelImages/defaultChannelLogo.jpg"
              }
              alt=""
            />
            <div className="channel_info">
              <div>
                <h4 className="font-bold">{channelObj?.channelName}</h4>
                <p className="small_text">
                  {channelProps?.channelTier === "INVITE" ||
                  channelProps?.channelTier === "PRIVATE_PAID"
                    ? "Private"
                    : "Public"}
                </p>
              </div>
              <div>
                <p>{channelObj?.description}</p>
                <div className="channel_metrics_container">
                  <div className="channel_metric_wrapper">
                    <Image src={VideosSVG} alt="svg" />

                    <p className="text-sm">
                      {45}
                      {/* {channelMetrics?.totalVideos || 0} */}
                    </p>
                  </div>
                  <div className="channel_metric_wrapper">
                    <Image src={UsersSVG} alt="svg" />

                    <p className="text-sm">
                      {/* {channelMetrics?.totalMembers || 0} */}
                      {14}
                    </p>
                  </div>
                </div>
              </div>
              {!!channelBtns && (
                <div className="channel_btns">
                  {channelBtns.map((button, id) => {
                    if (button.componentType !== "video_tabs")
                      return (
                        <Buttons
                          redirect={`/channels/${channel.objChannel.channelUUID}/info/${button.componentRoute}`}
                          button={button}
                          key={id}
                        >
                          {button.componentType === "icon" ? (
                            <img
                              src={button.componentIcon}
                              alt=""
                              width="20px"
                            />
                          ) : (
                            button.componentName
                          )}
                        </Buttons>
                      );
                  })}
                </div>
              )}
            </div>
          </div>
          {+amount > 0 && <div className="channel_amount_wr">$ {+amount}</div>}
        </div>
      </IslandLayout>
      <LineBreak />
      <IslandLayout>
        <VideoListView
          channel={channel}
          serverVideos={videoList}
          childComponents={childComponents}
          hiveDetails={hiveDetails}
        />
      </IslandLayout>
    </div>
  );
};

export default ChannelPage;
