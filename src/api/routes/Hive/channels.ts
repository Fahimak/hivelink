"use server";
import { fetchServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/webApp";

export async function fetchHiveChannels(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "" : "noAuth/"}channel/list`,
      payload,
      "channels"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
