"use client";
import { VideoListItem } from "api/models/Videos/videoList";
import LineBreak from "components/LineBreak";
import ProfilePhoto from "components/ProfilePhoto";
import { defaultAvatar } from "constants/constants";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import FeedLoader from "../FeedLoader";
import CommentSVG from "../../../../components/common/svg/CommentSVG";
import ShareSVG from "../../../../components/common/svg/ShareSVG";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { enGB } from "date-fns/locale";
import { useInView } from "react-intersection-observer";

interface Props {
  activeEpisode: string | null;
  isMuted: boolean;
  feedItem: VideoListItem;
  setActiveEpisode(val: string | null): void;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}
const FeedVideoItem = ({
  feedItem,
  activeEpisode,
  setActiveEpisode,
  isMuted,
  setIsMuted,
}: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [isItemVisible, setIsItemVisible] = useState(false);
  const itemRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (inView) {
      setActiveEpisode(feedItem.sourceUrl);
    } else {
    }
  }, [inView]);

  useEffect(() => {
    if (activeEpisode === feedItem.sourceUrl && videoRef?.current) {
      videoRef.current.play();
      setIsMuted(false);
    } else if (activeEpisode !== feedItem.sourceUrl && videoRef?.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeEpisode, videoRef, feedItem.videoId]);

  //   const feed = useFeedContext();
  //   const navigate = useRouter();
  //   const video = useVideoContext();

  //   const { ToastInfo } = useHiveConfigContext();

  //   const location = usePathname();

  //   const { launchLogin } = useHiveApi();

  const handleFeedClick = () => {
    // if (localStorage.getItem("isLoggedIn") === "yes") {
    //   feed.setCurrentVideo(feedItem);
    //   video.setCurrentVideo(feedItem);
    //   navigate.push(`/feed/${feedItem.videoUuid}`);
    // } else {
    //   localStorage.setItem("path", `/feed`);
    //   launchLogin();
    // }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsItemVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (!!text) {
          alert("Copied link to clipboard");
        } else {
          alert(
            "This video isnt available at the moment, please try another one"
          );
        }
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  const handleClickVideo = () => {
    setIsMuted((prevValue) => !prevValue);
  };

  return (
    <div ref={itemRef} className="feed_item">
      {!isItemVisible || !isClient ? (
        <FeedLoader />
      ) : (
        <>
          <div className="feed_head">
            <ProfilePhoto
              imgUrl={
                feedItem.profilePic !== "None"
                  ? feedItem.profilePic
                  : defaultAvatar
              }
            />
            <div>
              <p className="fs-16 font-bold">{feedItem.userName || ""}</p>
              {formatDistanceToNow(
                fromUnixTime(Number(feedItem.createdDate) / 1000),
                {
                  addSuffix: true,
                  locale: enGB,
                }
              )}
            </div>
          </div>
          <div className="feed_body_container">
            <LineBreak />
            <h4>{feedItem.videoTitle || ""}</h4>
            <div className="tags_container">
              {!!feedItem.tags &&
                feedItem.tags.map((tag, idx) => {
                  return (
                    <p className="tags" key={idx}>
                      #{tag}
                    </p>
                  );
                })}
            </div>
            <div className="feed_body" ref={ref}>
              <video
                ref={videoRef}
                src={feedItem.sourceUrl}
                poster={feedItem.thumbnail}
                preload="auto"
                onClick={handleClickVideo}
                // controls
                muted={isMuted}
                playsInline
                style={{
                  overflow: "hidden",
                  width: "300px",
                  height: "540px",
                  borderRadius: "15px",
                  background: "black",
                }}
              />
            </div>
            {/* <div className="feed_item_icons">
              <div onClick={handleFeedClick} className="feed_item_icon_wrapper">
                <CommentSVG />
              </div>
              <div
                onClick={() =>
                  handleCopy(
                    `${document.location.origin}/channels/${feedItem.channelUuid}/${feedItem.videoUuid}`
                  )
                }
                className="feed_item_icon_wrapper"
              >
                <ShareSVG />
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedVideoItem;
