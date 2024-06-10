"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { EventsModel } from "api/models/Hive/events";
import { useRouter } from "next/navigation";

interface Props {
  eventsList: EventsModel[];
}

const EventsCalendar = ({ eventsList }: Props) => {
  const router = useRouter();

  const handleEventClick = (event: any) => {
    router.push(`/events/${event.event.extendedProps.eventIdentifier}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={eventsList}
      headerToolbar={{
        left: "title",
        right: "prev,next",
        center: "dayGridMonth,timeGridWeek",
      }}
      dayCellClassNames="ak_day_cell"
      eventClassNames="event_class_name"
      dayHeaderClassNames="day_header_class"
      slotLabelClassNames="event_slot_label"
      viewClassNames="event_view_class"
      eventClick={handleEventClick}
    />
  );
};

export default EventsCalendar;
