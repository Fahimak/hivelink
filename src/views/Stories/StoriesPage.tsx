import LineBreak from "components/LineBreak";
import React from "react";
import StoryTileView from "./components/StoryTileView";
import { StoryItemModel } from "api/models/Story/story";
import Link from "next/link";
import { ChildComponent } from "api/models/Hive/hiveComponents";

type Props = {
  stories: StoryItemModel[];
  childComponents: ChildComponent[];
};

const StoriesPage = ({ stories, childComponents }: Props) => {
  return (
    <div className="story_home_container">
      <div className="story_home_header">
        <div>
          <h2 className="text-2xl font-bold">Visual stories</h2>
          <LineBreak />
          <p>View captivating stories and mobile-optimized videos.</p>
        </div>
        {!!childComponents && childComponents[0] && (
          <Link href="story/create" className="primaryBtn">
            + Create Story
          </Link>
        )}
      </div>
      <div className="all_stories_templates_wrapper">
        {!!stories && stories.length > 0 ? (
          stories.map((story, idx) => {
            return <StoryTileView key={idx} story={story} idx={idx} />;
          })
        ) : (
          <div className="flex items-center justify-center h_full">
            <h2 className="font-bold text-xl text-center">
              {"All quiet on the story front! New tales coming shortly."}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
