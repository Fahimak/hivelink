"use client";
import {
  VideoCountItem,
  UsersCountItem,
  ChannelsCountItem,
} from "api/models/Analytics/metrics";
import { ChildComponent, RawComponents } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import {
  fetchVideoCount,
  fetchUsersCount,
  fetchChannelsCount,
} from "api/routes/Analytics/analytics";
import { fetchChildComponents } from "api/routes/Hive/components";
import HomePage from "./HomePage";
import { hiveDetailsStore } from "store/details";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

export default function Home() {
  const [videoCount, setVideoCount] = useState(0);
  const [channelsCount, setChannelsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [childComps, setChildComps] = useState<ChildComponent[]>([]);

  async function getVideoCount(passedId: number) {
    const videoCount: VideoCountItem = await fetchVideoCount({
      hiveId: passedId,
    }); // The return value is *not* serialized

    if (!videoCount) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch video data");
    }

    setVideoCount(videoCount.noOfVideos);
  }

  async function getUsersCount(passedId: number) {
    const usersCount: UsersCountItem = await fetchUsersCount({
      hiveId: passedId,
    }); // The return value is *not* serialized

    if (!usersCount) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch user count");
    }

    setUsersCount(usersCount.noOfUsers);
  }

  async function getChannelsCount(passedId: number) {
    const channelsCount: ChannelsCountItem = await fetchChannelsCount({
      hiveId: passedId,
    }); // The return value is *not* serialized

    if (!channelsCount) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch channel count data");
    }

    setChannelsCount(channelsCount.noOfChannels);
  }

  async function getChild(passedId: number) {
    const childComponents: ChildComponent[] = await fetchChildComponents({
      organizationId: passedId || 1,
      parentComponentCode: "Home",
      channelUuid: "",
      isMemberView: getCookie("isMemberView") === "yes",
    }); // The return value is *not* serialized

    if (!childComponents) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch home child components");
    }

    setChildComps(childComponents);
  }

  const hiveDetails: HiveDetails = hiveDetailsStore(
    (state: any) => state.hiveDetails
  );

  useEffect(() => {
    if (hiveDetails) {
      getChannelsCount(hiveDetails.communityId || 1);
      getVideoCount(hiveDetails.communityId || 1);
      getUsersCount(hiveDetails.communityId || 1);
      getChild(hiveDetails.communityId || 1);
    }
  }, [hiveDetails]);

  return (
    <HomePage
      hiveDetails={hiveDetails}
      childComponents={childComps}
      videoCount={videoCount || 0}
      usersCount={usersCount || 0}
      channelsCount={channelsCount || 0}
    />
  );
}
