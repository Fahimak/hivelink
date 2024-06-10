import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchHiveChannels } from "api/routes/Hive/channels";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import Loading from "app/(dashboard)/loading";
import IslandLayout from "components/IslandLayout";
import { org_uuid } from "constants/constants";
import { Suspense } from "react";
import { checkMemberView } from "utils/auth";
import InviteMembers from "views/Settings/components/InviteMembers";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  const channelList: ChannelListModel[] = await fetchHiveChannels({
    hiveId: hiveDetails?.communityId || 1,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!channelList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch channels");
  }

  return { hiveDetails, channelList };
}

export default async function Page() {
  const { hiveDetails, channelList } = await getData();

  return (
    <IslandLayout>
      <Suspense fallback={<Loading />}>
        <InviteMembers channels={channelList} hiveDetails={hiveDetails} />
      </Suspense>
    </IslandLayout>
  );
}
