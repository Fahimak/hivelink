"use client";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { StoryItemModel } from "api/models/Story/story";
import LongText from "components/LongText/LongText";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  story: StoryItemModel;
  idx: number;
}

const StoryTileView = ({ story, idx }: Props) => {
  const navigate = useRouter();

  const handleClick = () => {
    navigate.push("/story/" + story.storyUuid);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div onClick={handleClick} key={idx} className="story_template">
          <div
            style={{ backgroundColor: story.colorCode || "" }}
            className="story_template_display_wrapper pointer"
          >
            {story.thumbnailUrl && (
              <img
                src={story.thumbnailUrl || ""}
                alt=""
                className="story_template_img"
              />
            )}
            <div className="story_tile_play">
              <PlayArrowRounded color="inherit" />
            </div>
          </div>
          <div className="story_template_content_wrapper">
            <div className="text-sm font-bold story_template_description">
              <LongText title={story.storyTitle} cutoff={20} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryTileView;
