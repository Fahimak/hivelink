"use server";
import {
  fetchServerGet,
  fetchServerNoAuthPost,
  fetchServerPost,
} from "api/request";

const base_path = "/webApp";

export const fetchChannelUuidsForBuild = async (payload: {}): Promise<
  string[]
> => {
  try {
    const data = await fetchServerNoAuthPost(
      `/community/landing/channel/list/for/build`,
      payload,
      "channel"
    );
    return data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch channel UUIDs for build");
  }
};

export async function fetchChannelNoAuthData(uuid: string) {
  try {
    const data = await fetchServerGet(
      `${base_path}/noAuth/get/details/uuid/${uuid}`,
      "channel"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function editChannelDetails(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/channel/update/details`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function removeChannelMember(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/remove/channel/members`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function createChannel(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/channel/create/channel`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
