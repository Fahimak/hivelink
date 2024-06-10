"use server";

import { fetchServerPost } from "api/request";

export async function fetchNotificationsList(payload: {}) {
  try {
    const data = await fetchServerPost("/notification/user/get", payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}
