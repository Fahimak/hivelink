"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { CampaignModel } from "api/models/Campaign/campaign";
import LineBreak from "components/LineBreak";
import { format } from "date-fns";
import Loading from "app/loading";

interface Props {
  campaignList: CampaignModel[];
}

const CampaignContainer = ({ campaignList }: Props) => {
  //   const handleNewCampaign = () => {
  //     dispatch(setCampaignUuid(""));
  //     navigate("create");
  //   };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="story_home_container">
          <div className="story_home_header">
            <div>
              <h2 className="font-bold text-2xl">Campaigns</h2>
              <LineBreak />
              <p>
                Create campaigns to effectively reach and engage your target
                audience.
              </p>
            </div>
          </div>
          <LineBreak />
          {!!campaignList[0] ? (
            <div className="">
              <h3 className="font-bold text-lg">Your Campaigns</h3>
              <LineBreak />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="members table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <p className="bold_heading_table">Campaign Name</p>
                      </TableCell>
                      <TableCell align="left">
                        <p className="bold_heading_table">Type</p>
                      </TableCell>
                      <TableCell align="left">
                        <p className="bold_heading_table">Created At</p>
                      </TableCell>
                      {/* <TableCell align="left">
                        <p className="bold_heading_table">Actions</p>
                      </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!!campaignList &&
                      campaignList?.map((data, idx) => (
                        <TableRow
                          className="table_cell_hover"
                          key={idx}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            // onClick={() =>
                            //   handleViewCampaign(data.campaignUuid)
                            // }
                            component="th"
                            scope="row"
                          >
                            {data.campaignName || "-"}
                          </TableCell>
                          <TableCell
                            // onClick={() =>
                            //   handleViewCampaign(data.campaignUuid)
                            // }
                            align="left"
                          >
                            {data.campaignType === "sms" ? "SMS" : "Email"}
                          </TableCell>
                          <TableCell
                            // onClick={() =>
                            //   handleViewCampaign(data.campaignUuid)
                            // }
                            align="left"
                          >
                            {format(data.createdDate, "MMMM d, yyyy")}
                          </TableCell>
                          {/* <TableCell align="left">
                            <CampaignKebab campaign={data} />
                          </TableCell> */}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <h3>You currently dont have any campaigns</h3>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CampaignContainer;
