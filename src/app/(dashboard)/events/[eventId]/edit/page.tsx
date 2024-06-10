import { EventsModel } from "api/models/Hive/events";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchEventDetails } from "api/routes/Events/events";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import EditEvent from "views/Events/EditEvent";
async function getData(passedId: string) {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  const event: EventsModel = await fetchEventDetails({
    eventIdentifier: passedId,
  }); // The return value is *not* serialized

  if (!event) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch event details");
  }

  return { hiveDetails, event };
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const { hiveDetails, event } = await getData(params.eventId);

  return (
    <div>
      <EditEvent hiveDetails={hiveDetails} event={event} />
    </div>
  );
}
