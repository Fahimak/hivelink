"use server";
import { fetchServerPost } from "api/request";
import { org_uuid } from "constants/constants";

export async function fetchServerFeed(page: number) {
  try {
    const data = await fetchServerPost("/webApp/noAuth/feed/get/videos/v2", {
      contentLimit: 10,
      pageNo: page,
      organizationUuid: org_uuid,
      searchQuery: null,
    });

    return data.videos;
  } catch (error) {
    console.log("error");
  }
}
