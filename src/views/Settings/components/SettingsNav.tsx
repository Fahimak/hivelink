"use client";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
} from "api/models/Hive/hiveDetails";
import HiveTabs from "components/HiveTabs";
import React, { useState } from "react";
import HiveAbout from "./HiveAbout";
import HiveMembers from "./HiveMembers";
import { MembersModel } from "api/models/Hive/hiveMembers";
import HiveMedia from "./HiveMedia";

type Props = {
  hiveDetails: HiveDetails;
  contactInfo: ContactInfoModel;
  socialLinks: SocialLinksItem[];
  hiveMembers: MembersModel;
};

const SettingsNav = ({
  hiveDetails,
  contactInfo,
  socialLinks,
  hiveMembers,
}: Props) => {
  const tabsList = ["About", "Media", "Members"];

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      {" "}
      <HiveTabs
        tabsList={tabsList}
        selectedTab={selectedTab}
        setTab={setSelectedTab}
      />
      {selectedTab === 0 ? (
        <HiveAbout
          hiveDetails={hiveDetails}
          socialLinks={socialLinks}
          contactInfo={contactInfo}
        />
      ) : selectedTab === 1 ? (
        <HiveMedia hiveDetails={hiveDetails} />
      ) : selectedTab === 2 ? (
        <HiveMembers hiveDetails={hiveDetails} members={hiveMembers} />
      ) : (
        <div>Channel</div>
      )}
    </div>
  );
};

export default SettingsNav;
