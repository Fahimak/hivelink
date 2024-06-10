import { EventsModel } from "api/models/Hive/events";
import GreenTickSVG from "assets/svg/greenTick.svg";
import RedCrossSVG from "assets/svg/redCross.svg";
import React from "react";
import Image from "next/image";

interface Props {
  handleMemberRegistration: any;
  handleSetRegister: any;
  eventResp: EventsModel;
}

const EventRSVP = ({
  handleMemberRegistration,
  handleSetRegister,
  eventResp,
}: Props) => {
  const currentEvent = eventResp.event;

  return (
    <div className="rsvp_event_container nextBtn_events">
      <h2 className="font-bold text-xl">RSVP?</h2>
      <div
        onClick={handleMemberRegistration}
        className={`${
          eventResp?.hasAccess === 1 ? "primaryBtn" : "secondaryBtn"
        } event_btn_next event_btn_hover`}
      >
        <Image alt="svg" src={GreenTickSVG} />

        <p>Yes</p>
      </div>
      {currentEvent?.isPaidEvent ? (
        <>
          {eventResp?.hasAccess !== 1 && (
            <div
              onClick={() => handleSetRegister(2)}
              className={`${
                eventResp?.hasAccess === 2 ? "primaryBtn" : "secondaryBtn"
              } event_btn_next event_btn_hover`}
            >
              <Image alt="svg" src={RedCrossSVG} />

              <p>No</p>
            </div>
          )}
        </>
      ) : (
        <div
          onClick={() => handleSetRegister(2)}
          className={`${
            eventResp?.hasAccess === 2 ? "primaryBtn" : "secondaryBtn"
          } event_btn_next event_btn_hover`}
        >
          <Image alt="svg" src={RedCrossSVG} />
          <p>No</p>
        </div>
      )}
      {currentEvent?.isPaidEvent ? (
        <>
          {eventResp?.hasAccess !== 1 && (
            <div
              onClick={() => handleSetRegister(3)}
              className={`${
                eventResp?.hasAccess === 3 ? "primaryBtn" : "secondaryBtn"
              } event_btn_hover`}
            >
              Maybe
            </div>
          )}
        </>
      ) : (
        <div
          onClick={() => handleSetRegister(3)}
          className={`${
            eventResp?.hasAccess === 3 ? "primaryBtn" : "secondaryBtn"
          } event_btn_hover`}
        >
          Maybe
        </div>
      )}
    </div>
  );
};

export default EventRSVP;
