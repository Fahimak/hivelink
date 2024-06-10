"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  tabsList: string[];
  selectedTab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

const HiveTabs = ({ tabsList, selectedTab, setTab }: Props) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    // router.push(`${tabsList[newValue].toLowerCase()}`);
  };

  return (
    // <div className="tabs_container">
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      aria-label="hive tabs"
      className="tabs-wrapper"
    >
      {tabsList.map((tab, idx) => {
        return (
          <Tab
            style={{
              width: "33.34%",
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
            key={idx}
            label={tab}
          />
        );
      })}
    </Tabs>
    // </div>
  );
};

export default HiveTabs;
