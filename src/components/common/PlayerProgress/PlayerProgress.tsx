import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  value: number;
  isTransition?: boolean;
}

const PlayerProgress: React.FC<Props> = ({ value, isTransition = true }) => {
  return (
    <LinearProgress
      value={value}
      className={`progress_line ${isTransition ? "transition" : ""}`}
      variant="determinate"
    />
  );
};

export default PlayerProgress;
