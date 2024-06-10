import {
  ChannelsCountItem,
  UsersCountItem,
  VideoCountItem,
} from "api/models/Analytics/metrics";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import {
  fetchChannelsCount,
  fetchProductsCount,
  fetchUsageData,
  fetchUsersCount,
  fetchVideoCount,
  fetchVisitorsData,
} from "api/routes/Analytics/analytics";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import IslandLayout from "components/IslandLayout";
import { org_uuid } from "constants/constants";
import AnalyticsPage from "views/Analytics/AnalyticsPage";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  return hiveDetails;
}

async function getVideoCount(passedId: number) {
  const videoCount: VideoCountItem = await fetchVideoCount({
    hiveId: passedId,
  }); // The return value is *not* serialized

  if (!videoCount) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch video data");
  }

  return videoCount;
}

async function getUsageData(passedId: number) {
  const usageData = await fetchUsageData({
    organizationId: passedId,
  }); // The return value is *not* serialized

  if (!usageData) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch usage data");
  }

  return usageData;
}

async function getUsersCount(passedId: number) {
  const usersCount: UsersCountItem = await fetchUsersCount({
    hiveId: passedId,
  }); // The return value is *not* serialized

  if (!usersCount) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch user count");
  }

  return usersCount;
}

async function getChannelsCount(passedId: number) {
  const channelsCount: ChannelsCountItem = await fetchChannelsCount({
    hiveId: passedId,
  }); // The return value is *not* serialized

  if (!channelsCount) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch channel count data");
  }

  return channelsCount;
}

async function getProducts() {
  const productCount = await fetchProductsCount({
    organizationUuid: org_uuid,
    fromDate: null,
    toDate: null,
  });

  if (!productCount) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch product count data");
  }

  return productCount;
}

async function getVisitors() {
  const visitorsData = await fetchVisitorsData({
    organizationUuid: org_uuid,
    fromDate: null,
    toDate: null,
  });

  if (!visitorsData) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch visitors data");
  }

  return visitorsData;
}

export default async function Page() {
  const productPromise = getProducts();
  const visitorsPromise = getVisitors();

  const [productCount, visitorsData] = await Promise.all([
    productPromise,
    visitorsPromise,
  ]);

  const hiveDetails = await getData();

  const usagePromise = getUsageData(hiveDetails?.communityId || 1);
  const videoPromise = getVideoCount(hiveDetails?.communityId || 1);
  const usersPromise = getUsersCount(hiveDetails?.communityId || 1);
  const channelsPromise = getChannelsCount(hiveDetails?.communityId || 1);

  const [videoCount, usersCount, channelsCount, usageData] = await Promise.all([
    videoPromise,
    usersPromise,
    channelsPromise,
    usagePromise,
  ]);

  return (
    <IslandLayout>
      <AnalyticsPage
        usageData={usageData}
        videoCount={videoCount.noOfVideos}
        usersCount={usersCount.noOfUsers}
        channelsCount={channelsCount.noOfChannels}
        visitorsData={visitorsData}
        productsCount={productCount}
      />
    </IslandLayout>
  );
}
