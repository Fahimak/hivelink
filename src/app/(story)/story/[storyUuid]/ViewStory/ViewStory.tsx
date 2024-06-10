"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  SegmentItem,
  SegmentItemReactModel,
  StoryItemModel,
} from "api/models/Story/story";
import { storyStore } from "store/story";
import closeMediaSVG from "assets/svg/close_media.svg";
import muteSVG from "assets/svg/mute_speaker.svg";
import unMuteSVG from "assets/svg/unmute_speaker.svg";
import loveEmoji from "assets/png/love_emoji.png";
import nahEmoji from "assets/png/nah_emoji.png";
import mehEmoji from "assets/png/meh_emoji.png";
import defaultEmoji from "assets/png/defaultEmoji.png";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchStoryReactItem,
  updateStoryReactions,
} from "api/routes/Stories/stories";
import Link from "next/link";
import revalidateTags from "utils/revalidate";
import { checkAuth } from "utils/auth";
import { getCookie } from "cookies-next";
import Loading from "app/loading";

// const MuteSVG = dynamic(() => import("@mui/icons-material/VolumeOff"), {
//   ssr: false,
// });

// const UnMuteSVG = dynamic(() => import("@mui/icons-material/VolumeUp"), {
//   ssr: false,
// });

// const CloseMediaSVG = dynamic(() => import("@mui/icons-material/Close"), {
//   ssr: false,
// });

interface Props {
  stories: SegmentItem[];
  storyItem: StoryItemModel;
}

const ViewStory = ({ stories, storyItem }: Props) => {
  // const searchQuery = useSearchParams();
  // const ref = searchQuery.get("ref");

  // const stories = mockData;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(-1);
  //   useEffect(() => {
  //     if (ref)
  //       makeProdPost(
  //         process.env.NEXT_PUBLIC_BASE_URL +
  //           "/spring/analytics/cta/unAuth/update/logs" || "",
  //         {
  //           origin: ref,
  //           currentStoryId: stories[currentStoryIndex].storySegmentId,
  //           request: stories[currentStoryIndex].storySegmentId,
  //           sessionId: localStorage.getItem("sessionId"),
  //         }
  //       );
  //   }, [ref, currentStoryIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef(
    stories.map(() => React.createRef<HTMLVideoElement>())
  );

  const [progressArray, setProgressArray] = useState(
    Array(stories.length).fill(0)
  );

  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
    setCurrentStoryIndex(0);
    // videoRefs.current[currentStoryIndex].current?.play();
  };

  useEffect(() => {
    if (start) {
      if (stories[currentStoryIndex].type === "image") {
        let interval: NodeJS.Timeout;
        const duration = 5000; // 5 seconds
        const step = 50; // Update progress every 50ms
        let progressTime = 0;

        const updateImageProgress = () => {
          progressTime += step;
          const progress = (progressTime / duration) * 100;
          setProgressArray((prevProgress) =>
            prevProgress.map((p, index) =>
              index === currentStoryIndex ? progress : p
            )
          );
          if (progressTime >= duration) {
            clearInterval(interval);
            goToNextStory();
          }
        };

        interval = setInterval(updateImageProgress, step);

        return () => clearInterval(interval);
      } else {
        videoRefs.current.map((ref, idx) => {
          if (idx === currentStoryIndex) {
            resetProgress(idx);
            ref.current?.play();
          } else {
            ref.current?.pause();
          }
        });

        const updateProgress = (idx: number) => {
          const video = videoRefs.current[idx].current;
          if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            setProgressArray((prevProgress) =>
              prevProgress.map((p, index) => (index === idx ? progress : p))
            );
          }
        };

        const video = videoRefs.current[currentStoryIndex].current;
        if (video) {
          video.addEventListener("timeupdate", () =>
            updateProgress(currentStoryIndex)
          );
        }
        return () => {
          if (video) {
            video.removeEventListener("timeupdate", () =>
              updateProgress(currentStoryIndex)
            );
          }
        };
      }
    }
  }, [currentStoryIndex, start]);

  const resetProgress = (index: number) => {
    // Seek the video to its beginning
    const video = videoRefs.current[index].current;
    if (video) {
      video.currentTime = 0;
      video.pause();
    }
    // Reset the progress in the state
    setProgressArray((prevProgress) =>
      prevProgress.map((p, idx) => (idx === index ? 0 : p))
    );
  };

  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1)
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0)
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
  };

  const updateStoryUuid = storyStore((state: any) => state.updateStoryUuid);
  const updateStoryId = storyStore((state: any) => state.updateStoryId);
  const storyUuid = storyStore((state: any) => state.storyUuid);
  const storyId = storyStore((state: any) => state.storyId);

  useEffect(() => {
    if (storyItem) {
      updateStoryUuid(storyItem.storyUuid);
    }

    if (currentStoryIndex > -1) {
      updateStoryId(stories[currentStoryIndex].id);
      updateStoryUuid(stories[currentStoryIndex].storyUuid);
    }
  }, [storyItem, currentStoryIndex]);

  const [segmentItemReact, setSegmentItemReact] = useState<
    SegmentItemReactModel | undefined
  >(undefined);

  const getStoryItemReact = async () => {
    const resp = await fetchStoryReactItem({
      storyUuid: storyUuid,
      storySegmentId: storyId,
      sessionId: localStorage.getItem("sessionId"),
    });

    if (resp) {
      setSegmentItemReact(resp);
    } else {
      setSegmentItemReact(undefined);
    }
  };

  useEffect(() => {
    getStoryItemReact();
  }, [storyId]);

  const playOrPauseStory = () => {
    const currentVideo = videoRefs.current[currentStoryIndex].current;
    if (!currentVideo) return;

    if (isPlaying) {
      currentVideo.pause();
    } else {
      currentVideo.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      video.muted = !isMuted;
    });

    setIsMuted(!isMuted);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [showSelections, setShowSelections] = useState(false);

  const emojis = [
    {
      reactionEmoji: loveEmoji,
      reactionType: "love",
      reactionId: 3,
    },
    {
      reactionEmoji: mehEmoji,
      reactionType: "meh",
      reactionId: 2,
    },
    {
      reactionEmoji: nahEmoji,
      reactionType: "nah",
      reactionId: 1,
    },
  ];

  const getSelectedEmojiSrc = () => {
    const emoji =
      segmentItemReact &&
      emojis.find(
        (emojiObj) => emojiObj.reactionId === +segmentItemReact?.reactionId
      );
    return emoji ? emoji.reactionEmoji : defaultEmoji;
  };

  const setEmoji = async (e: any) => {
    const resp = await updateStoryReactions({
      storyUuid: storyUuid,
      storySegmentId: storyId,
      reactionId: e.reactionId,
      reactionType: e.reactionType,
      sessionId: localStorage.getItem("sessionId"),
    });
    setShowSelections(false);

    if (resp) {
      getStoryItemReact();
    }
  };

  return (
    <>
      {isClient ? (
        <div className="story_wrapper">
          {start && (
            <>
              <div className={`gradient`}></div>
              <div className="linear-progress-bars">
                {stories.map((story, idx) => {
                  return (
                    <LinearProgress
                      key={idx}
                      className="linear-width"
                      color="inherit"
                      variant="determinate"
                      value={
                        idx === currentStoryIndex
                          ? progressArray[idx]
                          : idx < currentStoryIndex
                          ? 100
                          : 0
                      }
                    />
                  );
                })}
              </div>
              <div className="flex justify-center gap-x-10 w-full">
                {stories.map((story, index) => (
                  <div
                    key={index}
                    className={` ${
                      index === currentStoryIndex
                        ? "story_active"
                        : "story_hidden"
                    }`}
                  >
                    {story.type === "image" ? (
                      <img
                        alt="story_image"
                        className="story"
                        src={
                          story.thumbnailUrl ||
                          "https://veehivedev-images.s3.amazonaws.com/background/portrait_photo.png"
                        }
                      />
                    ) : (
                      <video
                        onLoadStart={() => {
                          setIsLoading(true);
                        }}
                        onCanPlayThrough={() => {
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 3000);
                        }}
                        autoPlay={index === currentStoryIndex}
                        preload="auto"
                        ref={videoRefs.current[index]}
                        className="story"
                        controls={false}
                        onPlay={() => {
                          setIsPlaying(true);
                        }}
                        onPause={() => setIsPlaying(false)}
                        playsInline
                        webkit-playsinline="true"
                        onEnded={goToNextStory}
                      >
                        <source src={story.storyUrl || ""}></source>
                      </video>
                    )}
                  </div>
                ))}
              </div>
              <div className="overlay_actions">
                <div
                  onClick={goToPreviousStory}
                  className="previous_elem"
                ></div>
                <div onClick={playOrPauseStory} className="pause_elem"></div>
                <div onClick={goToNextStory} className="next_elem"></div>
              </div>
              <div className="story_title_desc_btn_wrapper">
                {stories[currentStoryIndex].title && (
                  <div className="story_view_title">
                    {stories[currentStoryIndex].title}
                  </div>
                )}
                {stories[currentStoryIndex].description && (
                  <div className="story_view_desc_container">
                    <div className="story_view_desc_overlay"></div>
                    <div className="story_view_desc">
                      {stories[currentStoryIndex].description}
                    </div>
                  </div>
                )}
                {stories[currentStoryIndex].actionLink && (
                  <div className="click_here_btn">
                    <a
                      href={stories[currentStoryIndex].actionLink || ""}
                      target="_blank"
                      className=""
                    >
                      Click here
                    </a>
                  </div>
                )}
                {stories[currentStoryIndex].type === "video" && (
                  <div onClick={toggleMute} className="mute_button">
                    {isMuted ? (
                      <Image alt="mute_media" src={muteSVG} />
                    ) : (
                      <Image alt="unmute_media" src={unMuteSVG} />
                    )}
                  </div>
                )}
                <div className="emoji_container_items">
                  <div
                    className=""
                    onClick={() => setShowSelections((prevState) => !prevState)}
                  >
                    <Image
                      src={getSelectedEmojiSrc()}
                      className={
                        stories[currentStoryIndex].selectedEmoji
                          ? "emoji"
                          : "default_emoji"
                      }
                      alt="selected emoji"
                    />
                  </div>
                  <div>
                    {showSelections && (
                      <div className="emojis_wrapper">
                        {emojis.map((emojiObj) => (
                          <Image
                            key={emojiObj.reactionId}
                            onClick={() => setEmoji(emojiObj)}
                            src={emojiObj.reactionEmoji}
                            className="emoji"
                            alt={emojiObj.reactionType}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {!start && (
            <div onClick={handleStart} className="overall_overlay">
              <img
                src={storyItem.thumbnailUrl || ""}
                alt="story_thumbnail"
                className="overlay_image"
              />
              <div className="overlay_main_desc text-center">
                <div>
                  <h1 className="story_start_head text-white">
                    {storyItem.storyTitle}
                  </h1>
                  <p className="text-2xl text-white font-bold">
                    {"Click anywhere to explore"}
                  </p>
                </div>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="story_loader">
              <CircularProgress size={40} color="inherit" />
            </div>
          )}
          {getCookie("isLoggedIn") === "yes" && (
            <Link href="/dashboard/story" className="close_story">
              <Image alt="close_media" src={closeMediaSVG} />
            </Link>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ViewStory;
