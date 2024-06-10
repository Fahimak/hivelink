"use client";
import React, { useEffect, useState } from "react";
import LineBreak from "components/LineBreak/LineBreak";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormModel } from "api/models/Forms/forms";
import { format } from "date-fns";
import Loading from "app/loading";

interface Props {
  formsList: FormModel[];
}

const FormsContainer = ({ formsList }: Props) => {
  const navigate = useRouter();

  const handleCreate = () => {
    navigate.push("create");
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="p-4">
          <div className="title_and_limit">
            <h2 className="font-bold text-2xl">Forms</h2>
            {/* <div onClick={handleCreate} className="secondaryBtn">
              + Create New Form
            </div> */}
          </div>
          <LineBreak />
          {!!formsList && !!formsList.length ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="members table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="bold_heading_table">Form Name</p>
                    </TableCell>

                    <TableCell align="center">
                      <p className="bold_heading_table">Created On</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className="bold_heading_table">Responses</p>
                    </TableCell>
                    {/* <TableCell align="left">
                  <p className="bold_heading_table">Actions</p>
                </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!formsList &&
                    formsList?.map((data, idx) => (
                      <TableRow
                        className="table_cell_hover"
                        key={idx}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          //   onClick={() => handleUserClick(member)}
                          component="th"
                          scope="row"
                        >
                          {data.formName || "-"}
                        </TableCell>

                        <TableCell
                          //   onClick={() => handleUserClick(member)}
                          align="center"
                        >
                          {format(data.createdDate, "MMMM d, yyyy")}
                        </TableCell>
                        <TableCell
                          //   onClick={() => handleUserClick(member)}
                          align="center"
                        >
                          {data.responsesCount || 0}
                        </TableCell>
                        {/* <TableCell
                        onClick={() => handleUserClick(member)}
                      align="left"
                    >
                      <FormKebab form={data} />
                    </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h4>No Created forms to show</h4>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FormsContainer;
