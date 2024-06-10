"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import React, { useEffect, useState } from "react";
import LineBreak from "components/LineBreak/LineBreak";
import {
  CircularProgress,
  MenuItem,
  Select,
  StyledEngineProvider,
  TextField,
} from "@mui/material";
import BackButton from "components/BackButton/BackButton";
import AttendeeForm from "../components/AttendeeForm";
import {
  AttendeeFormDetails,
  EventsItem,
  EventsModel,
} from "api/models/Hive/events";
import Switch from "@mui/joy/Switch";
import { CssVarsProvider } from "@mui/joy";
import { addDays } from "date-fns";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useRouter } from "next/navigation";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { createEvent, deleteEvent, editEvent } from "api/routes/Events/events";
import revalidateTags from "utils/revalidate";
import EventsDateTimePicker from "../components/EventsDateTimePicker";
import EventMedia from "../CreateEvent/EventMedia";
import EventTabs from "../components/EventTabs";
import ConfirmationModal from "components/ConfirmationModal";
import Loading from "app/loading";

interface Props {
  hiveDetails: HiveDetails;
  event: EventsModel;
}

const CreateEvent = ({ hiveDetails, event }: Props) => {
  const currentEvent = event.event;

  const [fromDate, setFromDate] = useState<Date | null>(
    currentEvent.eventStartDate
  );
  const [toDate, setToDate] = useState<Date | null>(currentEvent.eventEndDate);

  const [isLoading, setIsLoading] = useState(false);

  const { toastInfo, toastSuccess, toastError } = useTriggerAlert();

  const [eventDetails, setEventDetails] = useState({
    name: currentEvent.eventName,
    description: currentEvent.eventDescription,
    medium: currentEvent.eventMedium,
    location: currentEvent.eventLocation,
    address: currentEvent.eventAddress,
    link: currentEvent.eventLink,
  });

  const handleDetailsChange = (e: any) => {
    setEventDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMedium = (medium: string) => {
    setEventDetails((prevState) => ({ ...prevState, medium: medium }));
  };

  const [attendeeFormDetails, setAttendeeFormDetails] = useState<
    AttendeeFormDetails[]
  >(event.formDetails || []);

  const hiveUuid = hiveDetails.communityUuid;

  const handleEdit = async () => {
    setIsLoading(true);

    const edited = await editEvent({
      eventLocation: eventDetails.location,
      eventName: eventDetails.name,
      eventDescription: eventDetails.description,
      eventStartDate: fromDate,
      eventEndDate: toDate,
      eventAddress: eventDetails.address,
      organizationUuid: hiveUuid,
      eventDurationInMinutes: 60,
      eventMedium: eventDetails.medium,
      formDetails: attendeeFormDetails,
      isPaidEvent: isPaid && eventAmount > 0,
      eventAmount: eventAmount,
      eventCurrency: currency || "",
      eventUuid: currentEvent?.eventUuid || "",
    });

    if (!!edited) {
      toastSuccess("Edited Event");
      await revalidateTags("events");
    } else {
      toastError("Failed to edit event");
    }

    setIsLoading(false);
  };

  const [currency, setCurrency] = useState(currentEvent.eventCurrency);

  const handleCurrencyChange = (e: any) => {
    setCurrency(e.target.value);
  };

  const router = useRouter();

  //   useEffect(() => {
  //     if (!!currentEvent) {
  //       navigate("/events/info");
  //     }
  //   }, [currentEvent]);

  const [isPaid, setIsPaid] = useState(currentEvent.isPaidEvent);
  const [eventAmount, setEventAmount] = useState(currentEvent.eventAmount);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirmDelete = async () => {
    const deleted = await deleteEvent({
      eventUuid: currentEvent?.eventUuid || "",
      hiveUuid: hiveUuid,
    });

    handleClose();

    if (deleted) {
      await revalidateTags("events");
      await revalidateTags("event");
      router.push("/dashboard/events");
      toastSuccess("Deleted event");
    } else {
      toastError("Failed to delete event");
    }
  };

  return (
    <>
      {isClient ? (
        <IslandLayout>
          <div className="p-4">
            <BackButton to={`/events/${currentEvent.eventIdentifier}`} />
            <LineBreak />
            <div className="flex w-full justify-between items-center">
              <h2 className="font-bold text-2xl">Edit Event</h2>
              <div onClick={handleDelete} className="primaryBtn">
                Delete Event
              </div>
            </div>
            <EventTabs
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          {selectedTab === 1 ? (
            <EventMedia hiveDetails={hiveDetails} currentEvent={currentEvent} />
          ) : (
            <div className="create_event_container">
              <div className="event_details_wrapper">
                <div>
                  <h4 className="font-bold">Event Name*</h4>
                  <LineBreak />
                  <TextField
                    className="half_width"
                    id="standard-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={handleDetailsChange}
                    value={eventDetails.name}
                  />
                </div>
                <div>
                  <EventsDateTimePicker
                    fromDate={fromDate}
                    toDate={toDate}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                  />
                </div>
                <div>
                  <h4 className="font-bold">Location*</h4>
                  <LineBreak />
                  <div className="video_limit_btns medium_btns">
                    <button
                      onClick={() => handleMedium("online")}
                      className={`${
                        eventDetails.medium === "online"
                          ? "primaryBtn"
                          : "secondaryBtn"
                      }`}
                    >
                      Online
                    </button>
                    <button
                      onClick={() => handleMedium("offline")}
                      className={`${
                        eventDetails.medium === "offline"
                          ? "primaryBtn"
                          : "secondaryBtn"
                      }`}
                    >
                      In-Person
                    </button>
                  </div>
                  <LineBreak />
                  <div className="flex items-center create-event-gap-location">
                    <TextField
                      className="half_width"
                      id="standard-basic"
                      label="Location"
                      placeholder="Where will the event be located?"
                      variant="outlined"
                      multiline
                      maxRows={4}
                      name="location"
                      onChange={handleDetailsChange}
                      value={eventDetails.location}
                    />
                    <TextField
                      className="half_width"
                      id="standard-basic"
                      label="Link"
                      placeholder={
                        eventDetails.medium === "offline"
                          ? "Add Event Address or Google Maps Link"
                          : "Add Online Meet Link"
                      }
                      variant="outlined"
                      multiline
                      maxRows={4}
                      name="address"
                      onChange={handleDetailsChange}
                      value={eventDetails.address}
                    />
                  </div>
                </div>

                <div>
                  <h4>Description/Instructions</h4>
                  <LineBreak />
                  <TextField
                    className="half_width"
                    id="standard-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    name="description"
                    onChange={handleDetailsChange}
                    value={eventDetails.description}
                  />
                </div>
                <div className="channel_paid_container">
                  <StyledEngineProvider injectFirst>
                    <CssVarsProvider>
                      <div className="switch_display">
                        <Switch
                          checked={isPaid}
                          onChange={(event) => setIsPaid(event.target.checked)}
                        />
                        <p>Paid</p>
                      </div>
                    </CssVarsProvider>
                  </StyledEngineProvider>
                  {isPaid && (
                    <div className="channel_amount_wrapper">
                      <input
                        className="outline-none"
                        placeholder="0.00"
                        value={eventAmount}
                        onChange={(e) => {
                          if (+e.target.value > 999) {
                            toastInfo("Please enter amount less than 1000");
                          }
                          /^\d*(\.\d{0,2})?$/.test(e.target.value) &&
                            (+e.target.value < 1000 || e.target.value === "") &&
                            setEventAmount(+e.target.value);
                        }}
                      />
                      <Select
                        // className="w_full"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        variant="standard"
                        value={currency}
                        label="Currency"
                        name="currency"
                        className="border-none"
                        onChange={handleCurrencyChange}
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="AED">AED</MenuItem>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
              <AttendeeForm
                attendeeFormDetails={attendeeFormDetails}
                setAttendeeFormDetails={setAttendeeFormDetails}
              />
              {!!eventDetails.name &&
              !!eventDetails.location &&
              !!eventDetails.medium &&
              !!fromDate &&
              !!toDate ? (
                <>
                  {isLoading ? (
                    <div className="primaryBtn nextBtn_event">
                      <CircularProgress size={20} color="inherit" />
                    </div>
                  ) : (
                    <div
                      onClick={handleEdit}
                      className="primaryBtn nextBtn_event"
                    >
                      Save
                    </div>
                  )}
                </>
              ) : (
                <div className="disabledBtn nextBtn_event">Save</div>
              )}
            </div>
          )}
          {isOpen && (
            <ConfirmationModal
              isOpen={isOpen}
              onReject={handleClose}
              onConfirm={handleConfirmDelete}
              headline={`Delete ${currentEvent?.eventName}`}
              description={`Are you sure you want to delete ${currentEvent?.eventName} event?`}
              confirmMessage="Yes"
              rejectMessage="No"
            />
          )}
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CreateEvent;
