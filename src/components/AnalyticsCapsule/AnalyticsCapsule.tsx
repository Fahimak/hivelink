import CircularProgress from "@mui/material/CircularProgress";
import React, { PropsWithChildren } from "react";

interface Props {
  isLoading?: boolean;
}

const AnalyticsCapsule: React.FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
}) => {
  return (
    <div className="analytics_capsule_container">
      {isLoading ? <CircularProgress size={20} color="inherit" /> : children}
    </div>
  );
};

export default AnalyticsCapsule;
