"use server";
import { fetchServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/webApp";

export async function fetchHiveComponents(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "component" : "noAuth"}/main/list/v2`,
      payload,
      "components"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchChildComponents(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "component" : "noAuth"}/child/list`,
      payload,
      "child"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
