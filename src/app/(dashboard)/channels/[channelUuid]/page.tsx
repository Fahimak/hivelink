import { ChannelItemModel } from "api/models/Channels/channels";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { VideoListModel } from "api/models/Videos/videoList";
import { fetchChannelNoAuthData } from "api/routes/Channels/channels";
import { fetchChildComponents } from "api/routes/Hive/components";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchVideoList } from "api/routes/Videos/videos";
import { org_uuid } from "constants/constants";
import { Suspense } from "react";
import ChannelPage from "views/Channel/ChannelPage";
import type { Metadata, ResolvingMetadata } from "next";
import { checkMemberView } from "utils/auth";
import Loading from "app/loading";

async function getData(channelUuid: string) {
  const channel: ChannelItemModel = await fetchChannelNoAuthData(channelUuid);

  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  const childComponents: ChildComponent[] = await fetchChildComponents({
    organizationId: hiveDetails?.communityId || 1,
    parentComponentCode: "Channel",
    channelUuid: channelUuid,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!childComponents) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive child components from channel");
  }

  const videoList: VideoListModel = await fetchVideoList({
    channelUuid: channelUuid!,
    page: 0,
    noOfRecords: 12,
    status: "Ready",
  }); // The return value is *not* serialized

  if (!videoList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch video List");
  }

  return { channel, hiveDetails, childComponents, videoList };
}

type Props = {
  params: { channelUuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.channelUuid;

  // fetch data
  const channel: ChannelItemModel = await fetchChannelNoAuthData(id);

  return {
    title: channel.objChannel.channelName || "Veehive.ai",
    description: channel.objChannel.description,
    openGraph: {
      images: [channel.objChannelProperties.logo],
    },
  };
}

export default async function Page({
  params,
}: {
  params: { channelUuid: string };
}) {
  const { channel, hiveDetails, childComponents, videoList } = await getData(
    params.channelUuid
  );

  return (
    <Suspense fallback={<Loading />}>
      {!!channel && (
        <ChannelPage
          channel={channel}
          hiveDetails={hiveDetails}
          childComponents={childComponents}
          videoList={videoList}
        />
      )}
    </Suspense>
  );
}
