"use client";
import React from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { alertStore } from "store/alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessAlert = () => {
  const alert = alertStore((state: any) => state.alert);
  const changeAlert = alertStore((state: any) => state.updateAlert);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    changeAlert({ type: "none", message: "" });
  };

  return (
    <Snackbar
      open={alert.type === "success"}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        onClick={handleClose}
        role="button"
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
