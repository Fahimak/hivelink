import { HiveActivitiesItem } from "api/models/Hive/hiveActivities";
import { RawComponents } from "api/models/Hive/hiveComponents";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
} from "api/models/Hive/hiveDetails";
import {
  fetchActivities,
  fetchContactInfo,
  fetchSocialLinks,
} from "api/routes/Hive/hive";
import ContactSection from "components/ContactSection";
import HiveActivities from "components/HiveActivities";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import SocialLinks from "components/SocialLinks";
import { org_uuid } from "constants/constants";
import React from "react";

type Props = {
  hiveDetails: HiveDetails;
  hiveComponents: RawComponents[];
};

async function getData(hiveDetails: HiveDetails) {
  const socialLinks: SocialLinksItem[] = await fetchSocialLinks({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized

  if (!socialLinks) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch socialLinks");
  }

  const contactInfo: ContactInfoModel = await fetchContactInfo({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized

  if (!contactInfo) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch contactInfo");
  }

  const activities: HiveActivitiesItem = await fetchActivities({
    communityId: hiveDetails?.communityId || 1,
    pageNo: 0,
    contentLimit: 30,
    channelUuid: "",
  }); // The return value is *not* serialized

  if (!activities) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch activities");
  }

  return { socialLinks, contactInfo, activities };
}

const RightElements = async ({ hiveDetails, hiveComponents }: Props) => {
  const { socialLinks, contactInfo, activities } = await getData(hiveDetails);

  return (
    <div className="RightElements">
      <IslandLayout>
        <SocialLinks socialLinks={socialLinks} />
      </IslandLayout>
      {!!contactInfo && (
        <>
          <LineBreak />
          <IslandLayout>
            <ContactSection
              hiveComponents={hiveComponents}
              contactInfo={contactInfo}
            />
          </IslandLayout>
        </>
      )}
      <LineBreak />
      <IslandLayout>
        <HiveActivities activities={activities} />
      </IslandLayout>
    </div>
  );
};

export default RightElements;
