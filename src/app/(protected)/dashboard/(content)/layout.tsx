import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { ProfileItem } from "api/models/profile";
import { fetchHiveChannels } from "api/routes/Hive/channels";
import { fetchHiveComponents } from "api/routes/Hive/components";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { fetchUserProfile } from "api/routes/Profile/profile";
import Loading from "app/loading";
import BottomNavMenu from "components/BottomNavMenu";
import Navbar from "components/Navbar";
import { org_uuid } from "constants/constants";
import { Suspense } from "react";
import { checkMemberView } from "utils/auth";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details");
  }

  const hiveComponents: RawComponents[] = await fetchHiveComponents({
    organizationUuid: org_uuid,
    organizationId: hiveDetails?.communityId || 1,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!hiveComponents) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive components");
  }

  const profile: ProfileItem = await fetchUserProfile({}); // The return value is *not* serialized

  if (!profile) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch profile");
  }

  const channelList: ChannelListModel[] = await fetchHiveChannels({
    hiveId: hiveDetails?.communityId || 1,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!channelList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch channels");
  }

  return { hiveDetails, hiveComponents, channelList, profile };
}

export default async function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hiveDetails, hiveComponents, channelList, profile } = await getData();

  return (
    <Suspense fallback={<Loading />}>
      <Navbar
        profile={profile}
        hiveDetails={hiveDetails}
        hiveComponents={hiveComponents}
      />
      <div className="main_body_container">
        <div className="uploadCenterElements">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
      <BottomNavMenu
        hiveComponents={hiveComponents}
        channelList={channelList}
      />
    </Suspense>
  );
}
