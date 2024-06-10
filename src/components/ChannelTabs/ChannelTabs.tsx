"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import BackButton from "components/BackButton";
import { usePathname, useRouter } from "next/navigation";
import Loading from "app/loading";

interface Props {
  channelUuid: string;
}

const ChannelTabs = ({ channelUuid }: Props) => {
  const path = usePathname();

  const tabs = ["About", "Members", "Settings"];

  const [selectedTab, setSelectedTab] = useState(
    path.split("/")[4] === "about"
      ? 0
      : path.split("/")[4] === "members"
      ? 1
      : 2
  );

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(
      `/channels/${channelUuid}/info/${tabs[newValue].toLowerCase()}`
    );
    setSelectedTab(newValue);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div>
          <div className="m-2">
            <BackButton to={`/channels/${channelUuid}`} />
          </div>

          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="channel tabs"
          >
            {tabs.map((tab, idx) => {
              return (
                <Tab
                  key={idx}
                  style={{
                    width: "33.333%",
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
      )}
    </>
  );
};

export default ChannelTabs;
