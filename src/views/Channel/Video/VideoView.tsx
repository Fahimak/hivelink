import LineBreak from "components/LineBreak";
import CloseMediaSVG from "assets/svg/close_media.svg";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { VideoListItem } from "api/models/Videos/videoList";
import { ChannelItemModel } from "api/models/Channels/channels";
import Link from "next/link";
import YoutubePlayer from "./YoutubePlayer";
import VideoDescription from "./VideoDescription";

const style = {
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  // bgcolor: "#ffffff",
  outline: "none",
};

interface Props {
  currentVideo: VideoListItem;
  channel: ChannelItemModel;
}

const VideoView = ({ currentVideo, channel }: Props) => {
  //   const { launchLogin } = useHiveApi();

  //   const checkLogin = () => {
  //     setTimeout(() => {
  //       if (localStorage.getItem("isLoggedIn") !== "yes") {
  //         launchLogin();
  //       }
  //     }, 2000);
  //   };

  //   useEffect(() => {
  //     checkLogin();
  //   }, []);

  //   const { getVideoDetails } = useVideoListApi();

  //   useEffect(() => {
  //     getVideoDetails(channel.objChannel.channelUUID, currentVideo.videoUuid);
  //   }, [channel, currentVideo]);

  //   const videoListResp = video.videoList;
  //   const currentVideoIndex = video.currentVideoIdx;

  //   const [videoOpen, setVideoOpen] = useState(true);

  const handleVideoClose = () => {
    // setVideoOpen(false);
  };

  const handleGoBack = () => {
    // navigate.push(`/channels/${channel.objChannel.channelUUID}`);
    // navigate.push(`/channels/${currentVideo?.channelUuid}`);
    // setVideoOpen(false);
  };

  const handleNextVideo = () => {
    // video.setCurrentVideo(video.videoList?.videoList[currentVideoIndex + 1]);
    // navigate.push(
    //   "/channels/" +
    //     channel.objChannel.channelUUID +
    //     "/" +
    //     video.videoList?.videoList[currentVideoIndex + 1].route.replace(
    //       "videos/",
    //       ""
    //     )
    // );
    // video.setCurrentVideoIdx(currentVideoIndex + 1);
    // dispatch(setNextVideo());
  };

  const handlePrevVideo = () => {
    // video.setCurrentVideo(video.videoList?.videoList[currentVideoIndex - 1]);
    // navigate.push(
    //   "/channels/" +
    //     channel.objChannel.channelUUID +
    //     "/" +
    //     video.videoList?.videoList[currentVideoIndex - 1].route.replace(
    //       "videos/",
    //       ""
    //     )
    // );
    // video.setCurrentVideoIdx(currentVideoIndex - 1);
    // dispatch(setPrevVideo());
  };

  const handlePitchClick = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div
      //   open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="z-index-max">
        <div className="vhive-1qg2388-DivBrowserModeContainer e11s2kul0">
          <Link
            href={`/channels/${channel.objChannel.channelUUID}`}
            className="vhive_close_media_btn"
          >
            <Image src={CloseMediaSVG} alt="svg" />
          </Link>
          <div className="vhive-1tunefa-DivVideoContainer e11s2kul26">
            <div className="vhive-7tjqm6-DivBlurBackground e11s2kul8">
              <div className="vhive-16ognrj-DivVideoWrapper e11s2kul9">
                <div className="vhive-1jxhpnd-DivContainer e1yey0rl0">
                  <div className="vhive-1h63bmc-DivBasicPlayerWrapper e1yey0rl2">
                    {/* <div></div> */}
                    <div className="ch-live-broadcast__main__live__media-container ch-live-broadcast__main__media-container">
                      {currentVideo?.channelType === "YOUTUBE" &&
                      !!currentVideo?.horizontalVideoURL ? (
                        <YoutubePlayer currentVideo={currentVideo} />
                      ) : (
                        <video
                          width="100%"
                          height="100%"
                          className="h-full"
                          src={currentVideo?.sourceURL}
                          controls
                          style={{
                            overflow: "hidden",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="vhive_media_arrow_container">
              {currentVideoIndex > 0 && (
                <div onClick={handlePrevVideo} className="media_arrow_design">
                  <UpArrowSVG />
                </div>
              )}
              {videoListResp &&
                currentVideoIndex + 1 < videoListResp?.videoList.length && (
                  <div onClick={handleNextVideo} className="media_arrow_design">
                    <DownArrowSVG />
                  </div>
                )}
            </div> */}
          </div>
          <div className="vhive-3q30id-DivContentContainer e1mecfx00">
            <div className="vhive_media-info">
              <LineBreak />
              <div className="vhive_media_info_spacing">
                {/* <div className="vhive_media_info_heading_spacing"> */}
                <div>
                  <h2 className="font-bold text-xl">
                    {channel?.objChannel.channelName || ""}
                  </h2>
                  <hr></hr>
                </div>
                {/* <div className="vh_media_title_second_headers"> */}
                <h3 className="font-bold text-lg">
                  {currentVideo?.name || currentVideo.videoTitle || ""}
                </h3>
                <div className="flex-wrap tags_wrapper text-sm text-gray-500 font-bold">
                  {currentVideo?.tags.map((tag, idx) => {
                    return (
                      <span className="tags" key={idx}>
                        #{tag}
                      </span>
                    );
                  })}
                </div>
                {!!currentVideo?.horizontalPreviewImage && (
                  <Link
                    href={currentVideo?.horizontalPreviewImage!}
                    target="_blank"
                    className="link text-sm"
                  >
                    View Pitch Deck
                  </Link>
                )}
                {currentVideo?.channelType !== "YOUTUBE" &&
                  !!currentVideo?.horizontalVideoURL && (
                    <Link
                      href={currentVideo?.horizontalVideoURL!}
                      target="_blank"
                      className="link text-sm"
                    >
                      Visit Product
                    </Link>
                  )}
                <p className="tags text-sm more_spacing_tags_posted_by">
                  Posted by {currentVideo?.uploadby || currentVideo?.userName}
                </p>
                {/* </div> */}
                {/* </div> */}
                {!!currentVideo?.attribute3 && currentVideo?.attribute3[0] && (
                  <div className="minus_margins_textbox video_view_desc_sizing">
                    <div>
                      <VideoDescription currentVideo={currentVideo} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <div>
              <div className="hr_padding_vw_container">
                <hr className="hr_padding_vw"></hr>
              </div>
              <h3 className="heading_placement_comments">Comments</h3>
              <div className="video_comments_container">
                <VideoComments />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoView;
