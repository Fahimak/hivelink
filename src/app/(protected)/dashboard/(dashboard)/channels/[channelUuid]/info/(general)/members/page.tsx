import { ChannelItemModel } from "api/models/Channels/channels";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { MembersModel } from "api/models/Hive/hiveMembers";
import { fetchChannelNoAuthData } from "api/routes/Channels/channels";
import { fetchHiveDetails, fetchHiveMembers } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import ChannelMembers from "views/Channel/Info/ChannelMembers";

async function getData(channelUuid: string) {
  const channel: ChannelItemModel = await fetchChannelNoAuthData(channelUuid);

  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  const channelMembers: MembersModel = await fetchHiveMembers({
    hiveId: hiveDetails?.communityId || 1,
    pageNo: 0,
    contentLimit: 15,
    channelUuid: channelUuid,
  }); // The return value is *not* serialized

  if (!channelMembers) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch channel members");
  }

  return { channel, hiveDetails, channelMembers };
}

export default async function Page({
  params,
}: {
  params: { channelUuid: string };
}) {
  const { channel, hiveDetails, channelMembers } = await getData(
    params.channelUuid
  );

  return (
    <ChannelMembers
      members={channelMembers}
      hiveDetails={hiveDetails}
      channelUuid={params.channelUuid}
      channel={channel}
    />
  );
}
