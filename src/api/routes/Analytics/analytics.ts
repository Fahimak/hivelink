"use server";
import { fetchServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/webApp";

export async function fetchUsageData(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/analytics/get/usage/data`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchVideoCount(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "noAuth/" : ""}analytics/videos/count`,
      payload
    );
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchUsersCount(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${!checkAuth() ? "noAuth/" : ""}analytics/users/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchChannelsCount(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${!checkAuth() ? "noAuth/" : ""}analytics/channels/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchVisitorsData(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/dashboard/fetch/user/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchProductsCount(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/dashboard/fetch/product/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function logCtaAnalytics(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/unAuth/update/logs`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getStoryViews(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/dashboard/story/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getStoryReactions(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/analytics/story/reactions/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getStoryLocation(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/dashboard/story/location/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getStorySocialCount(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/dashboard/story/origin/count`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getDaywiseAnalytics(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/spring/analytics/cta/dashboard/story/count/day/wise`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
