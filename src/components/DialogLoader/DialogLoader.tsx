"use client";
import { Dialog, CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  isLoading: boolean;
};

const DialogLoader = (props: Props) => {
  return (
    <Dialog open={props.isLoading} className="">
      <div className="p-4 flex flex-col items-center gap-2">
        <CircularProgress color="inherit" size={30} variant="indeterminate" />
      </div>
    </Dialog>
  );
};

export default DialogLoader;
