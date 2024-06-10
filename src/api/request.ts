"use server";

import { base_url, basic_auth } from "constants/constants";
import { cookies } from "next/headers";

export async function fetchServerPost(
  url: string,
  payload: {},
  tag?: string,
  token?: string
) {
  const authToken = cookies().get("@jwtToken")?.value || "";

  const headers = {
    Authorization: !!token
      ? `Bearer ${token}`
      : !!authToken
      ? `Bearer ${authToken}`
      : "",
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

export async function fetchServerNoAuthPost(
  url: string,
  payload: {},
  tag?: string
) {
  const headers = {
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

export async function formServerPost(url: string, formdata: FormData) {
  console.log("fetching", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Basic-Auth": basic_auth,
      },
      body: formdata,
    });

    if (res.ok) {
      // If the response status is in the 200 range, consider it a successful upload
      return true;
    } else {
      // Handle the case where the upload was not successful
      console.error("Upload to S3 failed:", res.statusText);
      return false;
    }
  } catch (error) {
    console.log(`error while fetching ${url}`);
    console.log("with formData:", JSON.stringify(formdata));
    console.log("error:", error);
  }
}

export async function fetchServerGet(url: string, tag?: string) {
  const authToken = cookies().get("@jwtToken")?.value || "";

  const headers = {
    Authorization: authToken === null ? "" : `Bearer ${authToken}`,
    "Basic-Auth": basic_auth,
    // "Cache-Control": "no-cache",
  };

  console.log("fetching", base_url + url);
  try {
    const res = await fetch(base_url + url, {
      method: "GET",
      headers: headers,
      // cache: "no-store",
      next: { tags: [tag || ""] },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(`error while fetching ${url}`);
    console.log("error:", error);
  }
}
