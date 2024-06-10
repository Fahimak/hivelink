"use server";
import { fetchServerPost } from "api/request";

const base_path = "/webApp";

export async function uploadContent(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/channel/video/upload`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function YTUploadContent(payload: {}) {
  try {
    const data = await fetchServerPost(`/content/video/upload/link`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}
