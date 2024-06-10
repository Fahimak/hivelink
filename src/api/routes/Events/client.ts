"use client";

import { fetchClientPost } from "api/client";

export async function fetchClientPresignedUrl(payload: {}) {
  try {
    const data = await fetchClientPost(
      `/content/admin/resources/pre/signed`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
