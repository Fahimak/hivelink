import React, { PropsWithChildren } from "react";

interface Props {}

const IslandLayout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div className="island_layout">{children}</div>;
};

export default IslandLayout;
