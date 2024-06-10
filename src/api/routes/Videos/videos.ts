"use server";
import { fetchServerNoAuthPost, fetchServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/webApp";

export async function fetchVideoList(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "channel" : "noAuth"}/video/list`,
      payload,
      "videos"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function updateVideoStatus(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/channel/video/update/status`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export const fetchVideoUuidsForBuild = async (payload: {}): Promise<
  string[]
> => {
  try {
    const data = await fetchServerNoAuthPost(
      `/content/landing/list/uuid`,
      payload,
      "videos"
    );
    return data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch video UUIDs for build");
  }
};

export async function fetchVideoDetails(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/content/landing/details/uuid`,
      payload,
      "video"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
