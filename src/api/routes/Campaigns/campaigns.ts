"use server";

import { fetchServerPost } from "api/request";
import { org_uuid } from "constants/constants";

export async function fetchCampaignsList() {
  try {
    const data = await fetchServerPost("/webApp/campaign/get/list", {
      organizationUuid: org_uuid,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}
