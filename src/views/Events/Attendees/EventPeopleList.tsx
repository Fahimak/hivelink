"use client";
import {
  CircularProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { EventUserItem, EventsItem } from "api/models/Hive/events";
import BackButton from "components/BackButton/BackButton";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import LongText from "components/LongText/LongText";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import SearchBarSVG from "assets/svg/search_bar.svg";
import CSVDownloadSVG from "assets/svg/csv_download.svg";
import EventPeopleKebab from "../components/EventPeopleKebab";
import { useRouter } from "next/navigation";
import EventUserDetails from "../components/EventUserDetails";
import { getEventsPeopleList } from "api/routes/Events/events";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import Image from "next/image";
import Loading from "app/loading";

interface Props {
  currentEvent: EventsItem;
  peopleList: EventUserItem[];
  hiveDetails: HiveDetails;
}

const buildExportData = (
  exportData: string[][],
  passedData: EventUserItem[],
  setExportData: Dispatch<SetStateAction<string[][]>>
) => {
  const tempData: string[][] = [[]];

  passedData.map((data, idx) => {
    tempData.push([
      data.userName || "No Data",
      data.email || "No Data",
      data.phone ? "+" + data.phone.toString() : "No Data",
    ]);
    data.eventForm &&
      data.eventForm.map((data) =>
        tempData[idx + 1].push(
          data.fieldValue || data.options[0] || "No Response"
        )
      );
  });

  setExportData(tempData);
};

const EventPeopleList = ({ currentEvent, peopleList, hiveDetails }: Props) => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(0);

  const [users, setUsers] = useState(peopleList);

  const [exportData, setExportData] = useState<string[][]>([[]]);

  useEffect(() => {
    buildExportData(exportData, users, setExportData);
  }, [users]);

  const eventPeopleTabs = ["Attending", "Not Attending", "Maybe", "Attended"];

  const [isOpen, setIsOpen] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [currentUser, setCurrentEventUser] = useState<
    EventUserItem | undefined
  >(undefined);

  const handleUserClick = (user: EventUserItem) => {
    setCurrentEventUser(user);
    handleOpen();
  };

  const [searchPeople, setSearchPeople] = useState("");
  const latestSearchTerm = useRef<string>("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchValue: string) => {
    setIsFetching(true);

    latestSearchTerm.current = searchValue; // Update the latest search term
    if (currentEvent) {
      const resp = await getEventsPeopleList({
        eventIdentifier: currentEvent.eventIdentifier,
        registerType: selectedTab + 1, // Assuming `selectedTab` is defined elsewhere in your component
        searchInput: searchValue,
      });

      if (resp) {
        setUsers(resp);
      }
    }

    setIsFetching(false);
  };

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setIsFetching(true);

    setSelectedTab(newValue);
    const resp = await getEventsPeopleList({
      eventIdentifier: currentEvent?.eventIdentifier,
      registerType: newValue + 1,
    });
    if (resp) {
      setUsers(resp);
    }

    setIsFetching(false);
  };

  const handleUpdate = async () => {
    setIsFetching(true);

    const resp = await getEventsPeopleList({
      eventIdentifier: currentEvent?.eventIdentifier,
      registerType: selectedTab + 1,
    });
    if (resp) {
      setUsers(resp);
    }

    setIsFetching(false);
  };

  // const createCsvData = [
  //    users[0].eventForm.map((data, idx) => data.fieldName.toString()),

  //   users.map(
  //     (data, idx) => [data.userName, data.email, data.phone]
  //     // data.eventForm.map((form, idxx) => form.fieldValue),
  //   ),
  // ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchPeople(value);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => handleSearch(value), 300); // 300ms debounce time
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <IslandLayout>
          <div className="event_back_btn_table">
            <BackButton to={`/events/${currentEvent?.eventIdentifier}`} />
          </div>
          <div className="searchBar flex items-center gap-x-2">
            <Image alt="svg" src={SearchBarSVG} />
            <input
              onChange={handleInputChange}
              value={searchPeople}
              className="searchbar_input"
              placeholder="Search here"
            />
          </div>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="video tabs"
          >
            {eventPeopleTabs.map((tab, idx) => {
              return (
                <Tab
                  style={{
                    width: "25%",
                    height: "20px",
                    fontFamily: "IBM Plex Sans Condensed",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "140%",
                    textAlign: "center",
                    letterSpacing: "0.02em",
                    color: "#1C1B1F",
                  }}
                  key={idx}
                  label={<div className="vid_tab_display">{tab}</div>}
                />
              );
            })}
          </Tabs>
          <LineBreak />
          <div className="flex-end px-5">
            <CSVLink
              filename={`${currentEvent?.eventIdentifier || "event"}-user-data`}
              data={exportData}
            >
              <Image alt="svg" src={CSVDownloadSVG} />
            </CSVLink>
          </div>
          <LineBreak />
          {isFetching ? (
            <div className="flex flex-col items-center justify-center py-10">
              <CircularProgress />
              <p>Fetching details...</p>
            </div>
          ) : (
            <>
              {!!users.length ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {" "}
                          <p className="bold_heading_table">User Name</p>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <p className="bold_heading_table">Email</p>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <p className="bold_heading_table">Phone</p>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <p className="bold_heading_table">Action(s)</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {users.map((row, idx) => (
                      <TableBody key={idx}>
                        <TableRow
                          className="table_cell_hover pointer"
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            onClick={() => handleUserClick(row)}
                            component="th"
                            scope="row"
                          >
                            <div className="user_and_profile_table">
                              <img
                                key={idx}
                                src={
                                  row.profilePhoto ||
                                  "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                                }
                                className="event_attendee_profile_table"
                              />
                              {(
                                <LongText
                                  title={row.userName || "-"}
                                  cutoff={16}
                                />
                              ) || "-"}
                            </div>
                          </TableCell>
                          <TableCell
                            onClick={() => handleUserClick(row)}
                            className=""
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {(
                              <LongText title={row.email || "-"} cutoff={16} />
                            ) || "-"}
                          </TableCell>
                          <TableCell
                            onClick={() => handleUserClick(row)}
                            className=""
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {(
                              <LongText title={row.phone || "-"} cutoff={16} />
                            ) || "-"}
                          </TableCell>

                          <TableCell
                            className=""
                            align="center"
                            component="th"
                            scope="row"
                          >
                            <EventPeopleKebab
                              user={row}
                              event={currentEvent}
                              hiveDetails={hiveDetails}
                              apiCall={handleUpdate}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
              ) : (
                <h3 className="no_table_entries">
                  {!!searchPeople && "No entries found"}
                </h3>
              )}
            </>
          )}
          {isOpen && currentUser && (
            <EventUserDetails
              isOpen={isOpen}
              onReject={handleClose}
              isLoading={isFetching}
              member={currentUser}
            />
          )}
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EventPeopleList;
