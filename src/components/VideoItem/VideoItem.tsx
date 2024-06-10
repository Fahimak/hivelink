import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { VideoListItem } from "api/models/Videos/videoList";
import { useRouter } from "next/navigation";
import VideoKebab from "views/Channel/components/VideoKebab";

interface Props {
  videoItem: VideoListItem;
  videoTabs: ChildComponent[];
  hiveDetails: HiveDetails;
  channelUuid: string;
  handleUpdate: any;
  activeTab: number;
}

const VideoItem = ({
  videoItem,
  videoTabs,
  hiveDetails,
  channelUuid,
  handleUpdate,
  activeTab,
}: Props) => {
  //   const videoTabs = useAppSelector(getVideoTabs);

  const router = useRouter();

  const handleClick = () => {
    // dispatch(setCurrentVideo(videoItem));
    // if (localStorage.getItem("isLoggedIn") === "yes") {
    router.push(`/channels/${channelUuid}/videos/${videoItem.videoUuid}`);
    // } else {
    //   launchLogin();
    // }
  };

  return (
    <div className="video_item_container relative">
      <img
        alt=""
        className="video_card"
        onClick={handleClick}
        src={
          videoItem.thumbnail ||
          "https://veehivestage-images.s3.us-east-2.amazonaws.com/channelImages/defaultChannelLogo.jpg"
        }
      />
      <p className="video_title black_text">
        {!!videoItem &&
        !!videoItem.videoTitle &&
        videoItem.videoTitle.length > 14
          ? videoItem.videoTitle!.slice(0, 14) + "..."
          : videoItem.videoTitle}
      </p>
      {videoTabs && videoTabs.length > 1 && (
        <div className="video_kebab_container">
          <VideoKebab
            currentVideo={videoItem}
            channelUuid={channelUuid}
            hiveDetails={hiveDetails}
            handleUpdate={handleUpdate}
            activeTab={activeTab}
          />
        </div>
      )}
    </div>
  );
};

export default VideoItem;
