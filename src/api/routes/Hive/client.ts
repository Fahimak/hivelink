"use client";

import { fetchClientFormPost } from "api/client";

export async function uploadToS3(url: string, formData: FormData) {
  try {
    const data = await fetchClientFormPost(url, formData);

    return data;
  } catch (error) {
    console.log("error");
  }
}
