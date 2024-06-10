"use server";

import { fetchServerPost } from "api/request";
import { org_uuid } from "constants/constants";

export async function fetchFormsList() {
  try {
    const data = await fetchServerPost("/webApp/forms/get/list", {
      organizationUuid: org_uuid,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}
