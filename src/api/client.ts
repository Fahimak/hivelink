"use client";

import { base_url, basic_auth } from "constants/constants";
import { getCookie } from "cookies-next";

export async function fetchClientPost(url: string, payload: {}, tag?: string) {
  const authToken = getCookie("@jwtToken");

  const headers = {
    Authorization: authToken === null ? "" : `Bearer ${authToken}`,
    "Basic-Auth": basic_auth,
    "Content-Type": "application/json",
  };

  console.log("fetching", base_url + url);

  try {
    const res = await fetch(base_url + url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
      // cache: "no-store",
      next: { tags: [tag || ""] },
    });

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(`error while fetching ${url}`);
    console.log("with payload:", payload);
    console.log("error:", error);
  }
}

export async function fetchClientFormPost(url: string, formdata: FormData) {
  console.log("fetching", base_url + url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Basic-Auth": basic_auth,
      },
      body: formdata,
    });

    if (res.ok) return true;

    // const data = await res.json();

    // return data;
  } catch (error) {
    return false;
    console.log(`error while fetching ${url}`);
    console.log("with payload:", formdata);
    console.log("error:", error);
  }
}
