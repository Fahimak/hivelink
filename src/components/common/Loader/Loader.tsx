import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Loader = () => {
  return (
    <Backdrop open className="loader_backdrop">
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
