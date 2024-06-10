"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LineBreak from "components/LineBreak";
import PageNumbers from "components/PageNumbers";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MembersItemModel, MembersModel } from "api/models/Hive/hiveMembers";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { usePathname, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { fetchHiveMembers } from "api/routes/Hive/hive";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { CircularProgress } from "@mui/material";
import MembersKebab from "views/Settings/components/MembersKebab";
import { ChannelItemModel } from "api/models/Channels/channels";
import Loading from "app/loading";

interface Props {
  members: MembersModel;
  hiveDetails: HiveDetails;
  channelUuid: string;
  channel: ChannelItemModel;
}

const ChannelMembers = ({
  members,
  hiveDetails,
  channelUuid,
  channel,
}: Props) => {
  const [membersModel, setMembersModel] = useState(members);

  const [hiveMembers, setHiveMembers] = useState(membersModel.content);

  const [totalPages, setTotalPages] = useState(membersModel.totalPages);
  const [pageNo, setPageNo] = useState(0);

  const handleNextPage = async (pageNo: number) => {
    setLoading(true);
    const resp: MembersModel = await fetchHiveMembers({
      hiveId: hiveDetails.communityId || 1,
      pageNo: pageNo,
      contentLimit: 15,
      userName: searchUser,
      channelUuid: channelUuid,
    });
    setMembersModel(resp);
    setTotalPages(resp.totalPages);
    setHiveMembers(resp.content);
    setPageNo(pageNo);
    setLoading(false);
  };

  const refreshData = () => {
    handleNextPage(pageNo);
  };

  const navigate = useRouter();

  const handleInvite = () => {
    navigate.push(`/channels/${channelUuid}/info/members/invite`);
  };

  const path = usePathname();

  const handleUserClick = (user: MembersItemModel) => {
    //   dispatch(setClickedProfileId(user.profileId));
    //   navigate(`/user/${user.profileId}`, { state: { from: path.pathname } });
  };

  const [searchUser, setSearchUser] = useState("");
  const latestSearchTerm = useRef<string>("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    latestSearchTerm.current = e.target.value; // Update the latest search term

    setSearchUser(e.target.value);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => handleNextPage(0), 300);
  };

  const [loading, setLoading] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="p-4">
          <LineBreak />
          <div className="hive_members_head w-full gap-x-4">
            <div className="flex">
              <h3 className="text-xl font-bold">Members</h3>
            </div>
            <div className="w-full">
              <div className="rounded-xl flex items-center border p-2 gap-x-2">
                <SearchOutlined />
                <input
                  className="border-none outline-none focus-none w-full h-fit"
                  onChange={handleSearchUser}
                  value={searchUser}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="flex">
              <div
                onClick={handleInvite}
                className="secondaryBtn button_with_logo"
              >
                <img
                  src="https://imagesdev.veehive.ai/webApp/webApp_upload.png"
                  className="smallLogo"
                />
                <p>Invite</p>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <CircularProgress size={20} color="inherit" />
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="members table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="bold_heading_table">Username</p>
                    </TableCell>
                    <TableCell align="left">
                      <p className="bold_heading_table">Contact</p>
                    </TableCell>
                    <TableCell align="left">
                      <p className="bold_heading_table">Type</p>
                    </TableCell>
                    <TableCell align="left">
                      <p className="bold_heading_table">Joined</p>
                    </TableCell>
                    <TableCell align="left">
                      <p className="bold_heading_table">Action(s)</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!hiveMembers &&
                    hiveMembers?.map((member, idx) => (
                      <TableRow
                        className="table_cell_hover"
                        key={idx}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          onClick={() => handleUserClick(member)}
                          component="th"
                          scope="row"
                        >
                          {member.userName || "-"}
                        </TableCell>
                        <TableCell
                          onClick={() => handleUserClick(member)}
                          align="left"
                        >
                          {(member.userContactDetails &&
                          member.userContactDetails.length > 20
                            ? member.userContactDetails.slice(0, 20) + "..."
                            : member.userContactDetails) || "-"}
                        </TableCell>
                        <TableCell
                          onClick={() => handleUserClick(member)}
                          align="left"
                        >
                          {member.isSuperAdmin
                            ? "Owner"
                            : member.isModerator
                            ? "Admin"
                            : "User"}
                        </TableCell>
                        <TableCell
                          onClick={() => handleUserClick(member)}
                          align="left"
                        >
                          {" "}
                          {member.dateJoined !== "not joined" ? (
                            <h1 className="">
                              {formatDistanceToNow(
                                new Date(member.dateJoined),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </h1>
                          ) : (
                            "Not Joined"
                          )}
                        </TableCell>
                        <TableCell>
                          <MembersKebab
                            hiveMember={false}
                            userId={member.userId}
                            userName={member.userName}
                            hiveDetails={hiveDetails}
                            refreshData={refreshData}
                            channelId={channel.objChannel.id}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <LineBreak />

          <PageNumbers
            handleChange={handleNextPage}
            totalPages={totalPages}
            initialPage={pageNo}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ChannelMembers;
