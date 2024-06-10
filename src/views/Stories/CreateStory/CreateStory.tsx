"use client";
import BackButton from "components/BackButton/BackButton";
import LineBreak from "components/LineBreak/LineBreak";
import React, { useEffect, useState } from "react";
import storyTemplate from "../../../assets/png/storyTemplate.png";
import { CircularProgress } from "@mui/material";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addStorySegmentApi, createStoryApi } from "api/routes/Stories/stories";
import { CreateStoryModel } from "api/models/Story/story";
import PublishStory from "./PublishStory";
import { org_uuid } from "constants/constants";
import Loading from "app/loading";

interface Props {
  hiveDetails: HiveDetails;
}

const CreateStory = ({ hiveDetails }: Props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [storyUuid, setStoryUuid] = useState("");

  const [isFetching, setisFetching] = useState(false);

  //   const hiveDetails = useAppSelector(getHiveSelector);

  //   const isFetching = useAppSelector(getStoryIsFetchingSelector);
  //   const isCreated = useAppSelector(getStoryCreatedSelector);

  useEffect(() => {
    setTitle("");
    setDesc("");
    // setStoryUuid("");
    // emptyStorySegments();
    // setCurrentStoryIndex(0);
  }, []);

  const [storyCreated, setStoryCreated] = useState(false);

  const handleCreateStory = async () => {
    if (hiveDetails) {
      const created: CreateStoryModel | boolean = await createStoryApi({
        title: title,
        description: desc,
        organizationId: hiveDetails?.communityId || 1,
        organizationUuid: hiveDetails?.communityUuid,
      });
      if (created) {
        setStoryUuid(created.storyUuid);
        await addStorySegmentApi({
          description: desc,
          isActive: false,
          storyUrl: "",
          storyUuid: created.storyUuid,
          title: title,
          isImage: false,
          isVideo: false,
          colorCode: "#B4CEBE",
          communityUuid: org_uuid,
          contentType: "",
          order: 0,
        });

        setStoryCreated(true);
      } else {
      }
    }
  };

  const navigate = useRouter();

  //   useEffect(() => {
  //     if (isCreated) {
  //       navigate("/story/create/publish");
  //       dispatch(setStoryCreated(false));
  //     }
  //   }, [isCreated]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggle = () => {
    setStoryCreated((prevState) => !prevState);
  };

  return (
    <>
      {isClient ? (
        <>
          {storyCreated ? (
            <PublishStory
              storyUuid={storyUuid}
              title={title}
              description={desc}
              setTitle={setTitle}
              setDescription={setDesc}
              hiveDetails={hiveDetails}
              toggle={toggle}
            />
          ) : (
            <div className="create_story_container p-4">
              <h1 className="font-bold text-2xl">Create story</h1>
              <LineBreak />
              <div className="backBtn_spacing">
                <BackButton to="dashboard/story" />
              </div>
              <LineBreak />
              <div className="title_and_limit">
                <p className="tags text-sm font-bold">Story title</p>
                <div className="character_limit text-sm">{title.length}/60</div>
              </div>
              <LineBreak />
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value.slice(0, 60));
                }}
                placeholder="Give a title for your story"
                className="input_border text_padding input_width_full"
              />
              <LineBreak />
              <div className="title_and_limit">
                <p className="tags text-sm font-bold">Story Description</p>
                <div className="character_limit text-sm">{desc.length}/240</div>
              </div>{" "}
              <LineBreak />
              <input
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value.slice(0, 240));
                }}
                placeholder="Give a description for your story"
                className="input_border text_padding input_width_full"
              />
              <LineBreak />
              <p className="tags text-sm font-bold">Templates</p>
              <LineBreak />
              <div className="story_template">
                <Image
                  src={storyTemplate}
                  alt=""
                  className="ai_template_img create_story_template_img"
                />
                <p className="text-sm font-bold story_template_description">
                  Default Template
                </p>
              </div>
              <LineBreak />
              <>
                {isFetching ? (
                  <div className="story_template_nextBtn primaryBtn">
                    <CircularProgress size={20} color="inherit" />
                  </div>
                ) : (
                  <div>
                    {title.length > 0 && desc.length > 0 ? (
                      <div
                        onClick={handleCreateStory}
                        className="primaryBtn story_template_nextBtn"
                      >
                        Continue
                      </div>
                    ) : (
                      <div className="story_template_nextBtn disabledBtn">
                        Continue
                      </div>
                    )}
                  </div>
                )}
              </>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CreateStory;
