"use client";
import { CircularProgress, Dialog } from "@mui/material";
import {
  AttendeeFormDetailsReq,
  EventUserItem,
  EventsItem,
  EventsModel,
  GalleryItem,
} from "api/models/Hive/events";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import CopyLinkSVG from "assets/svg/copy_link.svg";
import LocationSVG from "assets/svg/location.svg";
import EditIconSVG from "assets/svg/edit_icon.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EventRegistrationForm from "./components/EventsRegistrationForm";
import MemberLoginConfirm from "components/MemberLoginConfirm/MemberLoginConfirm";
import EventRSVP from "./components/EventRSVP";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { registerEvent } from "api/routes/Events/events";
import revalidateTags from "utils/revalidate";
import GalleryBtn from "./components/GalleryBtn";
import { getCookie, setCookie } from "cookies-next";
import DialogLoader from "components/DialogLoader";
import Loading from "app/loading";

const REGISTER = "register";

interface Props {
  eventResp: EventsModel;
  hiveDetails: HiveDetails;
  attendeesList: EventUserItem[];
  childComponents: ChildComponent[];
  gallery: GalleryItem[];
}

const EventPage = ({
  eventResp,
  hiveDetails,
  attendeesList,
  childComponents,
  gallery,
}: Props) => {
  const [currentEvent, setCurrentEvent] = useState<EventsItem | null>(
    eventResp ? eventResp.event : null
  );

  const path = usePathname();

  useEffect(() => {
    if (eventResp) {
      setCurrentEvent(eventResp.event);
    } else {
      toastInfo("No Upcoming Events");
      router.push("/dashboard/events");
    }
  }, [eventResp]);

  const hiveUuid = hiveDetails.communityUuid;

  //   const openDubaiTechTalks = () => {
  //     window.open(
  //       `https://members.dubaitechtalks.com/mobile/events/${
  //         currentEvent?.eventIdentifier || ""
  //       }?atxd=${localStorage.getItem("atxd")}&register=${localStorage.getItem(
  //         "register"
  //       )}`,
  //       "_self"
  //     );
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 5000);
  //   };

  const handleInitRegister = () => {
    !!eventResp?.formDetails &&
    eventResp.formDetails.length > 0 &&
    eventResp.isFormFilled !== true
      ? handleFormRegister()
      : registerBg();
  };

  const router = useRouter();

  const registerBg = () => {
    setIsLoading(true);

    if (!!currentEvent?.eventAmount) {
      //   router.push("payment");
    } else {
      registerEvent({
        eventUuid: currentEvent?.eventUuid || "",
        eventIdentifier: currentEvent?.eventIdentifier || "",
        registerType: 1,
        attended: localStorage.getItem("atxd") === "txd",
      });
      revalidateTags("event");
      localStorage.removeItem("atxd");
      setMemberConfirm(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!!currentEvent) {
      if (
        localStorage.getItem("atxd") === "txd" ||
        localStorage.getItem("register") === "true"
      ) {
        setCookie("path", path);
        getCookie("isLoggedIn") !== "yes"
          ? router.push("/login")
          : handleInitRegister();
      }
      localStorage.removeItem("register");
    }
  }, [currentEvent]);

  const [registerType, setRegisterType] = useState(eventResp?.hasAccess || 0);

  const handleSetRegister = async (val: number) => {
    setIsLoading(true);

    if (getCookie("isLoggedIn") === "yes") {
      setRegisterType(val);
      if (val === 1 && !!currentEvent?.eventAmount) {
        if (!eventResp?.hasAccess) {
          //   router.push("payment");
        }
      } else {
        setRegisterType(val);
        registerEvent({
          eventUuid: currentEvent?.eventUuid || "",
          eventIdentifier: currentEvent?.eventIdentifier || "",
          registerType: val,
          attended: localStorage.getItem("atxd") === "txd",
        });
        revalidateTags("event");

        val === 1 && setMemberConfirm(true);
      }
    } else {
      // launchLogin(path);
    }
    setIsLoading(false);
  };

  //   const handleRegister = () => {
  //     if (localStorage.getItem("isLoggedIn") === "yes") {
  //     } else {
  //       localStorage.setItem("path", url);
  //       launchLogin();
  //     }
  //   };

  const { toastInfo, toastError, toastSuccess } = useTriggerAlert();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${document.location.href}?type=member`)
      .then(() => {
        if (!!document.location.href) {
          toastInfo("Copied link to clipboard");
        } else {
          toastInfo(
            "This story isnt available at the moment, please try another one"
          );
        }
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  const handleEdit = () => {
    router.push(`/events/${currentEvent?.eventIdentifier}/edit`);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAttendeesClick = () => {
    if (!!childComponents[0]) {
      router.push(`/events/${currentEvent?.eventIdentifier}/attendees`);
    }
  };

  const [registrationForm, setRegistrationForm] = useState<
    AttendeeFormDetailsReq[]
  >([]);

  const setRegistrationFormFromResp = () => {
    !!eventResp &&
      eventResp.formDetails &&
      eventResp.formDetails.map((data, idx) => {
        registrationForm.push({
          fieldName: data.fieldName,
          fieldValue: "",
          type: data.type,
          options: data.options,
        });
      });
  };

  useEffect(() => {
    setRegistrationFormFromResp();
  }, []);

  const [attendeeFormDetails, setAttendeeFormDetails] =
    useState<AttendeeFormDetailsReq[]>(registrationForm);

  useEffect(() => {
    setAttendeeFormDetails(registrationForm);
  }, [registrationForm]);

  const [openForm, setOpenForm] = useState(false);

  const handleFormRegister = () => {
    setOpenForm(true);
  };

  const handleFinalFormSubmit = () => {
    setIsLoading(true);

    if (!!currentEvent?.eventAmount) {
      //   router.push("payment");
    } else {
      registerEvent({
        eventUuid: currentEvent?.eventUuid || "",
        eventIdentifier: currentEvent?.eventIdentifier || "",
        registerType: 1,
        formDetails: attendeeFormDetails,
        attended: localStorage.getItem("atxd") === "txd",
      });
      revalidateTags("event");
      localStorage.removeItem("atxd");

      setOpenForm(false);
      setMemberConfirm(true);
    }
    setIsLoading(false);
  };

  const [memberConfirm, setMemberConfirm] = useState(false);

  const handleMemberRegistration = async () => {
    setIsLoading(true);
    if (getCookie("isLoggedIn") === "yes") {
      setRegisterType(1);
      !!eventResp?.formDetails &&
      eventResp.formDetails.length > 0 &&
      !eventResp?.isFormFilled
        ? handleFormRegister()
        : handleSetRegister(1);
    } else {
      setCookie("path", path);
      router.push("/login?register=true");
      // launchLogin(path);
    }
    setIsLoading(false);
  };

  const closeMemberConfirm = () => {
    setMemberConfirm(false);
  };

  const [promo, setPromo] = useState("");

  useEffect(() => {
    setPromo("");
  }, []);

  const formatDate = (timestamp: number | string) => {
    // Convert timestamp to date object and format
    return format(new Date(timestamp), "MMM d, yyyy, h:mm a");
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {isClient ? (
        <IslandLayout>
          <div className="">
            <img
              alt="event_banner"
              className="home_event_banner"
              src={
                currentEvent?.eventBanner ||
                "https://veehivestage-images.s3.us-east-2.amazonaws.com/organizationImages/banner.png"
              }
            />
            <LineBreak />
          </div>
          {/* {!!childComponents[0] && <EventCta />} */}
          <div className="event_copy_btn_wrapper">
            <div onClick={handleCopy} className="secondaryBtn event_copy_btn">
              <Image src={CopyLinkSVG} alt="svg" />

              <p>Share</p>
            </div>
          </div>
          <div className="event_page_container">
            <div className="home_event_header">
              <img
                alt="event_logo"
                className="home_event_thumbnail"
                src={
                  currentEvent?.eventThumbnail ||
                  "https://images.veehive.ai/organizationImages/logo_org.png"
                }
              />
              <div>
                <h2 className="font-bold text-2xl">
                  {currentEvent?.eventName}
                </h2>
                <h3 className="event_location_view_wrapper">
                  {currentEvent?.eventMedium === "online"
                    ? "Online"
                    : "In-Person"}{" "}
                  {" ("}
                  {formatDate(currentEvent?.eventStartDate)} {" - "}
                  {formatDate(currentEvent?.eventEndDate)} {")"}
                </h3>
                {!!currentEvent?.eventAmount && (
                  <h3 className="text-sm font-bold">
                    Entry Fee -{" "}
                    {currentEvent?.eventCurrency === "AED" ? "AED " : "$"}
                    {currentEvent?.eventAmount}
                  </h3>
                )}
              </div>
              {childComponents[0] && (
                <div onClick={handleEdit} className="edit_event_details_icon">
                  <Image src={EditIconSVG} alt="svg" />
                </div>
              )}
            </div>
            <LineBreak />

            <div className="home_event_body">
              <div>
                <h2 className="text-xl font-bold">
                  Posted by {eventResp?.organizationDetail.organizationName}
                </h2>

                <LineBreak />
                <p>{eventResp?.organizationDetail.organizationDesc}</p>
              </div>
              <hr></hr>
              <h2 className="text-xl font-bold">Where</h2>
              <div className="event_deet_location">
                <Image src={LocationSVG} alt="svg" />

                <p>
                  {currentEvent?.eventMedium === "online"
                    ? "Online"
                    : "In-Person"}
                  {" - "}
                  <a
                    className="link"
                    href={currentEvent?.eventAddress}
                    target="_blank"
                  >
                    {currentEvent?.eventLocation.slice(0, 50)}
                  </a>
                </p>
              </div>
              {!!currentEvent?.eventDescription && <hr></hr>}
              {!!currentEvent?.eventDescription && (
                <h2 className="font-bold text-xl">Event Details</h2>
              )}
              {currentEvent?.eventDescription && (
                <p>{currentEvent.eventDescription.slice(0, 1000)}</p>
              )}
              {currentEvent?.eventVideo && <hr></hr>}
              {currentEvent?.eventVideo && (
                <video
                  muted={true}
                  src={currentEvent?.eventVideo}
                  width="300px"
                  height="533px"
                  controls
                  style={{
                    overflow: "hidden",
                    borderRadius: "15px",
                    background: "black",
                  }}
                />
              )}
              {!!attendeesList.length && attendeesList.length > 1 && <hr></hr>}
              {!!attendeesList.length && attendeesList.length > 1 && (
                <div className="title_and_limit">
                  <h2 className="font-bold text-xl">
                    {attendeesList.length} people attending
                  </h2>
                  {!!childComponents[0] && (
                    <p onClick={handleAttendeesClick} className="link">
                      See all
                    </p>
                  )}
                </div>
              )}
              {!!attendeesList.length && attendeesList.length > 1 && (
                <div
                  onClick={handleAttendeesClick}
                  className={`event_attendee_profile_list ${
                    !!childComponents[0] && "pointer"
                  }`}
                >
                  {attendeesList.map((user, idx) => {
                    if (idx < 6)
                      return (
                        <img
                          key={idx}
                          src={
                            user.profilePhoto ||
                            "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                          }
                          className="event_attendee_profile"
                        />
                      );
                  })}
                </div>
              )}
              <GalleryBtn
                childComponents={childComponents}
                currentEvent={eventResp.event}
                gallery={gallery}
              />
            </div>
            <LineBreak />
            {/* <div className="home_event_body_org_info">
              <div className="event_info_header">
                This event is part of a hive
              </div>
              <div className="home_event_body_org_info_content">
                <div className="title_and_limit">
                  <div>
                    <h2>{eventResp?.organizationDetail.organizationName}</h2>
                    <h3 className="text-gray-light">by {orgOwner?.userName}</h3>
                  </div>
                  <img
                    src={
                      orgOwner?.profilePhoto ||
                      "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                    }
                    alt="hive_owner_profile"
                    className="home_event_thumbnail"
                  />
                </div>
              </div>
            </div>
            <LineBreak /> */}

            {!!eventResp && eventResp.qrCodeLink && (
              <div className="home_event_body">
                <div className="flex justify-center items-center">
                  {/* <h3>Scan the below QR Code for entry</h3> */}
                  <img
                    src={eventResp.qrCodeLink}
                    width="150px"
                    height="150px"
                  />
                </div>
              </div>
            )}
          </div>
          <Dialog onClose={() => setOpenForm(false)} open={openForm}>
            {!!registrationForm && registrationForm.length > 0 && (
              <EventRegistrationForm
                handleFinalFormSubmit={handleFinalFormSubmit}
                attendeeFormDetails={attendeeFormDetails}
                setAttendeeFormDetails={setAttendeeFormDetails}
                eventResp={eventResp}
              />
            )}
          </Dialog>
          <div className="event_back_btn secondaryBtn mx-2">
            <Link href="/dashboard/events" className="go_back black_text">
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7H1M1 7L7 13M1 7L7 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Back</p>
            </Link>
          </div>
          {memberConfirm && (
            <MemberLoginConfirm
              isOpen={memberConfirm}
              title="member"
              close={closeMemberConfirm}
            />
          )}
          {currentEvent && (
            <EventRSVP
              handleMemberRegistration={handleMemberRegistration}
              handleSetRegister={handleSetRegister}
              eventResp={eventResp}
            />
          )}
          <Dialog open={isLoading} className="">
            <div className="p-4 flex flex-col items-center gap-2">
              <CircularProgress
                color="inherit"
                size={30}
                variant="indeterminate"
              />
            </div>
          </Dialog>
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EventPage;
