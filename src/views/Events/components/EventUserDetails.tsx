import { CircularProgress, Dialog } from "@mui/material";
import { EventUserItem } from "api/models/Hive/events";
import AnalyticsCapsule from "components/AnalyticsCapsule";
import BackButton from "components/BackButton/BackButton";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import LongText from "components/LongText/LongText";
import CloseBlackSVG from "assets/svg/close_black.svg";
import DefaultUserBigSVG from "assets/svg/default_user.svg";
import React, { useEffect } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";

interface Props {
  isOpen: boolean;
  onReject: any;
  isLoading: boolean;
  member: EventUserItem;
}

export function formatDateToDDMMYY(dateString: string): string {
  try {
    // Parse the ISO date string to a Date object
    const date = parseISO(dateString);

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Format the date object to 'dd/MM/yy'
    return format(date, "dd/MM/yy");
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid date";
  }
}

const EventUserDetails = ({ isOpen, onReject, isLoading, member }: Props) => {
  return (
    <Dialog onClose={onReject} open={isOpen}>
      <div className="">
        {isLoading ? (
          <div>
            <CircularProgress size={30} color="inherit" />
          </div>
        ) : (
          <div className="user_page_container">
            <div
              onClick={onReject}
              className="pointer pointer_close_user_detail"
            >
              <Image alt="svg" src={CloseBlackSVG} />
            </div>
            <LineBreak />
            <div className="user_page_contaienr">
              {member && member.profilePhoto ? (
                <img src={member.profilePhoto} className="default_logo" />
              ) : (
                <Image alt="svg" src={DefaultUserBigSVG} />
              )}
              <div>
                <h3 className="font-bold text-lg">{member?.userName || ""}</h3>
              </div>
            </div>
            <LineBreak />

            <div className="user_data_container">
              <div className="h_n_v-user">
                <AnalyticsCapsule isLoading={isLoading}>
                  <div className="headers_and_value">
                    <h5 className="font-bold">User Name</h5>
                    <h2 className="font-bold text-2xl">
                      {member?.userName || ""}
                    </h2>
                  </div>
                </AnalyticsCapsule>
              </div>
              <LineBreak />
              {!!member?.email && (
                <div className="h_n_v-user">
                  <AnalyticsCapsule isLoading={isLoading}>
                    <div className="headers_and_value">
                      <h5 className="font-bold">Email</h5>
                      <LongText
                        bold={true}
                        title={member?.email || ""}
                        cutoff={25}
                      ></LongText>
                    </div>
                  </AnalyticsCapsule>
                </div>
              )}
            </div>
            {!!member?.eventForm && member?.eventForm.length > 0 && (
              <>
                <LineBreak />
                <h2 className="font-bold text-2xl">Form Details</h2>
                <LineBreak />
                <div className=" normal_20-p">
                  {member?.eventForm.map((data, idx) => {
                    return (
                      <>
                        {data.type === "date" ? (
                          <div key={idx}>
                            <h4 className="fs-large font-bold">
                              {data.fieldName}
                            </h4>
                            <LineBreak />
                            <p className="fs-medium">
                              Response: {formatDateToDDMMYY(data.fieldValue)}
                              {/* {format(
                                parseISO(new Date(data.fieldValue).toString()),
                                "MMM d, yyyy"
                              )} */}
                            </p>
                            <LineBreak />
                          </div>
                        ) : (
                          <div key={idx}>
                            <h4 className="fs-large font-bold">
                              {data.fieldName}
                            </h4>
                            <LineBreak />
                            <p className="fs-medium">
                              Response:{" "}
                              {data.fieldValue ||
                                data.options[0] ||
                                "No Response"}
                            </p>
                            <LineBreak />
                          </div>
                        )}
                      </>
                    );
                  })}
                  <LineBreak />
                </div>
              </>
            )}
            <LineBreak />
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default EventUserDetails;
