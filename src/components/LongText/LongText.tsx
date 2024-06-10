import { Tooltip } from "@mui/material";
import React from "react";

interface Props {
  cutoff: number;
  title: string;
  textStyle?: string;
  bold?: boolean;
}

const LongText = ({ title, cutoff, textStyle, bold }: Props) => {
  return (
    <Tooltip title={title} placement="top">
      {bold ? (
        <h3 className="font-bold text-lg">
          {title.length > cutoff ? title.slice(0, cutoff) + "..." : title}
        </h3>
      ) : (
        <p className={textStyle || ""}>
          {title.length > cutoff ? title.slice(0, cutoff) + "..." : title}
        </p>
      )}
    </Tooltip>
  );
};

export default LongText;
