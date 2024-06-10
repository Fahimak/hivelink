"use client";
import { VideoListItem } from "api/models/Videos/videoList";
import React from "react";
import ReactQuill from "react-quill";

type Props = { currentVideo: VideoListItem };

const VideoDescription = (props: Props) => {
  return (
    <ReactQuill
      className="react-quill"
      readOnly
      value={props.currentVideo?.attribute3[0]}
      theme="bubble"
    />
  );
};

export default VideoDescription;
