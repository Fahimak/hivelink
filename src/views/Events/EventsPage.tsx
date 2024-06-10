import React, { useEffect } from "react";

import IslandLayout from "components/IslandLayout/IslandLayout";
import EventsCalendar from "./components/EventsCalendar";
import Buttons from "components/Buttons/Buttons";
import { EventsModel } from "api/models/Hive/events";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";

interface Props {
  events: EventsModel[];
  childComponents: ChildComponent[];
  hiveDetails: HiveDetails;
}

const EventsPage = ({ events, childComponents, hiveDetails }: Props) => {
  const hiveUuid = hiveDetails.communityUuid;

  return (
    <IslandLayout>
      <div className="events_main_container">
        <div className="events_header">
          <h2 className="text-2xl font-bold">Your Events</h2>
          <div>
            {!!childComponents.length &&
              childComponents.map((button, idx) => (
                <Buttons
                  key={idx}
                  redirect="/dashboard/events/create"
                  button={button}
                >
                  {button.componentName}
                </Buttons>
              ))}
          </div>
        </div>
        <EventsCalendar eventsList={events} />
      </div>
    </IslandLayout>
  );
};

export default EventsPage;
