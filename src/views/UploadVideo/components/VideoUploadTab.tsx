import React, { Dispatch, SetStateAction } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface Props {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

const VideoUploadTabs = ({ selectedTab, setSelectedTab }: Props) => {
  const tabs = ["Video Upload", "Upload Using Youtube"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Tabs value={selectedTab} onChange={handleChange} aria-label="channel tabs">
      {tabs.map((tab, idx) => {
        return (
          <Tab
            key={idx}
            style={{
              width: "50%",
              height: "20px",
              fontFamily: "IBM Plex Sans Condensed",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "140%",
              textAlign: "center",
              letterSpacing: "0.02em",
              color: "#1C1B1F",
            }}
            label={tab}
          />
        );
      })}
      {/* <Tab label="About" />
      <Tab label="Members" />
      <Tab label="Settings" /> */}
    </Tabs>
  );
};

export default VideoUploadTabs;
