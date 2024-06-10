"use client";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import FileDrop from "components/FileDrop/FileDrop";
import CheckmarkSVG from "assets/svg/checkmark.svg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YoutubeUploadLink from "./YoutubeUploadLink";
import VideoUploadTabs from "./VideoUploadTab";
import Image from "next/image";

interface Props {
  hiveDetails: HiveDetails;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
  setContentType: Dispatch<SetStateAction<string>>;
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
  youtubeUrl: string;
  setYoutubeUrl: Dispatch<SetStateAction<string>>;
}

const VideoSelect = ({
  hiveDetails,
  file,
  setFile,
  selectedTab,
  setSelectedTab,
  setContentType,
  setThumbnail,
  youtubeUrl,
  setYoutubeUrl,
  thumbnail,
}: Props) => {
  return (
    <div>
      <div className="vid_upload_tabs_wrapper">
        <VideoUploadTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="video_select_wrapper">
        <div className="video_select_container">
          {file === null ? (
            <>
              {selectedTab === 1 ? (
                <YoutubeUploadLink
                  url={youtubeUrl}
                  setYoutubeUrl={setYoutubeUrl}
                />
              ) : (
                <FileDrop
                  setContentType={setContentType}
                  setThumbnail={setThumbnail}
                  setVideoFile={setFile}
                  hiveDetails={hiveDetails}
                />
              )}
            </>
          ) : (
            <div>
              <video
                width="270px"
                height="480px"
                src={URL.createObjectURL(file!)}
                controls
                style={{
                  overflow: "hidden",
                  borderRadius: "15px",
                  background: "black",
                }}
              />

              <div
                className="video_change_status"
                onClick={() => {
                  setFile(null);
                }}
              >
                <div className="video_change_start">
                  <Image alt="svg" src={CheckmarkSVG} />

                  <div className="hover_underline">Change Video</div>
                </div>
                <p className="secondary_text">
                  {file.name.length > 10
                    ? file.name.slice(0, 10) + "..."
                    : file.name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSelect;
