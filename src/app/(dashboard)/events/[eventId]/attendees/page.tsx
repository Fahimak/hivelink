import { EventUserItem, EventsModel } from "api/models/Hive/events";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import {
  fetchEventDetails,
  getEventsPeopleList,
} from "api/routes/Events/events";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import EventPeopleList from "views/Events/Attendees/EventPeopleList";

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

  const peopleList: EventUserItem[] = await getEventsPeopleList({
    eventIdentifier: event.event?.eventIdentifier,
    registerType: 1,
  }); // The return value is *not* serialized

  if (!peopleList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch event people list");
  }

  return { hiveDetails, event, peopleList };
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const { hiveDetails, event, peopleList } = await getData(params.eventId);

  return (
    <div>
      <EventPeopleList
        hiveDetails={hiveDetails}
        currentEvent={event.event}
        peopleList={peopleList}
      />
    </div>
  );
}
