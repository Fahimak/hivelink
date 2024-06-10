import { EventsModel } from "api/models/Hive/events";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchEventsList } from "api/routes/Events/events";
import { fetchChildComponents } from "api/routes/Hive/components";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchServerStories } from "api/routes/Stories/stories";
import IslandLayout from "components/IslandLayout";
import { org_uuid } from "constants/constants";
import { checkMemberView } from "utils/auth";
import CreateEvent from "views/Events/CreateEvent";
import EventsPage from "views/Events/EventsPage";
import StoriesPage from "views/Stories/StoriesPage";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  return { hiveDetails };
}

export default async function Page() {
  const { hiveDetails } = await getData();
  return (
    <div>
      <CreateEvent hiveDetails={hiveDetails} />
    </div>
  );
}
