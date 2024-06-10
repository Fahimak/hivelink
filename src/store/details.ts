import { HiveActivitiesItem } from "api/models/Hive/hiveActivities";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { RawComponents } from "api/models/Hive/hiveComponents";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
} from "api/models/Hive/hiveDetails";
import { MembersModel } from "api/models/Hive/hiveMembers";
import { fetchHiveChannels } from "api/routes/Hive/channels";
import { fetchHiveComponents } from "api/routes/Hive/components";
import {
  fetchActivities,
  fetchContactInfo,
  fetchHiveDetails,
  fetchHiveMembers,
  fetchSocialLinks,
} from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import { getCookie } from "cookies-next";
import { create } from "zustand";

export const hiveDetailsStore = create((set) => ({
  hiveDetails: undefined,
  hiveMembers: undefined,
  socialLinks: undefined,
  contactInfo: undefined,
  hiveComponents: undefined,
  hiveChannels: undefined,
  hiveActivities: undefined,
  setHiveDetails: async () => {
    const resp = await fetchHiveDetails({
      organizationUuid: org_uuid,
    });

    if (!!resp) {
      set((state: any) => ({
        hiveDetails: resp,
      }));
    }
  },
  setMainHiveDetails: (newDetails: HiveDetails) => {
    set((state: any) => ({
      hiveDetails: newDetails,
    }));
  },
  setHiveComponents: async (passedId: number) => {
    const hiveComponents: RawComponents[] = await fetchHiveComponents({
      organizationUuid: org_uuid,
      organizationId: passedId,
      isMemberView: getCookie("isMemberView") === "yes",
    });

    if (!!hiveComponents) {
      set((state: any) => ({
        hiveComponents: hiveComponents,
      }));
    }
  },
  setHiveChannels: async (passedId: number) => {
    const channelList: ChannelListModel[] = await fetchHiveChannels({
      hiveId: passedId,
      isMemberView: getCookie("isMemberView") === "yes",
    });

    if (!!channelList) {
      set((state: any) => ({
        hiveChannels: channelList,
      }));
    }
  },
  setHiveMembers: async (passedId: number) => {
    const members: MembersModel = await fetchHiveMembers({
      hiveId: passedId || 1,
      pageNo: 0,
      contentLimit: 15,
    });

    if (!!members)
      set((state: any) => ({
        hiveMembers: members,
      }));
  },
  setSocialLinks: async () => {
    const socialLinks: SocialLinksItem[] = await fetchSocialLinks({
      organizationUuid: org_uuid,
    });

    if (!!socialLinks)
      set((state: any) => ({
        socialLinks: socialLinks,
      }));
  },
  setContactInfo: async () => {
    const contactInfo: ContactInfoModel = await fetchContactInfo({
      organizationUuid: org_uuid,
    });

    if (!!contactInfo)
      set((state: any) => ({
        contactInfo: contactInfo,
      }));
  },
  setHiveActivities: async (passedId: number) => {
    const activities: HiveActivitiesItem = await fetchActivities({
      communityId: passedId || 1,
      pageNo: 0,
      contentLimit: 30,
      channelUuid: "",
    });

    if (!!activities)
      set((state: any) => ({
        hiveActivities: activities,
      }));
  },
}));
