import {
  EventUserItem,
  EventsModel,
  GalleryItem,
} from "api/models/Hive/events";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import {
  fetchEventAttendeesList,
  fetchEventDetails,
  getGalleryEvent,
} from "api/routes/Events/events";
import { fetchChildComponents } from "api/routes/Hive/components";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchStoryDetails } from "api/routes/Stories/stories";
import { org_uuid } from "constants/constants";
import { checkMemberView } from "utils/auth";
import EventGalleryPage from "views/Events/Gallery/GalleryPage";

async function getData(passedId: string) {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  const childComponents: ChildComponent[] = await fetchChildComponents({
    organizationId: hiveDetails?.communityId || 1,
    parentComponentCode: "Events",
    channelUuid: "",
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!childComponents) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch home child components");
  }

  const event: EventsModel = await fetchEventDetails({
    eventIdentifier: passedId,
  }); // The return value is *not* serialized

  if (!event) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch event details");
  }

  const attendeesList: EventUserItem[] = await fetchEventAttendeesList({
    eventIdentifier: passedId,
  }); // The return value is *not* serialized

  if (!attendeesList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch event attendeesList");
  }

  const gallery: GalleryItem[] = await getGalleryEvent({
    eventUuid: event.event.eventUuid,
  }); // The return value is *not* serialized

  if (!gallery) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch event gallery");
  }

  return { hiveDetails, childComponents, event, attendeesList, gallery };
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const { hiveDetails, childComponents, event, gallery } = await getData(
    params.eventId
  );

  return (
    <div>
      <EventGalleryPage
        hiveDetails={hiveDetails}
        currentEvent={event.event}
        galleryItems={gallery}
        child={childComponents}
      />
    </div>
  );
}
