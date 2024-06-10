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
import { AttendeeFormDetails, EventsItem } from "api/models/Hive/events";
import Switch from "@mui/joy/Switch";
import { CssVarsProvider } from "@mui/joy";
import { addDays } from "date-fns";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useRouter } from "next/navigation";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { createEvent } from "api/routes/Events/events";
import revalidateTags from "utils/revalidate";
import EventsDateTimePicker from "../components/EventsDateTimePicker";
import EventMedia from "./EventMedia";
import Loading from "app/loading";

interface Props {
  hiveDetails: HiveDetails;
}

const CreateEvent = ({ hiveDetails }: Props) => {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(addDays(new Date(), 1));

  const [isLoading, setIsLoading] = useState(false);

  const { toastInfo, toastSuccess, toastError } = useTriggerAlert();

  const [eventDetails, setEventDetails] = useState({
    name: "",
    description: "",
    medium: "offline",
    location: "",
    address: "",
    link: "",
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
  >([]);

  const hiveUuid = hiveDetails.communityUuid;

  const [currentEvent, setCurrentEvent] = useState<EventsItem | undefined>(
    undefined
  );

  const handleCreate = async () => {
    setIsLoading(true);

    const created = await createEvent({
      eventLocation: eventDetails.location,
      eventName: eventDetails.name,
      eventDescription: eventDetails.description,
      eventVideo: "",
      eventThumbnail: "",
      eventBanner: "",
      eventColor: "",
      eventStartDate: fromDate,
      eventEndDate: toDate,
      eventAddress: eventDetails.address,
      organizationUuid: hiveUuid,
      eventDurationInMinutes: 60,
      eventMedium: eventDetails.medium,
      formDetails: attendeeFormDetails,
      isPaidEvent: isPaid,
      eventAmount: eventAmount,
      eventCurrency: currency || "",
    });

    if (!!created) {
      toastSuccess("Created Event");
      await revalidateTags("events");
      setCurrentEvent(created);
    } else {
      toastError("Failed to create event");
    }
  };

  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (e: any) => {
    setCurrency(e.target.value);
  };

  const router = useRouter();

  //   useEffect(() => {
  //     if (!!currentEvent) {
  //       navigate("/events/info");
  //     }
  //   }, [currentEvent]);

  const [isPaid, setIsPaid] = useState(false);
  const [eventAmount, setEventAmount] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <IslandLayout>
          {currentEvent ? (
            <EventMedia hiveDetails={hiveDetails} currentEvent={currentEvent} />
          ) : (
            <div className="create_event_container">
              <BackButton to="/dashboard/events" />
              <LineBreak />
              <h2 className="font-bold text-2xl">Create an Event</h2>
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
                      onClick={handleCreate}
                      className="primaryBtn nextBtn_event"
                    >
                      Next
                    </div>
                  )}
                </>
              ) : (
                <div className="disabledBtn nextBtn_event">Next</div>
              )}
            </div>
          )}
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CreateEvent;
