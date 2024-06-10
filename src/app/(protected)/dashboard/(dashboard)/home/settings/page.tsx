"use client";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
} from "api/models/Hive/hiveDetails";
import { MembersModel } from "api/models/Hive/hiveMembers";
import {
  fetchContactInfo,
  fetchHiveMembers,
  fetchSocialLinks,
} from "api/routes/Hive/hive";
import Loading from "app/(dashboard)/loading";
import { org_uuid } from "constants/constants";
import { Suspense, useEffect, useState } from "react";
import { hiveDetailsStore } from "store/details";
import Settings from "views/Settings";

export default function Page() {
  async function getSocialLinks() {
    const socialLinks: SocialLinksItem[] = await fetchSocialLinks({
      organizationUuid: org_uuid,
    }); // The return value is *not* serialized

    if (!socialLinks) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch socialLinks");
    }

    setSocialLinks(socialLinks);
  }

  async function getContactInfo() {
    const contactInfo: ContactInfoModel = await fetchContactInfo({
      organizationUuid: org_uuid,
    }); // The return value is *not* serialized

    if (!contactInfo) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch contactInfo");
    }

    setContactInfo(contactInfo);
  }

  async function getHiveMembers(passedId: number) {
    const hiveMembers: MembersModel = await fetchHiveMembers({
      hiveId: passedId || 1,
      pageNo: 0,
      contentLimit: 15,
    }); // The return value is *not* serialized

    if (!hiveMembers) {
      // This will activate the closest `error.js` Error Boundary
      console.log("Failed to fetch hive members");
    }

    setHiveMembers(hiveMembers);
  }
  const [socialLinks, setSocialLinks] = useState<SocialLinksItem[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfoModel | undefined>(
    undefined
  );
  const [hiveMembers, setHiveMembers] = useState<MembersModel | undefined>(
    undefined
  );

  const hiveDetails: HiveDetails = hiveDetailsStore(
    (state: any) => state.hiveDetails
  );

  useEffect(() => {
    getSocialLinks();
    getContactInfo();
    getHiveMembers(hiveDetails.communityId || 1);
  }, [hiveDetails]);

  return (
    <Suspense fallback={<Loading />}>
      {hiveDetails && contactInfo && socialLinks && hiveMembers && (
        <Settings
          hiveDetails={hiveDetails}
          contactInfo={contactInfo}
          socialLinks={socialLinks}
          hiveMembers={hiveMembers}
        />
      )}
    </Suspense>
  );
}
