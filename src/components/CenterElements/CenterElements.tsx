import { HiveDetails } from "api/models/Hive/hiveDetails";
import React, { PropsWithChildren } from "react";

const CenterElements: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="CenterElements">{children}</div>;
};

export default CenterElements;
