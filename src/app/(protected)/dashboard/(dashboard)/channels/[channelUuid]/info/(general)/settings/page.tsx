import { ChannelItemModel } from "api/models/Channels/channels";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchChannelNoAuthData } from "api/routes/Channels/channels";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import EditChannelSettings from "views/Channel/Info/EditChannelSettings";

async function getData(channelUuid: string) {
  const channel: ChannelItemModel = await fetchChannelNoAuthData(channelUuid);

  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  return { channel, hiveDetails };
}

export default async function Page({
  params,
}: {
  params: { channelUuid: string };
}) {
  const { channel, hiveDetails } = await getData(params.channelUuid);

  return <EditChannelSettings channel={channel} />;
}
