import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchChildComponents } from "api/routes/Hive/components";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchServerStories } from "api/routes/Stories/stories";
import IslandLayout from "components/IslandLayout";
import { org_uuid } from "constants/constants";
import { checkMemberView } from "utils/auth";
import StoriesPage from "views/Stories/StoriesPage";

async function getHiveDetails() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  return hiveDetails;
}

async function getStoriesData() {
  const stories = await fetchServerStories(); // The return value is *not* serialized

  if (!stories) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  return stories;
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

export default async function Page() {
  const hiveDetails = await getHiveDetails();

  const storiesPromise = getStoriesData();
  const childPromise = getChild(hiveDetails?.communityId || 1);

  const [stories, child] = await Promise.all([storiesPromise, childPromise]);

  return (
    <IslandLayout>
      <StoriesPage stories={stories} childComponents={child} />
    </IslandLayout>
  );
}
