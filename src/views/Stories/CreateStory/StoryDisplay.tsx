import { HiveDetails } from "api/models/Hive/hiveDetails";
import { SegmentItem } from "api/models/Story/story";
import { editSegmentApi } from "api/routes/Stories/stories";
import { org_uuid } from "constants/constants";
import React, { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  storySegments: SegmentItem[];
  currentStoryIdx: number;
  title: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setActionLink: Dispatch<SetStateAction<string>>;
}

const StoryDisplay = ({
  storySegments,
  currentStoryIdx,
  title,
  description,
  setTitle,
  setDescription,
  setActionLink,
}: Props) => {
  const hiveUuid = org_uuid;

  useEffect(() => {
    if (storySegments[currentStoryIdx]) {
      setTitle(storySegments[currentStoryIdx].title);
      setDescription(storySegments[currentStoryIdx].description);
      setActionLink(storySegments[currentStoryIdx].actionLink || "");
    }
  }, [currentStoryIdx]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.name === "title" && setTitle(e.target.value.slice(0, 27));
    e.target.name === "description" &&
      setDescription(e.target.value.slice(0, 240));
    editSegmentApi({
      description: description,
      isActive: false,
      storyUrl: storySegments[currentStoryIdx].storyUrl || "",
      storyUuid: storySegments[currentStoryIdx].storyUuid,
      title: title,
      isImage: storySegments[currentStoryIdx].type === "image",
      isVideo: storySegments[currentStoryIdx].type === "video",
      colorCode: storySegments[currentStoryIdx].colorCode || "",
      communityUuid: hiveUuid,
      contentType: storySegments[currentStoryIdx].type || "",
      storyId: storySegments[currentStoryIdx].id,
      isMediaChanged: false,
      thumbnail: "",
      actionLink: storySegments[currentStoryIdx].actionLink,
      order: storySegments[currentStoryIdx].segmentOrder,
    });
  };

  return (
    <>
      {!!storySegments && storySegments.length > 0 && (
        <div
          style={{
            backgroundColor: storySegments[currentStoryIdx].colorCode || "",
          }}
          className="story_display_wrapper"
        >
          {storySegments[currentStoryIdx].type === "video" ? (
            <video
              width="256.5px"
              height="456px"
              src={storySegments[currentStoryIdx].storyUrl || ""}
              controls
              style={{
                overflow: "hidden",
                borderRadius: "5px",
                background: "black",
              }}
            />
          ) : (
            <>
              {storySegments[currentStoryIdx].thumbnailUrl && (
                <img
                  src={storySegments[currentStoryIdx].thumbnailUrl || ""}
                  alt="story_thumbnail"
                  className="story_display_image_wrapper"
                />
              )}
            </>
          )}
          <div className="story_content_wrapper">
            <input
              name="title"
              value={title}
              onChange={handleInputChange}
              className="story_title"
              placeholder="Add title here..."
            />{" "}
            <input
              name="description"
              value={description}
              onChange={handleInputChange}
              className="story_desc"
              placeholder="Add description here..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StoryDisplay;
