import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import StoryDisplay from "./StoryDisplay";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { SegmentItem } from "api/models/Story/story";
import DragReplace from "../components/DragReplace";
import StoryActions from "./StoryAction";
import { getSegmentsApi, publishStoryApi } from "api/routes/Stories/stories";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useTriggerAlert } from "hooks/useTriggerAlert";

interface Props {
  storyUuid: string;
  hiveDetails: HiveDetails;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  toggle: any;
}

const PublishStory = ({
  storyUuid,
  hiveDetails,
  title,
  description,
  setTitle,
  setDescription,
  toggle,
}: Props) => {
  //   const storySegments = useAppSelector(getStorySegmentsSelector);

  const [storySegments, setStorySegments] = useState<SegmentItem[]>([]);
  const [actionLink, setActionLink] = useState("");

  const [storyIdx, setStoryIdx] = useState(0);

  const getStorySegments = async () => {
    const resp = await getSegmentsApi({ storyUuid: storyUuid });
    if (!!resp) {
      setStorySegments(resp);
    }
  };

  useEffect(() => {
    getStorySegments();
    // dispatch(getStoryItem({ storyUuid: storyUuid }));
  }, [storyUuid]);

  const router = useRouter();

  const { toastError, toastSuccess } = useTriggerAlert();

  const handlePublish = async () => {
    const resp = await publishStoryApi({
      storyUuid: storyUuid,
    });

    if (!!resp) {
      router.push("/dashboard/story");
      toastSuccess("Story created successfully!");
    } else {
      toastError("Failed to create story");
    }
  };

  return (
    <div className="create_story_container">
      <h1 className="font-bold text-2xl">Add segments</h1>

      <LineBreak />
      <div
        className="backBtn_spacing flex items-center gap-x-1 text-black pointer"
        onClick={toggle}
      >
        <ArrowBack />
        <p>Back</p>
      </div>
      {!!storySegments && storySegments[0] && (
        <div className="story_edit_container">
          <div
            onClick={handlePublish}
            className="story_publish_btn secondaryBtn"
          >
            Publish
          </div>
          <StoryDisplay
            storySegments={storySegments}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            setActionLink={setActionLink}
            currentStoryIdx={storyIdx}
          />
          <div className="story_nav_dots_container">
            <DragReplace
              originalItems={storySegments}
              currentIdx={storyIdx}
              storyUuid={storyUuid}
              setIdx={setStoryIdx}
              getStorySegments={getStorySegments}
            />
          </div>
          <StoryActions
            storyUuid={storyUuid}
            storyIdx={storyIdx}
            storySegments={storySegments}
            title={title}
            description={description}
            actionLink={actionLink}
            setActionLink={setActionLink}
            getStorySegments={getStorySegments}
            setStoryIndex={setStoryIdx}
          />
        </div>
      )}
      <LineBreak />
    </div>
  );
};

export default PublishStory;
