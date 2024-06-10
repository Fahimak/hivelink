import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchChildComponents } from "api/routes/Hive/components";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchStoryDetails, fetchStoryItem } from "api/routes/Stories/stories";
import Loading from "app/loading";
import { org_uuid } from "constants/constants";
import { Suspense } from "react";
import { checkMemberView } from "utils/auth";
import ViewStory from "./ViewStory";
import SegmentAnalytics from "views/Stories/components/SegmentAnalytics";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  return hiveDetails;
}

async function getStoryDetails(passedId: string) {
  const storyDetails = await fetchStoryDetails(passedId); // The return value is *not* serialized

  if (!storyDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch stories list data");
  }

  return storyDetails;
}

async function getStoryItem(passedId: string) {
  const storyItem = await fetchStoryItem(passedId); // The return value is *not* serialized

  if (!storyItem) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch story item details data");
  }
  return storyItem;
}

async function getChild(passedId: number) {
  const childComponents: ChildComponent[] = await fetchChildComponents({
    organizationId: passedId || 1,
    parentComponentCode: "Stories",
    channelUuid: "",
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!childComponents) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch home child components");
  }

  return childComponents;
}

export default async function Page({
  params,
}: {
  params: { storyUuid: string };
}) {
  const storyDetailsPromise = getStoryDetails(params.storyUuid);
  const storyItemPromise = getStoryItem(params.storyUuid);

  const hiveDetails = await getData();

  const compsPromise = getChild(hiveDetails?.communityId || 1);

  const [childComponents, storyDetails, storyItem] = await Promise.all([
    compsPromise,
    storyDetailsPromise,
    storyItemPromise,
  ]);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="story_container">
          <ViewStory stories={storyDetails} storyItem={storyItem} />
        </div>
      </Suspense>
      {childComponents[0] && (
        <Suspense fallback={<Loading />}>
          <div className="segment_analytics_container">
            <SegmentAnalytics storyUuid={params.storyUuid} />
          </div>
        </Suspense>
      )}
    </div>
    // <PageLayout>
    //   {/* <InitializeApp /> */}
    //   {/* <PageLayout sideMenu={true} rightMenu={true}>
    //     <IslandLayout> */}
    //   {/* <ChatsPage chatRooms={chatRoomDetail} /> */}
    //   {/* </IslandLayout>
    //   </PageLayout> */}
    // </PageLayout>
  );
}
