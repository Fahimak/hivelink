import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchServerStories } from "api/routes/Stories/stories";
import IslandLayout from "components/IslandLayout";
import { org_uuid } from "constants/constants";
import { Suspense } from "react";
import CreateStory from "views/Stories/CreateStory/CreateStory";
import StoriesPage from "views/Stories/StoriesPage";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details");
  }

  return hiveDetails;
}

export default async function Page() {
  const hiveDetails = await getData();
  return (
    <IslandLayout>
      <Suspense>
        <CreateStory hiveDetails={hiveDetails} />
      </Suspense>
    </IslandLayout>
  );
}
