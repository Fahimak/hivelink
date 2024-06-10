"use server";
import { CreateStoryModel, CreateStoryRequest } from "api/models/Story/story";
import { fetchServerPost } from "api/request";
// import { org_uuid } from "constants/constants";

const base_path = "/webApp/story";

export async function fetchServerStories() {
  try {
    const data = await fetchServerPost(
      "/webApp/story/get/published",
      {
        organizationUuid: process.env.NEXT_PUBLIC_ORG_UUID || "",
      },
      "stories"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchStoryDetails(storyUuid: string) {
  try {
    const data = await fetchServerPost(
      "/webApp/noAuth/story/stories",
      {
        storyUuid: storyUuid,
      },
      "story"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchStoryItem(storyUuid: string) {
  try {
    const data = await fetchServerPost(
      "/webApp/noAuth/story/item",
      {
        storyUuid: storyUuid,
      },
      "story"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchStoryReactItem(payload: {}) {
  try {
    const data = await fetchServerPost(
      "/webApp/noAuth/story/get/react",
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function updateStoryReactions(payload: {}) {
  try {
    const data = await fetchServerPost("/webApp/noAuth/story/react", payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function createStoryApi(payload: CreateStoryRequest) {
  try {
    const data: CreateStoryModel = await fetchServerPost(
      `${base_path}/create`,
      payload
    );
    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}

export async function addStorySegmentApi(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/add/segments`, payload);

    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}

export async function getSegmentsApi(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/before/publishing`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}

export async function removeSegmentsApi(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/remove/segments`, payload);

    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}

export async function editSegmentApi(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/edit/segments`, payload);

    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}

export async function updateSegmentsOrderApi(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/change/order`, payload);

    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}

export async function publishStoryApi(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/publish`, payload);

    return data;
  } catch (error) {
    console.log("error");
    return false;
  }
}
