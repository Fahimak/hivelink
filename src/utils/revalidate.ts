"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateTags(passedTag: string) {
  revalidateTag(passedTag);
}
