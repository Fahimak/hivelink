"use client";
import { VideoListItem } from "api/models/Videos/videoList";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

type Props = {
  currentVideo: VideoListItem;
};

function extractYoutubeId(url: string): string {
  const regex = /v=([^\&\?]+)/;
  const result = url.match(regex);

  return result ? result[1] : "";
}

const YoutubePlayer = ({ currentVideo }: Props) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  function convertShortsToEmbed(url: string) {
    // Check if the URL contains "/shorts"
    if (url.includes("/shorts/")) {
      // Replace "/shorts" with "/embed"
      const newUrl = url.replace("/shorts/", "/embed/");
      setYoutubeUrl(newUrl);
    } else {
      // If "/shorts" is not found in the URL, return the original URL
      return url;
    }
  }

  function convertVideoToEmbed(url: string) {
    // Check if the URL contains "/shorts"
    if (url.includes("/watch")) {
      // Replace "/shorts" with "/embed"
      const id = extractYoutubeId(url);
      const newUrl = url.replace("/watch", `/embed/${id}`);
      setYoutubeUrl(newUrl);
    } else {
      // If "/shorts" is not found in the URL, return the original URL
      return url;
    }
  }

  useEffect(() => {
    if (
      currentVideo?.channelType === "YOUTUBE" &&
      !!currentVideo?.horizontalVideoURL
    ) {
      currentVideo.horizontalVideoURL.includes("shorts")
        ? convertShortsToEmbed(currentVideo.horizontalVideoURL)
        : convertVideoToEmbed(currentVideo.horizontalVideoURL);
    }
  }, [currentVideo]);

  return (
    <div className="youtube_video_container">
      {!!currentVideo?.horizontalVideoURL &&
      currentVideo.horizontalVideoURL.includes("shorts") ? (
        <iframe
          loading="lazy"
          width="100%"
          height="100%"
          className="border-none"
          src={youtubeUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture;web-share"
        ></iframe>
      ) : (
        <iframe
          loading="lazy"
          width="100%"
          height="100%"
          src={youtubeUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture;web-share"
        ></iframe>
      )}
    </div>
  );
};

export default YoutubePlayer;
