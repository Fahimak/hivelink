import LeftElements from "components/LeftElements";
import CenterElements from "components/CenterElements";
import RightElements from "components/RightElements";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { fetchHiveComponents } from "api/routes/Hive/components";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { fetchHiveChannels } from "api/routes/Hive/channels";
import { Suspense } from "react";
import Loading from "app/loading";
import { checkMemberView } from "utils/auth";
import BottomNavMenu from "components/BottomNavMenu";
import Navbar from "components/Navbar";
import { ProfileItem } from "api/models/profile";
import { fetchUserProfile } from "api/routes/Profile/profile";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details");
  }

  return hiveDetails;
}

async function getComps(communityId: number) {
  const hiveComponents: RawComponents[] = await fetchHiveComponents({
    organizationUuid: org_uuid,
    organizationId: communityId || 1,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!hiveComponents) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive components");
  }
  return hiveComponents;
}

async function getProfile() {
  const profile: ProfileItem = await fetchUserProfile({}); // The return value is *not* serialized

  if (!profile) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch profile");
  }

  return profile;
}

async function getChannelList(communityId: number) {
  const channelList: ChannelListModel[] = await fetchHiveChannels({
    hiveId: communityId || 1,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!channelList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch channels");
  }

  return channelList;
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hiveDetails = await getData();

  const compsPromise = getComps(hiveDetails?.communityId || 1);

  const profilePromise = getProfile();

  const channelsPromise = getChannelList(hiveDetails?.communityId || 1);

  // Use Promise.all to wait for all these promises to resolve
  const [hiveComponents, profile, channelList] = await Promise.all([
    compsPromise,
    profilePromise,
    channelsPromise,
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <Navbar
        profile={profile}
        hiveDetails={hiveDetails}
        hiveComponents={hiveComponents}
      />
      <div className="main_body_container">
        <LeftElements
          hiveComponents={hiveComponents}
          channelList={channelList}
        />
        <CenterElements>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </CenterElements>
        <RightElements
          hiveDetails={hiveDetails}
          hiveComponents={hiveComponents}
        />
      </div>
      <BottomNavMenu
        hiveComponents={hiveComponents}
        channelList={channelList}
      />
    </Suspense>
  );
}
