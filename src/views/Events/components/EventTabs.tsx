"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface Props {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

const EventTabs = ({ selectedTab, setSelectedTab }: Props) => {
  const tabs = ["Info", "Media"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs
        variant="standard"
        value={selectedTab}
        onChange={handleChange}
        aria-label="event tabs"
      >
        {tabs.map((tab, idx) => {
          return (
            <Tab
              key={idx}
              style={{
                width: "20%",
                height: "20px",
                fontFamily: "IBM Plex Sans Condensed",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                textAlign: "center",
                letterSpacing: "0.02em",
                color: "#000000",
              }}
              label={tab}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default EventTabs;
